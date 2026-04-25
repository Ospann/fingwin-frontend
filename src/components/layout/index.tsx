import { ReactNode, useMemo, useState } from 'react'
import { Layout as AntLayout } from 'antd'
import { useAppContext } from '@/utils/providers/Context'
import { detectMobile } from '@/utils/helpers/detectMobile'
import { useTheme } from '../ui/Themed/theme-provider'
import Header from '../layout/Header'
import Sidebar from './Sidebar'
import Menu from './Menu'
import Footer from './Footer'
import classes from './index.module.css'

const { Content } = AntLayout

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const { user } = useAppContext()
    const isMobile = useMemo(() => detectMobile(), [])
    const { isDarkMode } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <AntLayout
            style={{
                minHeight: '100dvh',
                background: isDarkMode ? 'var(--dark-light)' : 'var(--bg-color, #e6e6e6)',
            }}
        >
            {user && !isMobile && <Sidebar onMenuClick={() => setIsMenuOpen(true)} />}

            <AntLayout style={{ flex: 1 }}>
                <Header onMenuClick={() => setIsMenuOpen(true)} />
                <Content className={classes.content}>{children}</Content>
                <Footer />
            </AntLayout>

            {user && <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
        </AntLayout>
    )
}

export default Layout
