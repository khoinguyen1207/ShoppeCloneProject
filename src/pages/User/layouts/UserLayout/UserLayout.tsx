import UserSideNav from '../../components/SideNav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    return (
        <div className='bg-neutral-100 py-5 md:py-12'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:grid-cols-10 lg:gap-10'>
                    <div className='md:col-span-3 lg:col-span-2'>
                        <UserSideNav />
                    </div>
                    <div className='md:col-span-9 lg:col-span-8'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
