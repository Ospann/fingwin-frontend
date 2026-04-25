import { Helmet } from 'react-helmet'
import { Layout, Tabs, Typography } from 'antd'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useEffect } from 'react'
import { FINANCE_HISTORY_ROUTE } from '@/utils/routes/routes.consts'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Income from './components/Income'
import Expense from './components/Expense'
import Transfer from './components/Transfer'
import classes from './index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'

const { Content } = Layout

const FinanceInputType = {
    expense: '1',
    income: '2',
    transfer: '3',
}

const QUERY = 'type'

export default function FinanceInput() {
    const { setParam, getParam } = useURLParameters()
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()
    const currentType = getParam(QUERY) || FinanceInputType.expense

    useEffect(() => {
        if (!getParam(QUERY)) {
            setParam(QUERY, FinanceInputType.expense)
        }
    }, [])

    const handleTabChange = (key: string) => {
        const typeMap: Record<string, string> = {
            expense: FinanceInputType.expense,
            income: FinanceInputType.income,
            transfer: FinanceInputType.transfer,
        }
        setParam(QUERY, typeMap[key])
    }

    const items = [
        {
            key: 'expense',
            label: t('Расход'),
            children: <Expense />,
        },
        {
            key: 'income',
            label: t('Приход'),
            children: <Income />,
        },
        {
            key: 'transfer',
            label: t('Перевод'),
            children: <Transfer />,
        },
    ]

    return (
        <Layout>
            <Helmet>
                <title>Финансы Ввод</title>
            </Helmet>
            <Content>
                <div className={classes.container}>
                    <Breadcrumbs />

                    <Tabs
                        defaultActiveKey="expense"
                        activeKey={
                            currentType === FinanceInputType.income
                                ? 'income'
                                : currentType === FinanceInputType.transfer
                                    ? 'transfer'
                                    : 'expense'
                        }
                        items={items}
                        onChange={handleTabChange}
                        className={classes.tabs}
                        style={{ background: isDarkMode ? '#1f1f1f' : '#fff', border: isDarkMode ? '1px solid #424242' : '1px solid #fff' }}
                    />

                    <div className={classes.historyBlock}>
                        <Typography.Link href={FINANCE_HISTORY_ROUTE}>
                            {t('История транзакций')}
                        </Typography.Link>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}