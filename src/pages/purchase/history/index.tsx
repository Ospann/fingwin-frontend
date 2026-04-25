import { Button, Table, Modal, Layout } from 'antd'
import { DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import FilterModal from './components/filter-drawer'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { usePurchaseHistory } from './hooks/use-purchase-history'
import type { ColumnsType } from 'antd/es/table'
import type { PurchaseHistoryType } from '@/utils/types/purchase.types'

const { Content } = Layout

export default function PurchaseHistory() {
    const { t } = useTranslation()
    const { purchases, selected, setSelected, handleDelete, handleDownload, handleEdit } =
        usePurchaseHistory()

    const columns: ColumnsType<PurchaseHistoryType> = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: t('Дата'),
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: t('Поставщик'),
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: t('Автор'),
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: t('Кол-во позиции'),
            dataIndex: 'count',
            key: 'count',
            align: 'right',
            render: (value) => value?.toLocaleString(),
        },
        {
            title: t('Сумма'),
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (value) => value?.toLocaleString(),
        },
        {
            title: t('Действия'),
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.id)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setSelected(record)}
                    />
                </div>
            ),
        },
    ]

    return (
        <Layout>
            <Helmet>
                <title>История Закупок</title>
            </Helmet>
            <Content>
                <div className={classes.upcontainer}>
                    <Breadcrumbs />
                    <div className={classes.rightBlock}>
                        <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                            {t('Скачать')}
                        </Button>
                        <FilterModal />
                    </div>
                </div>

                <Table
                    dataSource={purchases ?? []}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: 20,
                        showSizeChanger: true,
                        showTotal: (total) => `${t('Всего')}: ${total}`,
                    }}
                />

                <Modal
                    title={t('Подтверждение удаления')}
                    open={!!selected}
                    onOk={handleDelete}
                    onCancel={() => setSelected(undefined)}
                    okText={t('Удалить')}
                    cancelText={t('Отмена')}
                    okButtonProps={{ danger: true }}
                >
                    {t('Вы уверены, что хотите удалить закупку')} #{selected?.id}?
                </Modal>
            </Content>
        </Layout>
    )
}