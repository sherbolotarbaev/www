'use client'

import React from 'react'

import ModeToggle from 'components/mode-toggle'
import { Button } from 'ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'ui/sheet'

import NavLinks from './nav-links'

import { Menu } from 'lucide-react'
import { MobileUserNav } from './user-nav'

interface MobileMenuProps {
	me?: User
}

const MobileMenu: React.FC<MobileMenuProps> = ({ me }) => {
	return (
		<div className='md:hidden'>
			<Sheet>
				<SheetContent side='right' className='w-[260px] sm:w-[300px]'>
					<SheetHeader className='text-left'>
						<SheetTitle className='flex items-center gap-2'>Menu</SheetTitle>
					</SheetHeader>

					<div className='flex flex-col h-full'>
						{me && <MobileUserNav me={me} />}

						<div className='flex-1'>
							<NavLinks className='flex-col mt-8' />
						</div>

						<div className='mb-8'>
							<ModeToggle />
						</div>
					</div>
				</SheetContent>

				<SheetTrigger asChild>
					<Button
						variant='ghost'
						className='px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
					>
						<Menu className='size-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>
			</Sheet>
		</div>
	)
}

export default MobileMenu
