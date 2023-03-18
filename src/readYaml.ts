import { promises } from "fs"
import path from "path"
import yaml from "yaml"
import { z } from "zod"
import { Doc, docSchema } from "./searchKeyword"

const docsSchema = z.array(docSchema)

/** "42docs/{키워드}.{확장자}" 경로의 내용을 읽는 함수
 *
 * @returns "ShortDescription.yaml"의 내용을 파싱하여 Doc[]으로 반환
 */
export const readKeywordFile = async (): Promise<Doc[]> => {
	const docPath = path.join(
		process.cwd(),
		"docs",
		"desc",
		"ShortDescription.yaml",
	)
	const text = await promises.readFile(docPath, "utf8")
	const raw = yaml.parse(text)
	const contents = docsSchema.parse(raw)
	return contents
}
