import type { Metadata } from 'next'

import { SignUpForm } from 'widgets/auth-form'

export const metadata: Metadata = {
	title: 'Sign Up',
}

export default function SignUp() {
	return (
		<div className='px-5 min-h-screen flex items-center justify-center'>
			<SignUpForm />
		</div>
	)
}
