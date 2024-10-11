import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SignInForm } from 'widgets/auth-form'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default function SignIn() {
	return (
		<>
			<div className='px-5 min-h-screen flex-1 flex justify-center items-center'>
				<Suspense>
					<SignInForm />
				</Suspense>
			</div>
		</>
	)
}
