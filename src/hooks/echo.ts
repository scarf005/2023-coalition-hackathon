import { createHook } from "../createHook"

/** 받은 메시지를 그대로 메아리하는 후크 */
export const echoHook = createHook({
	fn: async ({ message: { user, text }, say }) => {
		// <>는 슬랙이 쓰는 변수 표기법, js의 `${값}` 과 비슷함
		await say(`<@${user}> said: ${text}`)
	},
})
