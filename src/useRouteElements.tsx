import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { getAccessTokenFromLS } from './utils/auth'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

const RejectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
    const element = useRoutes([
        {
            path: '',
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: 'profile',
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: 'login',
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: 'register',
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    )
                }
            ]
        }
    ])
    return element
}
