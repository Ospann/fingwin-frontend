import { MenuItems } from '@/utils/constants/menu.consts'
import { RightOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classes from './index.module.css'

/**
 * BreadCrumbs Navigation Component
 * @returns
 */
export default function Breadcrumbs() {
    const { pathname, search } = useLocation()
    const { t } = useTranslation()

    const pages = pathname.split('/').filter((page) => page !== '')
    const Module = MenuItems.find((item) => item.path === `/${pages[0]}`)

    return (
        <div className={classes.breadcrumbs}>
            <div className={classes.mainBreadcrumb}>
                <Link className={classes.breadcrumbLink} to={`/${search}`}>
                    {t('Главная')}
                </Link>
                <RightOutlined className={classes.divider} />
            </div>
            {Module && (
                <>
                    <div className={classes.breadcrumb}>
                        <Link className={classes.breadcrumbLink} to={Module.path}>
                            {t(Module.title)}
                        </Link>
                    </div>
                    {pages.length > 1 && (
                        <>
                            <RightOutlined className={classes.divider} />
                            <div className={classes.breadcrumb}>
                                {t(
                                    Module.submenu.find((item) => pathname.includes(item.path))
                                        ?.label ?? '',
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}