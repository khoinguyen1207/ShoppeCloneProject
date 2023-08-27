import * as yup from 'yup'

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
        .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
    price_min: yup.string().test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: function (value) {
            const price_min = value
            const price_max = this.parent.price_max as string
            if (price_min !== '' && price_max !== '') {
                return Number(price_max) >= Number(price_min)
            }
            return price_min !== '' || price_max !== ''
        }
    }),
    price_max: yup.string().test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: function (value) {
            const price_max = value
            const price_min = this.parent.price_min as string
            if (price_min !== '' && price_max !== '') {
                return Number(price_max) >= Number(price_min)
            }
            return price_min !== '' || price_max !== ''
        }
    }),
    name: yup.string().trim().required('Tên là bắt buộc')
})

export const userSchema = yup.object({
    name: yup.string().max(160, 'Độ dài phải dưới 160 ký tự'),
    phone: yup.string().max(20, 'Độ dài phải dưới 20 ký tự'),
    address: yup.string().max(160, 'Độ dài phải dưới 160 ký tự'),
    avatar: yup.string().max(1000, 'Độ dài phải dưới 1000 ký tự'),
    date_of_birth: yup.date().max(new Date(), 'Hãy chọn ngày trong quá khứ'),
    password: schema.fields['password'],
    new_password: schema.fields['password'],
    confirm_password: schema.fields['confirm_password']
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
