'use client'

import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'ui/input-otp'

import { ArrowLeft } from 'lucide-react'

import { cn } from 'utils'
import { OtpFormSchema } from '../lib/schema'

interface OtpFormProps {
	email: string
}

const OtpForm: React.FC<OtpFormProps> = ({ email }) => {
	const form = useForm<z.infer<typeof OtpFormSchema>>({
		resolver: zodResolver(OtpFormSchema),
	})

	const onSubmit = (data: z.infer<typeof OtpFormSchema>) => {
		// Here you would typically verify the OTP
		alert(`OTP submitted: ${data.otp}`)
	}

	return (
		<Form {...form}>
			<form className='flex flex-col gap-8 space-y-4'>
				<FormField
					control={form.control}
					name='otp'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputOTP
									{...field}
									maxLength={6}
									pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
									onComplete={otp => onSubmit({ otp })}
									// disabled={isLoading}
									render={({ slots }) => (
										<InputOTPGroup className='shad-otp'>
											{slots.map((slot, index) => (
												<InputOTPSlot
													key={index}
													className={cn(
														form.formState.errors.otp && 'error',
														'shad-otp-slot'
													)}
													{...slot}
												/>
											))}
										</InputOTPGroup>
									)}
								/>
							</FormControl>
							<FormMessage className='text-error text-center' />
						</FormItem>
					)}
				/>

				<Button
					variant='link'
					onClick={() => {
						if (typeof window !== undefined) window.location.reload()
					}}
					className='w-full flex items-center gap-1 justify-center text-sm text-blue-500'
				>
					<ArrowLeft size={16} />
					Go back
				</Button>
			</form>
		</Form>
	)
}

export default OtpForm
