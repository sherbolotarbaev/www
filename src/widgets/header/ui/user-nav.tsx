'use client'

import { useLogoutMutation } from 'api/auth'
import { useTheme } from 'next-themes'
import React from 'react'

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
import { ToggleGroup, ToggleGroupItem } from 'ui/toggle-group'

import { LogOut, Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '~/lib/utils'

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
		if (typeof window !== undefined) window.location.reload()
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
				className='w-56 mt-2 rounded-lg hidden md:block'
				align='end'
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>
							{me.name} {me.surname}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{me.email}
						</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem className='cursor-default focus:bg-transparent'>
					<span className='flex items-center'>Theme</span>
					<div className='ml-auto'>
						<ToggleGroup
							type='single'
							value={theme}
							onValueChange={setTheme}
							className={cn(
								theme === 'light'
									? 'border-neutral-300'
									: 'border-neutral-700 ',
								'border border-spacing-4 rounded-full p-0.5'
							)}
							size='sm'
						>
							<ModeToggleItem
								icon={<Sun className='size-4' />}
								name='light'
								label='Light mode'
							/>
							<ModeToggleItem
								icon={<Monitor className='size-4' />}
								name='system'
								label='System mode'
							/>
							<ModeToggleItem
								icon={<Moon className='size-4' />}
								name='dark'
								label='Dark mode'
							/>
						</ToggleGroup>
					</div>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className='rounded-lg'
					disabled={isLoggingOut}
					onClick={handleLogout}
				>
					<LogOut className='mr-2 h-4 w-4' />
					<span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserNav

interface ModeToggleItemProps {
	icon: React.ReactElement
	name: string
	label: string
}

const ModeToggleItem: React.FC<ModeToggleItemProps> = ({
	icon,
	name,
	label,
}) => {
	return (
		<ToggleGroupItem
			value={name}
			aria-label={label}
			className='size-5 p-0 rounded-full bg-transparent hover:text-primary text-neutral-500 data-[state=on]:text-primary'
			size='sm'
		>
			{icon}
		</ToggleGroupItem>
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
				<div className='flex items-center space-x-4'>
					<Avatar className='h-10 w-10'>
						<AvatarImage src={me.photo} alt={`${me.name} ${me.surname}`} />
						<AvatarFallback>
							{me.name[0]}
							{me.surname[0]}
						</AvatarFallback>
					</Avatar>

					<div>
						<p className='text-sm font-medium'>{`${me.name} ${me.surname}`}</p>
						<p className='text-xs text-muted-foreground'>{me.email}</p>
					</div>
				</div>

				<Button variant='ghost' disabled={isLoggingOut} onClick={handleLogout}>
					<LogOut className='h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}
