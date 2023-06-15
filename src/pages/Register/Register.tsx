import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

type FormData = Schema

export default function Register() {
    const { setIsAuthenticated } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirm_password'])
        registerAccountMutation.mutate(body, {
            onSuccess: () => {
                setIsAuthenticated(true)
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
                <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-28 lg:pr-12'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
                            <div className='text-2xl'>Đăng ký</div>
                            <Input
                                type='text'
                                register={register}
                                name='email'
                                placeholder='Email'
                                className='mt-6'
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                type='password'
                                register={register}
                                name='password'
                                placeholder='Password'
                                className='mt-2'
                                errorMessage={errors.password?.message}
                            />
                            <Input
                                type='password'
                                register={register}
                                name='confirm_password'
                                placeholder='Confirm Password'
                                className='mt-2'
                                errorMessage={errors.confirm_password?.message}
                            />
                            <div className='mt-2'>
                                <button
                                    type='submit'
                                    className='w-full rounded-sm  bg-red-500 py-4 text-center uppercase text-white hover:bg-red-400'
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <div className='mt-8'>
                                <div className='flex justify-center'>
                                    <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                                    <Link to='/login' className='ml-2 text-red-500'>
                                        Đăng nhập
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
