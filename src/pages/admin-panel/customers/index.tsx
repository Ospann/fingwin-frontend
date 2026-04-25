import { Table, Button, Input, Space, Modal, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import ClientModal from './components/customer-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useTranslation } from 'react-i18next'
import { useCustomerList } from './hooks/use-customer-list'
import { ClientType } from '@/utils/services/client.service'

const { Content } = Layout
const { Search } = Input

export default function AdminClient() {
    const { t } = useTranslation()
    const {
        data,
        isOpen,
        setIsOpen,
        selectedUser,
        setSelectedUser,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    } = useCustomerList()

    const columns: TableColumnType<ClientType>[] = [
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
                <title>Редактирование клиентов</title>
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
                        {t('Новый клиент')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((client) => ({ ...client, key: client.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <ClientModal data={selectedUser} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Клиента')}?
                </Modal>
            </Content>
        </Layout>
    )
}