type NewMessageRequest = {
	body: string
}

type NewMessageResponse = {
	message: GuestbookMessage
}

type DeleteMessageRequest = {
	id: number
}

type DeleteMessageResponse = {
	message: GuestbookMessage
}

type EditMessageRequest = {
	id: number
	body: string
}

type EditMessageResponse = {
	message: GuestbookMessage
}

type GetMessagesRequest = {
	take?: number
} | void

type GetMessagesResponse = {
	totalCount: number
	count: number
	items: GuestbookMessage[]
}

type AddMessageReactionRequest = {
	id: number
	emoji: string
}

type AddMessageReactionResponse = GuestbookMessageReaction

type RemoveMessageReactionRequest = {
	id: number
	emoji: string
}

type RemoveMessageReactionResponse = GuestbookMessageReaction
