import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Table, Button, Space, Modal, notification, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { useApi } from '@/utils/services'
import { deleteReturn } from '@/utils/services/return.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { SALES_RETURN_ROUTE } from '@/utils/routes/routes.consts'
import { formatNumber } from '@/utils/helpers/formatNumber'
import type { ReturnHistoryType } from '@/utils/types/sales.types'

import FilterDrawer from './components/filter-drawer'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

const { Content } = Layout

export default function ReturnsHistory() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { getURLs } = useURLParameters()
    const { data: returns, mutate } = useApi<{ data: ReturnHistoryType[] }>(
        `returns?${getURLs()}`,
        { revalidateOnMount: true },
    )

    const [filterOpen, setFilterOpen] = useState(false)

    const handleDelete = (record: ReturnHistoryType) => {
        Modal.confirm({
            title: t('Вы уверены, что хотите удалить этот возврат?'),
            okText: t('Удалить'),
            cancelText: t('Отмена'),
            onOk: () => {
                deleteReturn(record.id).then((res) => {
                    notification.success({
                        message: res.message,
                    })
                    mutate()
                })
            },
        })
    }

    const columns: TableColumnType<ReturnHistoryType>[] = useMemo(
        () => [
            {
                title: '№',
                dataIndex: 'id',
            },
            {
                title: t('Дата'),
                dataIndex: 'date',
            },
            {
                title: t('Клиент'),
                dataIndex: 'client',
            },
            {
                title: t('Автор'),
                dataIndex: 'user',
            },
            {
                title: t('Кол-во позиции'),
                dataIndex: 'count',
                align: 'right' as const,
                render: (_, record: ReturnHistoryType) => formatNumber(+record.count),
            },
            {
                title: t('Сумма'),
                dataIndex: 'sum',
                align: 'right' as const,
                render: (_, record: ReturnHistoryType) => formatNumber(+record.total),
            },
            {
                title: t('Действия'),
                key: 'actions',
                render: (_, record: ReturnHistoryType) => (
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => navigate(`${SALES_RETURN_ROUTE}/${record.id}`)}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => handleDelete(record)}
                        />
                    </Space>
                ),
            },
        ],
        [navigate, t],
    )

    return (
        <Layout>
            <Helmet>
                <title>История Продаж</title>
            </Helmet>
            <Content>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Breadcrumbs />
                    <Button type="default" onClick={() => setFilterOpen(true)}>
                        {t('Фильтры')}
                    </Button>
                </div>

                <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />

                <Table<ReturnHistoryType>
                    rowKey="id"
                    dataSource={returns?.data ?? []}
                    columns={columns}
                    pagination={{ pageSize: 20 }}
                />
            </Content>
        </Layout>
    )
}
