import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { path } from 'src/constants/path'

export default function Profile() {
    return (
        <div className='w-full rounded bg-[#FFFFFF] px-8 py-8 shadow'>
            <div className='border-b border-gray-300 pb-5'>
                <h1 className='text-lg'>Hồ sơ của tôi</h1>
                <p className='text-sm text-gray-500'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <form className='mt-5 flex flex-wrap items-start text-sm'>
                <div className='flex-grow lg:border-r lg:border-gray-300 lg:pr-10'>
                    <div className='items-center md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:text-right'>Email</div>
                        <div className='mt-1 md:mt-0 md:w-[80%] md:pl-5'>kh************@gmail.com</div>
                    </div>
                    <div className='mt-4 items-center md:mt-6 md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:text-right'>Mật khẩu</div>
                        <div className='mt-1 md:mt-0 md:w-[80%] md:pl-5'>
                            ***************{' '}
                            <Link className='ml-3 text-sm text-blue-500 underline' to={path.changePassword}>
                                Thay đổi
                            </Link>
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-6 md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>Tên</div>
                        <div className='md:w-[80%] md:pl-5'>
                            <Input
                                placeholder='Họ tên'
                                classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                            />
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-3 md:flex'>
                        <div className='truncate capitalize  text-gray-500 md:w-[20%] md:pb-5 md:text-right'>
                            Số điện thoại
                        </div>
                        <div className='md:w-[80%] md:pl-5'>
                            <Input
                                classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                                placeholder='Số điện thoại'
                                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                            />
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-3 md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>
                            Địa chỉ
                        </div>
                        <div className='md:w-[80%] md:pl-5'>
                            <Input
                                classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                                placeholder='Địa chỉ'
                                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                            />
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-3 md:flex'>
                        <div className='truncate capitalize  text-gray-500 md:w-[20%] md:pb-5 md:text-right'>
                            Ngày sinh
                        </div>
                        <div className='md:w-[80%] md:pl-5'>
                            <div className='flex items-center justify-between'>
                                <select className='h-8 w-[30%] rounded-sm border border-gray-500 px-3'>
                                    <option disabled>Ngày</option>
                                </select>
                                <select className='h-8 w-[30%] rounded-sm border border-gray-500 px-3'>
                                    <option disabled>Tháng</option>
                                </select>
                                <select className='h-8 w-[30%] rounded-sm border border-gray-500 px-3'>
                                    <option disabled>Năm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 items-center md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right' />
                        <div className='md:w-[80%] md:pl-5'>
                            <Button className='rounded-sm bg-orange px-5 py-2 text-white hover:bg-orange/80'>
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex w-full justify-center lg:mt-0 lg:w-64 '>
                    <div className='flex flex-col items-center'>
                        <div className='my-4 h-24 w-24 overflow-hidden rounded-full'>
                            <img
                                className='h-full w-full object-cover'
                                src='https://down-vn.img.susercontent.com/file/657996985c86d99f5d48333707a2f3e1'
                                alt=''
                            />
                        </div>
                        <input hidden type='file' accept='.jpg,.jpeg,.png'></input>
                        <button className='border border-gray-300 px-3 py-2 capitalize'>Chọn ảnh</button>
                        <div className='mt-3 text-gray-400'>Dụng lượng file tối đa 1 MB </div>
                        <div className='text-gray-400'>Định dạng:.JPEG, .PNG</div>
                    </div>
                </div>
            </form>
        </div>
    )
}
