import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default function Blog() {
	return (
		<div className='container'>
			<h1 className='text-2xl font-bold'>Personal blog</h1>
		</div>
	)
}
