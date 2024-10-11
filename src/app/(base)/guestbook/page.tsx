import { getMe } from 'api/me/ssr'
import type { Metadata } from 'next'

import GoogleOneTap from 'shared/ui/google-one-tab-sign-in'
import GuestbookForm from 'widgets/guestbook-form'

export const metadata: Metadata = {
	title: 'Guestbook',
}

export default async function Guestbook() {
	const me = await getMe()

	return (
		<>
			<div className='container min-h-[42.5rem]'>
				<GuestbookForm me={me} />
			</div>

			<GoogleOneTap />
		</>
	)
}
