import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig } from '~/config/site'

import { getBlogPosts } from 'lib/blog'
import { getBase64 } from 'lib/blur-data-url'
import { getPostViews } from '~/lib/store/api/post/ssr'

import BlogPostClient from './page.uc'

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

	return (
		<BlogPostClient
			title={title}
			slug={slug}
			summary={summary}
			author={author}
			publishedAt={publishedAt}
			image={
				image
					? {
							url: image,
							blurData: imageBlurData,
					  }
					: undefined
			}
			content={content}
			allViews={allViews}
		/>
	)
}
