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
import { toast } from 'hooks/use-toast'
import { useCallback, useEffect, useState } from 'react'

function useMessageCache() {
	const { data: messagesData, isLoading, isFetching } = useGetMessagesQuery()
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
	const [totalMessages, setTotalMessages] = useState(0)

	useEffect(() => {
		if (messagesData) {
			setMessages(messagesData.items)
			setTotalMessages(messagesData.totalCount)
		}
	}, [messagesData])

	const handleError = (error: any, title: string) => {
		const description: string =
			error.data?.message ||
			(error.status === 'FETCH_ERROR' && 'Network error.') ||
			'An unexpected error occurred.'
		return toast({
			title,
			description,
			variant: 'destructive',
		})
	}

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
					toast({
						title: `Added reaction`,
						description:
							'Your reaction have been successfully added to this message.',
					})
				} else if (!isAdding && !isRemovingReaction) {
					await removeReaction({ id: messageId, emoji }).unwrap()
					toast({
						title: `Removed reaction`,
						description:
							'Your reaction have been successfully removed from this message.',
					})
				}
			} catch (error: any) {
				console.error('Failed to update reaction:', error)
				setMessages(messages)
				handleError(error, 'Error updating reaction')
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
				toast({
					title: 'Updated message',
					description: 'Your message have been successfully updated.',
				})
			} catch (error: any) {
				console.error('Failed to edit message:', error)
				setMessages(messages)
				handleError(error, 'Error updating message')
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
			setTotalMessages(prevCount => prevCount - 1)

			if (isDeletingMessage) return

			try {
				await deleteMessage({ id: messageId }).unwrap()
				toast({
					title: 'Deleted message',
					description: 'Your message have been successfully deleted.',
				})
			} catch (error: any) {
				console.error('Failed to delete message:', error)
				setMessages(messages)
				setTotalMessages(messages.length)
				handleError(error, 'Error deleting message')
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
			setTotalMessages(prevCount => prevCount + 1)

			try {
				const result = await addMessage({ body }).unwrap()
				setMessages(prevMessages =>
					prevMessages.map(message =>
						message.id === tempId
							? { ...message, id: result.message.id }
							: message
					)
				)
				toast({
					title: 'New message',
					description: 'Your new message have been successfully added.',
				})
			} catch (error: any) {
				console.error('Failed to add new message:', error)
				setMessages(prevMessages =>
					prevMessages.filter(message => message.id !== tempId)
				)
				setTotalMessages(prevCount => prevCount - 1)
				handleError(error, 'Error adding new message')
			}
		},
		[addMessage, isAddingMessage, me]
	)

	return {
		messages,
		totalMessages,
		isLoading,
		isFetching,
		updateReaction,
		editMessageContent,
		removeMessage,
		newMessage,
		isAddingMessage,
	}
}

export { useMessageCache }
