import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode'
import { AuthResponse } from 'src/types/auth.type'
import { clearLocalStorage, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { path } from 'src/constants/path'
import { config } from 'src/constants/config'

class Http {
    instance: AxiosInstance
    private accessToken: string
    constructor() {
        this.accessToken = getAccessTokenFromLS()
        this.instance = axios.create({
            baseURL: config.BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
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
                if (response.config.url === path.login || response.config.url === path.register) {
                    this.accessToken = (response.data as AuthResponse).data.access_token
                    setAccessTokenToLS(this.accessToken)
                    setProfileToLS((response.data as AuthResponse).data.user)
                } else if (response.config.url === path.logout) {
                    this.accessToken = ''
                    clearLocalStorage()
                }
                return response
            },
            (error: AxiosError) => {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    const data: any | undefined = error.response?.data
                    const message = data?.message || error.message
                    toast.error(message)
                }
                if (error.response?.status === HttpStatusCode.Unauthorized) {
                    clearLocalStorage()
                }
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance
export default http
