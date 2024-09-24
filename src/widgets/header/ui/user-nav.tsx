'use client'

import { useLogoutMutation } from 'api/auth'
import { LogOut, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/avatar'
import { Button } from 'ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'ui/dropdown-menu'

import { MdVerified } from 'react-icons/md'

import { cn } from 'utils'

interface UserNavProps {
	me: User
}

const UserNav: React.FC<UserNavProps> = ({ me }) => {
	const { setTheme, theme } = useTheme()
	const [logOut, { isLoading: isLoggingOut }] = useLogoutMutation()

	const handleLogout = async () => {
		try {
			await logOut().unwrap()
		} catch (_) {}
		if (typeof window !== 'undefined') window.location.reload()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative size-9 rounded-md flex items-center justify-center hover:bg-transparent'
				>
					<Avatar className='size-9 rounded-md'>
						<AvatarImage
							src={me.photo}
							alt={`${me.name} ${me.surname}`}
							loading='lazy'
						/>
						<AvatarFallback>
							{me.name[0]}
							{me.surname[0]}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='min-w-56 mt-1 hidden md:block'
				align='end'
			>
				<DropdownMenuLabel className='font-normal p-3'>
					<div className='space-y-1'>
						<p className='text-sm font-medium leading-none flex items-center gap-1'>
							{me.name} {me.surname} {me.isVerified && <MdVerified />}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{me.email}
						</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<Link href='/account'>
					<DropdownMenuItem>Account</DropdownMenuItem>
				</Link>

				<DropdownMenuItem className='cursor-default focus:bg-transparent focus:text-muted-foreground'>
					<div className='flex items-center justify-between w-full'>
						<span className='text-sm'>Theme</span>
						<fieldset className='rounded-full flex border border-spacing-0.5'>
							<ThemeToggleButton
								theme='system'
								icon={<Monitor className='size-3.5' />}
								label='System theme'
							/>
							<ThemeToggleButton
								theme='light'
								icon={<Sun className='size-3.5' />}
								label='Light theme'
							/>
							<ThemeToggleButton
								theme='dark'
								icon={<Moon className='size-3.5' />}
								label='Dark theme'
							/>
						</fieldset>
					</div>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className='flex items-center justify-between'
					disabled={isLoggingOut}
					onClick={handleLogout}
				>
					<span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
					<LogOut className='size-4' />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

interface ThemeToggleButtonProps {
	theme: 'system' | 'light' | 'dark'
	icon: React.ReactElement
	label: string
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
	theme,
	icon,
	label,
}) => {
	const { setTheme, theme: currentTheme } = useTheme()

	return (
		<Button
			variant='ghost'
			size='icon'
			className={cn(
				'size-6 rounded-full text-muted-foreground',
				currentTheme === theme
					? 'bg-secondary text-primary'
					: 'hover:bg-transparent'
			)}
			onClick={() => setTheme(theme)}
		>
			{React.cloneElement(icon, {
				className: icon.props.className,
			})}
			<span className='sr-only'>{label}</span>
		</Button>
	)
}

export const MobileUserNav: React.FC<UserNavProps> = ({ me }) => {
	const [logOut, { isLoading: isLoggingOut }] = useLogoutMutation()

	const handleLogout = async () => {
		try {
			await logOut().unwrap()
		} catch (_) {}
		if (typeof window !== 'undefined') window.location.reload()
	}

	return (
		<div className='mt-5'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Avatar className='size-10'>
						<AvatarImage src={me.photo} alt={`${me.name} ${me.surname}`} />
						<AvatarFallback>
							{me.name[0]}
							{me.surname[0]}
						</AvatarFallback>
					</Avatar>

					<div>
						<p className='text-sm font-medium flex items-center gap-1'>
							{me.name}
							{me.surname}
							{me.isVerified && <MdVerified />}
						</p>
						<p className='text-xs text-muted-foreground'>{me.email}</p>
					</div>
				</div>

				<Button
					variant='ghost'
					size='icon'
					className='ml-2'
					disabled={isLoggingOut}
					onClick={handleLogout}
				>
					<LogOut className='size-3.5' />
				</Button>
			</div>
		</div>
	)
}

export default UserNav
