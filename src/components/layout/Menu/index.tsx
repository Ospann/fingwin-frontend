import { Drawer, Collapse, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuItems } from '@/utils/constants/menu.consts';
import { useAppContext } from '@/utils/providers/Context';
import { useTranslation } from 'react-i18next';
import classes from './index.module.css';

type MenuProps = {
    isOpen: boolean
    onClose: () => void
}

export default function Menu({ isOpen, onClose }: MenuProps) {
    const { user } = useAppContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigate = (route: string) => {
        onClose()
        navigate(route)
    }

    return (
        <Drawer
            title={t('Меню')}
            placement="left"
            onClose={onClose}
            open={isOpen}
        >
            <Collapse accordion className={classes.drawerBody}>
                {MenuItems.map(
                    (MenuItem) =>
                        user?.forms.includes(MenuItem.title) && (
                            <Collapse.Panel
                                key={MenuItem.title}
                                header={
                                    <Typography.Link
                                        onClick={() => handleNavigate(MenuItem.path)}
                                        strong
                                    >
                                        {t(MenuItem.title)}
                                    </Typography.Link>
                                }
                            >
                                {MenuItem.submenu.length > 0 &&
                                    MenuItem.submenu.map(({ label, path }) => (
                                        <div
                                            key={path}
                                            className={classes.submenu}
                                            style={{ marginBottom: '8px' }}
                                        >
                                            <Typography.Link
                                                onClick={() => handleNavigate(path)}
                                            >
                                                {t(label)}
                                            </Typography.Link>
                                        </div>
                                    ))}
                            </Collapse.Panel>
                        ),
                )}
            </Collapse>
        </Drawer>
    );
}