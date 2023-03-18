import { WebClient } from "@slack/web-api"
import { outdent } from "outdent"
import promiseAllProperties from "promise-all-properties"

import { createHook } from "../createHook"
import { summarize } from "../summarize"
import { env } from "../env"

const client = new WebClient(env.SLACK_BOT_TOKEN)

const userDms = async () => {
	const result = await client.conversations.list({
		types: "im",
		exclude_archived: true,
		limit: 100,
	})

	const users = result
		.channels!.map((x) => x.user)
		.filter((x): x is string => x !== undefined)

	return users
}

const makeAnnouncement =
	({ channel, permalink, summarized }: Record<string, string>) =>
	async (user: string) =>
		await client.chat.postMessage({
			channel: user,
			text: outdent`
      :rocket: *<#${channel}>에 <${permalink}|새 공지가 등록되었습니다!>*

      ${summarized}
    `,
		})

/** OPENAI_API_KEY가 주어지지 않으면 더미 요약기를 씁니다 */
const makeSummarizer = (apiKey?: string) => {
	if (apiKey === undefined) {
		console.log(
			"OPENAI_API_KEY가 주어지지 않았습니다. 더미 요약기를 사용합니다.",
		)
		return async (text: string) => text.split("\n").slice(0, 3).join("\n")
	}

	console.log("OPENAI_API_KEY가 주어졌습니다. 요약기를 사용합니다.")
	const summarizer = summarize(apiKey)
	return async (text: string) =>
		summarizer(text).then(
			(x) =>
				outdent`
      ${x.text}

      _이 글은 GPT 3.5가 요약했습니다._
    `,
		)
}

const summarizer = makeSummarizer(env.OPENAI_API_KEY)

export const announcementHook = createHook({
	includeChannels: [env.ANNOUNCEMENT_CHANNEL_ID],
	fn: async ({ message: { text, ts }, event: { channel } }) => {
		if (text === undefined) return

		const { users, permalink, summarized } = await promiseAllProperties({
			users: userDms(),
			permalink: client.chat
				.getPermalink({ channel, message_ts: ts })
				.then((x) => x.permalink ?? ""),
			summarized: summarizer(text),
		})

		const announcement = makeAnnouncement({ channel, permalink, summarized })
		await Promise.all(users.map(announcement))

		console.log(`Message received: ${text}, permalink: ${permalink}`)
	},
})
