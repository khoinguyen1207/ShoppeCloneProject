import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
    [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

export const getRules = (getValue?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: 'Email không được để trống'
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email không đúng định dạng'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài phải từ 5 - 160 ký tự'
        },
        minLength: {
            value: 5,
            message: 'Độ dài phải từ 5 - 160 ký tự'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Password không được để trống'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài phải từ 6 - 160 ký tự'
        },
        minLength: {
            value: 6,
            message: 'Độ dài phải từ 6 - 160 ký tự'
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Confirm password không được để trống'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài phải từ 6 - 160 ký tự'
        },
        minLength: {
            value: 6,
            message: 'Độ dài phải từ 6 - 160 ký tự'
        },
        validate:
            typeof getValue === 'function'
                ? (value) => value === getValue('password') || 'Confirm password không khớp'
                : undefined
    }
})

export const schema = yup.object({
    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không đúng định dạng')
        .min(5, 'Độ dài phải từ 5 - 160 ký tự')
        .max(160, 'Độ dài phải từ 5 - 160 ký tự'),
    password: yup
        .string()
        .required('Password không được để trống')
        .min(6, 'Độ dài phải từ 6 - 160 ký tự')
        .max(160, 'Độ dài phải từ 6 - 160 ký tự'),
    confirm_password: yup
        .string()
        .required('Confirm password không được để trống')
        .min(6, 'Độ dài phải từ 6 - 160 ký tự')
        .max(160, 'Độ dài phải từ 6 - 160 ký tự')
        .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})
const typeLoginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof typeLoginSchema>
export type Schema = yup.InferType<typeof schema>
