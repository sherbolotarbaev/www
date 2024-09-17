import { Github, Linkedin, Mail } from 'lucide-react'

type SocialMedia = {
	icon: React.ReactElement
	href: string
}

export const socialMedia: SocialMedia[] = [
	{
		icon: <Mail className='h-4 w-4' />,
		href: 'mailto:sherbolot@wedevx.co',
	},
	{
		icon: <Github className='h-4 w-4' />,
		href: 'https://github.com/sherbolotarbaev',
	},
	{
		icon: <Linkedin className='h-4 w-4' />,
		href: 'https://www.linkedin.com/in/sherbolotarbaev',
	},
]
