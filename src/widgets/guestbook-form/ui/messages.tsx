'use client'

import { useGetMeQuery } from 'api/me'
import { useMessageCache } from 'hooks/use-messages-cache'
import React, { useMemo, useState } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/avatar'
import { Button } from 'ui/button'
import { Card, CardContent, CardFooter, CardHeader } from 'ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from 'ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from 'ui/dropdown-menu'
import { Input } from 'ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'ui/popover'
import { Separator } from 'ui/separator'
import { Skeleton } from 'ui/skeleton'

import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react'
import { MdVerified } from 'react-icons/md'

import { cn } from 'utils'

const REACTION_OPTIONS = ['🚀', '🧠', '🙌', '😎', '👍', '🥲', '👋', '😂']

interface MessageEntryProps {
	entry: GuestbookMessage
	onReactionUpdate: (
		messageId: number,
		emoji: string,
		isAdding: boolean
	) => void
	onEdit: (messageId: number, newBody: string) => void
	onDelete: (messageId: number) => void
}

const MessageEntry: React.FC<MessageEntryProps> = ({
	entry,
	onReactionUpdate,
	onEdit,
	onDelete,
}) => {
	const { data: me } = useGetMeQuery()

	const [isEditing, setIsEditing] = useState(false)
	const [editedMessage, setEditedMessage] = useState(entry.body)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const { reactionCounts, userReactions } = useMemo(() => {
		const counts = new Map<string, number>()
		const userReacts = new Set<string>()

		entry.reactions.forEach(reaction => {
			counts.set(reaction.emoji, (counts.get(reaction.emoji) || 0) + 1)
			if (reaction.userId === me?.id) {
				userReacts.add(reaction.emoji)
			}
		})

		return { reactionCounts: counts, userReactions: userReacts }
	}, [entry.reactions, me?.id])

	const handleEdit = () => {
		onEdit(entry.id, editedMessage)
		setIsEditing(false)
	}

	const actionsOn = me && me.email === entry.author.email

	return (
		<motion.div
			initial={{ opacity: 1, scale: 1 }}
			exit={{
				opacity: 0,
				scale: 0,
				filter: 'blur(20px)',
				transition: { duration: 0.5 },
			}}
		>
			<Card className='mb-6 overflow-hidden shadow-sm'>
				<CardHeader className='flex flex-row items-start justify-between space-y-0 p-4'>
					<div className='flex items-center space-x-4'>
						<Avatar className='size-9 rounded-md overflow-hidden'>
							<AvatarImage src={entry.author.photo} alt={entry.author.name} />
							<AvatarFallback>{entry.author.name.charAt(0)}</AvatarFallback>
						</Avatar>

						<div>
							<p className='text-sm font-semibold flex items-center gap-1'>
								{entry.author.name} {entry.author.isVerified && <MdVerified />}
							</p>
							<p className='text-xs text-muted-foreground'>
								{formatDistanceToNow(new Date(entry.createdAt), {
									addSuffix: true,
								})}
							</p>
						</div>
					</div>

					{actionsOn && (
						<ActionDropdown
							setIsEditing={setIsEditing}
							setIsDeleteDialogOpen={setIsDeleteDialogOpen}
						/>
					)}
				</CardHeader>

				<CardContent className='p-4'>
					{isEditing ? (
						<div className='space-y-2'>
							<Input
								value={editedMessage}
								onChange={e => setEditedMessage(e.target.value)}
								className='w-full'
							/>

							<div className='flex justify-end space-x-2'>
								<Button size='sm' onClick={handleEdit}>
									Save
								</Button>
								<Button
									size='sm'
									variant='outline'
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</Button>
							</div>
						</div>
					) : (
						<p className='text-sm leading-relaxed'>{entry.body}</p>
					)}
				</CardContent>

				<Separator />

				<CardFooter className='p-4 flex justify-between items-start gap-1'>
					{reactionCounts.size > 0 ? (
						<div className='flex items-center gap-1 flex-wrap'>
							{Array.from(reactionCounts.entries()).map(([emoji, count]) => (
								<Button
									key={emoji}
									variant='outline'
									size='sm'
									className={cn(
										'flex items-center rounded-xl space-x-1',
										userReactions.has(emoji) &&
											'bg-secondary hover:bg-secondary',
										!me && 'cursor-default hover:bg-transparent'
									)}
									onClick={() => {
										if (!me) return
										onReactionUpdate(entry.id, emoji, !userReactions.has(emoji))
									}}
								>
									<span>{emoji}</span>
									<span>{count}</span>
								</Button>
							))}
						</div>
					) : (
						<p className='text-sm text-muted-foreground'>No reactions found.</p>
					)}

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								size='sm'
								className='rounded-xl'
								disabled={!me}
							>
								<Plus size={13} />
							</Button>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-1'>
							<div className='flex space-x-1'>
								{REACTION_OPTIONS.map(emoji => (
									<Button
										key={emoji}
										variant='ghost'
										size='sm'
										className='p-2'
										onClick={() =>
											onReactionUpdate(
												entry.id,
												emoji,
												!userReactions.has(emoji)
											)
										}
									>
										{emoji}
									</Button>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</CardFooter>

				<DeleteMessageDialog
					isDeleteDialogOpen={isDeleteDialogOpen}
					setIsDeleteDialogOpen={setIsDeleteDialogOpen}
					onDelete={onDelete}
					entryId={entry.id}
				/>
			</Card>
		</motion.div>
	)
}

interface ActionDropdownProps {
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
	setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
	setIsEditing,
	setIsDeleteDialogOpen,
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='h-8 w-8'>
					<MoreHorizontal className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setIsEditing(true)}>
					<Pencil className='mr-2 h-4 w-4' />
					Edit
				</DropdownMenuItem>

				<DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
					<Trash2 className='mr-2 h-4 w-4' />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

interface DeleteMessageDialogProps {
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
	onDelete: (messageId: number) => void
	entryId: number
}

const DeleteMessageDialog: React.FC<DeleteMessageDialogProps> = ({
	isDeleteDialogOpen,
	setIsDeleteDialogOpen,
	onDelete,
	entryId,
}) => {
	return (
		<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
			<DialogContent className='p-4'>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this message?
					</DialogTitle>
					<DialogDescription>This action cannot be undone.</DialogDescription>
				</DialogHeader>

				<DialogFooter className='gap-2'>
					<Button
						variant='outline'
						onClick={() => setIsDeleteDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button
						variant='destructive'
						onClick={() => {
							onDelete(entryId)
							setIsDeleteDialogOpen(false)
						}}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const MessageSkeleton = () => (
	<Card className='mb-6 overflow-hidden shadow-sm'>
		<CardHeader className='flex flex-row items-center space-y-0 p-4'>
			<Skeleton className='size-9 rounded-md' />

			<div className='space-y-2 ml-4'>
				<Skeleton className='h-4 w-[150px]' />
				<Skeleton className='h-3 w-[100px]' />
			</div>
		</CardHeader>

		<CardContent className='p-4'>
			<Skeleton className='h-4 w-full mb-2' />
			<Skeleton className='h-4 w-2/3' />
		</CardContent>

		<Separator />

		<CardFooter className='p-4'>
			<Skeleton className='h-[1.9rem] w-full rounded-xl' />
		</CardFooter>
	</Card>
)

const Messages: React.FC = () => {
	const {
		messages,
		totalMessages,
		isLoading,
		updateReaction,
		editMessageContent,
		removeMessage,
	} = useMessageCache()

	if (isLoading) {
		return (
			<div className='mt-6'>
				{Array.from({ length: 5 }).map((_, index) => (
					<MessageSkeleton key={index} />
				))}
			</div>
		)
	}

	return (
		<div className='mt-6 space-y-4'>
			<p className='text-md text-muted-foreground'>
				Total messages: {totalMessages.toLocaleString()}.
			</p>
			<AnimatePresence>
				{messages.map(entry => (
					<MessageEntry
						key={entry.id}
						entry={entry}
						onReactionUpdate={updateReaction}
						onEdit={editMessageContent}
						onDelete={removeMessage}
					/>
				))}
			</AnimatePresence>
		</div>
	)
}

export default Messages
