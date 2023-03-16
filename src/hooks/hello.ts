import { createHook } from "../createHook"

const trigger = /안녕|반가워|hello/i

/**
 * 슬랙봇이 동작하는지 확인하기 위한 테스트용 훅
 *
 * 사용자 메시지 중 `안녕, 반가워, hello` 중 하나가 포함되면
 * `안녕안녕 {사용자이름}!` 이라고 답장합니다
 */
export const helloHook = createHook({
	trigger,
	fn: async ({ message, say }) => {
		console.log(`Message received: ${message.text}`)

		// <>는 슬랙이 쓰는 변수 표기법, js의 `${값}` 과 비슷함
		await say(`안녕안녕 ${message.user} <@${message.user}>!`)
	},
})
