import { Layout, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MenuItems } from '@/utils/constants/menu.consts'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import classes from './index.module.css'
import { UserRoles } from '@/utils/types/user.type'
import { useAppContext } from '@/utils/providers/Context'
import { useTheme } from '@/components/ui/Themed/theme-provider'
import Icon from '@ant-design/icons'

const { Content } = Layout
const { Title } = Typography

export default function Module() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()
    const { user } = useAppContext()
    const PAGE = MenuItems.find((item) => item.path === window.location.pathname)

    return (
        <Layout>
            <Helmet>
                <title>{PAGE?.title}</title>
            </Helmet>
            <Content className={classes.container}>
                <Breadcrumbs />
                <div className={classes.grid}>
                    {PAGE?.submenu.map((page) => (
                        <Card
                            hoverable
                            key={page.path}
                            style={{
                                backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)',
                            }}
                            onClick={() => navigate(page.path)}
                            className={`${classes.hoverable} ${page.roles && !page.roles.includes(user?.role as UserRoles)
                                    ? classes.hidden
                                    : ''
                                }`}
                        >
                            <div className={classes.cardBody}>
                                <Icon
                                    style={{ fontSize: 52 }}
                                    component={page.icon as React.ForwardRefExoticComponent<any>}
                                />
                                <Title level={5}>{t(page.label)}</Title>
                            </div>
                        </Card>
                    ))}
                </div>
            </Content>
        </Layout>
    )
}
