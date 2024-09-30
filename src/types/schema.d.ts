type User = {
	id: number
	email: string
	name: string
	surname: string
	photo?: string
	isActive: boolean
	isVerified: boolean
	createdAt: Date
	updatedAt: Date

	metaData: UserMetaData
}

type UserMetaData = {
	ip: string
	city?: string
	region?: string
	country?: string
	timezone?: string
	lastSeen: Date
	device?: string
}

type GuestbookMessageAuthor = {
	name: string
	email: string
	photo: string
	isVerified: boolean
}

type GuestbookMessage = {
	id: number
	body: string
	isEdited: boolean
	createdAt: string
	updatedAt: string
	author: GuestbookMessageAuthor
	reactions: GuestbookMessageReaction[]
}

type PostView = {
	slug: string
	viewsCount: number
	likesCount: number
}

type PostLike = {
	userId: number
	slug: string
}

type GuestbookMessageReaction = {
	userId: number
	emoji: string
}
