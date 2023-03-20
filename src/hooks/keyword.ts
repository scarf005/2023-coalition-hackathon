import { createHook } from "../createHook"
import { env } from "../env"
import { Doc, searchDocKeyword } from "../searchKeyword"

export const keywordHook = (docs: Doc[]) =>
	createHook({
		excludeChannels: [env.ANNOUNCEMENT_CHANNEL_ID],
		fn: async ({ message: { text }, say }) => {
			if (!text) return

			if (text.split(" ").length > 1) {
				await say("키워드는 한 단어만 입력해주세요.")
				return
			}

			const contents = searchDocKeyword(docs, text.trim())
			if (!contents) {
				await say(`${text}를 찾을 수 없습니다. 도움말을 참고해주세요.`)
				return
			}

			await say(contents.map((x) => `- ${x}`).join("\n"))
		},
	})
