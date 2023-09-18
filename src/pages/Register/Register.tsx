import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { yupResolver } from '@hookform/resolvers/yup'
import authApi from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { ROUTES } from 'src/constants/routes'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'password' | 'email' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const { t } = useTranslation(['home', 'profile', 'error'])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isDirty }
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirm_password: ''
        },
        resolver: yupResolver(registerSchema)
    })

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirm_password'])
        registerAccountMutation.mutate(body, {
            onSuccess: (res) => {
                setIsAuthenticated(true)
                setProfile(res.data.data.user)
                navigate('/')
            },
            onError(error) {
                if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data
                    if (formError?.email) {
                        setError('email', {
                            message: formError.email,
                            type: 'Server'
                        })
                    }
                    if (formError?.password) {
                        setError('password', {
                            message: formError.password,
                            type: 'Server'
                        })
                    }
                }
            }
        })
    })

    return (
        <div className='bg-registerImage bg-cover bg-center bg-no-repeat'>
            <div className='container'>
                <Helmet>
                    <title>Đăng ký | Shopee Clone</title>
                    <meta name='description' content='Đăng ký tài khoản cho dự án Shoppe Clone' />
                </Helmet>
                <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-28 lg:pr-12'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-5 shadow-sm sm:p-10' onSubmit={onSubmit}>
                            <div className='text-xl sm:text-2xl'>{t('nav header.register')}</div>
                            <Input
                                type='text'
                                register={register}
                                name='email'
                                placeholder='Email'
                                className='mt-2 sm:mt-6'
                                errorMessage={errors.email && t(`error:errorMessage.email.${errors.email.type}`, 'error:errorMessage.notTypeError')}
                            />
                            <Input
                                type='password'
                                register={register}
                                name='password'
                                placeholder={t('profile:profile.Password')}
                                className='mt-2'
                                errorMessage={
                                    errors.password && t(`error:errorMessage.password.${errors.password.type}`, 'error:errorMessage.notTypeError')
                                }
                            />
                            <Input
                                type='password'
                                register={register}
                                name='confirm_password'
                                placeholder={t('profile:changePassword.Confirm Password')}
                                className='mt-2'
                                errorMessage={
                                    errors.confirm_password &&
                                    t(`error:errorMessage.confirm password.${errors.confirm_password.type}`, 'error:errorMessage.notTypeError')
                                }
                            />
                            <div className='mt-2'>
                                <Button
                                    type='submit'
                                    className='w-full rounded-sm bg-red-500 py-2 text-center text-sm uppercase text-white hover:bg-red-400 sm:py-4'
                                    isLoading={registerAccountMutation.isLoading}
                                    disabled={!isDirty}
                                >
                                    {t('nav header.register')}
                                </Button>
                            </div>
                            <div className='mt-3 sm:mt-4'>
                                <div className='flex flex-wrap justify-center'>
                                    <span className='text-xs text-gray-400 sm:text-base'>{t('nav header.Have an account?')}</span>
                                    <Link to={ROUTES.LOGIN} className='ml-2 text-xs text-red-500 sm:text-base'>
                                        {t('nav header.login')}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
