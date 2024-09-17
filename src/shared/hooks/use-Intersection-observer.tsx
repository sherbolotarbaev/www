'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

interface IntersectionObserverOptions {
	threshold?: number
	root?: Element | null
	rootMargin?: string
}

export const useIntersectionObserver = <T extends Element>(
	options: IntersectionObserverOptions = {},
	freezeOnceVisible = false
): [RefObject<T>, boolean] => {
	const [isVisible, setIsVisible] = useState(false)
	const elementRef = useRef<T>(null)

	const { threshold = 0.3, root = null, rootMargin = '0px' } = options

	useEffect(() => {
		const element = elementRef.current
		if (!element) return

		const observer = new IntersectionObserver(
			([entry]) => {
				const isElementVisible = entry.isIntersecting

				if (!isVisible && isElementVisible) {
					setIsVisible(true)
				}

				if (isElementVisible && freezeOnceVisible) {
					observer.unobserve(element)
				}
			},
			{ threshold, root, rootMargin }
		)

		observer.observe(element)

		return () => {
			if (element) observer.unobserve(element)
		}
	}, [threshold, root, rootMargin, freezeOnceVisible, isVisible])

	return [elementRef, isVisible]
}
