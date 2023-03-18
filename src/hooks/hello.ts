import { createHook } from "../createHook"
import { env } from "../env"

const trigger = /안녕|반가워|hello/i

/**
 * 슬랙봇이 동작하는지 확인하기 위한 테스트용 훅
 *
 * 사용자 메시지 중 `안녕, 반가워, hello` 중 하나가 포함되면
 * `안녕안녕 {사용자이름}!` 이라고 답장합니다
 */
export const helloHook = createHook({
	trigger,
	excludeChannels: [env.ANNOUNCEMENT_CHANNEL_ID],
	fn: async ({ message, say }) => {
		console.log(`Message received: ${message.text}`)

		// 참고: https://api.slack.com/reference/surfaces/formatting#mentioning-users
		await say(`안녕안녕 ${message.user} <@${message.user}>!`)
	},
})
