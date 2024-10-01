import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig } from '~/config/site'

import { getPostViews } from 'api/post/ssr'
import { formatDate, formatDistanceToNow } from 'date-fns'
import { getBlogPosts } from 'lib/blog'
import { getBase64 } from 'lib/blur-data-url'

import MDXContent from 'components/mdx-content'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Script from 'next/script'
import {
	BlogPostBreadcrumb,
	BlogPostContentNavigationSkeleton,
	BlogPostMeta,
} from 'shared/ui/blog-posts'
import ShareButton from 'shared/ui/share.button'

const BlogPostContentNavigation = dynamic(
	() =>
		import('shared/ui/blog-posts').then(mod => mod.BlogPostContentNavigation),
	{
		ssr: false,
		loading: () => <BlogPostContentNavigationSkeleton />,
	}
)

interface GenerateMetadataProps {
	params: { slug: string }
}

export async function generateMetadata({
	params: { slug },
}: Readonly<GenerateMetadataProps>): Promise<Metadata | undefined> {
	const post = getBlogPosts().find(post => post.slug === slug)

	if (!post) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata

	const ogImage = image
		? `${siteConfig.url}${image}`
		: `${siteConfig.url}/og?title=${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `${siteConfig.url}/blog/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
	}
}

interface BlogPostProps {
	params: {
		slug: string
	}
}

export default async function BlogPost({
	params: { slug },
}: Readonly<BlogPostProps>) {
	const post = getBlogPosts().find(post => post.slug === slug)

	if (!post) {
		return notFound()
	}

	const {
		metadata: { title, summary, author, publishedAt, image },
		content,
	} = post

	const imageBlurData = image ? await getBase64(image) : undefined
	const allViews = await getPostViews()

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

			<BlogPostBreadcrumb title={title} slug={slug} />

			<div className='w-full flex flex-col lg:flex-row lg:gap-6'>
				<article className='max-w-[34.5rem]'>
					<header className='mb-8 flex flex-col gap-4'>
						<h1 className='text-4xl font-bold'>{title}</h1>

						<div className='flex justify-between md:items-center'>
							<BlogPostMeta
								variant='detailed'
								formattedDate={formattedDate}
								distance={distance}
								readingTime={readingTime}
								allViews={allViews}
								slug={slug}
							/>

							<ShareButton />
						</div>

						{image && (
							<Image
								src={image}
								alt={title}
								width={700}
								height={350}
								loading='lazy'
								className='w-full rounded-xl border'
								placeholder='blur'
								blurDataURL={imageBlurData}
							/>
						)}

						<p>{summary}</p>
					</header>

					<div className='prose lg:prose-xl'>
						<MDXContent source={content} />
					</div>
				</article>

				<aside className='hidden lg:block'>
					<BlogPostContentNavigation />
				</aside>
			</div>
		</div>
	)
}
