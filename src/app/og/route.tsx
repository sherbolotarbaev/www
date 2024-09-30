import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

import { siteConfig } from '~/config/site'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl

	const postTitle = searchParams.get('title')

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					backgroundImage: `url(${siteConfig.url}/images/og-bg.png)`,
				}}
			>
				<div
					style={{
						marginTop: 138,
						marginLeft: 138,
						marginRight: 138,
						display: 'flex',
						fontSize: 135,
						letterSpacing: '-0.05em',
						fontStyle: 'normal',
						color: 'white',
						lineHeight: '135px',
						whiteSpace: 'pre-wrap',
					}}
				>
					{postTitle}
				</div>
			</div>
		),
		{
			width: 1920,
			height: 1080,
		}
	)
}
