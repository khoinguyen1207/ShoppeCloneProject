// Lấy access token
export const getAccessTokenFromLS = () => {
    return localStorage.getItem('access_token') || ''
}

// Lưu access token vào localStorage
export const saveAccessTokenToLS = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken)
}

// Xóa access token khỏi localStorage
export const clearAccessTokenFromLS = () => {
    localStorage.removeItem('access_token')
}
