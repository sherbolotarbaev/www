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
