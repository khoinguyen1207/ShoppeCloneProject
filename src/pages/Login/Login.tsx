import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from 'src/utils/rules'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import Input from 'src/components/Input'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema)
    })

    const loginMutation = useMutation({
        mutationFn: (body: FormData) => login(body)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError(error) {
                if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
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
                <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-28 lg:pr-12'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
                            <div className='text-2xl'>Đăng nhập</div>
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
                            <div className='mt-2'>
                                <button
                                    type='submit'
                                    className='w-full rounded-sm  bg-red-500 py-4 text-center uppercase text-white hover:bg-red-400'
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <div className='mt-8'>
                                <div className='flex justify-center'>
                                    <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                                    <Link to='/register' className='ml-2 text-red-500'>
                                        Đăng ký
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
