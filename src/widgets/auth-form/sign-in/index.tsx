'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from 'ui/card'
import { Separator } from 'ui/separator'
import EmailForm from '../ui/email-form'
import OAuthButtons from '../ui/oauth-buttons'
import OtpForm from '../ui/otp-form'

export const SignInForm = () => {
	const next = useSearchParams().get('next')

	const [step, setStep] = useState<'email' | 'otp'>('email')
	const [email, setEmail] = useState('')

	return (
		<Card className='w-full max-w-sm mx-auto border-none shadow-none'>
			<CardHeader className='px-0'>
				<CardTitle className='text-3xl font-bold text-center md:text-4xl'>
					{step === 'email' ? (
						<>
							Sign in to{' '}
							<span className='bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
								sherbolotarbaev.co
							</span>
						</>
					) : (
						'Verification'
					)}
				</CardTitle>
				{step === 'otp' && (
					<CardDescription className='text-center text-primary'>
						Enter the code sent to {email}.
					</CardDescription>
				)}
			</CardHeader>

			<CardContent className='px-0'>
				{step === 'email' ? (
					<>
						<OAuthButtons />
						<Separator className='my-6' />
						<EmailForm setStep={setStep} setEmail={setEmail} />
					</>
				) : (
					<OtpForm email={email} setStep={setStep} />
				)}
			</CardContent>

			{step === 'email' && (
				<CardFooter className='px-0 justify-center'>
					<p className='text-muted-foreground'>
						Don't have an account?{' '}
						<Link
							href={next && next !== '/' ? `/sign-up?next=${next}` : '/sign-up'}
							className='text-blue-500'
						>
							Sign Up
						</Link>
					</p>
				</CardFooter>
			)}
		</Card>
	)
}
