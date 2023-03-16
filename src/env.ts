import { config as loadDotenv } from "dotenv"

/**
 * `.env` 파일 내의 환경 변수 타입 정의
 *
 * @note 키 `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `SLACK_APP_TOKEN`, `PORT`
 * @note 값 string
 */
type EnvFileEntry = Record<
	| "SLACK_BOT_TOKEN"
	| "SLACK_SIGNING_SECRET"
	| "SLACK_APP_TOKEN"
	| "OPENAI_API_KEY",
	string
>

/** 환경 변수 파일 */
type EnvFile = EnvFileEntry & { PORT: string }

/** 파싱이 끝난 환경 변수 객체 */
export type Env = Readonly<EnvFileEntry & { port: number }>

const envfile = loadDotenv().parsed as EnvFile

const parseEnv = ({ PORT, ...args }: EnvFile): Env => ({
	...args,
	port: parseInt(PORT, 10),
})

export const env = parseEnv(envfile)
export const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN, port } =
	env
