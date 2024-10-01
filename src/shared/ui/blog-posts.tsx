'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from 'ui/breadcrumb'
import { Card, CardDescription, CardHeader, CardTitle } from 'ui/card'
import { Separator } from 'ui/separator'

import { formatDate } from 'date-fns'
import {
	useAddPostViewsCount,
	useGetPostViewsCount,
} from 'hooks/use-post-views-count'
import type { Post } from 'lib/blog'

import { cn } from 'utils'

import {
	type LucideProps,
	CalendarIcon,
	ClockIcon,
	EyeIcon,
} from 'lucide-react'

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
											allViews={allViews}
											slug={slug}
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
	allViews: PostView[]
	slug: string
}

type MetaItem = {
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>
	text: string
}

export const BlogPostMeta: React.FC<BlogPostMetaProps> = React.memo(
	({ variant, formattedDate, distance, readingTime, allViews, slug }) => {
		const { views } =
			variant === 'compact'
				? useGetPostViewsCount(allViews, slug)
				: useAddPostViewsCount(allViews, slug)

		const metaItems: MetaItem[] = [
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
				<div className='flex items-center gap-2'>
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

interface BlogPostBreadcrumbProps {
	title: string
	slug: string
}

type BreadcrumbItem = {
	name: string
	href: string
}

export const BlogPostBreadcrumb: React.FC<BlogPostBreadcrumbProps> = ({
	title,
	slug,
}) => {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: title, href: `/blog/${slug}` },
	]

	return (
		<Breadcrumb className='mb-8'>
			<BreadcrumbList>
				{breadcrumbItems.map((item, index) => (
					<React.Fragment key={item.href}>
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href={item.href}>{item.name}</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

type Heading = {
	id: string
	text: string
	level: number
	top: number
}

export const BlogPostContentNavigation = () => {
	const [headings, setHeadings] = useState<Heading[]>([])
	const [activeId, setActiveId] = useState<string>('')

	const getHeadings = useCallback(() => {
		return Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(
			element => ({
				id: element.id,
				text: element.textContent || '',
				level: parseInt(element.tagName[1]),
				top: element.getBoundingClientRect().top + window.scrollY,
			})
		)
	}, [])

	useEffect(() => {
		const updateHeadings = () => {
			setHeadings(getHeadings())
		}

		updateHeadings()
		window.addEventListener('resize', updateHeadings)
		return () => window.removeEventListener('resize', updateHeadings)
	}, [getHeadings])

	useEffect(() => {
		let rafId: number

		const handleScroll = () => {
			cancelAnimationFrame(rafId)
			rafId = requestAnimationFrame(() => {
				const scrollPosition = window.scrollY + 100 // Offset for better UX
				const currentHeading = headings.reduce(
					(prev, current) =>
						scrollPosition >= current.top && current.top > prev.top
							? current
							: prev,
					headings[0]
				)

				if (currentHeading && currentHeading.id !== activeId) {
					setActiveId(currentHeading.id)
				}
			})
		}

		handleScroll() // Call once to set initial active heading
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', handleScroll)
			cancelAnimationFrame(rafId)
		}
	}, [headings, activeId])

	const memoizedHeadings = useMemo(() => headings, [headings])

	if (memoizedHeadings.length === 0) {
		return null
	}

	return (
		<nav className='sticky top-20 min-w-72 max-h-[calc(100vh-6rem)] overflow-auto p-4 bg-background border rounded-lg shadow-sm'>
			<h4 className='text-sm font-semibold mb-2'>Table of Contents</h4>
			<ul className='space-y-2'>
				{memoizedHeadings.map(heading => (
					<HeadingLink
						key={heading.id}
						heading={heading}
						isActive={activeId === heading.id}
					/>
				))}
			</ul>
		</nav>
	)
}

const HeadingLink = React.memo(
	({ heading, isActive }: { heading: Heading; isActive: boolean }) => (
		<li style={{ marginLeft: `${(heading.level - 1) * 0.5}rem` }}>
			<Link
				href={`#${heading.id}`}
				className={cn(
					'text-sm transition-colors duration-200',
					isActive
						? 'text-primary font-medium'
						: 'text-muted-foreground hover:text-foreground'
				)}
			>
				{heading.text}
			</Link>
		</li>
	)
)
