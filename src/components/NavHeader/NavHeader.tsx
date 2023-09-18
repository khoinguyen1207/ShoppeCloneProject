import { useContext } from 'react'
import Popover from '../Popover/Popover'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import { ROUTES } from 'src/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { purchaseStatus } from 'src/constants/purchases'
import { getAvatarUrl } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

export default function NavHeader() {
    const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
    const queryClient = useQueryClient()
    const { i18n, t } = useTranslation(['home', 'profile'])
    const currentLanguage = locales[i18n.language as keyof typeof locales]

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

    const changeLanguage = (lng: 'en' | 'vi') => {
        i18n.changeLanguage(lng)
    }

    return (
        <div className='flex h-auto flex-wrap items-center justify-center py-2 text-xs sm:justify-between sm:text-sm'>
            <div className='flex items-center justify-center'>
                <div className='cursor-pointer pr-2 hover:text-gray-200'> {t('nav header.seller centre')}</div>
                <div className='cursor-pointer border-l-[1px] px-2 hover:text-gray-200'>{t('nav header.download')}</div>
                <div className='flex cursor-pointer items-center border-l-[1px] px-2 hover:text-gray-200'>
                    <div className=''> {t('nav header.follow us on')}</div>
                    <a href='https://www.facebook.com/profile.php?id=100023516113906' className='px-2'>
                        <svg className='h-4 w-4 fill-white' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                            <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                        </svg>
                    </a>
                    <a href='https://www.linkedin.com/in/khoi-nguyen-ba7966201/'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-[18px] w-[18px] fill-white' role='img' viewBox='0 0 448 512'>
                            <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
                        </svg>
                    </a>
                </div>
            </div>
            <div className='relative flex items-center justify-center'>
                <Popover
                    renderPopover={
                        <div className='relative rounded-sm bg-white shadow-md'>
                            <div className='flex flex-col px-2 py-1'>
                                <button className='px-3 py-2 hover:text-orange' onClick={() => changeLanguage('vi')}>
                                    {t('nav header.vietnamese')}
                                </button>
                                <button className='px-3 py-2 hover:text-orange' onClick={() => changeLanguage('en')}>
                                    {t('nav header.english')}
                                </button>
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
                    <span className='px-1'>{currentLanguage}</span>
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
                        <Link to={ROUTES.LOGIN} className='mx-3 cursor-pointer hover:text-gray-200'>
                            {t('nav header.login')}
                        </Link>
                        <div className='h-4 border-r border-r-white' />
                        <Link to={ROUTES.REGISTER} className='ml-3 cursor-pointer hover:text-gray-200'>
                            {t('nav header.register')}
                        </Link>
                    </div>
                )}
                {isAuthenticated && (
                    <Popover
                        className='ml-4 flex cursor-pointer items-center hover:text-gray-200'
                        renderPopover={
                            <div className='relative rounded-sm bg-white shadow-md'>
                                <div className='flex flex-col px-2 py-1 '>
                                    <Link to={ROUTES.PROFILE} className='px-3 py-2 text-left hover:text-orange'>
                                        {t('profile:sideNav.my account')}
                                    </Link>
                                    <Link to={ROUTES.HISTORY_PURCHASE} className='px-3 py-2 text-left hover:text-orange'>
                                        {t('profile:sideNav.my purchase')}
                                    </Link>
                                    <button onClick={handleLogout} className='px-3 py-2 text-left hover:text-orange'>
                                        {t('nav header.logout')}
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <div className='mr-1 h-5 w-5 overflow-hidden rounded-full '>
                            <img src={getAvatarUrl(profile?.avatar)} alt='Avatar' className='h-full w-full object-cover' />
                        </div>
                        <span className='max-w-[130px] truncate'>{profile?.name || profile?.email}</span>
                    </Popover>
                )}
            </div>
        </div>
    )
}
