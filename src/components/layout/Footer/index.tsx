import Info from './components/Info'
import { memo } from 'react'
import logo from '@/assets/logo.ico'
import classes from './index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'

const Footer = memo(() => {
    const { isDarkMode } = useTheme()

    return (
        <div className={classes.footerContainer} style={{ borderTop: isDarkMode ? '1px solid #424242' : '1px solid #fff' }}>
            <div className={classes.footer} style={{ background: isDarkMode ? 'var(--dark)' : 'var(--light)' }}>
                <div className={classes.upperBlock}>
                    <Info />
                </div>

                <div className={classes.lowerBlock}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                            src={logo}
                            style={{ width: '50px', borderRadius: '50%' }}
                            alt="logo"
                        />
                        Fingwin 2024. All rights reserved.
                    </div>
                </div>
            </div>
        </div >
    )
})

export default Footer