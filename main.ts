import { App } from '@slack/bolt'
import { config as loadDotenv } from 'dotenv'

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

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  if (message.subtype) return

  console.log(`Message received: ${message.text}`)

  await say(`Hey there <@${message.user}>!`)
})

const main = async () => {
  // Start the app
  await app.start(port)

  console.log('⚡️ Bolt app is running!')
}

main()
