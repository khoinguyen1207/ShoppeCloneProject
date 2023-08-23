import { useContext } from 'react'
import Popover from '../Popover/Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchaseStatus } from 'src/constants/purchases'

export default function NavHeader() {
    const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            setIsAuthenticated(false)
            setProfile(null)
            queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
    })
    const handleLogout = () => {
        logoutMutation.mutate()
    }
    return (
        <div className='flex h-auto flex-wrap items-center justify-center py-2 text-xs sm:text-sm md:justify-between'>
            <div className='flex items-center justify-center'>
                <div className='cursor-pointer pr-2 hover:text-gray-200'>Kênh người bán</div>
                <div className='cursor-pointer border-l-[1px] px-2 hover:text-gray-200'>Tải ứng dụng</div>
                <div className='flex cursor-pointer items-center border-l-[1px] px-2 hover:text-gray-200'>
                    <div className='mt-[2px]'>Kết nối</div>
                    <div className='px-2'>
                        <svg
                            className='h-4 w-4 fill-white'
                            role='img'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                        </svg>
                    </div>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4 fill-white'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='relative flex items-center justify-center'>
                <Popover
                    renderPopover={
                        <div className='relative rounded-sm bg-white shadow-md'>
                            <div className='flex flex-col px-2 py-1'>
                                <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
                                <button className='px-3 py-2 hover:text-orange'>Tiếng Anh</button>
                            </div>
                        </div>
                    }
                    className='flex cursor-pointer items-center hover:text-gray-200'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                        />
                    </svg>
                    <span className='px-1'>Tiếng việt</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                </Popover>
                {!isAuthenticated && (
                    <div className='ml-2 flex items-center'>
                        <Link to={path.login} className='mx-3 cursor-pointer hover:text-gray-200'>
                            Đăng nhập
                        </Link>
                        <div className='h-4 border-r border-r-white' />
                        <Link to={path.register} className='ml-3 cursor-pointer hover:text-gray-200'>
                            Đăng ký
                        </Link>
                    </div>
                )}
                {isAuthenticated && (
                    <Popover
                        className='ml-4 flex cursor-pointer items-center hover:text-gray-200'
                        renderPopover={
                            <div className='relative rounded-sm bg-white shadow-md'>
                                <div className='flex flex-col px-2 py-1 '>
                                    <Link to={path.profile} className='px-3 py-2 text-left hover:text-orange'>
                                        Tài khoản của tôi
                                    </Link>
                                    <Link to={path.historyPurchase} className='px-3 py-2 text-left hover:text-orange'>
                                        Đơn mua
                                    </Link>
                                    <button onClick={handleLogout} className='px-3 py-2 text-left hover:text-orange'>
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <div className='mr-1 h-5 w-5 overflow-hidden rounded-full '>
                            <img
                                src='https://down-vn.img.susercontent.com/file/657996985c86d99f5d48333707a2f3e1_tn'
                                alt='Avatar'
                                className='h-full w-full'
                            />
                        </div>
                        <span>{profile?.email}</span>
                    </Popover>
                )}
            </div>
        </div>
    )
}
