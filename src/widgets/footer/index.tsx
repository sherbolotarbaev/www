'use client'

import SocialMediaLinks from './ui/social-media-links'

import { useCurrentYear } from './lib/use-current-year'

const Footer = () => {
	const currentYear = useCurrentYear()

	return (
		<footer className='w-full'>
			<div className='w-full container flex h-24 flex-col gap-3'>
				<SocialMediaLinks />
				<p className='text-sm font-medium'>© {currentYear} Sherbolot Arbaev</p>
			</div>
		</footer>
	)
}

export default Footer
