'use client'

import React from 'react'

import Link from 'next/link'
import BorderBeam from 'shared/ui/border-beam'
import { Button } from 'ui/button'
import { Card, CardContent, CardHeader } from 'ui/card'
import MessageForm from './ui/message-form'
import Messages from './ui/messages'

import { UserIcon } from 'lucide-react'

interface GuestbookFormProps {
	me?: User
}

const GuestbookForm: React.FC<GuestbookFormProps> = ({ me }) => {
	return (
		<Card className='w-full border-none shadow-none'>
			<CardHeader className='p-0'>
				<h1 className='text-2xl font-bold mb-4'>Sign my guestbook</h1>
			</CardHeader>

			<CardContent className='p-0'>
				{!me ? (
					<div className='flex flex-col gap-4'>
						<p className='text-sm text-muted-foreground'>
							Share your feedback, questions, collaborations, or just say hi. I
							am eager to hear from you. Sign in to leave your message!
						</p>

						<Link href='/sign-in?next=/guestbook' passHref>
							<Button variant='outline' className='relative px-6 py-2 text-md'>
								<UserIcon className='mr-2 size-4' />
								Sign in
								<BorderBeam size={65} duration={8} />
							</Button>
						</Link>
					</div>
				) : (
					<MessageForm />
				)}

				<Messages />
			</CardContent>
		</Card>
	)
}

export default GuestbookForm
