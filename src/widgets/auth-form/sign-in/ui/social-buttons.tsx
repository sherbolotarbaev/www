import { Button } from 'ui/button'

import { Github, Mail } from 'lucide-react'

const SocialButtons = () => {
	return (
		<div className='space-y-2'>
			<Button variant='outline' className='w-full'>
				<Github className='mr-2 h-4 w-4' />
				Continue with GitHub
			</Button>

			<Button variant='outline' className='w-full'>
				<Mail className='mr-2 h-4 w-4' />
				Continue with Google
			</Button>
		</div>
	)
}

export default SocialButtons
