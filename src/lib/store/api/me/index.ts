import { api as index } from '..'

const api = index.injectEndpoints({
	endpoints: build => ({
		getMe: build.query<GetMeResponse, GetMeRequest>({
			query: () => ({
				url: '/me',
				method: 'GET',
			}),
			providesTags: ['me'],
		}),

		editMe: build.mutation<EditMeResponse, EditMeRequest>({
			query: body => ({
				url: '/me',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['me'],
		}),

		uploadPhoto: build.mutation<UploadPhotoResponse, UploadPhotoRequest>({
			query: ({ file }) => {
				const formData = new FormData()
				formData.append('file', file)
				return { url: '/uploads/photo', method: 'POST', body: formData }
			},
			invalidatesTags: ['me'],
		}),
	}),
})
export const { useGetMeQuery, useEditMeMutation, useUploadPhotoMutation } = api
export default api
