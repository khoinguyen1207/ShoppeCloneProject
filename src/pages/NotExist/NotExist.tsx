import { Link } from 'react-router-dom'
import { ROUTES } from 'src/constants/routes'

export default function NotExist() {
    return (
        <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
            <div className='text-center'>
                <div className='inline-flex rounded-full bg-yellow-100 p-4'>
                    <div className='rounded-full bg-yellow-200 stroke-yellow-600 p-4'>
                        <svg className='h-16 w-16' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </div>
                <h1 className='mt-5 text-[20px] font-bold text-slate-800 lg:text-[30px]'>Sản phẩm không tồn tại</h1>
                <div className='mt-6 inline-block'>
                    <Link
                        to={ROUTES.HOME}
                        className='flex items-center space-x-2 rounded bg-orange px-4 py-2 text-white transition duration-150 hover:bg-[#d73211]'
                        title='Return Home'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                            <path
                                fillRule='evenodd'
                                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                                clipRule='evenodd'
                            />
                        </svg>
                        <span>Mua hàng</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
