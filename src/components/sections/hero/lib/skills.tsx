import { FaAws, FaDocker, FaJs, FaNodeJs, FaReact } from 'react-icons/fa'
import {
	SiExpress,
	SiGit,
	SiMongodb,
	SiNestjs,
	SiNextdotjs,
	SiPostgresql,
	SiPrisma,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si'

type Skill = {
	name: string
	icon?: React.ReactElement
}

export const skills: Skill[] = [
	{
		name: 'JavaScript',
		icon: <FaJs />,
	},
	{
		name: 'TypeScript',
		icon: <SiTypescript />,
	},
	{
		name: 'Node.js',
		icon: <FaNodeJs />,
	},
	{
		name: 'Nest.js',
		icon: <SiNestjs />,
	},
	{
		name: 'Express',
		icon: <SiExpress />,
	},
	{
		name: 'PostgreSQL',
		icon: <SiPostgresql />,
	},
	{
		name: 'MongoDB',
		icon: <SiMongodb />,
	},
	{
		name: 'Prisma',
		icon: <SiPrisma />,
	},
	{
		name: 'AWS',
		icon: <FaAws />,
	},
	{
		name: 'Docker',
		icon: <FaDocker />,
	},
	{
		name: 'Git',
		icon: <SiGit />,
	},
	{
		name: 'React',
		icon: <FaReact />,
	},
	{
		name: 'Next.js',
		icon: <SiNextdotjs />,
	},
	{
		name: 'Tailwind',
		icon: <SiTailwindcss />,
	},
]
