import { createHook } from "../createHook"
import { env } from "../env"

/** 받은 메시지를 그대로 메아리하는 후크 */
export const echoHook = createHook({
	excludeChannels: [env.ANNOUNCEMENT_CHANNEL_ID],
	fn: async ({ message: { user, text }, say }) => {
		// 참고: https://api.slack.com/reference/surfaces/formatting#mentioning-users
		await say(`<@${user}> said: ${text}`)
	},
})
