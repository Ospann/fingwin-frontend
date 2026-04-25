import { RouterProvider, Navigate } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import { useAppContext } from './utils/providers/Context'
import { checkAuth } from './utils/services/auth.service'
import { createBrowserRouter } from 'react-router-dom'
import { publicRoutes, formRoutes, type AppRoute } from '@/utils/routes/AppRouter'
import { ACCESS_ROUTES } from './utils/constants/access.consts'
import { UserRoles } from './utils/types/user.type'
import Layout from '@/components/layout'
import Loader from './components/layout/Loader'
import Home from './pages/finance/analytics'
import ErrorPage from './pages/Error'

const createRoutes = (routes: AppRoute[]) => {
    return routes.map(({ path, Component, Loader }) => {
        if (!Component || typeof Component !== 'object' || !('$$typeof' in Component)) {
            console.error(`Invalid Component for path: ${path}`)
        }

        return {
            path,
            element: (
                <Layout>
                    <Suspense fallback={<Loader />}>
                        <Component />
                    </Suspense>
                </Layout>
            ),
            errorElement: <ErrorPage />,
        }
    })
}

function ProtectedLayout() {
    const { user } = useAppContext()

    if (!user) {
        return <Navigate to="/login" />
    }

    const defaultRoute = ACCESS_ROUTES[user.forms[0]]

    if (!user.forms.includes('Финансы')) {
        return <Navigate to={defaultRoute || '/not-found'} />
    }
    return <Layout>{user.forms.includes('Финансы') && <Home />}</Layout>
}

function App() {
    const [authCheckComplete, setAuthCheckComplete] = useState(false)
    const { setUser, user } = useAppContext()

    useEffect(() => {
        localStorage.setItem('target', window.location.pathname)
        checkAuth()
            .then((res) => {
                setUser(res.data.authToken)
            })
            .finally(() => {
                setAuthCheckComplete(true)
            })
    }, [])

    if (!authCheckComplete) {
        return <Loader />
    }

    const availableRoutes =
        user &&
        Object.entries(formRoutes).flatMap(([form, routes]) =>
            user.forms.includes(form)
                ? routes.filter((route) =>
                      route.roles ? route.roles.includes(user.role as UserRoles) : true,
                  )
                : [],
        )

    const router = createBrowserRouter([
        ...createRoutes(publicRoutes),
        {
            path: '/',
            element: <ProtectedLayout />,
            errorElement: <ErrorPage />,
        },
        ...(user && availableRoutes ? createRoutes(availableRoutes) : []),
        {
            path: '*',
            element: <ProtectedLayout />,
            errorElement: <ErrorPage />,
        },
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
