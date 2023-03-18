import { App } from "@slack/bolt"
import { Env } from "./env"
import { MessageHook } from "./createHook"

/** 주어진 환경 변수 객체로부터 새 슬랙 앱을 만듭니다 */
export const createApp = ({
	SLACK_BOT_TOKEN,
	SLACK_SIGNING_SECRET,
	SLACK_APP_TOKEN,
	port,
}: Env) =>
	new App({
		token: SLACK_BOT_TOKEN,
		signingSecret: SLACK_SIGNING_SECRET,
		socketMode: true,
		appToken: SLACK_APP_TOKEN,
		port,
	})

/** app.message에 여러 함수 등록하기 */
export const registerHooks = (app: App, hooks: readonly MessageHook[]) => {
	hooks.forEach(({ trigger, fn }) => {
		app.message(trigger, fn)
	})
}
