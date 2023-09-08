import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext, Suspense } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import ProductList from './pages/ProductList'
import Profile from './pages/User/pages/Profile'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'

// const ProductList = lazy(() => import('./pages/ProductList'))
// const Login = lazy(() => import('./pages/Login'))
// const Register = lazy(() => import('./pages/Register'))
// const ProductDetail = lazy(() => import('./pages/ProductDetail'))
// const Profile = lazy(() => import('./pages/User/pages/Profile'))
// const Cart = lazy(() => import('./pages/Cart'))
// const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
// const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
// const NotFound = lazy(() => import('./pages/NotFound'))

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
                    <Suspense>
                        <ProductList />
                    </Suspense>
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
                            element: (
                                <Suspense>
                                    <Profile />
                                </Suspense>
                            )
                        },
                        {
                            path: path.changePassword,
                            element: (
                                <Suspense>
                                    <ChangePassword />
                                </Suspense>
                            )
                        },
                        {
                            path: path.historyPurchase,
                            element: (
                                <Suspense>
                                    <HistoryPurchase />
                                </Suspense>
                            )
                        }
                    ]
                },
                {
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Suspense>
                                <Cart />
                            </Suspense>
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
                            <Suspense>
                                <Login />
                            </Suspense>
                        </RegisterLayout>
                    )
                },
                {
                    path: path.register,
                    element: (
                        <RegisterLayout>
                            <Suspense>
                                <Register />
                            </Suspense>
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
                    <Suspense>
                        <ProductDetail />
                    </Suspense>
                </MainLayout>
            )
        },
        {
            path: '*',
            element: (
                <Suspense>
                    <NotFound />
                </Suspense>
            )
        }
    ])
    return element
}
