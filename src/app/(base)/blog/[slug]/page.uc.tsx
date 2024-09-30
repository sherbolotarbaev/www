'use client'

import { Suspense } from 'react'
import { siteConfig } from '~/config/site'

import MDXContent from 'components/mdx-content'
import Image from 'next/image'
import Script from 'next/script'

import { formatDate, formatDistanceToNow } from 'date-fns'

import { CalendarIcon, ClockIcon } from 'lucide-react'

interface BlogPostClientProps {
	title: string
	slug: string
	summary: string
	author: string
	publishedAt: string
	image?: {
		url: string
		blurData: string | undefined
	}
	content: string
}

export default function BlogPostClient({
	title,
	slug,
	summary,
	author,
	publishedAt,
	image,
	content,
}: Readonly<BlogPostClientProps>) {
	const formattedDate = formatDate(new Date(publishedAt), 'MMM dd, yyyy')
	const distance = formatDistanceToNow(new Date(publishedAt), {
		addSuffix: true,
	})

	const readingTime = Math.ceil(content.split(' ').length / 200)

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		datePublished: publishedAt,
		dateModified: publishedAt,
		description: summary,
		image: image
			? `${siteConfig.url}${image}`
			: `${siteConfig.url}/og?title=${title}`,
		url: `${siteConfig.url}/blog/${slug}`,
		author: {
			'@type': 'Person',
			name: author,
		},
		timeRequired: `PT${readingTime}M`,
	}

	return (
		<div className='container'>
			<Script
				id='blog-post-schema'
				type='application/ld+json'
				strategy='beforeInteractive'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<article className='max-w-3xl'>
				<header className='mb-8 flex flex-col gap-4'>
					<h1 className='text-2xl font-bold'>{title}</h1>

					<div className='flex items-center gap-2 text-sm text-muted-foreground'>
						<span className='flex items-center'>
							<CalendarIcon className='size-4 mr-1' />
							{formattedDate} ({distance})
						</span>

						<span className='text-muted-foreground'>•</span>

						<span className='flex items-center'>
							<ClockIcon className='size-4 mr-1' />
							{readingTime} min read
						</span>
					</div>

					{image && (
						<Image
							src={image.url}
							alt={title}
							width={700}
							height={350}
							loading='lazy'
							className='w-full rounded-xl border'
							placeholder='blur'
							blurDataURL={image.blurData}
						/>
					)}

					<p>{summary}</p>
				</header>

				<div className='prose lg:prose-xl'>
					<Suspense fallback={<div>Loading...</div>}>
						<MDXContent source={content} />
					</Suspense>
				</div>
			</article>
		</div>
	)
}
