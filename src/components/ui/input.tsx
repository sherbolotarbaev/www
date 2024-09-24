import React from 'react'

import { cn } from 'utils'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-12 w-full rounded-lg border border-input bg-transparent px-3 py-4 text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[0.2rem] focus-visible:ring-ring focus-visible:border-primary-50 disabled:cursor-not-allowed disabled:opacity-50 autofill:bg-primary/20 autofill:text-primary-foreground',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
