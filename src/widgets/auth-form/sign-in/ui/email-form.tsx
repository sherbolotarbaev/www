'use client'

import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'

import { Mail } from 'lucide-react'

import { cn } from 'utils'
import { EmailFormSchema } from '../lib/schema'

interface EmailFormProps {
	onSubmit: (data: z.infer<typeof EmailFormSchema>) => void
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
	const form = useForm<z.infer<typeof EmailFormSchema>>({
		resolver: zodResolver(EmailFormSchema),
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type='email'
									className={cn(
										form.formState.errors.email && 'focus-visible:ring-error'
									)}
									placeholder='Email Address'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>
								We'll send you a one-time password to this email.
							</FormDescription> */}
							<FormMessage className='text-error' />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					<Mail className='mr-2 h-4 w-4' /> Continue with Email
				</Button>
			</form>
		</Form>
	)
}

export default EmailForm
