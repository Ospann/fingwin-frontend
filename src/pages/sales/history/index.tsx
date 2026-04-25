import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Table, Button, Modal, Space, notification, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons'

import { useApi } from '@/utils/services'
import { deleteSales, uploadExcel } from '@/utils/services/sales.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { SALES_INPUT_ROUTE } from '@/utils/routes/routes.consts'
import { formatNumber } from '@/utils/helpers/formatNumber'
import type { SalesHistoryType } from '@/utils/types/sales.types'

import Breadcrumbs from '@/components/layout/Breadcrumbs'
import FilterDrawer from './components/filter-drawer'

const { Content } = Layout

export default function SalesHistory() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { getURLs } = useURLParameters()
    const { data: salesResponse, mutate } = useApi<{ data: SalesHistoryType[] }>(
        `sales?${getURLs()}`,
        {
            revalidateOnMount: true,
        },
    )
    const sales = salesResponse?.data

    const [selected, setSelected] = useState<SalesHistoryType | undefined>(undefined)
    const [filterOpen, setFilterOpen] = useState(false)

    const handleDelete = () => {
        if (!selected) return
        deleteSales(selected.id).then((res) => {
            notification.success({
                message: res.message,
            })
            setSelected(undefined)
            mutate()
        })
    }

    const showDeleteConfirm = (record: SalesHistoryType) => {
        Modal.confirm({
            title: t('Вы уверены, что хотите удалить эту закупку?'),
            onOk: () => {
                setSelected(record)
                handleDelete()
            },
            okText: t('Удалить'),
            cancelText: t('Отмена'),
        })
    }

    const columns: TableColumnType<SalesHistoryType>[] = useMemo(
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
                render: (_, record: SalesHistoryType) => formatNumber(+record.count),
            },
            {
                title: t('Сумма'),
                dataIndex: 'sum',
                align: 'right' as const,
                render: (_, record: SalesHistoryType) => formatNumber(+record.total),
            },
            {
                title: t('Действия'),
                key: 'actions',
                render: (_, record: SalesHistoryType) => (
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => navigate(`${SALES_INPUT_ROUTE}/${record.id}`)}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteConfirm(record)}
                            danger
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
                    <Space>
                        <Button icon={<DownloadOutlined />} onClick={() => uploadExcel(getURLs())} />
                        <Button onClick={() => setFilterOpen(true)}>{t('Фильтр')}</Button>
                    </Space>
                </div>

                <Table<SalesHistoryType>
                    rowKey="id"
                    dataSource={sales ?? []}
                    columns={columns}
                    pagination={{ pageSize: 20 }}
                />
                <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
            </Content>
        </Layout>
    )
}
