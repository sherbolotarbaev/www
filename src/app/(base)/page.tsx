import Hero from 'components/sections/hero'
import Projects from 'components/sections/projects'
import WorkExperience from 'components/sections/work-experience'

export default function Home() {
	return (
		<>
			<section className='container space-y-4'>
				<Hero />
				<WorkExperience />
				<Projects />
			</section>
		</>
	)
}
