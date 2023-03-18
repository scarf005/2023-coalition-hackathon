type Doc = {
	keywords: string[]
	contents: string[]
}

/**
 * 주어진 {@link Doc} 배열에서 `keyword`를 찾아서 `contents`를 반환합니다.
 */
export const searchDocKeyword = (
	keyword: string,
	docs: Doc[],
): Doc["contents"] | null =>
	docs.find(({ keywords }) => keywords.includes(keyword))?.contents ?? null
