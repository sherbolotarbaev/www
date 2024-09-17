'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'
import { Badge } from 'ui/badge'
import { Card, CardContent } from 'ui/card'

import { projects } from './lib/projects'

const Projects = () => {
	return (
		<div className='container mx-auto px-4'>
			<motion.h2
				className='text-2xl font-bold mb-8'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Projects 🦾
			</motion.h2>

			<div className='grid grid-cols-1 gap-8'>
				{projects.map(({ image, title, description, tags }, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<Card className='overflow-hidden h-full flex flex-col'>
							<div className='relative h-72 w-full'>
								<Image
									src={image}
									alt={title}
									layout='fill'
									objectFit='cover'
									className='transition-transform duration-300 ease-in-out transform hover:scale-110'
								/>
							</div>

							<CardContent className='flex-grow p-6'>
								<h3 className='text-xl font-semibold mb-2'>{title}</h3>
								<p className='text-sm text-muted-foreground mb-4'>
									{description}
								</p>

								<div className='flex flex-wrap gap-2'>
									{tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant='secondary'>
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default Projects
