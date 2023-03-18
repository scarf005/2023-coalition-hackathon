import { z } from "zod"

export const docSchema = z.object({
	키워드: z.array(z.string()),
	내용: z.array(z.string()),
})

export type Doc = z.infer<typeof docSchema>

/**
 * 주어진 {@link Doc} 배열에서 `keyword`를 찾아서 `contents`를 반환합니다.
 */
export const searchDocKeyword = (
	keyword: string,
	docs: Doc[],
): Doc["내용"] | null =>
	docs.find(({ 키워드 }) => 키워드.includes(keyword))?.내용 ?? null
