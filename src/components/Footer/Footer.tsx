import bocongthuong from 'src/assets/BoCongThuong.png'
import bcthanggia from 'src/assets/bctHanggia.png'
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation('home')
    return (
        <footer className='bg-[#EDEDED] py-8 text-center text-sm text-[#0000008a]  sm:py-16'>
            <div className='container'>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-3  lg:text-start'>
                    <div className='lg:col-span-1'>
                        <div>{t('footer.1')}</div>
                    </div>
                    <div className='lg:col-span-2 lg:text-end'>
                        <div>{t('footer.Country & Region')}</div>
                    </div>
                </div>
                <div className='mt-16 justify-center uppercase lg:flex'>
                    <div className='lg:px-3'>{t('footer.PRIVACY POLICY')}</div>
                    <div className='lg:px-3'>{t('footer.TERM OF SERVICE')}</div>
                    <div className='lg:px-3'>{t('footer.SHIPPING POLICY')}</div>
                    <div className='lg:px-3'>{t('footer.VIOLATION')}</div>
                </div>
                <div className='mt-5 flex h-8 justify-center md:h-12'>
                    <div className='mx-2 lg:mx-8'>
                        <img className='h-full w-full' src={bocongthuong} alt='icon' />
                    </div>
                    <div className='mx-2 lg:mx-8'>
                        <img className='h-full w-full' src={bocongthuong} alt='icon' />
                    </div>
                    <div className='mx-2 lg:mx-8'>
                        <img className='h-full w-full' src={bcthanggia} alt='icon' />
                    </div>
                </div>
                <div className='mb-10 mt-4'>{t('footer.Shopee Company Limited')}</div>
                <div className='mt-2'>{t('footer.2')}</div>
                <div className='mt-2'>{t('footer.3')}</div>
                <div className='mt-2'>{t('footer.4')}</div>
                <div className='mt-2'>{t('footer.5')}</div>
            </div>
        </footer>
    )
}
