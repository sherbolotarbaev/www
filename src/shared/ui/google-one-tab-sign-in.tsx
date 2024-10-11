'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (config: any) => void
					prompt: (momentListener?: any) => void
				}
			}
		}
	}
}

const GoogleOneTap = () => {
	useEffect(() => {
		const initializeGoogleOneTap = async () => {
			if (typeof window.google !== 'undefined') {
				window.google.accounts.id.initialize({
					client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
					callback: handleCredentialResponse,
					context: 'signin',
					ux_mode: 'popup',
					auto_select: true,
					use_fedcm_for_prompt: true, // Use FedCM for Chrome's third-party cookie phase-out
					prompt_parent_id: 'g_id_onload',
				})

				window.google.accounts.id.prompt()
			}
		}

		initializeGoogleOneTap()
	}, [])

	const handleCredentialResponse = (res: any) => {
		alert(res.credential)
	}

	return (
		<>
			<Script
				src='https://accounts.google.com/gsi/client'
				async
				defer
				strategy='beforeInteractive'
			/>
			<div
				id='g_id_onload'
				data-auto_select='true'
				data-skip_prompt_cookie='true'
			/>
		</>
	)
}

export default GoogleOneTap
