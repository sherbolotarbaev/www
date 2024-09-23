import Footer from 'widgets/footer'
import Header from 'widgets/header'

interface BaseLayoutProps {
	children: React.ReactNode
}

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
	return (
		<>
			<Header />
			<main className='my-12'>{children}</main>
			<Footer />
		</>
	)
}
