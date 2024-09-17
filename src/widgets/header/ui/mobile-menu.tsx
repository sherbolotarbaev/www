'use client'

import ModeToggle from 'components/mode-toggle'
import { Button } from 'ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'ui/sheet'

import { siteConfig } from '~/config/site'
import NavLinks from './nav-links'

import { Menu } from 'lucide-react'

const MobileMenu = () => {
	return (
		<Sheet>
			<SheetContent side='right' className='w-[260px] sm:w-[300px] md:hidden'>
				<SheetHeader className='text-left'>
					<SheetTitle className='flex items-center gap-2'>
						{siteConfig.title}
					</SheetTitle>
				</SheetHeader>

				<div className='flex flex-col h-full'>
					<div className='flex-1'>
						<NavLinks className='flex-col mt-8' />
					</div>

					<div className='pb-8'>
						<ModeToggle />
					</div>
				</div>
			</SheetContent>

			<SheetTrigger asChild>
				<Button
					variant='ghost'
					className='px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
				>
					<Menu className='h-5 w-5' />
					<span className='sr-only'>Toggle Menu</span>
				</Button>
			</SheetTrigger>
		</Sheet>
	)
}

export default MobileMenu
