import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import MDXContent from 'components/mdx-content'

export default async function PrivacyPolicy() {
	const filePath = join(process.cwd(), 'public', 'privacy-policy.mdx')
	const content = readFileSync(filePath, 'utf8')

	return (
		<>
			<div className='container'>
				<div className='w-full flex flex-col lg:flex-row lg:gap-6'>
					<article className='max-w-[34.5rem]'>
						<div className='prose lg:prose-xl'>
							<MDXContent source={content} />
						</div>
					</article>
				</div>
			</div>
		</>
	)
}
