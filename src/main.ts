import { env, port } from "./env"
import { createApp, registerHooks } from "./app"
import { announcementHook, echoHook } from "./hooks"

const main = async () => {
	console.log("⚡️ 앱 실행 준비 중...")

	const app = createApp(env)

	registerHooks(app, [echoHook, announcementHook])

	await app.start(port)

	console.log("⚡️ 앱 시작!")
}

main()
