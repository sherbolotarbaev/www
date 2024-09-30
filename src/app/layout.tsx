import './globals.css'

import type { Metadata, Viewport } from 'next'
import { siteConfig } from '~/config/site'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import TopLoadingBar from 'nextjs-toploader'
import Providers from 'providers'
import { Toaster } from 'ui/toaster'

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
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
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

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	maximumScale: 1,
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
					<TopLoadingBar color='#418af4' showSpinner={false} height={3} />
					<Providers>{children}</Providers>
					<Toaster />
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		</>
	)
}
