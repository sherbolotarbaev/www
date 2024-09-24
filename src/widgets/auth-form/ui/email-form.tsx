'use client'

import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSendOtpMutation } from 'api/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import SubmitButton from 'shared/ui/submit.button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'

import { CircleAlert, Mail } from 'lucide-react'

import { cn } from 'utils'
import { EmailFormSchema } from '../lib/schema'

interface EmailFormProps {
	setStep: (step: 'email' | 'otp') => void
	setEmail: (email: string) => void
}

const EmailForm: React.FC<EmailFormProps> = ({ setStep, setEmail }) => {
	const [error, setError] = useState('')
	const [sendOtp, { isLoading, isSuccess }] = useSendOtpMutation()

	const form = useForm<z.infer<typeof EmailFormSchema>>({
		resolver: zodResolver(EmailFormSchema),
	})

	const onSubmit = async (data: z.infer<typeof EmailFormSchema>) => {
		setError('')

		try {
			const response = await sendOtp(data).unwrap()
			setEmail(response.email)
			setStep('otp')
		} catch (error: any) {
			setError(error.data?.message || 'Something went wrong. Try again later.')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl onChange={() => setError('')}>
								<Input
									type='email'
									className={cn(form.formState.errors.email && 'border-error')}
									placeholder='Email Address'
									disabled={isLoading || isSuccess}
									autoComplete='email'
									{...field}
								/>
							</FormControl>

							{error ? (
								<FormMessage className='text-error text-center flex items-center gap-1'>
									<CircleAlert className='size-4' /> {error}
								</FormMessage>
							) : (
								<FormMessage className='text-error' />
							)}
						</FormItem>
					)}
				/>

				<SubmitButton
					isLoading={isLoading}
					disabled={isSuccess}
					loadingText='Continue with Email'
					size='lg'
				>
					<Mail className='size-4 mr-2' /> Continue with Email
				</SubmitButton>
			</form>
		</Form>
	)
}

export default EmailForm
