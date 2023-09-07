import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/User/pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import NotFound from './pages/NotFound'

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
            path: path.home,
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
                    path: path.user,
                    element: (
                        <MainLayout>
                            <UserLayout />
                        </MainLayout>
                    ),
                    children: [
                        {
                            path: path.profile,
                            element: <Profile />
                        },
                        {
                            path: path.changePassword,
                            element: <ChangePassword />
                        },
                        {
                            path: path.historyPurchase,
                            element: <HistoryPurchase />
                        }
                    ]
                },
                {
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Cart />
                        </CartLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: path.login,
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: path.register,
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    )
                }
            ]
        },
        {
            path: path.productDetail,
            index: true,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },
        {
            path: '*',
            element: <NotFound />
        }
    ])
    return element
}
