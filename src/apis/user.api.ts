import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateUser extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
    password?: string
    new_password?: string
}

const URL_GET_PROFILE = 'me'
const URL_UPDATE_PROFILE = 'user'
const URL_UPLOAD_AVATAR = 'user/upload-avatar'

const userApi = {
    getUser() {
        return http.get<SuccessResponse<User>>(URL_GET_PROFILE)
    },

    updateProfile(body: BodyUpdateUser) {
        return http.put<SuccessResponse<User>>(URL_UPDATE_PROFILE, body)
    },

    uploadAvatar(body: FormData) {
        return http.post<SuccessResponse<string>>(URL_UPLOAD_AVATAR, body, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}

export default userApi
