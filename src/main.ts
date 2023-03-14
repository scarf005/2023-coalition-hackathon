import { App } from '@slack/bolt'
import { config as loadDotenv } from 'dotenv'

/**
 * `.env` 파일 내의 환경 변수 타입 정의
 *
 * @note 키 `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `SLACK_APP_TOKEN`, `PORT`
 * @note 값 string
 */
type DotEnv = Record<
  'SLACK_BOT_TOKEN' | 'SLACK_SIGNING_SECRET' | 'SLACK_APP_TOKEN' | 'PORT',
  string
>

const { SLACK_APP_TOKEN, SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, PORT } =
  loadDotenv().parsed as DotEnv

const port = parseInt(PORT, 10)

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
  port,
})

// 사용자의 메시지 안에 "hello" 문자열이 포함되어 있으면 실행
app.message('hello', async ({ message, say }) => {
  if (message.subtype) return // 타입스크립트 오류 방지를 위해 추가

  console.log(`Message received: ${message.text}`)

  // <>는 슬랙이 쓰는 변수 표기법, js의 `${값}` 과 비슷함
  await say(`Hey there <@${message.user}>!`)
})

const main = async () => {
  await app.start(port)

  console.log('⚡️ Bolt app is running!')
}

main()
