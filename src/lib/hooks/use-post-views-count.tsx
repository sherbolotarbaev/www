'use client'

import { useAddPostViewQuery } from 'api/post'
import { useMemo } from 'react'

function useGetPostViewsCount(allViews: PostView[], slug: string) {
	const viewsForPost = useMemo(
		() => allViews.find(view => view.slug === slug),
		[slug, allViews]
	)
	const count = viewsForPost?.viewsCount || 0
	return {
		views: count.toLocaleString(),
	}
}

function useAddPostViewsCount(allViews: PostView[], slug: string) {
	const { data } = useAddPostViewQuery({ slug })
	const fetchedCount = data?.viewsCount
	const viewsForPost = useMemo(
		() => allViews.find(view => view.slug === slug),
		[slug, allViews]
	)
	const count = fetchedCount ?? viewsForPost?.viewsCount ?? 0
	return {
		views: count.toLocaleString(),
	}
}

export { useAddPostViewsCount, useGetPostViewsCount }
