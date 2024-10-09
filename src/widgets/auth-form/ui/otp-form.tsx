'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInMutation } from 'api/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'ui/input-otp'

import { ArrowLeft, CircleAlert } from 'lucide-react'

import Link from 'next/link'
import { cn } from 'utils'
import { OtpFormSchema } from '../lib/schema'

interface OtpFormProps {
	email: string
	setStep: (step: 'email' | 'otp') => void
}

const OtpForm: React.FC<OtpFormProps> = ({ email, setStep }) => {
	const searchParams = useSearchParams()
	const next = searchParams.get('next') || '/'

	const [error, setError] = useState('')
	const [signIn, { isLoading, isSuccess }] = useSignInMutation()

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
			if (typeof window !== undefined) window.location.replace(next)
		} catch (error: any) {
			setError(error.data?.message)
		}
	}

	return (
		<Form {...form}>
			<form className='space-y-4'>
				<FormField
					control={form.control}
					name='otp'
					render={({ field }) => (
						<FormItem>
							<FormControl onChange={() => setError('')}>
								<InputOTP
									{...field}
									maxLength={6}
									pattern={REGEXP_ONLY_DIGITS}
									inputMode='numeric'
									onComplete={otp => onSubmit({ otp })}
									disabled={isLoading || isSuccess}
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
									<CircleAlert className='pt-0.6 size-4' /> {error}
								</FormMessage>
							) : (
								<FormMessage className='text-error text-center' />
							)}

							{isSuccess && (
								<FormMessage className='text-center text-green-400'>
									Successfully verified. Redirecting...
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<Link
					href={next === '/' ? '/sign-in' : `/sign-in?next=${next}`}
					onClick={() => setStep('email')}
					className='w-full flex items-center gap-1 justify-center text-sm text-blue-500'
				>
					<ArrowLeft className='size-5' />
					Back
				</Link>
			</form>
		</Form>
	)
}

export default OtpForm
