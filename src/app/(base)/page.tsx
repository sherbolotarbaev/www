import Hero from '~/components/sections/hero'
import Projects from '~/components/sections/projects'
import WorkExperience from '~/components/sections/work-experience'

export default function Home() {
	return (
		<>
			<section className='mt-12 flex flex-col gap-4'>
				<Hero />
				<WorkExperience />
				<Projects />
			</section>
		</>
	)
}
