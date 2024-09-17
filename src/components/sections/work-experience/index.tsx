'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { Badge } from 'ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from 'ui/card'
import { Separator } from 'ui/separator'

import { experiences, formatExperiences } from './lib/experiences'

const MotionCard = motion(Card)

const WorkExperience = () => {
	const [expandedCompany, setExpandedCompany] = useState<number | null>(null)

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

	return (
		<div className='container rounded-lg shadow-sm'>
			<motion.h2
				className='text-2xl font-bold mb-3'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				My experience 🧠
			</motion.h2>

			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{formatExperiences(experiences).map(
					({ company, duration, location, positions }, index) => (
						<MotionCard
							key={index}
							className='border-none shadow-none cursor-pointer'
							variants={cardVariants}
							onClick={() =>
								setExpandedCompany(expandedCompany === index ? null : index)
							}
						>
							<CardHeader className='flex flex-row items-center gap-4 px-0'>
								<div className='w-full'>
									<CardTitle className='text-xl font-semibold'>
										{company}
									</CardTitle>
									<p className='text-sm text-muted-foreground'>
										{duration.totalDuration}
									</p>
									<p className='text-sm text-muted-foreground'>{location}</p>
								</div>
							</CardHeader>

							<motion.div
								variants={contentVariants}
								initial='collapsed'
								animate={expandedCompany === index ? 'expanded' : 'collapsed'}
							>
								<CardContent className='px-0'>
									{positions.map(
										({ title, period, description, skills }, posIndex) => (
											<motion.div
												key={posIndex}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.2 * posIndex }}
											>
												<h3 className='text-lg font-semibold'>{title}</h3>
												<p className='text-sm text-muted-foreground mb-2'>
													{period.startDate} - {period.endDate} ·{' '}
													{period.duration}
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

												{posIndex < positions.length - 1 && (
													<Separator className='my-5' />
												)}
											</motion.div>
										)
									)}
								</CardContent>
							</motion.div>

							{index < experiences.length - 1 && <Separator className='my-2' />}
						</MotionCard>
					)
				)}
			</motion.div>
		</div>
	)
}

export default WorkExperience
