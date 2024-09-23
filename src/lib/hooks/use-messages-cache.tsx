'use client'

import {
	useAddMessageReactionMutation,
	useDeleteMessageMutation,
	useEditMessageMutation,
	useGetMessagesQuery,
	useNewMessageMutation,
	useRemoveMessageReactionMutation,
} from 'api/guestbook'
import { useGetMeQuery } from 'api/me'
import { useCallback, useEffect, useState } from 'react'

function useMessageCache() {
	const { data: messagesData, isLoading } = useGetMessagesQuery()
	const { data: me } = useGetMeQuery()

	const [addReaction, { isLoading: isAddingReaction }] =
		useAddMessageReactionMutation()
	const [removeReaction, { isLoading: isRemovingReaction }] =
		useRemoveMessageReactionMutation()
	const [editMessage, { isLoading: isEditingMessage }] =
		useEditMessageMutation()
	const [deleteMessage, { isLoading: isDeletingMessage }] =
		useDeleteMessageMutation()
	const [addMessage, { isLoading: isAddingMessage }] = useNewMessageMutation()

	const [messages, setMessages] = useState<GuestbookMessage[]>([])

	useEffect(() => {
		if (messagesData) {
			setMessages(messagesData.items)
		}
	}, [messagesData])

	const updateReaction = useCallback(
		async (messageId: number, emoji: string, isAdding: boolean) => {
			const updatedMessages = messages.map(message => {
				if (message.id === messageId) {
					const updatedReactions = isAdding
						? [...message.reactions, { emoji, userId: me!.id, messageId }]
						: message.reactions.filter(
								r => !(r.emoji === emoji && r.userId === me!.id)
						  )
					return { ...message, reactions: updatedReactions }
				}
				return message
			})

			setMessages(updatedMessages)

			try {
				if (isAdding && !isAddingReaction) {
					await addReaction({ id: messageId, emoji }).unwrap()
				} else if (!isAdding && !isRemovingReaction) {
					await removeReaction({ id: messageId, emoji }).unwrap()
				}
			} catch (error) {
				console.error('Failed to update reaction:', error)
				setMessages(messages)
				// TODO: Show an error toast notification
			}
		},
		[
			messages,
			me,
			addReaction,
			removeReaction,
			isAddingReaction,
			isRemovingReaction,
		]
	)

	const editMessageContent = useCallback(
		async (messageId: number, newBody: string) => {
			const updatedMessages = messages.map(message =>
				message.id === messageId ? { ...message, body: newBody } : message
			)

			setMessages(updatedMessages)

			if (isEditingMessage) return

			try {
				await editMessage({ id: messageId, body: newBody }).unwrap()
			} catch (error) {
				console.error('Failed to edit message:', error)
				setMessages(messages)
				// TODO: Show an error toast notification
			}
		},
		[messages, editMessage, isEditingMessage]
	)

	const removeMessage = useCallback(
		async (messageId: number) => {
			const updatedMessages = messages.filter(
				message => message.id !== messageId
			)

			setMessages(updatedMessages)

			if (isDeletingMessage) return

			try {
				await deleteMessage({ id: messageId }).unwrap()
			} catch (error) {
				console.error('Failed to delete message:', error)
				setMessages(messages)
				// TODO: Show an error toast notification
			}
		},
		[messages, deleteMessage, isDeletingMessage]
	)

	const newMessage = useCallback(
		async (body: string) => {
			if (isAddingMessage || !me) return

			const tempId = Date.now()
			const newMessageData: GuestbookMessage = {
				id: tempId,
				body,
				isEdited: false,
				author: {
					name: me.name,
					email: me.email,
					photo: me.photo || '',
					isVerified: me.isVerified,
				},
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				reactions: [],
			}

			setMessages(prevMessages => [newMessageData, ...prevMessages])

			try {
				const result = await addMessage({ body }).unwrap()
				setMessages(prevMessages =>
					prevMessages.map(message =>
						message.id === tempId
							? { ...message, id: result.message.id }
							: message
					)
				)
			} catch (error) {
				console.error('Failed to add new message:', error)
				setMessages(prevMessages =>
					prevMessages.filter(message => message.id !== tempId)
				)
				// TODO: Show an error toast notification
			}
		},
		[addMessage, isAddingMessage, me]
	)

	return {
		messages,
		isLoading,
		updateReaction,
		editMessageContent,
		removeMessage,
		newMessage,
		isAddingMessage,
	}
}

export { useMessageCache }
