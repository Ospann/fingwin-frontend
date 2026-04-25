import { Spin, Table, TableColumnType, Layout } from 'antd'
import { Helmet } from 'react-helmet'
import { monthsConsts } from '@/utils/constants/month.consts'
import { rowColors } from '@/utils/constants/rowColouts'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import YearSelect from '@/components/shared/YearSelect'
import styles from './index.module.css'
import { Button } from 'antd'
import { usePNLReport } from './hooks/use-pnl-report'

const { Content } = Layout

type PNLRow = {
    key: string
    name: string
    isMainRow: boolean
    bgColor?: string
} & Record<string, string | number | null | undefined | boolean>

export default function PNLReport() {
    const { t } = useTranslation()
    const { data, loading, isLoading, settings, handleRefresh } = usePNLReport()

    const columns: TableColumnType[] = [
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
            render: (value: string | number | null | undefined) => (typeof value === 'string' ? value : formatNumber(value ?? undefined)),
        })),
    ]


    const tableData: PNLRow[] = []
    if (data) {
        Object.keys(data).forEach((pnlData) => {
            const detail = data[pnlData].details
            const rowData: PNLRow = {
                key: pnlData,
                name: pnlData,
                isMainRow: true,
                bgColor: rowColors[pnlData],
            }

            monthsConsts.forEach((_, index) => {
                rowData[`month_${index + 1}`] = data[pnlData].data[index + 1]
            })

            tableData.push(rowData)

            Object.keys(detail).forEach((detailKey) => {
                const detailRowData: PNLRow = {
                    key: `${pnlData}_${detailKey}`,
                    name: detailKey,
                    isMainRow: false,
                }

                monthsConsts.forEach((_, index) => {
                    detailRowData[`month_${index + 1}`] = detail[detailKey][index + 1]
                })

                tableData.push(detailRowData)
            })
        })
    }

    return (
        <Layout>
            <Helmet>
                <title>Отчет о прибылях и убытках</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                <div className={styles.header}>
                    <YearSelect />
                    <Button
                        type="primary"
                        loading={isLoading}
                        onClick={handleRefresh}
                        style={{ width: 'fit-content' }}
                    >
                        {t('Обновить')}
                    </Button>
                </div>
                <p>
                    {t('Обновлено')}:{' '}
                    {settings?.find((setting) => setting.parametr === 'pnl_refresh')?.value}
                </p>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                        className={styles.table}
                        rowClassName={(record) =>
                            record.isMainRow ? styles.mainRow : ''
                        }
                        onRow={(record) => ({
                            style: record.bgColor ? { backgroundColor: record.bgColor } : {},
                        })}
                    />
                )}
            </Content>
        </Layout>
    )
}