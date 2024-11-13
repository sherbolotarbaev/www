'use client'

import { useSearchParams } from 'next/navigation'

import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from 'ui/card'
import OAuthButtons from '../ui/oauth-buttons'

export const SignUpForm = () => {
	const next = useSearchParams().get('next')

	return (
		<Card className='w-full max-w-sm mx-auto border-none shadow-none'>
			<CardHeader className='px-0'>
				<CardTitle className='text-3xl font-bold text-center md:text-4xl'>
					Create an{' '}
					<span className='bg-gradient-to-r from-blue-950 to-blue-500 bg-clip-text text-transparent'>
						account
					</span>
				</CardTitle>

				<CardDescription className='text-center'>
					You can create an account using a Google or GitHub.
				</CardDescription>
			</CardHeader>

			<CardContent className='px-0'>
				<OAuthButtons />
			</CardContent>

			<CardFooter className='px-0 justify-center'>
				<p className='text-muted-foreground'>
					Already have an account?{' '}
					<Link
						href={next && next !== '/' ? `/sign-in?next=${next}` : '/sign-in'}
						className='text-blue-500'
					>
						Sign In
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
