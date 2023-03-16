import {
	AllMiddlewareArgs,
	App,
	GenericMessageEvent,
	SlackEventMiddlewareArgs,
} from "@slack/bolt"
import { StringIndexed } from "@slack/bolt/dist/types/helpers"
import type { SetOptional, Simplify } from "type-fest"

type MessageHookTrigger = Parameters<App["message"]>[0]

/**
 * app.message에서 보내주는 인자 목록입니다.
 *
 * 메시지는 사용자 메시지 또는 봇 메시지일 수 있습니다.
 */
type MessageHookRawArgs = Simplify<
	SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs<StringIndexed>
>

type MessageHookArgs = Omit<MessageHookRawArgs, "message"> & {
	message: GenericMessageEvent
}

type UserOrBotMessage = MessageHookRawArgs["message"]

/** 특정 메시지를 받을 때마다 자동으로 실행되는 후크 */
type MessageHookConstructor = SetOptional<
	{
		/** 사용자 메시지 안에 해당 문자열이 있으면 함수를 실행합니다 */
		trigger: MessageHookTrigger

		/** 조건 만족 시 실행되는 비동기 함수 */
		fn: (args: MessageHookArgs) => Promise<void>
	},
	"trigger"
>

/** bolt app에 추가 가능한, 후처리가 끝난 후크입니다.
 *
 * 직접 사용해서는 안됩니다. @see {@link createHook}
 */
export type MessageHook = Required<
	Omit<MessageHookConstructor, "fn"> & {
		fn: (args: MessageHookRawArgs) => Promise<void>
	}
>

/** 후크로 받은 메시지가 유저 메시지인지 확인합니다 */
const isUserMessage = (
	message: UserOrBotMessage,
): message is GenericMessageEvent => {
	return message.subtype === undefined
}

/** 사용자 메시지를 받을 때마다 실행되는 후크를 만듭니다.
 *
 * @param message 후크가 실행될 조건. 기본값: 모든 메시지
 * @param fn 후크가 실행될 때 실행될 함수. 사용자 메시지에만 실행됩니다.
 */
export const createHook = ({
	trigger = /.*/,
	fn,
}: MessageHookConstructor): MessageHook => {
	const wrappedFn = async ({ message, ...args }: MessageHookRawArgs) => {
		if (!isUserMessage(message)) return

		await fn({ message, ...args })
	}

	return { trigger, fn: wrappedFn }
}
