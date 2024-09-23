import * as z from 'zod'

export const MessageFormSchema = z.object({
	message: z.string({
		required_error: 'Please enter your message.',
	}),
})
