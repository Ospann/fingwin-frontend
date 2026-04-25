import {
    ADMIN_ROUTE,
    PURCHASE_ROUTE,
    FINANCE_ROUTE,
    SALES_ROUTE,
    STORAGE_ROUTE,
    PRODUCTION_ROUTE,
} from '../routes/routes.consts'

export const ACCESS_ROUTES: { [key: string]: string } = {
    'Админ панель': ADMIN_ROUTE,
    Закуп: PURCHASE_ROUTE,
    Финансы: FINANCE_ROUTE,
    Продажи: SALES_ROUTE,
    Склад: STORAGE_ROUTE,
    Производство: PRODUCTION_ROUTE,
}
