import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from 'src/constants/routes'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'

export default function UserSideNav() {
    const { profile } = useContext(AppContext)
    const { t } = useTranslation('profile')

    return (
        <div className='text-base'>
            <div className='flex items-center justify-center md:justify-start md:py-8'>
                <Link to={ROUTES.PROFILE} className='mr-3 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full'>
                    <img className='h-full w-full object-cover' src={getAvatarUrl(profile?.avatar)} alt='' />
                </Link>
                <div className='truncate'>
                    <div className='truncate font-semibold'>{profile?.name || profile?.email}</div>
                    <Link to={ROUTES.PROFILE} className='flex items-center text-sm capitalize text-gray-500'>
                        <svg width={12} height={12} viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' style={{ marginRight: 4 }}>
                            <path
                                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                                fill='#9B9B9B'
                                fillRule='evenodd'
                            />
                        </svg>
                        {t('sideNav.Edit Profile')}
                    </Link>
                </div>
            </div>
            <div className='mt-6 flex flex-wrap justify-center text-sm md:mt-0 md:flex-col'>
                <NavLink
                    to={ROUTES.PROFILE}
                    className={({ isActive }) =>
                        isActive ? 'mb-4 flex items-center px-3 font-semibold text-orange md:px-0' : 'mb-4 flex items-center px-3 md:px-0'
                    }
                >
                    <div className='mr-2 h-5 w-5'>
                        <img
                            className='h-full w-full object-cover'
                            src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
                            alt=''
                        />
                    </div>

                    <div className='flex-1 capitalize'>{t('sideNav.my account')}</div>
                </NavLink>
                <NavLink
                    to={ROUTES.CHANGE_PASSWORD}
                    className={({ isActive }) =>
                        isActive ? 'mb-4 flex items-center px-3 font-semibold text-orange md:px-0' : 'mb-4 flex items-center px-3 md:px-0'
                    }
                >
                    <div className='mr-2 h-5 w-5'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='#0347AE'
                            className='h-full w-full '
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
                            />
                        </svg>
                    </div>
                    <div className='flex-1 capitalize'>{t('sideNav.Change Password')}</div>
                </NavLink>
                <NavLink
                    to={ROUTES.HISTORY_PURCHASE}
                    className={({ isActive }) =>
                        isActive ? 'mb-4 flex items-center px-3 font-semibold text-orange md:px-0' : 'mb-4 flex items-center px-3 md:px-0'
                    }
                >
                    <div className='mr-2 h-5 w-5'>
                        <img
                            className='h-full w-full object-cover'
                            src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
                            alt=''
                        />
                    </div>
                    <div className='flex-1 capitalize'>{t('sideNav.my purchase')}</div>
                </NavLink>
                <NavLink to={ROUTES.PROFILE} className='mb-4 flex items-center px-3 md:px-0'>
                    <div className='mr-2 h-5 w-5'>
                        <img
                            className='h-full w-full object-cover'
                            src='https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c'
                            alt=''
                        />
                    </div>
                    <div className='flex-1 capitalize'>{t('sideNav.Notifications')}</div>
                </NavLink>
                <NavLink to={ROUTES.PROFILE} className='mb-4 flex items-center px-3 md:px-0'>
                    <div className='mr-2 h-5 w-5'>
                        <img
                            className='h-full w-full object-cover'
                            src='https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748'
                            alt=''
                        />
                    </div>
                    <div className='flex-1 capitalize'>{t('sideNav.My Vouchers')}</div>
                </NavLink>
                <NavLink to={ROUTES.PROFILE} className='mb-4 flex items-center px-3 md:px-0'>
                    <div className='mr-2 h-5 w-5'>
                        <img
                            className='h-full w-full object-cover'
                            src='https://down-vn.img.susercontent.com/file/a0ef4bd8e16e481b4253bd0eb563f784'
                            alt=''
                        />
                    </div>
                    <div className='flex-1 capitalize'>{t('sideNav.My Shopee Coins')}</div>
                </NavLink>
            </div>
        </div>
    )
}
