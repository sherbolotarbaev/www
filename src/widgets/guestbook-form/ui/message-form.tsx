'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMessageCache } from 'hooks/use-messages-cache'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'

import { cn } from 'utils'
import { MessageFormSchema } from '../lib/schema'

const MessageForm = () => {
	const { newMessage, isAddingMessage } = useMessageCache()

	const form = useForm<z.infer<typeof MessageFormSchema>>({
		resolver: zodResolver(MessageFormSchema),
	})

	const onSubmit = (data: z.infer<typeof MessageFormSchema>) => {
		if (!data.message.length) return
		newMessage(data.message)
		form.setValue('message', '')
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='text'
									className={cn(
										form.formState.errors.message && 'focus-visible:ring-error',
										'h-11 py-5 text-md rounded-lg'
									)}
									placeholder='Your message...'
									disabled={isAddingMessage}
									{...field}
								/>
							</FormControl>

							<FormMessage className='text-error' />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export default MessageForm
