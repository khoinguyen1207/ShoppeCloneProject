import UserSideNav from '../../components/SideNav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    return (
        <div>
            <UserSideNav />
            <Outlet />
        </div>
    )
}
