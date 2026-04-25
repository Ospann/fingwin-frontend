import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useTranslation } from 'react-i18next'
import FilterModal from './components/Filter'
import { Layout, Table, TableColumnType, Tag } from 'antd'
import { formatNumber } from '@/utils/helpers/formatNumber'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

const { Content } = Layout

type ABCType = 'A' | 'B' | 'C'

type ABCReportType = {
    id: number
    name: string
    revenue: { data: number; category: ABCType }
    margin: { data: number; category: ABCType }
    quantity: { data: number; category: ABCType }
}

export default function ABCReport() {
    const { getURLs } = useURLParameters()
    const { data } = useApi<{ data: ABCReportType[] }>(`finance/abc?${getURLs()}`, {
        revalidateOnMount: true,
    })
    const { t } = useTranslation()

    const getCategoryColor = (category: ABCType) => {
        switch (category) {
            case 'A':
                return 'green'
            case 'B':
                return 'gold'
            case 'C':
                return 'red'
            default:
                return 'default'
        }
    }

    const columns: TableColumnType<ABCReportType>[] = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('Продукт'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('Выручка'),
            dataIndex: 'revenue',
            key: 'revenue',
            render: (revenue: ABCReportType['revenue']) => (
                <span>
                    {formatNumber(revenue.data)}{' '}
                    <Tag color={getCategoryColor(revenue.category)}>{revenue.category}</Tag>
                </span>
            ),
        },
        {
            title: t('Маржа'),
            dataIndex: 'margin',
            key: 'margin',
            render: (margin: ABCReportType['margin']) => (
                <span>
                    {formatNumber(margin.data)}{' '}
                    <Tag color={getCategoryColor(margin.category)}>{margin.category}</Tag>
                </span>
            ),
        },
        {
            title: t('Кол-во'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: ABCReportType['quantity']) => (
                <span>
                    {formatNumber(quantity.data)}{' '}
                    <Tag color={getCategoryColor(quantity.category)}>{quantity.category}</Tag>
                </span>
            ),
        },
    ]

    return (
        <Layout>
            <Content>
                <div className={classes.rightBlock}>
                    <Breadcrumbs />
                    <FilterModal />
                </div>
                <Table
                    dataSource={data?.data?.map((item) => ({ ...item, key: item.id })) ?? []}
                    columns={columns}
                    pagination={{ pageSize: 20 }}
                    bordered
                />
            </Content>
        </Layout>
    )
}
