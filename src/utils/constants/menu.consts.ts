import * as routes from '../routes/routes.consts'
import { UserRoles } from '../types/user.type'
import {
    UserOutlined,
    TeamOutlined,
    AppstoreOutlined,
    ShopOutlined,
    FileTextOutlined,
    BankOutlined,
    FolderOpenOutlined,
    DatabaseOutlined,
    ApiOutlined,
    EditOutlined,
    HistoryOutlined,
    BarChartOutlined,
    SyncOutlined,
    PieChartOutlined,
    CloudUploadOutlined,
    DashboardOutlined,
    FileSearchOutlined,
    DollarCircleOutlined,
} from '@ant-design/icons'

export const MenuItems = [
    {
        title: 'Админ панель',
        path: routes.ADMIN_ROUTE,
        submenu: [
            {
                path: routes.ADMIN_USER_ROUTE,
                label: 'Пользователи',
                icon: UserOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_SUPPLIER_ROUTE,
                label: 'Поставщики',
                icon: TeamOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_PRODUCT_ROUTE,
                label: 'Продукция',
                icon: AppstoreOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_CLIENT_ROUTE,
                label: 'Клиенты',
                icon: ShopOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_RECIPE_ROUTE,
                label: 'Рецепты',
                icon: FileTextOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_ACCOUNT_ROUTE,
                label: 'Счета',
                icon: BankOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_CATEGORY_ROUTE,
                label: 'Категории',
                icon: FolderOpenOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_STORAGE_ROUTE,
                label: 'Склад',
                icon: DatabaseOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.ADMIN_INTEGRATION_ROUTE,
                label: 'Интеграция',
                icon: ApiOutlined,
                roles: [UserRoles.ADMIN],
            },
        ],
    },
    {
        title: 'Закуп',
        path: routes.PURCHASE_ROUTE,
        submenu: [
            {
                path: routes.PURCHASE_INPUT_ROUTE,
                label: 'Ввод',
                icon: EditOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.PURCHASE_HISTORY_ROUTE,
                label: 'История',
                icon: HistoryOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.PURCHASE_REPORT_ROUTE,
                label: 'Отчет по кредиторской задолженности',
                icon: FileSearchOutlined,
                roles: [UserRoles.ADMIN],
            },
        ],
    },
    {
        title: 'Продажи',
        path: routes.SALES_ROUTE,
        submenu: [
            {
                path: routes.SALES_INPUT_ROUTE,
                label: 'Ввод',
                icon: EditOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.SALES_HISTORY_ROUTE,
                label: 'История',
                icon: HistoryOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.SALES_ANALYTICS,
                label: 'Аналитика',
                icon: BarChartOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.SALES_RETURN_ROUTE,
                label: 'Возвраты',
                icon: SyncOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.SALES_RETURN_HISTORY_ROUTE,
                label: 'История возвратов',
                icon: FileTextOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
        ],
    },
    {
        title: 'Производство',
        path: routes.PRODUCTION_ROUTE,
        submenu: [
            {
                path: routes.PRODUCTION_INPUT_ROUTE,
                label: 'Ввод',
                icon: EditOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.PRODUCTION_HISTORY_ROUTE,
                label: 'История',
                icon: HistoryOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
        ],
    },
    {
        title: 'Финансы',
        path: routes.FINANCE_ROUTE,
        submenu: [
            {
                path: routes.FINANCE_INPUT_ROUTE,
                label: 'Ввод',
                icon: EditOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.FINANCE_HISTORY_ROUTE,
                label: 'История',
                icon: HistoryOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.FINANCE_PNLREPORT_ROUTE,
                label: 'Отчет о прибылях и убытках',
                icon: FileSearchOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.FINANCE_REPORT_ROUTE,
                label: 'Движение денег',
                icon: DollarCircleOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.FINANCE_ANALYTICS,
                label: 'Аналитика',
                icon: PieChartOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
            {
                path: routes.FINANCE_UPLOAD,
                label: 'Выгрузка с Kaspi',
                icon: CloudUploadOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.FINANCE_DASHBOARD,
                label: 'Дашборд',
                icon: DashboardOutlined,
                roles: [UserRoles.ADMIN],
            },
            {
                path: routes.FINANCE_ABC,
                label: 'Отчет ABC',
                icon: BarChartOutlined,
                roles: [UserRoles.ADMIN],
            },
        ],
    },
    {
        title: 'Склад',
        path: routes.STORAGE_ROUTE,
        submenu: [
            {
                path: routes.STORAGE_REMAIN_ROUTE,
                label: 'Остатки',
                icon: DatabaseOutlined,
                roles: [UserRoles.ADMIN, UserRoles.MANAGER],
            },
        ],
    },
]
