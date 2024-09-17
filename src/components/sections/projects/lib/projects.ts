type Project = {
	title: string
	description: string
	tags: string[]
	image: string
}

export const projects: Project[] = [
	{
		title: 'Personal API ✨',
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
		image:
			'https://images.ctfassets.net/23aumh6u8s0i/3tHY60ojECLh9u8kVcXOpb/88988dbac7f8b907deb2e209e58adacb/nestjs',
	},
]
