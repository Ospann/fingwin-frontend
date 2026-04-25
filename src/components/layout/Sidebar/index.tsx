import { Layout, Flex, Button } from 'antd'
import {
    DollarOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    AppstoreOutlined,
    DatabaseOutlined,
    ShopOutlined,
    MenuOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import {
    FINANCE_ROUTE,
    SALES_ROUTE,
    PURCHASE_ROUTE,
    PRODUCTION_ROUTE,
    ADMIN_ROUTE,
    STORAGE_ROUTE,
} from '@/utils/routes/routes.consts'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/utils/providers/Context'
import { UserRoles } from '@/utils/types/user.type'
import { useTheme } from '@/components/ui/Themed/theme-provider'
import classes from './index.module.css'

const { Sider } = Layout

const SIDEBAR_CONSTS = [
    {
        icon: <DollarOutlined style={{ fontSize: 22 }} className={classes.icon} />,
        route: FINANCE_ROUTE,
        access: 'Финансы',
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        icon: <ShopOutlined style={{ fontSize: 22 }} className={classes.icon} />,
        route: SALES_ROUTE,
        access: 'Продажи',
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        icon: <SettingOutlined style={{ fontSize: 22 }} className={classes.icon} />,
        route: ADMIN_ROUTE,
        access: 'Админ панель',
        roles: [UserRoles.ADMIN],
    },
    {
        icon: <ShoppingCartOutlined style={{ fontSize: 22 }} className={classes.icon} />,
        route: PURCHASE_ROUTE,
        access: 'Закуп',
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        icon: <AppstoreOutlined style={{ fontSize: 22 }} className={classes.icon} />,
        route: PRODUCTION_ROUTE,
        access: 'Производство',
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    {
        icon: <DatabaseOutlined style={{ fontSize: 22 }} className={classes.icon} />,
        route: STORAGE_ROUTE,
        access: 'Склад',
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
]

type SidebarProps = {
    onMenuClick: () => void
}

export default function Sidebar({ onMenuClick }: SidebarProps) {
    const { t } = useTranslation()
    const { user } = useAppContext()
    const navigate = useNavigate()
    const { isDarkMode } = useTheme()

    return (
        <Sider
            width={70}
            style={{
                position: 'sticky',
                top: 0,
                height: '100dvh',
                padding: '16px',
                background: isDarkMode ? 'var(--dark)' : 'var(--light)',
                borderRight: isDarkMode ? '1px solid #424242' : '1px solid #e6e6e6',
            }}
        >
            <Flex vertical align="center" gap={16} style={{ position: 'sticky', top: '20px' }}>
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ fontSize: 22 }} />}
                    onClick={onMenuClick}
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                    }}
                />
                {SIDEBAR_CONSTS.filter(
                    (s) =>
                        user?.forms.includes(s.access) &&
                        s.roles?.includes(user?.role as UserRoles),
                ).map((item, index) => (
                    <Button
                        key={index}
                        type="text"
                        onClick={() => navigate(item.route)}
                        className={classes.button}
                    >
                        {item.icon}
                        <span className={classes.iconText}>{t(item.access)}</span>
                    </Button>
                ))}
            </Flex>
        </Sider>
    )
}
