import Header from 'widgets/header'

interface BaseLayoutProps {
	children: React.ReactNode
}

export default function BaseLayout({ children }: Readonly<BaseLayoutProps>) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
