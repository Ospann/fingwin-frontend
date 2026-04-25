import { Table, Button, Input, Space, Modal, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import StorageModal from './components/storage-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useTranslation } from 'react-i18next'
import { useStorageList } from './hooks/use-storage-list'
import { StorageType } from '@/utils/services/storage.service'

const { Content } = Layout
const { Search } = Input

export default function Storage() {
    const { t } = useTranslation()
    const {
        data,
        isOpen,
        setIsOpen,
        selected,
        setSelected,
        search,
        setSearch,
        setParam,
        isConfirmOpen,
        setIsConfirmOpen,
        confirmDelete,
        handleClose,
    } = useStorageList()

    const columns: TableColumnType<StorageType>[] = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: t('Склад'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('Описание'),
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: t('Действия'),
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelected(record)
                            setIsOpen(true)
                        }}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setSelected(record)
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
                <title>{t('Редактирование складов')}</title>
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
                        {t('Новый Склад')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((storage) => ({ ...storage, key: storage.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <StorageModal data={selected} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Склад')}?
                </Modal>
            </Content>
        </Layout>
    )
}