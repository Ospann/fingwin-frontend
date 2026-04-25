import { Helmet } from 'react-helmet'
import { Table, Modal, Layout } from 'antd'
import FilterDrawer from './components/filter-drawer'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useProductionHistory } from './hooks/use-production-history'
import type { ColumnsType } from 'antd/es/table'
import type { PurchaseHistoryType } from '@/utils/types/purchase.types'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { PRODUCTION_INPUT_ROUTE } from '@/utils/routes/routes.consts'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout

export default function ProductionHistory() {
    const navigate = useNavigate()
    const { t, data, selected, setSelected, handleDelete, isLoading } = useProductionHistory()

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

    const handleEdit = (id: number) => {
        navigate(`${PRODUCTION_INPUT_ROUTE}/${id}`)
    }

    return (
        <Layout>
            <Helmet>
                <title>История Производства</title>
            </Helmet>
            <Content>
                <div className={classes.upcontainer}>
                    <Breadcrumbs />
                    <FilterDrawer />
                </div>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey="id"
                    loading={isLoading}
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