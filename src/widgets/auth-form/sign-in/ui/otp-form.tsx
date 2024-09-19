'use client'

import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInMutation } from 'api/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'ui/input-otp'

import { ArrowLeft, CircleAlert } from 'lucide-react'

import { cn } from 'utils'
import { OtpFormSchema } from '../lib/schema'

interface OtpFormProps {
	email: string
}

const OtpForm: React.FC<OtpFormProps> = ({ email }) => {
	const [error, setError] = useState('')
	const [signIn, { isLoading }] = useSignInMutation()

	const form = useForm<z.infer<typeof OtpFormSchema>>({
		resolver: zodResolver(OtpFormSchema),
	})

	const onSubmit = async ({ otp }: z.infer<typeof OtpFormSchema>) => {
		setError('')

		try {
			await signIn({
				email,
				otp,
			}).unwrap()
			if (typeof window !== undefined) window.location.reload()
		} catch (error: any) {
			setError(error.data?.message)
		}
	}

	return (
		<Form {...form}>
			<form className='flex flex-col gap-8 space-y-4'>
				<FormField
					control={form.control}
					name='otp'
					render={({ field }) => (
						<FormItem>
							<FormControl onChange={() => setError('')}>
								<InputOTP
									{...field}
									maxLength={6}
									pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
									onComplete={otp => onSubmit({ otp })}
									disabled={isLoading}
									render={({ slots }) => (
										<InputOTPGroup className='shad-otp'>
											{slots.map((slot, index) => (
												<InputOTPSlot
													key={index}
													className={cn(
														(form.formState.errors.otp || error) && 'error',
														'shad-otp-slot'
													)}
													{...slot}
												/>
											))}
										</InputOTPGroup>
									)}
								/>
							</FormControl>

							{error ? (
								<FormMessage className='text-error flex justify-center gap-1'>
									<CircleAlert className='pt-0.5 size-4' /> {error}
								</FormMessage>
							) : (
								<FormMessage className='text-error text-center' />
							)}
						</FormItem>
					)}
				/>

				<Button
					variant='link'
					onClick={() => {
						if (typeof window !== undefined) window.location.reload()
					}}
					className='w-full flex items-center gap-1 justify-center text-sm text-blue-500 hover:no-underline'
				>
					<ArrowLeft className='size-5' />
					Back
				</Button>
			</form>
		</Form>
	)
}

export default OtpForm
