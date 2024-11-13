import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import Logo from 'shared/ui/logo'
import { SignUpForm } from 'widgets/auth-form'

export const metadata: Metadata = {
	title: 'Sign Up',
}

export default function SignUp() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-between px-4 py-8 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md flex-grow flex flex-col items-center justify-center'>
				<Logo className='mb-8' size={10} />

				<Suspense fallback={<div className='text-center'>Loading...</div>}>
					<SignUpForm />
				</Suspense>
			</div>

			<footer className='w-full max-w-md mt-8 text-center'>
				<Link
					href='/privacy-policy'
					className='text-sm text-muted-foreground hover:text-primary transition-colors'
				>
					Privacy Policy
				</Link>
			</footer>
		</div>
	)
}
