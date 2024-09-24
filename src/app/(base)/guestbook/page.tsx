import { getMe } from 'api/me/ssr'
import type { Metadata } from 'next'

import GuestbookForm from 'widgets/guestbook-form'

export const metadata: Metadata = {
	title: 'Guestbook',
}

export default async function Guestbook() {
	const me = await getMe()

	return (
		<div className='container min-h-[42.5rem]'>
			<GuestbookForm me={me} />
		</div>
	)
}
