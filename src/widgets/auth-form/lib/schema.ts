import * as z from 'zod'

export const EmailFormSchema = z.object({
	email: z
		.string({
			required_error: 'Please enter your email address.',
		})
		.email({
			message: 'Please enter a valid email address.',
		}),
})

export const OtpFormSchema = z.object({
	otp: z.string().length(6),
})
