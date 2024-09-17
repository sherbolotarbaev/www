'use client'

import * as React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'utils'

import { routes } from '../lib/routes'

interface NavLinksProps {
	className?: string
	onClick?: () => void
}

const NavLinks: React.FC<NavLinksProps> = ({ className, onClick }) => {
	const pathname = usePathname()
	return (
		<nav className={cn('flex', className)}>
			{routes.map(route => (
				<Link
					key={route.path}
					href={route.path}
					className={cn(
						'text-xl md:text-sm font-medium transition-colors hover:text-primary',
						pathname === route.path
							? 'text-primary font-semibold'
							: 'text-muted-foreground',
						className?.includes('flex-col') ? 'py-2' : 'px-4 py-2'
					)}
					onClick={onClick}
				>
					{route.name}
				</Link>
			))}
		</nav>
	)
}

export default NavLinks
