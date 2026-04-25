import { useTranslation } from 'react-i18next'
import {
    SALES_ROUTE,
    PURCHASE_ROUTE,
    STORAGE_ROUTE,
    PRODUCTION_ROUTE,
    FINANCE_ROUTE,
} from '@/utils/routes/routes.consts'
import classes from '../index.module.css'
/**
 * The Info function displays contact information, quick links, additional information, and a list of
 * hotels with clickable links to their respective pages.
 * @returns The Info component is being returned, which contains information about contact, quick
 * links, additional information, and a list of hotels. The hotels are mapped from the HotelStore and
 * displayed with their names in the language specified by the user. The navigate function is used to
 * redirect the user to the hotel page when a hotel name is clicked.
 */
const Info = () => {
    const { t } = useTranslation()

    return (
        <div className={classes.info}>
            <div className={classes.stack}>
                <b>{t('Контакты')}</b>
                <a href="tel:+87055179898">+7 705 517 98 98</a>
                <a href="mailto:serik@maxinum.co">serik@maxinum.co</a>
            </div>
            <div className={classes.stack}>
                <b>{t('Полезные ссылки')}</b>
                <a href={FINANCE_ROUTE}>{t('Финансы')}</a>
                <a href={SALES_ROUTE}>{t('Продажи')}</a>
                <a href={PURCHASE_ROUTE}>{t('Закуп')}</a>
                <a href={PRODUCTION_ROUTE}>{t('Производство')}</a>
                <a href={STORAGE_ROUTE}>{t('Склад')}</a>
            </div>
            <div className={classes.stack}>
                <a
                    target="blank"
                    href="https://www.termsfeed.com/live/2634a03c-c903-4d52-aefc-b0c9069f39a0"
                >
                    {t('Политика Конфиденциальности')}
                </a>
            </div>
        </div>
    )
}

export default Info