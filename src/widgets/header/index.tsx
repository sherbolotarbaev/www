'use client'

import ModeToggle from 'components/mode-toggle'
import { Button } from 'components/ui/button'
import Logo from 'shared/ui/logo'
import MobileMenu from './ui/mobile-menu'
import NavLinks from './ui/nav-links'

const Header = () => {
	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='w-full container flex h-16 items-center'>
				<Logo />

				<div className='hidden md:flex md:flex-1'>
					<NavLinks className='ml-6 flex-row' />
				</div>

				<div className='flex flex-1 items-center justify-end'>
					<nav className='flex items-center gap-4'>
						<Button>Download CV</Button>
						<MobileMenu />

						<div className='hidden md:block'>
							<ModeToggle />
						</div>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
