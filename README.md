# RT4M: Read The 42 Manual

42 카뎃을 위한 위키 및 알림 슬랙봇

## 실행 방법

```sh
git clone https://github.com/scarf005/2023-coalition-hackathon
cd 2023-coalition-hackathon
npm install
npm run dev
```

루트 디렉토리에 다음과 같이 `.env` 파일을 만들어주세요.

```
SLACK_BOT_TOKEN
SLACK_SIGNING_SECRET
SLACK_APP_TOKEN
PORT
```

## 새로운 후크 만들기

`src/hooks/echo.ts`를 참고해주세요. 자세한 설명은 `createHook` 함수의 주석에도 있습니다.

```ts
// src/hooks/echo.ts
import { createHook } from '../createHook'

// 받은 메시지를 그대로 메아리하는 후크
export const echoHook = createHook({
  fn: async ({ message: { user, text }, say }) => {
    // <>는 슬랙이 쓰는 변수 표기법, js의 `${값}` 과 비슷함
    await say(`<@${user}> said: ${text}`)
  },
})
```

생성한 훅은 `registerHooks` 함수로 한번에 여러 개 등록할 수 있습니다.

```ts
const app = createApp(env)
registerHooks(app, [echoHook])
app.start(port)
```

## 참고자료

[slack bolt-js](https://slack.dev/bolt-js/tutorial/getting-started)
