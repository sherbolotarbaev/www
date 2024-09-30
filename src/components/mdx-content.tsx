'use client'

import type { MDXComponents } from 'mdx/types'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from 'ui/button'
import { Card } from 'ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'ui/tooltip'

import { Check, Clipboard } from 'lucide-react'

import { cn } from 'utils'

const slugify = (str: string) => {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
}

interface CopyButtonProps {
	content: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
	const [copied, setCopied] = useState(false)

	const copy = async () => {
		await navigator.clipboard.writeText(content)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						onClick={copy}
						className='absolute right-3 top-3 p-0 size-6 z-20 hover:bg-zinc-700 rounded-md'
					>
						{copied ? (
							<Check className='size-3.5 text-white' />
						) : (
							<Clipboard className='size-3.5 text-white' />
						)}
						<span className='sr-only'>Copy code</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{copied ? 'Copied!' : 'Copy'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

const components: MDXComponents = {
	Image: ({ alt, className, ...props }) => (
		<div className='my-6 w-full overflow-hidden rounded-lg'>
			<Image
				className={cn('w-full', className)}
				width={700}
				height={350}
				alt={alt}
				loading='lazy'
				{...props}
			/>
		</div>
	),
	a: ({ children, href }) =>
		href ? (
			<Link
				className='font-medium text-blue-500 hover:underline'
				href={href}
				target='_blank'
			>
				{children}
			</Link>
		) : null,
	code: ({ className, ...props }) => (
		<code
			className='px-[0.3rem] py-[0.2rem] font-mono text-sm bg-muted rounded-md'
			{...props}
		/>
	),
	pre: ({ children, className }) => {
		const languageMatch = className?.match(/language-(\w+)/)
		const language = languageMatch ? languageMatch[1] : 'plain'
		const codeContent = ((children as any).props.raw || '').trim()
		const isBash = language === 'bash'

		return (
			<Card className='relative p-4 my-6 shadow-none bg-zinc-900'>
				<CopyButton content={codeContent} />

				<SyntaxHighlighter
					language={language}
					style={codeTheme}
					showLineNumbers={!isBash}
					wrapLines={true}
					customStyle={{
						margin: 0,
						padding: 0,
						fontSize: '14px',
						backgroundColor: 'transparent',
					}}
					lineNumberStyle={
						!isBash
							? {
									minWidth: '2.2em',
									paddingRight: '1.2em',
									userSelect: 'none',
									textAlign: 'right',
							  }
							: undefined
					}
				>
					{codeContent}
				</SyntaxHighlighter>
			</Card>
		)
	},
	video: () => <video controls className='w-full rounded-lg shadow-md'></video>,
	h1: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h1
					id={slug}
					className='scroll-m-20 text-3xl font-extrabold tracking-tight mt-12 mb-4'
				>
					{children}
				</h1>
			</Link>
		)
	},
	h2: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h2
					id={slug}
					className='scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4'
				>
					{children}
				</h2>
			</Link>
		)
	},
	h3: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h3
					id={slug}
					className='scroll-m-20 text-xl font-semibold tracking-tight'
				>
					{children}
				</h3>
			</Link>
		)
	},
	h4: ({ children }) => {
		const slug = children ? slugify(children.toString()) : ''
		return (
			<Link href={`#${slug}`} className='no-underline'>
				<h4
					id={slug}
					className='scroll-m-20 text-md font-semibold tracking-tight'
				>
					{children}
				</h4>
			</Link>
		)
	},
	p: ({ children }) => (
		<p className='leading-7 [&:not(:first-child)]:mt-6 mb-4'>{children}</p>
	),
	ul: ({ children }) => (
		<ul className='my-6 ml-6 list-disc [&>li]:mt-2'>{children}</ul>
	),
	ol: ({ children }) => (
		<ol className='my-6 ml-6 list-decimal [&>li]:mt-2'>{children}</ol>
	),
	li: ({ children }) => <li>{children}</li>,
	blockquote: ({ children }) => (
		<blockquote className='mt-6 border-l-2 border-l-muted-foreground text-muted-foreground pl-6 italic'>
			{children}
		</blockquote>
	),
	table: ({ children }) => (
		<div className='my-6 w-full overflow-y-auto'>
			<table className='w-full'>{children}</table>
		</div>
	),
	tr: ({ children }) => (
		<tr className='m-0 border-t p-0 even:bg-muted'>{children}</tr>
	),
	th: ({ children }) => (
		<th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
			{children}
		</th>
	),
	td: ({ children }) => (
		<td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
			{children}
		</td>
	),
}

const rawCodePlugin = () => (tree: any) => {
	visit(tree, 'element', node => {
		if (node.tagName === 'pre') {
			const [codeEl] = node.children
			if (codeEl.tagName === 'code') {
				node.raw = codeEl.children?.[0]?.value
			}
		}
	})

	visit(tree, 'element', node => {
		if (node.tagName === 'pre') {
			for (const child of node.children) {
				if (child.tagName === 'code') {
					child.properties['raw'] = node.raw
				}
			}
		}
	})
}

type MDXContentProps = Omit<MDXRemoteProps, 'components'>

const MDXContent: React.FC<MDXContentProps> = props => {
	return (
		// @ts-expect-error
		<MDXRemote
			{...props}
			components={components}
			options={{
				parseFrontmatter: true,
				mdxOptions: {
					rehypePlugins: [rawCodePlugin, rehypePrism],
					remarkPlugins: [remarkGfm],
				},
			}}
		/>
	)
}

export default MDXContent
