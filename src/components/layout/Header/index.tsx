import { useNavigate } from 'react-router-dom'
import { Dropdown, Avatar, Typography, Select, Space, Button, notification } from 'antd'
import { MoonFilled, SunFilled, UserOutlined, MenuOutlined } from '@ant-design/icons'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '@/utils/routes/routes.consts'
import { useAppContext } from '@/utils/providers/Context'
import { clearSWRCache } from '@/utils/services'
import { useTranslation } from 'react-i18next'
import classes from './index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'
import { detectMobile } from '@/utils/helpers/detectMobile'

const { Title } = Typography

type HeaderProps = {
    onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
    const navigate = useNavigate()
    const { user } = useAppContext()
    const { t, i18n } = useTranslation()
    const { isDarkMode, toggleTheme } = useTheme()

    const handleLogOut = () => {
        localStorage.removeItem('authToken')
        clearSWRCache()
        window.location.replace(LOGIN_ROUTE)
    }

    const handleRefLinkCopy = () => {
        const domain = window.location.origin
        const link = [domain, REGISTRATION_ROUTE, `?ref=${user?.id}`].join('')
        navigator.clipboard.writeText(link)
        notification.success({
            message: t('Ссылка скопирована'),
        })
    }

    const menuItems = [
        {
            key: 'ref-link',
            label: t('Пригласить друзей'),
            onClick: handleRefLinkCopy,
        },
        {
            key: 'logout',
            label: t('Выйти'),
            onClick: handleLogOut,
        },
    ]

    return (
        <div
            className={classes.container}
            style={{
                backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)',
                borderBottom: isDarkMode ? '1px solid #424242' : '1px solid #fff'
            }}
        >
            <div className={classes.logo}>
                {detectMobile() && user && (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ fontSize: 22 }} />}
                        onClick={onMenuClick}
                    />
                )}
                <Title
                    level={4}
                    className={classes.title}
                    onClick={() => user && navigate(MAIN_ROUTE)}
                    style={{ margin: 0, cursor: user ? 'pointer' : 'default' }}
                >
                    {user ? user.companyName : 'FingWin'}
                </Title>
            </div>

            <Space className={classes.logo}>
                <Button
                    type="text"
                    shape="circle"
                    icon={isDarkMode ? <SunFilled /> : <MoonFilled />}
                    onClick={toggleTheme}
                />
                <Select
                    defaultValue={localStorage.getItem('lang') || 'ru'}
                    onChange={(value) => {
                        i18n.changeLanguage(value)
                        localStorage.setItem('lang', value)
                    }}
                    options={[
                        { value: 'ru', label: 'RU' },
                        { value: 'kz', label: 'KZ' },
                        { value: 'en', label: 'EN' },
                    ]}
                    style={{ width: 70 }}
                    size="middle"
                />

                {user && (
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button type="text" shape="circle" style={{ padding: 0 }}>
                            <Avatar
                                icon={<UserOutlined />}
                                src={undefined}
                                size="small"
                                style={{ backgroundColor: '#ccc' }}
                            />
                        </Button>
                    </Dropdown>
                )}
            </Space>
        </div>
    )
}