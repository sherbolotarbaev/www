import React from 'react'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

type OAuthProvider = {
	name: string
	icon: React.ReactElement
}

export const oauthProviders: OAuthProvider[] = [
	{
		name: 'Google',
		icon: <FcGoogle className='size-5 mr-2' />,
	},
	{
		name: 'GitHub',
		icon: <FaGithub className='size-5 mr-2' />,
	},
]
