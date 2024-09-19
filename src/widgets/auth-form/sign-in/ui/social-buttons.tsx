'use client'

import { Button } from 'ui/button'

import { Github } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa'

const SocialButtons = () => {
	return (
		<div className='space-y-2 flex flex-col gap-2'>
			<Button
				className='w-full border-0 bg-neutral-800 hover:bg-neutral-700 text-white'
				size='lg'
				disabled
			>
				<Github className='size-5 mr-2' />
				Continue with GitHub
			</Button>

			<Button
				className='w-full border-0 bg-blue-700 hover:bg-blue-600 text-white'
				size='lg'
				disabled
			>
				<FaGoogle className='size-5 mr-2' />
				Continue with Google
			</Button>
		</div>
	)
}

export default SocialButtons
