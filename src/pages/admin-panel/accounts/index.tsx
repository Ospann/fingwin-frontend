import { Table, Button, Input, Space, Modal, TableColumnType, Layout, message } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import AccountModal from './components/account-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useAccountList } from './hooks/use-account-list'
import { FinanceAccountType } from '@/utils/types/finance.types'

const { Content } = Layout
const { Search } = Input

export default function Account() {
    const [messageApi, messageContext] = message.useMessage()
    const {
        t,
        data,
        isOpen,
        setIsOpen,
        selected,
        setSelected,
        isConfirmOpen,
        setIsConfirmOpen,
        handleClose,
        confirmDelete,
        search,
        setSearch,
        getParam,
        setParam,
    } = useAccountList(messageApi)

    const columns: TableColumnType<FinanceAccountType>[] = [
        {
            title: t('Имя'),
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: t('Валюта'),
            dataIndex: 'currency',
            key: 'currency',
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
                <title>{t('Редактирование Счетов')}</title>
            </Helmet>
            <Content>
                {messageContext}
                <Breadcrumbs />
                <div className={classes.upcontainer}>
                    <div className={classes.searchContainer}>
                        <Search
                            placeholder={t('Поиск') + '...'}
                            defaultValue={getParam('search') ?? ''}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={(value) => setParam('search', value)}
                            onPressEnter={() => setParam('search', search)}
                            style={{ width: '40%' }}
                            allowClear
                        />
                    </div>
                    <Button type="primary" onClick={() => setIsOpen(true)}>
                        {t('Новый счет')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((account) => ({ ...account, key: account.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <AccountModal data={selected} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Счет')}?
                </Modal>
            </Content>
        </Layout>
    )
}
