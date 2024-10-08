'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Button } from 'ui/button'

import { toast } from 'hooks/use-toast'
import { oauthProviders } from '../lib/oauth-providers'

const OAuthButtons = () => {
	const router = useRouter()
	const next = useSearchParams().get('next')
	const error = useSearchParams().get('error')

	const handleOAuthRedirect = (path: string) =>
		router.push(
			`${process.env.NEXT_PUBLIC_API_URL}/oauth2/${path}${
				next ? `?next=${next}` : ''
			}`
		)

	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Authentication Failed',
				description:
					"We couldn't log you in. Please try again or use a different method.",
			})
		}
	}, [error])

	return (
		<div className='space-y-4'>
			{oauthProviders.map(({ name, icon }) => (
				<Button
					key={name}
					className='w-full'
					size='lg'
					variant='outline'
					onClick={() => handleOAuthRedirect(name.toLowerCase())}
				>
					{icon}
					Continue with {name}
				</Button>
			))}
		</div>
	)
}

export default OAuthButtons
