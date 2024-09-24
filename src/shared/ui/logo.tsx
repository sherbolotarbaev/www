'use client'

import React from 'react'

import { siteConfig } from '~/config/site'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from 'utils'

interface LogoProps {
	size?: string
	className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 9, className }) => {
	return (
		<Link href='/' passHref>
			<Image
				src='/images/logo.png'
				alt={siteConfig.title}
				width={1000}
				height={1000}
				className={cn(`size-${size} max-w-${size}`, className)}
				loading='lazy'
				placeholder='blur'
				blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAT0lEQVR4nAFEALv/AAAAAADJyckztra2RgAAAAIAxMTEP+Li4vb9/f3/xsbGgwDDw8OK6+vr/83Nze2YmJiDAFxcXBtqampdQEBAGwAAAACyHSHCm4RaSAAAAABJRU5ErkJggg=='
			/>
		</Link>
	)
}

export default Logo
