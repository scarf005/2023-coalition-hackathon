import { ChatGPTAPI, ChatMessage } from "chatgpt"

const systemMessage = `you're a TL;DR-GPT.
  1. Your job is to summarize korean text.
  2. You must output into 3 lines of korean text.
  3. Please keep the sentences short.
  4. Please output in ordered list in markdown format.
`

/**
 * 입력으로 받은 문자열을 3줄 요약해줍니다.
 *
 * - 사용하는데 평균 1200토큰 가량 사용됩니다.
 * - 회당 최소 3원 이상 드니, 적정 사용량을 유지해주세요.
 */
type Summarize = (apiKey: string) => (text: string) => Promise<ChatMessage>

/** @see {@link Summarize} */
export const summarize: Summarize = (apiKey) => {
	const api = new ChatGPTAPI({ apiKey })

	return async (text: string) => {
		const req = timeApi(async () => api.sendMessage(text, { systemMessage }))
		const { result, elapsed } = await req

		logUsage(result, elapsed)
		return result
	}
}

/** chatgpt API 요청까지 걸린 시간을 잽니다 */
const timeApi = async (fn: () => Promise<ChatMessage>) => {
	console.log("chatgpt :: API 요청 보내는 중...")
	const now = performance.now()
	const result = await fn()
	const elapsed = performance.now() - now

	return { result, elapsed }
}

/** 요청 시간, 사용 토큰 수, 예상 비용을 출력합니다 */
const logUsage = (result: ChatMessage, elapsed: number) => {
	const total_tokens = result.detail.usage.total_tokens as number
	const cost = getEstimatedCost(total_tokens)

	console.log(
		`chatgpt :: ${elapsed}ms, 사용 토큰 수: ${total_tokens}, 예상 비용: ${cost}원`,
	)
}

const DOLLAR_TO_KRW = 1319.34 // 2023-03-13 기준
const DOLLAR_PER_1K_TOKEN = 0.002 // gpt-3.5-turbo
const DOLLAR_PER_TOKEN = DOLLAR_PER_1K_TOKEN / 1000

/**
 * API 요청의 예상 비용을 계산합니다.
 *
 * @returns 원 단위의 비용
 */
const getEstimatedCost = (token: number): number =>
	Math.round(token * DOLLAR_PER_TOKEN * DOLLAR_TO_KRW)
