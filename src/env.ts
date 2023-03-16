import { config as loadDotenv } from "dotenv"
import { z } from "zod"

type EnvFileEntry = z.infer<typeof envFileSchema>

/** .env 파일 내에 반드시 있어야 하는 키값 목록 */
const envFileSchema = z
	.object({
		SLACK_BOT_TOKEN: z.string(),
		SLACK_SIGNING_SECRET: z.string(),
		SLACK_APP_TOKEN: z.string(),
		OPENAI_API_KEY: z.string().optional(),
    ANNOUNCEMENT_CHANNEL_ID: z.string(),
		PORT: z.string(),
	})
	.strict()

/** 환경 변수 파일 */
type EnvFile = EnvFileEntry

/** 파싱이 끝난 환경 변수 객체 */
export type Env = Readonly<Omit<EnvFileEntry, "PORT"> & { port: number }>

/** 포트 번호를 숫자로 파싱합니다 */
const parseEnv = ({ PORT, ...args }: EnvFile): Env => ({
	...args,
	port: parseInt(PORT, 10),
})

const envfile = loadDotenv().parsed as EnvFile

export const env = parseEnv(envFileSchema.parse(envfile))
export const {
	SLACK_BOT_TOKEN,
	SLACK_SIGNING_SECRET,
	SLACK_APP_TOKEN,
	OPENAI_API_KEY,
  ANNOUNCEMENT_CHANNEL_ID,
	port,
} = env
