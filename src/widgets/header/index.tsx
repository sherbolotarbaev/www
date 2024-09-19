'use client'

import { useGetMeQuery } from 'api/me'

import ModeToggle from 'components/mode-toggle'
import Logo from 'shared/ui/logo'
import { Button } from 'ui/button'
import MobileMenu from './ui/mobile-menu'
import NavLinks from './ui/nav-links'
import UserNav from './ui/user-nav'

const Header = () => {
	const { data: me } = useGetMeQuery()

	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='w-full container flex h-16 items-center'>
				<Logo />

				<div className='hidden md:flex md:flex-1'>
					<NavLinks className='ml-6 flex-row' />
				</div>

				<div className='flex flex-1 items-center justify-end'>
					<nav className='flex items-center gap-4'>
						{!me && (
							<Button
								onClick={() => {
									if (typeof window !== undefined)
										window.open('/cv/sherbolot-arbaev.pdf', '_blank')
								}}
							>
								Download CV
							</Button>
						)}

						<MobileMenu me={me} />

						<div className='hidden md:block'>
							{!me ? <ModeToggle /> : <UserNav me={me} />}
						</div>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
