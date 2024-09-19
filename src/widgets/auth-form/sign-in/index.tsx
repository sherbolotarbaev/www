'use client'

import { useState } from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'ui/card'
import { Separator } from 'ui/separator'
import EmailForm from './ui/email-form'
import OtpForm from './ui/otp-form'
import SocialButtons from './ui/social-buttons'

export const SignInForm = () => {
	const [step, setStep] = useState<'email' | 'otp'>('email')
	const [email, setEmail] = useState('')

	return (
		<Card className='w-full max-w-sm mx-auto border-none shadow-none'>
			<CardHeader className='px-0'>
				<CardTitle className='text-4xl font-bold text-center'>
					{step === 'email' ? 'Sign in to sherbolotarbaev.co' : 'Verification'}
				</CardTitle>
				{step === 'otp' && (
					<CardDescription className='text-center text-primary'>
						Enter the code sent to {email}.
					</CardDescription>
				)}
			</CardHeader>

			<CardContent>
				{step === 'email' ? (
					<>
						<SocialButtons />
						<Separator className='my-6' />
						<EmailForm setStep={setStep} setEmail={setEmail} />
					</>
				) : (
					<OtpForm email={email} />
				)}
				{/* <SignUpLink /> */}
			</CardContent>
		</Card>
	)
}
