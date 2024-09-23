'use client'

import { useRouter } from 'next/navigation'

import { Button } from 'ui/button'

import { FaGithub, FaGoogle } from 'react-icons/fa'

const SocialButtons = () => {
	const router = useRouter()

	const handleOAuthRedirect = (path: string) =>
		router.push(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/${path}`)

	return (
		<div className='space-y-4'>
			<Button
				className='w-full border-0 bg-neutral-700 hover:bg-neutral-800 text-white'
				size='lg'
				onClick={() => handleOAuthRedirect('github')}
			>
				<FaGithub className='size-5 mr-2' />
				Continue with GitHub
			</Button>

			<Button
				className='w-full border-0 bg-blue-600 hover:bg-blue-700 text-white'
				size='lg'
				onClick={() => handleOAuthRedirect('google')}
			>
				<FaGoogle className='size-5 mr-2' />
				Continue with Google
			</Button>
		</div>
	)
}

export default SocialButtons
