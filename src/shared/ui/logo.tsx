'use client'

import { siteConfig } from '~/config/site'

import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href='/'>
			<Image
				src='/images/logo.png'
				alt={siteConfig.title}
				width={1000}
				height={1000}
				className='h-8 w-8 max-w-8'
				loading='lazy'
				placeholder='blur'
				blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAT0lEQVR4nAFEALv/AAAAAADJyckztra2RgAAAAIAxMTEP+Li4vb9/f3/xsbGgwDDw8OK6+vr/83Nze2YmJiDAFxcXBtqampdQEBAGwAAAACyHSHCm4RaSAAAAABJRU5ErkJggg=='
			/>
		</Link>
	)
}

export default Logo
