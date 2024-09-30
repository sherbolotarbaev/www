export interface Metadata {
	title: string
	publishedAt: string
	image?: string
	author: string
	summary: string
}

export const parseFrontmatter = (fileContent: string) => {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
	const match = frontmatterRegex.exec(fileContent)
	const frontMatterBlock = match![1]
	const content = fileContent.replace(frontmatterRegex, '').trim()
	const frontMatterLines = frontMatterBlock.trim().split('\n')
	const metadata: Partial<Metadata> = {}

	frontMatterLines.forEach(line => {
		const [key, ...valueArr] = line.split(': ')
		let value = valueArr.join(': ').trim()
		value = value.replace(/^['"](.*)['"]$/, '$1')
		metadata[key.trim() as keyof Metadata] = value
	})

	return { metadata: metadata as Metadata, content }
}
