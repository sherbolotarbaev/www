'use server'

import { unstable_noStore as noStore } from 'next/cache'

export async function getPostViews(): Promise<GetPostViewsResponse> {
	noStore()
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/post/views`,
			{
				method: 'GET',
			}
		)
		if (!response.ok) return []
		const views = await response.json()
		return views
	} catch (error) {
		return []
	}
}
