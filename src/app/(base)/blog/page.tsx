import { getBlogPosts } from 'lib/blog'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default function Blog() {
	const blogPosts = getBlogPosts()

	return (
		<div className='container space-y-4'>
			<h1 className='text-2xl font-bold'>Personal blog</h1>
			<ul className='space-y-5'>
				{blogPosts.map(({ slug, metadata: { title } }) => (
					<li key={slug}>
						<Link href={`/blog/${slug}`} className='text-md hover:underline'>
							{title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
