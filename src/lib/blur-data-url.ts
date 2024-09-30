import fs from 'node:fs/promises'
import { getPlaiceholder } from 'plaiceholder'

export const getBase64 = async (path: string) => {
	try {
		const file = await fs.readFile(`public/images/${path}`)
		const { base64 } = await getPlaiceholder(file)
		return base64
	} catch (error: unknown) {
		if (error instanceof Error) return error.message
		else if (error && typeof error === 'object' && 'message' in error)
			return (error as { message: string }).message
		else if (typeof error === 'string') return error
		else return 'Unexpected error'
	}
}
