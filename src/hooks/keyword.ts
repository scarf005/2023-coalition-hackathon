import { match } from "ts-pattern"
import { outdent } from "outdent"

import { createHook } from "../createHook"
import { env } from "../env"
import { Doc, searchDocKeyword } from "../searchKeyword"

const helpMessage = (keywords: string) => outdent`
		- 안녕하세요! 은하수를 여행하는 히치하이커를 위한 안내서가 되고픈 \`42bot\`입니다!
		- 사용 할 수 있는 *명령어* 는 다음과 같습니다.
		- ${keywords}
		- 모든 정보들을 한번에 보고싶다면 <https://github.com/scarf005/2023-coalition-hackathon/blob/main/docs/desc/42Manual.md#42-manual|여기>를 방문해 주세요!
	`

const notFound = (text: string) => () =>
	`${text}를 찾을 수 없습니다. 도움말을 참고해주세요.`

const sayContents = (contents: string[]) =>
	contents.map((x) => `- ${x}`).join("\n")

export const keywordHook = (docs: Doc[]) => {
	const allKeywords = docs.map((x) => `\`${x.키워드[0]}\``).join(", ")
	const help = helpMessage(allKeywords)

	return createHook({
		excludeChannels: [env.ANNOUNCEMENT_CHANNEL_ID],
		fn: async ({ message: { text }, say }) => {
			if (!text) return

			if (text.split(" ").length > 1) {
				await say("키워드는 한 단어만 입력해주세요.")
				return
			}

			if (["help", "도움말", "도움"].includes(text)) {
				await say(help)
				return
			}

			const message = match(searchDocKeyword(docs, text.trim()))
				.with(null, notFound(text))
				.otherwise(sayContents)

			await say(message)
		},
	})
}
