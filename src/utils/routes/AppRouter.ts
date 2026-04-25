import * as routes from '../routes/routes.consts'
import Loading from '@/components/layout/Loader'
import HistoryLoader from '@/components/layout/Loader/HistoryLoader'
import { lazy, LazyExoticComponent } from 'react'
import { UserRoles } from '../types/user.type'

export type AppRoute = {
    path: string
    Component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element)
    Loader: React.FC | (() => JSX.Element)
    roles?: UserRoles[]
}

export const financeRoutes: AppRoute[] = [
    {
        path: routes.FINANCE_ROUTE,
        Component: lazy(() => import('@/components/shared/Navigation/index')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.FINANCE_INPUT_ROUTE,
        Component: lazy(() => import('@/pages/finance/input')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.FINANCE_HISTORY_ROUTE,
        Component: lazy(() => import('@/pages/finance/history')),
        Loader: HistoryLoader,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.FINANCE_PNLREPORT_ROUTE,
        Component: lazy(() => import('@/pages/finance/pnl-report')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.FINANCE_REPORT_ROUTE,
        Component: lazy(() => import('@/pages/finance/cashflow-report')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.FINANCE_ANALYTICS,
        Component: lazy(() => import('@/pages/finance/analytics')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.FINANCE_UPLOAD,
        Component: lazy(() => import('@/pages/finance/upload')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.FINANCE_DASHBOARD,
        Component: lazy(() => import('@/pages/finance/dashboard')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.FINANCE_ABC,
        Component: lazy(() => import('@/pages/finance/abc-report')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.MAIN_ROUTE,
        Component: lazy(() => import('@/pages/finance/analytics')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
]

export const purchaseRoutes: AppRoute[] = [
    {
        path: routes.PURCHASE_ROUTE,
        Component: lazy(() => import('@/components/shared/Navigation/index')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.PURCHASE_INPUT_PARAM_ROUTE,
        Component: lazy(() => import('@/pages/purchase/input')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.PURCHASE_HISTORY_ROUTE,
        Component: lazy(() => import('@/pages/purchase/history')),
        Loader: HistoryLoader,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.PURCHASE_REPORT_ROUTE,
        Component: lazy(() => import('@/pages/purchase/debt-report')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
]

export const salesRoutes: AppRoute[] = [
    {
        path: routes.SALES_ROUTE,
        Component: lazy(() => import('@/components/shared/Navigation/index')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.SALES_INPUT_PARAM_ROUTE,
        Component: lazy(() => import('@/pages/sales/input')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.SALES_HISTORY_ROUTE,
        Component: lazy(() => import('@/pages/sales/history')),
        Loader: HistoryLoader,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.SALES_ANALYTICS,
        Component: lazy(() => import('@/pages/sales/analytics')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.SALES_RETURN_INPUT_ROUTE,
        Component: lazy(() => import('@/pages/sales/returns')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.SALES_RETURN_HISTORY_ROUTE,
        Component: lazy(() => import('@/pages/sales/returns-history')),
        Loader: HistoryLoader,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
]

export const productionRoutes: AppRoute[] = [
    {
        path: routes.PRODUCTION_ROUTE,
        Component: lazy(() => import('@/components/shared/Navigation/index')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.PRODUCTION_INPUT_PARAM_ROUTE,
        Component: lazy(() => import('@/pages/production/input')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.PRODUCTION_HISTORY_ROUTE,
        Component: lazy(() => import('@/pages/production/history')),
        Loader: HistoryLoader,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
]

export const adminRoutes: AppRoute[] = [
    {
        path: routes.ADMIN_ROUTE,
        Component: lazy(() => import('@/components/shared/Navigation/index')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_SUPPLIER_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/supplier')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_PRODUCT_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/product')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_CLIENT_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/customers')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_USER_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/user')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_RECIPE_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/recipe')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_CATEGORY_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/category')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_ACCOUNT_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/accounts')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_STORAGE_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/storage')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
    {
        path: routes.ADMIN_INTEGRATION_ROUTE,
        Component: lazy(() => import('@/pages/admin-panel/integrations')),
        Loader: Loading,
        roles: [UserRoles.ADMIN],
    },
]

export const storageRoutes: AppRoute[] = [
    {
        path: routes.STORAGE_REMAIN_ROUTE,
        Component: lazy(() => import('@/pages/Storage/Remain')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        path: routes.STORAGE_ROUTE,
        Component: lazy(() => import('@/components/shared/Navigation/index')),
        Loader: Loading,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
]

export const publicRoutes: AppRoute[] = [
    {
        path: routes.LOGIN_ROUTE,
        Component: lazy(() => import('@/pages/login')),
        Loader: Loading,
    },
    {
        path: routes.NOTFOUND_ROUTE,
        Component: lazy(() => import('@/pages/404')),
        Loader: Loading,
    },
    {
        path: routes.REGISTRATION_ROUTE,
        Component: lazy(() => import('@/pages/register-form')),
        Loader: Loading,
    },
]

export const formRoutes = {
    Финансы: financeRoutes,
    Закуп: purchaseRoutes,
    Продажи: salesRoutes,
    Производство: productionRoutes,
    'Админ панель': adminRoutes,
    Склад: storageRoutes,
}
