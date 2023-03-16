import { promises } from "fs"
import path from "path"

/** "42docs/{키워드}.{확장자}" 경로의 내용을 읽는 함수
 *
 * @param extension 파일 확장자
 * @returns 텍스트 파일 내용
 */
const readKeywordFile = async (
	keyword: string,
	extension = ".txt",
): Promise<string> => {
	const filePath = path.join(__dirname, "42docs", keyword, extension)

	return promises.readFile(filePath, "utf8")
}

/** 키워드의 짧은 설명을 불러오는 함수 */
export const loadShortDesc = async (keyword: string): Promise<string> => {
	try {
		return readKeywordFile(keyword)
	} catch {
		return "키워드를 찾을 수 없습니다!"
	}
}
