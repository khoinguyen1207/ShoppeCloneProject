import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isDirty }
    } = useForm<FormData>({
        defaultValues: {
            password: '',
            new_password: '',
            confirm_password: ''
        },
        resolver: yupResolver(passwordSchema)
    })
    const { t } = useTranslation('profile')
    const updateMutation = useMutation({ mutationFn: userApi.updateProfile })

    const updatePassword = handleSubmit(async (data) => {
        try {
            const res = await updateMutation.mutateAsync(omit(data, ['confirm_password']))
            reset()
            toast.success(res.data.message, { autoClose: 1000 })
        } catch (error) {
            if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
                const formError = error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) =>
                        setError(key as keyof FormData, {
                            message: formError[key as keyof FormData],
                            type: 'Server'
                        })
                    )
                }
            }
        }
    })

    return (
        <div className='rounded bg-[#FFFFFF] px-4 py-4 shadow sm:px-8 sm:py-8'>
            <Helmet>
                <title>Đổi mật khẩu | Shopee Clone</title>
                <meta name='description' content='Đổi mật khẩu cho tài khoản của dự án Shoppe Clone' />
            </Helmet>
            <div className='border-b border-gray-300 pb-5'>
                <h1 className='text-lg'>{t('changePassword.Change Password')}</h1>
                <p className='text-sm text-gray-500'>{t('changePassword.changePassword desc')}</p>
            </div>
            <form className='mt-8 max-w-2xl text-sm' onSubmit={updatePassword}>
                <div className='items-center md:flex'>
                    <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>{t('profile.Password')}</div>
                    <div className='md:w-[80%] md:pl-5'>
                        <Input
                            placeholder={t('profile.Password')}
                            register={register}
                            name='password'
                            type='password'
                            errorMessage={errors.password?.message}
                            classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                        />
                    </div>
                </div>
                <div className='mt-3 items-center md:mt-3 md:flex'>
                    <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>{t('changePassword.New Password')}</div>
                    <div className='md:w-[80%] md:pl-5'>
                        <Input
                            register={register}
                            placeholder={t('changePassword.New Password')}
                            name='new_password'
                            type='password'
                            errorMessage={errors.new_password?.message}
                            classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                        />
                    </div>
                </div>
                <div className='mt-3 items-center md:mt-3 md:flex'>
                    <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>{t('changePassword.Confirm Password')}</div>
                    <div className='md:w-[80%] md:pl-5'>
                        <Input
                            register={register}
                            placeholder={t('changePassword.Confirm Password')}
                            name='confirm_password'
                            type='password'
                            errorMessage={errors.confirm_password?.message}
                            classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                        />
                    </div>
                </div>
                <div className='mt-3 items-center md:flex'>
                    <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right' />
                    <div className='md:w-[80%] md:pl-5'>
                        <Button
                            type='submit'
                            isLoading={updateMutation.isLoading}
                            disabled={!isDirty}
                            className='rounded-sm bg-orange px-5 py-2 text-white hover:bg-orange/80'
                        >
                            {t('changePassword.Save')}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
