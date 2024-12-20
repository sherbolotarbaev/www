'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from 'hooks/use-Intersection-observer'

import Image from 'next/image'
import Link from 'next/link'
import BorderBeam from 'shared/ui/border-beam'
import { Badge } from 'ui/badge'
import { Card, CardContent, CardFooter } from 'ui/card'

import { Link2Icon } from '@radix-ui/react-icons'

import { type Project, projects } from './lib/projects'

const Projects = () => {
	return (
		<div>
			<motion.h2
				className='text-2xl font-bold mb-8'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Projects 🦾
			</motion.h2>

			<div className='grid grid-cols-1 gap-8'>
				{projects.map(({ ...props }, index) => (
					<ProjectCard key={index} {...props} />
				))}
			</div>
		</div>
	)
}

export default Projects

const ProjectCard: React.FC<Project> = ({
	image,
	title,
	description,
	tags,
	url,
}) => {
	const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>()

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isVisible ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5 }}
		>
			<Card className='overflow-hidden shadow-none h-full flex flex-col relative'>
				<div className='relative h-56 w-full'>
					<Image
						src={image}
						alt={title}
						layout='fill'
						objectFit='cover'
						className='z-20 transition-transform duration-300 ease-in-out transform hover:scale-110'
						loading='lazy'
					/>
				</div>

				<CardContent className='z-20 flex-grow p-6'>
					<h3 className='text-xl font-semibold mb-2'>{title}</h3>
					<p className='text-sm text-muted-foreground mb-4'>{description}</p>

					<div className='flex flex-wrap gap-2'>
						{tags.map((tag, tagIndex) => (
							<Badge key={tagIndex} variant='secondary'>
								{tag}
							</Badge>
						))}
					</div>
				</CardContent>

				<CardFooter className='z-20'>
					<Link
						href={url}
						target='_blank'
						className='text-md text-blue-500 flex items-center gap-1'
					>
						<Link2Icon /> {url}
					</Link>
				</CardFooter>

				<BorderBeam size={250} duration={8} delay={9} />
			</Card>
		</motion.div>
	)
}
