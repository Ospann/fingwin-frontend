import { Helmet } from 'react-helmet'
import { Layout, Table } from 'antd'
import { monthsConsts } from '@/utils/constants/month.consts'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { useTranslation } from 'react-i18next'
import YearSelect from '@/components/shared/YearSelect'
import styles from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useCashFlowReport, isFinanceData } from './hooks/use-cashflow-report'

const { Content } = Layout

type MonthValue = string | number | null | undefined;
type CashFlowRow = {
    key: string;
    name: string;
    isMainRow: boolean;
    [monthKey: string]: MonthValue | boolean | undefined;
}

export default function CashFlowReport() {
    const { t } = useTranslation()
    const { data } = useCashFlowReport()

    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left' as const,
            width: 200,
            className: styles.stickyTd,
        },
        ...monthsConsts.map((month, index) => ({
            title: t(month),
            dataIndex: `month_${index + 1}`,
            key: `month_${index + 1}`,
            className: styles.mainRow,
            render: (value: string | number | null | undefined) =>
                typeof value === 'string' ? value : formatNumber(value ?? undefined),
        })),
    ]
    const tableData: CashFlowRow[] = []

    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            if (isFinanceData(value)) {
                const detail = value.details
                const rowData: CashFlowRow = {
                    key: key,
                    name: key,
                    isMainRow: true,
                }

                monthsConsts.forEach((_, index) => {
                    const monthKey = String(index + 1)
                    rowData[`month_${index + 1}`] = value.data[monthKey]
                })

                tableData.push(rowData)

                Object.keys(detail).forEach((detailKey) => {
                    const detailRowData: CashFlowRow = {
                        key: `${key}_${detailKey}`,
                        name: detailKey,
                        isMainRow: false,
                    }

                    monthsConsts.forEach((_, index) => {
                        detailRowData[`month_${index + 1}`] = detail[detailKey][index + 1]
                    })

                    tableData.push(detailRowData)
                })
            } else {
                const rowData: CashFlowRow = {
                    key: key,
                    name: key,
                    isMainRow: true,
                }

                monthsConsts.forEach((_, index) => {
                    rowData[`month_${index + 1}`] = value[index + 1]
                })

                tableData.push(rowData)
            }
        })
    }

    return (
        <Layout>
            <Helmet>
                <title>Движение денег</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                <YearSelect />
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    className={styles.table}
                    rowClassName={(record) =>
                        record.isMainRow ? styles.mainRow : ''
                    }
                />
            </Content>
        </Layout>
    )
}