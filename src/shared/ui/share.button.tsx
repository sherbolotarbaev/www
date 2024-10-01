'use client'

import { Button } from 'components/ui/button'
import { toast } from 'hooks/use-toast'

import { Share2 } from 'lucide-react'

const ShareButton = () => {
	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				url: window.location.href,
			})
		} else {
			// Fallback for browsers that don't support Web Share API
			navigator.clipboard.writeText(window.location.href)
			toast({
				title: `Link copied to clipboard`,
			})
		}
	}

	return (
		<Button onClick={handleShare} variant='outline' size='sm'>
			<Share2 className='size-3.5 mr-1' />
			Share
		</Button>
	)
}

export default ShareButton
