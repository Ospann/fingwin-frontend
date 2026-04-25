import { Input, Layout, Table } from 'antd'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import classes from './index.module.css'
import { useDebtReport } from './hooks/use-debt-report'
import type { ColumnsType } from 'antd/es/table'
import type { DebtReportType } from './hooks/use-debt-report'

const { Content } = Layout

export default function DebtReport() {
    const { t } = useTranslation()
    const { search, setSearch, setParam, filteredData } = useDebtReport()

    const columns: ColumnsType<DebtReportType> = [
        {
            title: t('Поставщик'),
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: t('Долг'),
            dataIndex: 'debt',
            key: 'debt',
            align: 'right',
            render: (value) => value?.toLocaleString(),
        },
        {
            title: t('Необходимо оплатить'),
            dataIndex: 'needToPay',
            key: 'needToPay',
            align: 'right',
            render: (value) => value?.toLocaleString(),
        },
    ]

    return (
        <Layout>
            <Helmet>
                <title>Отчет по кредиторской задолженности</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                <div className={classes.upcontainer}>
                    <div className={classes.searchContainer}>
                        <Input
                            placeholder={t('Поиск') + '...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onBlur={() => setParam('search', search)}
                            onPressEnter={() => setParam('search', search)}
                            style={{ width: '50%' }}
                            allowClear
                        />
                    </div>
                </div>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="supplierId"
                    pagination={{
                        pageSize: 20,
                        showSizeChanger: true,
                        showTotal: (total) => `${t('Всего')}: ${total}`,
                    }}
                />
            </Content>
        </Layout>
    )
}