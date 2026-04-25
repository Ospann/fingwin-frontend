import { Table, Button, Input, Space, Modal, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import SupplierModal from './components/supplier-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useSupplierList } from './hooks/use-supplier-list'
import { SupplierType } from '@/utils/services/supplier.service'

const { Content } = Layout
const { Search } = Input

export default function AdminSupplier() {
    const { t } = useTranslation()
    const {
        isOpen,
        setIsOpen,
        selectedUser,
        setSelectedUser,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        data,
        confirmDelete,
        handleClose,
    } = useSupplierList()

    const columns: TableColumnType<SupplierType>[] = [
        {
            title: t('Имя'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('Адрес'),
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: t('Телефон'),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: t('Email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('БИН'),
            dataIndex: 'bin',
            key: 'bin',
        },
        {
            title: t('Действия'),
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedUser(record)
                            setIsOpen(true)
                        }}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setSelectedUser(record)
                            setIsConfirmOpen(true)
                        }}
                    />
                </Space>
            ),
        },
    ]

    return (
        <Layout>
            <Helmet>
                <title>{t('Редактирование поставщиков')}</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                <div className={classes.upcontainer}>
                    <div className={classes.searchContainer}>
                        <Search
                            placeholder={t('Поиск') + '...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={(value) => setParam('search', value)}
                            onPressEnter={() => setParam('search', search)}
                            style={{ width: '40%' }}
                            allowClear
                        />
                    </div>
                    <Button type="primary" onClick={() => setIsOpen(true)}>
                        {t('Новый поставщик')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((supplier) => ({ ...supplier, key: supplier.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <SupplierModal data={selectedUser} isOpen={isOpen} onClose={handleClose} />
                <Modal
                    title={
                        <Space>
                            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                            {t('Подтверждение удаления')}
                        </Space>
                    }
                    open={isConfirmOpen}
                    onOk={confirmDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                    okText={t('Удалить')}
                    cancelText={t('Отмена')}
                    okButtonProps={{ danger: true }}
                >
                    {t('Вы уверены, что хотите удалить')} {t('Поставщика')}?
                </Modal>
            </Content>
        </Layout>
    )
}