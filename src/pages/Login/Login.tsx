import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className=' bg-registerImage bg-cover bg-center bg-no-repeat'>
            <div className='container'>
                <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-28 lg:pr-12'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form className='rounded bg-white p-10 shadow-sm'>
                            <div className='text-2xl'>Đăng nhập</div>
                            <div className='mt-6'>
                                <input
                                    type='email'
                                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500'
                                    placeholder='Email'
                                    name='email'
                                />
                            </div>
                            <div className='mt-1 min-h-[1.5rem] text-sm text-red-600'></div>
                            <div className='mt-2'>
                                <input
                                    type='password'
                                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500'
                                    placeholder='Password'
                                    name='password'
                                />
                            </div>
                            <div className='mt-1 min-h-[1.5rem] text-sm text-red-600'></div>
                            <div className='mt-2'>
                                <button className='w-full rounded-sm  bg-red-500 py-4 text-center uppercase text-white hover:bg-red-400'>
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
