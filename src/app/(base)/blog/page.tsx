import type { Metadata } from 'next'

import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from 'ui/card'
import { Separator } from 'ui/separator'

import { formatDate } from 'date-fns'
import { getBlogPosts } from 'lib/blog'

export const metadata: Metadata = {
	title: 'Sign in',
}

export default function Blog() {
	const blogPosts = getBlogPosts()

	return (
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

			<ul className='space-y-6'>
				{blogPosts.map(
					({ slug, metadata: { title, summary, publishedAt }, content }) => {
						const formattedDate = formatDate(
							new Date(publishedAt),
							'MMM dd, yyyy'
						)

						const readingTime = Math.ceil(content.split(' ').length / 200)

						return (
							<li key={slug}>
								<Link href={`/blog/${slug}`} passHref>
									<Card className='shadow-none transition-shadow hover:shadow-md hover:border-blue-500'>
										<CardHeader className='p-4 gap-1'>
											<CardTitle className='text-xl'>{title}</CardTitle>

											<CardDescription>{summary}</CardDescription>

											<Separator />

											<CardDescription className='flex items-center gap-2 text-sm text-muted-foreground'>
												<span className='flex items-center'>
													{formattedDate}
												</span>

												<span className='text-muted-foreground'>•</span>

												<span className='flex items-center'>
													{readingTime} min read
												</span>
											</CardDescription>
										</CardHeader>
									</Card>
								</Link>
							</li>
						)
					}
				)}
			</ul>
		</div>
	)
}
