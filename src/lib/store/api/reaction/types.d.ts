type GetReactionsRequest = void

type GetReactionsResponse = {
	messageId: number
	reactions: { [emoji: string]: string[] }[]
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
