import path from 'node:path'

import { compareDesc } from 'date-fns'

import { getMDXFiles } from './get-mdx-files'
import { readMDXFile } from './read-mdx-file'

export const getMDXData = (dir: string) => {
	const mdxFiles = getMDXFiles(dir)
	return mdxFiles
		.map(file => {
			const { metadata, content } = readMDXFile(path.join(dir, file))
			const slug = path.basename(file, path.extname(file))
			return {
				metadata,
				slug,
				content,
			}
		})
		.filter(post => !!post.metadata.publishedAt)
		.sort((a, b) =>
			compareDesc(
				new Date(a.metadata.publishedAt),
				new Date(b.metadata.publishedAt)
			)
		)
}
