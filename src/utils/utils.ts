import userImage from 'src/assets/user-image.svg'
import axios, { AxiosError } from 'axios'
import { config } from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode'

// Nếu isAxiosError trả về true thì error có type là AxiosError
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error)
}

// check error có type là AxiosError và có status = 422
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
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

export const getAvatarUrl = (avatarName?: string) =>
    avatarName ? `${config.BASE_URL}/images/${avatarName}` : userImage
