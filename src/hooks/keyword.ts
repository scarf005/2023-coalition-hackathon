import { createHook } from "../createHook"
import { env } from "../env"
import { Doc, searchDocKeyword } from "../searchKeyword"

export const keywordHook = (docs: Doc[]) =>
	createHook({
		excludeChannels: [env.ANNOUNCEMENT_CHANNEL_ID],
		fn: async ({ message: { text }, say }) => {
			if (!text) return

			if (text.split(" ").length > 1) {
				await say("키워드는 한 단어만 입력해주세요.")
				return
			}

			const contents = searchDocKeyword(docs, text.trim())
			if (!contents) return

			await say(contents.map((x) => `- ${x}`).join("\n"))
		},
	})
