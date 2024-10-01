import { api as index } from '..'

const api = index.injectEndpoints({
	endpoints: build => ({
		getReactions: build.query<GetReactionsResponse, GetReactionsRequest>({
			query: ({ id }) => ({
				url: `/guestbook/${id}/reactions`,
				method: 'GET',
			}),
			providesTags: ['reaction'],
		}),

		addMessageReaction: build.mutation<
			AddMessageReactionResponse,
			AddMessageReactionRequest
		>({
			query: ({ id, emoji }) => ({
				url: `/guestbook/${id}/reactions`,
				method: 'POST',
				body: {
					emoji,
				},
			}),
			invalidatesTags: ['reaction'],
		}),

		removeMessageReaction: build.mutation<
			RemoveMessageReactionResponse,
			RemoveMessageReactionRequest
		>({
			query: ({ id, emoji }) => ({
				url: `/guestbook/${id}/reactions`,
				method: 'DELETE',
				body: {
					emoji,
				},
			}),
			invalidatesTags: ['reaction'],
		}),
	}),
})

export const {
	useGetReactionsQuery,
	useAddMessageReactionMutation,
	useRemoveMessageReactionMutation,
} = api
export default api
