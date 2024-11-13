import MDXContent from 'components/mdx-content'
import { readFileSync } from 'node:fs'

export default async function PrivacyPolicy() {
	const content = readFileSync('./public/privacy-policy.mdx', 'utf8')
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
