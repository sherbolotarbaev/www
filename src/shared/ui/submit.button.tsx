'use client'

import React from 'react'

import { Button } from 'ui/button'

import { ImSpinner3 } from 'react-icons/im'

import { cn } from 'utils'

interface SubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading: boolean
	loadingText?: string
	size?: 'sm' | 'lg'
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
	isLoading,
	children,
	className,
	loadingText,
	disabled,
	size,
}) => {
	return (
		<Button
			type='submit'
			disabled={isLoading || disabled}
			className={cn(className, 'w-full')}
			size={size}
		>
			{isLoading ? (
				<div className='flex items-center gap-2'>
					<ImSpinner3 className='animate-spin size-5' /> {loadingText}
				</div>
			) : (
				children
			)}
		</Button>
	)
}

export default SubmitButton
