type GetMeRequest = void

type GetMeResponse = User

type EditMeRequest = Partial<User>

type EditMeResponse = User

type UploadPhotoRequest = {
	file: File
}

type UploadPhotoResponse = {
	url: string
}
