import { getMe } from 'api/me/ssr'
import type { Metadata } from 'next'

import AccountClient from './page.uc'

export const metadata: Metadata = {
	title: 'Account',
}

export default async function Account() {
	const me = await getMe()
	if (!me) return null
	return <AccountClient me={me} />
}
