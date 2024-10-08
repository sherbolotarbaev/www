import { api as index } from '..'

const api = index.injectEndpoints({
	endpoints: build => ({
		newMessage: build.mutation<NewMessageResponse, NewMessageRequest>({
			query: body => ({
				url: '/guestbook',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['guestbook'],
		}),

		deleteMessage: build.mutation<DeleteMessageResponse, DeleteMessageRequest>({
			query: ({ id }) => ({
				url: `/guestbook/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['guestbook'],
		}),

		editMessage: build.mutation<EditMessageResponse, EditMessageRequest>({
			query: ({ id, body }) => ({
				url: `/guestbook/${id}`,
				method: 'PATCH',
				body: {
					body,
				},
			}),
			invalidatesTags: ['guestbook'],
		}),

		getMessages: build.query<GetMessagesResponse, GetMessagesRequest>({
			query: queryParams => ({
				url: '/guestbook',
				method: 'GET',
				params: queryParams,
			}),
			providesTags: ['guestbook'],
		}),
	}),
})

export const {
	useNewMessageMutation,
	useDeleteMessageMutation,
	useEditMessageMutation,
	useGetMessagesQuery,
} = api
export default api
