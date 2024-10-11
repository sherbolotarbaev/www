import type { Metadata } from 'next'

import BlogPosts from 'shared/ui/blog-posts'

import { getPostViews } from 'api/post/ssr'
import { getBlogPosts } from 'lib/blog'

export const metadata: Metadata = {
	title: 'Blog',
}

export default async function Blog() {
	const blogPosts = getBlogPosts()
	const allViews = await getPostViews()

	return (
		<>
			<div className='container'>
				<header className='mb-12 text-center'>
					<h1 className='text-5xl font-extrabold tracking-tight lg:text-6xl'>
						<span className='inline-block animate-text-gradient bg-gradient-to-r from-primary via-blue-500 to-secondary bg-[200%_auto] bg-clip-text text-transparent'>
							Personal Blog
						</span>
					</h1>
					<p className='mt-4 text-xl text-muted-foreground'>
						Thoughts, ideas, and experiences
					</p>
				</header>

				<BlogPosts blogPosts={blogPosts} allViews={allViews} />
			</div>
		</>
	)
}
