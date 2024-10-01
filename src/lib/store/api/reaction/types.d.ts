type GetReactionsRequest = {
	id: number
}

type GetReactionsResponse = {
	userId: number
	emoji: string
}[]

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
