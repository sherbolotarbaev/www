'use client'

import Link from 'next/link'

import { ArrowTopRightIcon } from '@radix-ui/react-icons'

import { socialMedia } from '../lib/social-media'

const SocialMediaLinks = () => {
	return (
		<div className='flex items-center gap-4'>
			{socialMedia.map(({ name, href }, index) => (
				<Link
					key={index}
					href={href}
					className='flex items-center gap-1 text-muted-foreground hover:text-primary'
				>
					<ArrowTopRightIcon />
					{name}
				</Link>
			))}
		</div>
	)
}

export default SocialMediaLinks
