import { WebClient } from "@slack/web-api"
import { env } from "./env"

export const client = new WebClient(env.SLACK_BOT_TOKEN)

export const userDms = async () => {
	const result = await client.conversations.list({
		types: "im",
		exclude_archived: true,
		limit: 100,
	})

	const users = result
		.channels?.map((x) => x.user)
		.filter((x): x is string => x !== undefined) ?? []

	return users
}
