import { env, port } from "./env"
import { createApp, registerHooks } from "./app"

const main = async () => {
	console.log("⚡️ 앱 실행 준비 중...")
	const app = createApp(env)
	await app.start(port)

	console.log("⚡️ Bolt app is running!")
}

main()
