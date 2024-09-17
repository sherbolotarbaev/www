type Position = {
	title: string
	period: {
		startDate: Date
		endDate: Date | 'Present'
	}
	description: string
	skills: string[]
}

type Experience = {
	company: string
	duration: {
		startDate: Date
		endDate: Date | 'Present'
	}
	location: string
	positions: Position[]
}

export const experiences: Experience[] = [
	{
		company: 'WEDEVX',
		duration: { startDate: new Date('2023-06-01'), endDate: 'Present' },
		location: 'Chicago, Illinois, United States • Remote',
		positions: [
			{
				title: 'Middle Software Development Engineer',
				period: { startDate: new Date('2024-02-01'), endDate: 'Present' },
				description: `Led development of NestJS microservices, increasing system performance by 99% through batching and Prisma optimizations. Improved query efficiency by refining system architecture, reducing database processing time from 7 minutes to 7 seconds.`,
				skills: [
					'Systems Design',
					'Code Review',
					'Nest.js',
					'Microservices',
					'Leadership',
					'Docker',
					'Kubernetes',
					'Amazon Web Services (AWS)',
					'Prisma ORM',
				],
			},
			{
				title: 'Software Development Engineer',
				period: {
					startDate: new Date('2023-06-01'),
					endDate: new Date('2024-02-01'),
				},
				description: `At WEDEVX, I played a key role in architecting and optimizing backend systems for a tech-focused educational platform, designed to empower individuals with the skills to secure high-paying tech jobs. 

				<br/><br/>
				
				Engineered backend systems with NestJS, Fastify, and PostgreSQL, achieving a 38% performance boost. Integrated AWS services, enhancing security and scalability. Implemented quizzes generating 800+ leads, driving user engagement.`,
				skills: [
					'Problem Solving',
					'PostgreSQL',
					'Supabase',
					'Typescript',
					'API Design',
					'Fastify',
					'Nest.js',
					'Docker',
					'Amazon S3',
					'Code Review',
				],
			},
		],
	},
	{
		company: 'Mancho',
		duration: {
			startDate: new Date('2021-05-01'),
			endDate: new Date('2023-05-01'),
		},
		location: 'Bishkek, Kyrgyzstan',
		positions: [
			{
				title: 'NodeJS Backend Developer',
				period: {
					startDate: new Date('2022-09-01'),
					endDate: new Date('2023-05-01'),
				},
				description: `Developed scalable Node.js backend services and RESTful APIs, optimizing performance and ensuring reliable database integration.`,
				skills: [
					'Node.js',
					'Express.js',
					'MongoDB',
					'Amazon Dynamodb',
					'Elasticsearch',
					'Amazon Web Services (AWS)',
					'Docker',
					'Amazon S3',
				],
			},
			{
				title: 'Frontend Developer',
				period: {
					startDate: new Date('2021-08-01'),
					endDate: new Date('2022-09-01'),
				},
				description: `Optimized cross-platform websites with React, Next.js, and TypeScript, improving performance by 40%. Applied caching strategies to reduce page load times.`,
				skills: ['React', 'Next.js', 'Redux', 'TypeScript'],
			},
			{
				title: 'Intern Frontend Developer',
				period: {
					startDate: new Date('2021-05-01'),
					endDate: new Date('2021-08-01'),
				},
				description: `Assisted in frontend development with React and JavaScript, gaining hands-on experience with modern practices.`,
				skills: ['TypeScript', 'React'],
			},
		],
	},
]

const calculateDuration = (startDate: Date, endDate: Date) => {
	let years = endDate.getFullYear() - startDate.getFullYear()
	let months = endDate.getMonth() - startDate.getMonth()

	if (months < 0) {
		years--
		months += 12
	}

	return { years, months }
}

const formatDuration = ({
	years,
	months,
}: {
	years: number
	months: number
}) => {
	const yearsStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : ''
	const monthsStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : ''
	return `${yearsStr} ${monthsStr}`.trim()
}

const formatDate = (date: Date | 'Present') => {
	if (date === 'Present') return 'Present'
	return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}

export const formatExperiences = (experiences: Experience[]) => {
	return experiences.map(experience => {
		const updatedPositions = experience.positions.map(position => {
			const startDate = position.period.startDate
			const endDate =
				position.period.endDate === 'Present'
					? new Date()
					: position.period.endDate
			const duration = calculateDuration(startDate, endDate as Date)

			return {
				...position,
				period: {
					startDate: formatDate(startDate),
					endDate: formatDate(endDate),
					duration: formatDuration(duration),
				},
			}
		})

		const startDate = experience.duration.startDate
		const endDate =
			experience.duration.endDate === 'Present'
				? new Date()
				: experience.duration.endDate
		const totalDuration = calculateDuration(startDate, endDate as Date)

		return {
			...experience,
			duration: {
				startDate: formatDate(startDate),
				endDate: formatDate(endDate),
				totalDuration: formatDuration(totalDuration),
			},
			positions: updatedPositions,
		}
	})
}
