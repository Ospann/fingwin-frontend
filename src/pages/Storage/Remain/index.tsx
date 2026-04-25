import { Table, Button, Layout } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useRemainReport } from './hooks/use-remain-report'
import FilterModal from './components/Filter'
// import CorrectModal from './components/correct-modal'
import classes from './index.module.css'
import type { ColumnsType } from 'antd/es/table'
import type { RemainReportType } from './hooks/use-remain-report'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

const { Content } = Layout

export default function RemainReport() {
    const { data, handleDownload, totalSum, isLoading } = useRemainReport()
    const { t } = useTranslation()

    const columns: ColumnsType<RemainReportType> = [
        {
            title: t('Продукт'),
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: t('Кол-во'),
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'right',
            render: (value) => value?.toLocaleString(),
        },
        {
            title: t('Итого'),
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (value) => value?.toLocaleString(),
        },
    ]

    return (
        <Layout>
            <Content>
                <Breadcrumbs />
                <div className={classes.upcontainer}>
                    {/* <CorrectModal /> */}
                    <div className={classes.rightBlock}>
                        <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                            {t('Скачать')}
                        </Button>
                        <FilterModal />
                    </div>
                </div>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={(_, index) => index?.toString() || '0'}
                    loading={isLoading}
                    pagination={false}
                    summary={() => (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="right">
                                    <strong>{totalSum?.toLocaleString()}</strong>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </Content>
        </Layout>
    )
}
