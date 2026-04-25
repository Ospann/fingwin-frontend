import { Table, Button, Input, Space, Modal, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import UserModal from './components/user-modal'
import classes from './index.module.css'
import { useUserList } from './hooks/use-user-list'
import { UserTypes } from '@/utils/services/user.service'

const { Content } = Layout
const { Search } = Input

export default function AdminUser() {
    const { t } = useTranslation()
    const {
        data,
        selectedUser,
        setSelectedUser,
        isOpen,
        setIsOpen,
        search,
        setSearch,
        isConfirmOpen,
        setIsConfirmOpen,
        setParam,
        handleClose,
        confirmDelete,
    } = useUserList()

    const columns: TableColumnType<UserTypes>[] = [
        {
            title: t('Имя'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('Фамилия'),
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('Телефон'),
            dataIndex: 'phone',
            key: 'phone',
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
                <title>{t('Редактирование пользователей')}</title>
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
                            style={{ width: '50%' }}
                            allowClear
                        />
                    </div>
                    <Button type="primary" onClick={() => setIsOpen(true)}>
                        {t('Новый пользователь')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((user) => ({ ...user, key: user.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <UserModal data={selectedUser} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Пользователя')}?
                </Modal>
            </Content>
        </Layout>
    )
}