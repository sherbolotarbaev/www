type SignInRequest = {
	email: string
	otp: string
}

type SignInResponse = {
	id: number
	email: string
	name: string
	surname: string
}

type SendOtpRequest = {
	email: string
}

type SendOtpResponse = {
	email: string
	ok: boolean
}

type LogoutRequest = void

type LogoutResponse = void
