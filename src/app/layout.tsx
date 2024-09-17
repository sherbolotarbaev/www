import './globals.css'

import type { Metadata } from 'next'
import { siteConfig } from '~/config/site'

import Providers from 'providers'
import { cn } from 'utils'

import localFont from 'next/font/local'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.title,
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<>
			<html lang='en'>
				<body
					className={cn(
						'min-h-screen bg-dark-300 font-sans antialiased',
						geistSans.variable,
						geistMono.variable
					)}
				>
					<Providers>{children}</Providers>
				</body>
			</html>
		</>
	)
}
