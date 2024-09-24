import type { Metadata } from 'next'

import { SignInForm } from 'widgets/auth-form'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default function SignIn() {
	return (
		<div className='px-5 min-h-screen flex items-center justify-center'>
			<SignInForm />
		</div>
	)
}
