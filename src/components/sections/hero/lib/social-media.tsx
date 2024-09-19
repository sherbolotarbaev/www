import { Github, Linkedin, Mail } from 'lucide-react'

type SocialMedia = {
	icon: React.ReactElement
	href: string
}

export const socialMedia: SocialMedia[] = [
	{
		icon: <Mail className='size-4' />,
		href: 'mailto:sherbolot@wedevx.co',
	},
	{
		icon: <Github className='size-4' />,
		href: 'https://github.com/sherbolotarbaev',
	},
	{
		icon: <Linkedin className='size-4' />,
		href: 'https://www.linkedin.com/in/sherbolotarbaev',
	},
]
