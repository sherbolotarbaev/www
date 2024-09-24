'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMessageCache } from 'hooks/use-messages-cache'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'
import { Skeleton } from 'ui/skeleton'

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
								<div className='relative'>
									<Input
										type='text'
										className={cn(
											form.formState.errors.message && 'border-error',
											isAddingMessage && 'text-transparent'
										)}
										placeholder='Your message...'
										disabled={isAddingMessage}
										{...field}
									/>
									{isAddingMessage && (
										<Skeleton className='absolute inset-0 bg-muted/50 rounded-lg' />
									)}
								</div>
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
