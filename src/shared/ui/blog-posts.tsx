'use client'

import React from 'react'

import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from 'ui/card'
import { Separator } from 'ui/separator'

import { formatDate } from 'date-fns'
import { useGetPostViewsCount } from 'hooks/use-post-views-count'
import type { Post } from 'lib/blog'

import { cn } from 'utils'

import { CalendarIcon, ClockIcon, EyeIcon } from 'lucide-react'

interface BlogPostsProps {
	blogPosts: Post[]
	allViews: PostView[]
}

const BlogPosts: React.FC<BlogPostsProps> = ({ blogPosts, allViews }) => (
	<ul className='space-y-6'>
		{blogPosts.map(
			({ slug, metadata: { title, summary, publishedAt }, content }) => {
				const formattedDate = formatDate(new Date(publishedAt), 'MMM dd, yyyy')
				const readingTime = Math.ceil(content.split(' ').length / 200)
				const { views } = useGetPostViewsCount(allViews, slug)

				return (
					<li key={slug}>
						<Link href={`/blog/${slug}`} passHref>
							<Card className='shadow-none transition-shadow hover:shadow-md hover:border-blue-500'>
								<CardHeader className='p-4 gap-1'>
									<CardTitle className='text-xl'>{title}</CardTitle>

									<CardDescription>{summary}</CardDescription>

									<Separator />

									<CardDescription>
										<BlogPostMeta
											variant='compact'
											formattedDate={formattedDate}
											readingTime={readingTime}
											views={views}
										/>
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					</li>
				)
			}
		)}
	</ul>
)

export default BlogPosts

interface BlogPostMetaProps {
	variant: 'compact' | 'detailed'
	formattedDate: string
	distance?: string
	readingTime: number
	views: string
}

export const BlogPostMeta: React.FC<BlogPostMetaProps> = React.memo(
	({ variant, formattedDate, distance, readingTime, views }) => {
		const metaItems = [
			{
				icon: CalendarIcon,
				text: distance ? `${formattedDate} (${distance})` : formattedDate,
			},
			{
				icon: ClockIcon,
				text: `${readingTime} min read`,
			},
			{
				icon: EyeIcon,
				text: `${views} views`,
			},
		]

		if (variant === 'compact') {
			return (
				<span className='text-sm text-muted-foreground'>
					{metaItems.map(item => item.text).join(' • ')}
				</span>
			)
		}

		return (
			<div className='flex flex-col gap-2 md:flex-row text-sm text-muted-foreground'>
				<div className='flex items-center gap-1 mb-2 md:mb-0'>
					<CalendarIcon className='h-4 w-4' />
					<span>{metaItems[0].text}</span>
				</div>

				<div className='flex items-center gap-2'>
					{metaItems.slice(1).map((item, index) => (
						<React.Fragment key={index}>
							<span
								className={cn(index === 0 && 'hidden md:inline')}
								aria-hidden='true'
							>
								•
							</span>
							<span className='flex items-center gap-1'>
								<item.icon className='h-4 w-4' />
								{item.text}
							</span>
						</React.Fragment>
					))}
				</div>
			</div>
		)
	}
)
