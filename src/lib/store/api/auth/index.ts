import { api as index } from '..'

const api = index.injectEndpoints({
	endpoints: build => ({
		signIn: build.mutation<SignInResponse, SignInRequest>({
			query: body => ({
				url: '/sign-in',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['auth'],
		}),

		sendOtp: build.mutation<SendOtpResponse, SendOtpRequest>({
			query: body => ({
				url: '/send-otp',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['auth'],
		}),

		logout: build.mutation<LogoutResponse, LogoutRequest>({
			query: () => ({
				url: '/logout',
				method: 'POST',
				invalidatesTags: ['auth'],
			}),
		}),
	}),
})

export const { useSignInMutation, useSendOtpMutation, useLogoutMutation } = api
export default api
