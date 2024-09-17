'use client'

import type { Metadata } from 'next'

import Link from 'next/link'
import { Button } from 'ui/button'

import { Player } from '@lottiefiles/react-lottie-player'

export const metadata: Metadata = {
	title: '404 - Page Not Found',
}

export default function NotFound() {
	return (
		<>
			<div className='flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-3'>
				<div className='max-w-md w-full space-y-8 text-center'>
					<Player
						autoplay
						loop
						src='https://lottie.host/34e51e6f-4ff4-4bc4-a952-f4516ca57b10/8Z6kQwKQJe.json'
						style={{ height: '200px', width: '200px' }}
					/>

					<h1 className='text-2xl font-bold tracking-tight'>
						Oh no! This page doesn't exist.
					</h1>
					<p className='text-xl text-muted-foreground mt-4'>
						If you expected to see something here, let me know
						(sherbolot@wedevx.co).
					</p>

					<div className='mt-8'>
						<Button asChild className='px-8 py-2'>
							<Link href='/'>Go back</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
