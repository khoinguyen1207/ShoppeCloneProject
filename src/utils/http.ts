import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { clearLocalStorage, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setProfileToLS, setRefreshTokenToLS } from './auth'
import { URL_LOGIN, URL_REGISTER, URL_LOGOUT, URL_REFRESH_TOKEN } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'
import { APP_CONSTANTS } from 'src/constants/appConstants'

class Http {
    instance: AxiosInstance
    private accessToken: string
    private refreshToken: string
    private refreshTokenRequest: Promise<string> | null
    constructor() {
        this.accessToken = getAccessTokenFromLS()
        this.refreshToken = getRefreshTokenFromLS()
        this.refreshTokenRequest = null
        this.instance = axios.create({
            baseURL: APP_CONSTANTS.BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': APP_CONSTANTS.EXPIRED_TOKEN,
                'expire-refresh-token': APP_CONSTANTS.EXPIRED_TOKEN * 2
            }
        })
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = this.accessToken
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        this.instance.interceptors.response.use(
            (response) => {
                if (response.config.url === URL_LOGIN || response.config.url === URL_REGISTER) {
                    this.accessToken = (response.data as AuthResponse).data.access_token
                    this.refreshToken = (response.data as AuthResponse).data.refresh_token
                    setAccessTokenToLS(this.accessToken)
                    setRefreshTokenToLS(this.refreshToken)
                    setProfileToLS((response.data as AuthResponse).data.user)
                } else if (response.config.url === URL_LOGOUT) {
                    this.accessToken = ''
                    this.refreshToken = ''
                    clearLocalStorage()
                }
                return response
            },
            (error: AxiosError) => {
                if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data
                    const message = data?.message || error.message
                    toast.error(message)
                }
                if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
                    const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
                    const { url } = config

                    if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
                        this.refreshTokenRequest = this.refreshTokenRequest
                            ? this.refreshTokenRequest
                            : this.handleRefreshToken().finally(() => {
                                  setTimeout(() => {
                                      this.refreshTokenRequest = null
                                  }, 10000)
                              })
                        return this.refreshTokenRequest.then((access_token) => {
                            return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
                        })
                    }

                    clearLocalStorage()
                    this.accessToken = ''
                    this.refreshToken = ''
                    toast.error(error.response?.data.data?.message || error.response?.data.message)
                }
                return Promise.reject(error)
            }
        )
    }

    private handleRefreshToken() {
        return this.instance
            .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
                refresh_token: this.refreshToken
            })
            .then((res) => {
                setAccessTokenToLS(res.data.data.access_token)
                this.accessToken = res.data.data.access_token
                return this.accessToken
            })
            .catch((err) => {
                this.accessToken = ''
                this.refreshToken = ''
                clearLocalStorage()
                throw err
            })
    }
}

const http = new Http().instance
export default http
