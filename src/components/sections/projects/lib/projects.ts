export type Project = {
	title: string
	description: string
	tags: string[]
	image: string
	url: string
}

export const projects: Project[] = [
	{
		title: 'ChinaTradeX',
		description:
			'Your gateway to seamless trade between China and the world. Track orders, manage shipments, and optimize your international business with real-time updates and comprehensive logistics solutions.',
		tags: [
			'Next.js',
			'Nest.js',
			'Fastify',
			'TypeScript',
			'Prisma',
			'PostgreSQL',
			'Redis',
		],
		image: '/images/chinatradex.png',
		url: 'https://www.chinatradex.co',
	},
	{
		title: 'Personal API',
		description:
			'A robust and scalable Personal API leveraging NestJS and TypeScript, built to manage user authentication, sessions, and data storage with Prisma and PostgreSQL. Integrated OAuth2 with Passport.js for secure authentication, and Supabase for additional features like real-time updates and storage.',
		tags: [
			'Nest.js',
			'TypeScript',
			'Prisma',
			'PostgreSQL',
			'OAuth2',
			'Passport.js',
			'Express session',
		],
		image: '/images/nestjs.png',
		url: 'https://github.com/sherbolotarbaev/api',
	},
]
