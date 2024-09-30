import MDXContent from 'components/mdx-content'
import { getBlogPosts } from 'lib/blog'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'

interface BlogPostProps {
	params: {
		slug: string
	}
}

export default function BlogPost({
	params: { slug },
}: Readonly<BlogPostProps>) {
	const post = getBlogPosts().find(post => post.slug === slug)

	if (!post) {
		return notFound()
	}

	const {
		metadata: { title, publishedAt, author, image },
		content,
	} = post

	return (
		<div className='container mx-auto px-4 py-8'>
			<article className='max-w-3xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-2xl font-bold mb-4'>{title}</h1>

					<div className='flex items-center space-x-4 text-sm text-muted-foreground mb-4'>
						<span className='flex items-center'>
							<UserIcon className='w-4 h-4 mr-1' />
							{author}
						</span>

						<span className='flex items-center'>
							<CalendarIcon className='w-4 h-4 mr-1' />
							{formatDistanceToNow(new Date(publishedAt), {
								addSuffix: true,
							})}
						</span>

						<span className='flex items-center'>
							<ClockIcon className='w-4 h-4 mr-1' />
							{Math.ceil(content.split(' ').length / 200)} min read
						</span>
					</div>

					{image && (
						<Image
							src={image}
							alt={title}
							width={800}
							height={400}
							className='w-full min-h-64 object-cover rounded-lg border'
						/>
					)}
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
