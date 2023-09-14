import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'password' | 'email'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const { t } = useTranslation(['home', 'profile', 'error'])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (body: FormData) => authApi.login(body)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (res) => {
                setIsAuthenticated(true)
                setProfile(res.data.data.user)
                navigate('/')
            },
            onError(error) {
                if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
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
        <div className=' bg-registerImage bg-cover bg-center bg-no-repeat'>
            <div className='container'>
                <Helmet>
                    <title>Đăng nhập | Shoppe Clone</title>
                    <meta name='description' content='Đăng nhập vào dự án Shoppe Clone' />
                </Helmet>
                <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-28 lg:pr-12'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-5 shadow-sm sm:p-10' onSubmit={onSubmit}>
                            <div className='text-xl sm:text-2xl'>{t('nav header.login')}</div>
                            <Input
                                type='text'
                                register={register}
                                name='email'
                                placeholder='Email'
                                className='mt-2 sm:mt-6'
                                errorMessage={
                                    errors.email &&
                                    t(
                                        `error:errorMessage.email.${errors.email.type}`,
                                        'error:errorMessage.notTypeError'
                                    )
                                }
                            />
                            <Input
                                type='password'
                                register={register}
                                name='password'
                                placeholder={t('profile:profile.Password')}
                                className='mt-2'
                                errorMessage={
                                    errors.password &&
                                    t(
                                        `error:errorMessage.password.${errors.password.type}`,
                                        'error:errorMessage.notTypeError'
                                    )
                                }
                            />
                            <div className='mt-2'>
                                <Button
                                    type='submit'
                                    className='w-full rounded-sm bg-red-500 py-2 text-center text-sm uppercase text-white hover:bg-red-400 sm:py-4'
                                    isLoading={loginMutation.isLoading}
                                    disabled={loginMutation.isLoading}
                                >
                                    {t('nav header.login')}
                                </Button>
                            </div>
                            <div className='mt-3 sm:mt-4'>
                                <div className='flex flex-wrap justify-center'>
                                    <span className='text-xs text-gray-400 sm:text-base'>
                                        {t('nav header.New to Shopee?')}
                                    </span>
                                    <Link to={path.register} className='ml-2 text-xs text-red-500 sm:text-base'>
                                        {t('nav header.register')}
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
