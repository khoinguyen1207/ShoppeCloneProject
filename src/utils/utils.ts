import axios, { AxiosError } from 'axios'
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
