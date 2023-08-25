import UserSideNav from '../../components/SideNav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    return (
        <div className='bg-neutral-100 py-5 md:py-12'>
            <div className='container'>
                <div className='block md:flex'>
                    <UserSideNav />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
