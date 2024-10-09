'use client'

import { useGetMeQuery } from 'api/me'
import { usePathname } from 'next/navigation'

import ModeToggle from 'components/mode-toggle'
import Link from 'next/link'
import Logo from 'shared/ui/logo'
import { Button } from 'ui/button'
import { Skeleton } from 'ui/skeleton'
import MobileMenu from './ui/mobile-menu'
import NavLinks from './ui/nav-links'
import UserNav from './ui/user-nav'

const Header = () => {
	const pathname = usePathname()
	const { data: me, isLoading } = useGetMeQuery()

	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='w-full container flex h-16 items-center'>
				<Logo />

				<div className='hidden md:flex md:flex-1'>
					<NavLinks className='ml-6 flex-row' />
				</div>

				<div className='flex flex-1 items-center justify-end'>
					<nav className='flex items-center gap-4'>
						{isLoading ? (
							<div className='flex items-center gap-2'>
								<Skeleton className='h-10 w-[4.5rem]' />
								<Skeleton className='h-10 w-[7.2rem]' />
							</div>
						) : !me ? (
							<div className='flex items-center gap-2'>
								<Link
									href={
										pathname !== '/' ? `/sign-in?next=${pathname}` : '/sign-in'
									}
									passHref
								>
									<Button variant='outline'>Sign in</Button>
								</Link>
								<Link href='/cv/sherbolot-arbaev.pdf' target='_blank' passHref>
									<Button>Download CV</Button>
								</Link>
							</div>
						) : null}

						<MobileMenu me={me} />

						<div className='hidden md:block'>
							{isLoading ? (
								<Skeleton className='size-10' />
							) : !me ? (
								<ModeToggle />
							) : (
								<UserNav me={me} />
							)}
						</div>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
