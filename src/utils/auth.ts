import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()
// Lấy access token
export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token') || ''
}
// Lấy refresh token
export const getRefreshTokenFromLS = () => {
    return localStorage.getItem('refresh_token') || ''
}

// Lưu access token vào localStorage
export const setAccessTokenToLS = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken)
}
// Lưu refresh token vào localStorage
export const setRefreshTokenToLS = (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken)
}

// Xóa localStorage
export const clearLocalStorage = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
    const clearLSEvent = new Event('clearLS')
    localStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLS = () => {
    const storage = localStorage.getItem('profile')
    return storage ? JSON.parse(storage) : null
}

export const setProfileToLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
}
