import { Table, Button, Input, Space, Modal, TableColumnType, Layout } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import CategoryModal from './components/category-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useTranslation } from 'react-i18next'
import { useCategoryList } from './hooks/use-category-list'
import { FinanceCategory } from '@/utils/types/finance.types'

const { Content } = Layout
const { Search } = Input

export default function Category() {
    const { t } = useTranslation()
    const {
        data,
        isOpen,
        setIsOpen,
        selected,
        setSelected,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    } = useCategoryList()

    const columns: TableColumnType<FinanceCategory>[] = [
        {
            title: t('Категория'),
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: t('Тип'),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: t('ОПИУ категория'),
            dataIndex: 'pnlTypeName',
            key: 'pnlTypeName',
        },
        {
            title: t('ДДС категория'),
            dataIndex: 'cashflowTypeName',
            key: 'cashflowTypeName',
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
                <title>Редактирование категории</title>
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
                        {t('Новая категория')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((category) => ({ ...category, key: category.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <CategoryModal data={selected} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Категорию')}?
                </Modal>
            </Content>
        </Layout>
    )
}