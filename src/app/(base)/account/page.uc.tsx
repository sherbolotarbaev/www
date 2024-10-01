'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEditMeMutation, useUploadPhotoMutation } from 'api/me'
import { toast } from 'hooks/use-toast'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from 'ui/avatar'
import { Button } from 'ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'ui/card'
import { Input } from 'ui/input'
import { Label } from 'ui/label'

import { Loader2, Upload } from 'lucide-react'
import { cn } from '~/lib/utils'

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	surname: z.string().min(2, 'Surname must be at least 2 characters'),
})

type FormData = z.infer<typeof formSchema>

interface AccountClientProps {
	me: User
}

export default function AccountClient({ me }: Readonly<AccountClientProps>) {
	const [editMe, { isLoading: isUpdating }] = useEditMeMutation()
	const [upload, { isLoading: isUploading }] = useUploadPhotoMutation()

	const [avatar, setAvatar] = useState(me.photo)

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: me.name,
			surname: me.surname,
		},
	})

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			try {
				const { url } = await upload({ file }).unwrap()
				await editMe({ photo: url }).unwrap()
				setAvatar(url)
			} catch (error: any) {
				toast({
					title: 'Error uploading avatar',
					description: error.data?.message || 'An unexpected error occurred.',
					variant: 'destructive',
				})
			}
		}
	}

	const onSubmit: SubmitHandler<FormData> = async data => {
		try {
			await editMe(data).unwrap()
			reset(data)
			toast({
				title: 'Account updated',
				description: 'Your account details have been successfully updated.',
			})
		} catch (error: any) {
			toast({
				title: 'Error updating account',
				description: error.data?.message || 'An unexpected error occurred.',
				variant: 'destructive',
			})
		}
	}

	return (
		<div className='container mt-12'>
			<h1 className='text-2xl font-bold mb-6'>Account</h1>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<Card className='shadow-sm'>
					<CardHeader>
						<CardTitle>Avatar</CardTitle>
						<CardDescription>
							Click on the avatar to upload a new image
						</CardDescription>
					</CardHeader>

					<CardContent className='flex items-center space-x-4'>
						<Label htmlFor='avatar-upload' className='cursor-pointer'>
							<Avatar className='size-24'>
								<AvatarImage src={avatar} alt='Profile picture' />
								<AvatarFallback>
									{me.name[0]}
									{me.surname[0]}
								</AvatarFallback>
							</Avatar>
						</Label>

						<div>
							<Label
								htmlFor='avatar-upload'
								className={cn(
									isUploading ? 'cursor-not-allowed' : 'cursor-pointer'
								)}
							>
								<div
									className={cn(
										'flex items-center space-x-2 text-sm text-blue-500',
										!isUploading && 'hover:text-blue-600'
									)}
								>
									{isUploading ? (
										<Loader2 className='h-4 w-4 animate-spin' />
									) : (
										<Upload size={16} />
									)}
									<span>
										{isUploading ? 'Uploading...' : 'Upload new avatar'}
									</span>
								</div>
							</Label>

							<Input
								id='avatar-upload'
								type='file'
								className='hidden'
								accept='image/*'
								onChange={handleAvatarChange}
								disabled={isUploading}
							/>
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-sm'>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
						<CardDescription>Update your name and surname</CardDescription>
					</CardHeader>

					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								{...register('name')}
								aria-invalid={errors.name ? 'true' : 'false'}
								disabled={isUpdating}
							/>
							{errors.name && (
								<p className='text-sm text-red-500'>{errors.name.message}</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='surname'>Surname</Label>
							<Input
								id='surname'
								{...register('surname')}
								aria-invalid={errors.surname ? 'true' : 'false'}
								disabled={isUpdating}
							/>
							{errors.surname && (
								<p className='text-sm text-red-500'>{errors.surname.message}</p>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className='shadow-sm'>
					<CardHeader>
						<CardTitle>Email Address</CardTitle>
						<CardDescription>You can't change your email</CardDescription>
					</CardHeader>

					<CardContent>
						<Input id='email' type='email' defaultValue={me.email} disabled />
					</CardContent>
				</Card>

				<Button type='submit' disabled={isUpdating || !isDirty}>
					{isUpdating ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Saving...
						</>
					) : (
						'Save Changes'
					)}
				</Button>
			</form>
		</div>
	)
}
