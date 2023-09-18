import userImage from 'src/assets/user-image.svg'
import axios, { AxiosError } from 'axios'
import { APP_CONSTANTS } from 'src/constants/appConstants'
import HttpStatusCode from 'src/constants/httpStatusCode'
import { ErrorResponse } from 'src/types/utils.type'

// Nếu isAxiosError trả về true thì error có type là AxiosError
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error)
}

// check error có type là AxiosError và có status = 422
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// check error có type là AxiosError và có status = 401
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

// check error có type là AxiosError, có status = 401 và lỗi token hết hạn
export function isAxiosExpiredTokenError<ExpireTokenError>(error: unknown): error is AxiosError<ExpireTokenError> {
    return isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) && error.response?.data?.data?.name === 'EXPIRED_TOKEN'
}

export function formatCurrency(currency: number) {
    return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1
    })
        .format(value)
        .replace('.', ',')
        .toLowerCase()
}

export function rateSale(original: number, sale: number) {
    return Math.round(((original - sale) / original) * 100) + '%'
}

export const removeSpecialCharacter = (str: string) => {
    // eslint-disable-next-line no-useless-escape
    return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = (name: string, id: string) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i-')
    return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${APP_CONSTANTS.BASE_URL}/images/${avatarName}` : userImage)
