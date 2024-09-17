'use client'

import * as React from 'react'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from 'shared/hooks/use-Intersection-observer'

import Link from 'next/link'
import { Badge } from 'ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'ui/card'
import { Separator } from 'ui/separator'

import { Link1Icon } from '@radix-ui/react-icons'

import {
	type Experience,
	experiences,
	formatExperiences,
} from './lib/experiences'

const MotionCard = motion(Card)

const contentVariants = {
	collapsed: { height: 0, opacity: 0 },
	expanded: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const cardVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 12,
		},
	},
}

const WorkExperience = () => {
	return (
		<div className='container rounded-lg shadow-sm'>
			<motion.h2
				className='text-2xl font-bold mb-3'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Experience 🧠
			</motion.h2>

			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{formatExperiences(experiences).map(({ ...props }, index) => (
					<ExperienceCard key={index} {...props} />
				))}
			</motion.div>
		</div>
	)
}

export default WorkExperience

const ExperienceCard: React.FC<Experience> = ({
	company,
	duration,
	location,
	url,
	positions,
}) => {
	const [cardRef, isCardVisible] = useIntersectionObserver<HTMLDivElement>()

	return (
		<MotionCard
			ref={cardRef}
			className='border-none shadow-none'
			variants={cardVariants}
			initial='hidden'
			animate={isCardVisible ? 'visible' : 'hidden'}
		>
			<CardHeader className='flex flex-row items-center gap-4 px-0'>
				<div className='w-full'>
					<CardTitle className='text-xl font-semibold'>{company}</CardTitle>
					<p className='text-sm text-muted-foreground'>
						{duration.totalDuration}
					</p>
					<p className='text-sm text-muted-foreground'>{location}</p>
				</div>
			</CardHeader>

			<motion.div variants={contentVariants}>
				<CardContent className='px-0 py-0'>
					{positions.map(({ title, period, description, skills }, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 * index }}
						>
							<h3 className='text-lg font-semibold'>{title}</h3>
							<p className='text-sm text-muted-foreground mb-2'>
								{period.startDate} - {period.endDate} · {period.duration}
							</p>
							<p
								className='text-sm mb-3'
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							></p>

							<div className='flex flex-wrap gap-2 mb-4'>
								{skills.map((skill, skillIndex) => (
									<Badge key={skillIndex} variant='secondary'>
										{skill}
									</Badge>
								))}
							</div>

							{index < positions.length - 1 && <Separator className='my-5' />}
						</motion.div>
					))}
				</CardContent>
			</motion.div>

			<CardFooter className='px-0'>
				<Link
					href={url}
					target='_blank'
					className='text-md text-blue-500 flex items-center gap-1'
				>
					<Link1Icon /> {url}
				</Link>
			</CardFooter>
		</MotionCard>
	)
}
