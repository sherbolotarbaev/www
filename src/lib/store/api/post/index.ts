import { api as index } from '..'

const api = index.injectEndpoints({
	endpoints: build => ({
		addPostView: build.query<AddPostViewResponse, AddPostViewRequest>({
			query: params => ({
				url: `/post/views/${params.slug}`,
				method: 'GET',
			}),
			providesTags: ['post'],
		}),

		getPostViews: build.query<GetPostViewsResponse, GetPostViewsRequest>({
			query: () => ({
				url: '/post/views',
				method: 'GET',
			}),
			providesTags: ['post'],
		}),
	}),
})

export const { useAddPostViewQuery, useGetPostViewsQuery } = api
export default api
