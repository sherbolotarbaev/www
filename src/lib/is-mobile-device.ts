'use server'

import { headers } from 'next/headers'
import { userAgent } from 'next/server'

export async function isMobileDevice() {
	if (typeof process === 'undefined') {
		throw new Error(
			'[Server method] you are importing a server-only module outside of server'
		)
	}

	const device = userAgent({ headers: headers() }).device
	return device.type === 'mobile'
}
