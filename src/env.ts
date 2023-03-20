import { config as loadDotenv } from "dotenv"
import { z } from "zod"

/** .env 파일 내에 반드시 있어야 하는 키값 목록 */
const envFileSchema = z.object({
	SLACK_BOT_TOKEN: z.string(),
	SLACK_SIGNING_SECRET: z.string(),
	SLACK_APP_TOKEN: z.string(),
	OPENAI_API_KEY: z.string().optional(),
	ANNOUNCEMENT_CHANNEL_ID: z.string(),
	PORT: z.coerce.number(),
})

loadDotenv()

export const env = envFileSchema.parse(process.env)
export const {
	SLACK_BOT_TOKEN,
	SLACK_SIGNING_SECRET,
	SLACK_APP_TOKEN,
	OPENAI_API_KEY,
	ANNOUNCEMENT_CHANNEL_ID,
	PORT,
} = env
