import { z } from "zod"

export const docSchema = z.object({
	키워드: z.array(z.string()),
	내용: z.array(z.string()),
})

export type Doc = z.infer<typeof docSchema>

/**
 * 주어진 {@link Doc} 배열에서 `keyword`를 찾아서 `내용`을 반환합니다.
 */
export const searchDocKeyword = (
	docs: Doc[],
	keyword: string,
): Doc["내용"] | null => {
	const lowerKeyword = keyword.toLowerCase()
	const result = docs.find(({ 키워드 }) => 키워드.includes(lowerKeyword))

	return result?.내용 ?? null
}
