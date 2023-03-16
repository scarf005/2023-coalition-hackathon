import { AllMiddlewareArgs, App, SlackEventMiddlewareArgs } from "@slack/bolt"
import { StringIndexed } from "@slack/bolt/dist/types/helpers"
import { Env } from "./env"

type MessageHookTrigger = Parameters<App["message"]>[0]
type MessageHookArgs = SlackEventMiddlewareArgs<"message"> &
	AllMiddlewareArgs<StringIndexed>

/** 특정 메시지를 받을 때마다 자동으로 실행되는 후크 */
export type MessageHook = {
	/** 사용자 메시지 안에 해당 문자열이 있으면 함수를 실행합니다 */
	message: MessageHookTrigger

	/** 조건 만족 시 실행되는 비동기 함수 */
	fn: (args: MessageHookArgs) => Promise<void>
}

/** 주어진 환경 변수 객체로부터 새 슬랙 앱을 만듭니다 */
export const createApp = ({
	SLACK_BOT_TOKEN,
	SLACK_SIGNING_SECRET,
	SLACK_APP_TOKEN,
	port,
}: Env) => {
	return new App({
		token: SLACK_BOT_TOKEN,
		signingSecret: SLACK_SIGNING_SECRET,
		socketMode: true,
		appToken: SLACK_APP_TOKEN,
		port,
	})
}

/** app.message에 여러 함수 등록하기 */
export const registerHooks = (app: App, hooks: MessageHook[]) => {
	hooks.forEach(({ message, fn }) => {
		app.message(message, fn)
	})
}
