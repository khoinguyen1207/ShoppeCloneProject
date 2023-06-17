import { User } from 'src/types/user.type'

// Lấy access token
export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token') || ''
}

// Lưu access token vào localStorage
export const setAccessTokenToLS = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken)
}

// Xóa localStorage
export const clearLocalStorage = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
}

export const getProfileFromLS = () => {
    const storage = localStorage.getItem('profile')
    return storage ? JSON.parse(storage) : null
}

export const setProfileToLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}
