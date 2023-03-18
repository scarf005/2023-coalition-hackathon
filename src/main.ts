import { env, port } from "./env"
import { createApp, registerHooks } from "./app"
import { announcementHook, keywordHook } from "./hooks"
import { readKeywordFile } from "./readYaml"

const main = async () => {
	console.log("⚡️ 앱 실행 준비 중...")
	const app = createApp(env)
	const docs = await readKeywordFile()

	registerHooks(app, [announcementHook, keywordHook(docs)])

	await app.start(port)

	console.log("⚡️ 앱 시작!")
}

main()
