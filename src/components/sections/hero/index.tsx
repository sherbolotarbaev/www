'use client'

import { motion } from 'framer-motion'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/avatar'
import { Badge } from 'ui/badge'
import { Button } from 'ui/button'
import { Card, CardContent } from 'ui/card'

import { skills } from './lib/skills'
import { socialMedia } from './lib/social-media'

const Hero = () => {
	return (
		<Card className='container border-none shadow-none'>
			<CardContent className='px-0'>
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<Avatar className='h-20 w-20 ring-4 ring-background'>
						<AvatarImage
							src='https://ca.slack-edge.com/T01Q61HBB09-U05AFFV5LUX-83ddcc053149-512'
							alt='Sher Arbaev'
							loading='lazy'
						/>
						<AvatarFallback>SA</AvatarFallback>
					</Avatar>
				</motion.div>

				<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 mt-4'>
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.2 }}
					>
						<h1 className='text-2xl font-bold'>Sher Arbaev</h1>
						<p className='text-muted-foreground'>
							Software Engineer | Full Stack Developer
						</p>
					</motion.div>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.2 }}
						className='flex space-x-2 mt-3 md:mt-0'
					>
						{socialMedia.map(({ icon, href }, index) => (
							<Button
								key={index}
								variant='outline'
								size='icon'
								onClick={() => {
									if (typeof window !== undefined) window.open(href, '_blank')
								}}
							>
								{icon}
							</Button>
						))}
					</motion.div>
				</div>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.2 }}
				>
					<p className='text-sm mb-4'>
						I'm a software engineer from Kyrgyzstan 🇰🇬. I'm fascinated by
						large-scale, high-impact products and contributed to major feature
						launches in industry-leading services.
					</p>
				</motion.div>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.3 }}
					className='flex flex-wrap gap-2 mb-4'
				>
					{skills.map(({ name, icon }, index) => (
						<Badge
							key={index}
							variant='secondary'
							className='flex items-center gap-1'
						>
							{icon}
							{name}
						</Badge>
					))}
				</motion.div>
			</CardContent>
		</Card>
	)
}

export default Hero
