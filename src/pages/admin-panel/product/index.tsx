import { Table, Button, Input, Space, Modal, TableColumnType, Layout, message } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import UploadProductModal from './components/upload-modal'
import ProductModal from './components/product-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useProductList } from './hooks/use-product-list'
import { ProductType } from '@/utils/services/product.service'

const { Content } = Layout
const { Search } = Input

export default function AdminProduct() {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const {
        data,
        isOpen,
        setIsOpen,
        isUploadOpen,
        setIsUploadOpen,
        selected,
        setSelected,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    } = useProductList(messageApi)

    const columns: TableColumnType<ProductType>[] = [
        {
            title: t('Наименование'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('Описание'),
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (text.length > 50 ? text.slice(0, 50) + '...' : text),
        },
        {
            title: t('Е.И.'),
            dataIndex: 'uom',
            key: 'uom',
        },
        {
            title: t('Тип'),
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: t('Источник'),
            dataIndex: 'isWB',
            key: 'isWB',
            render: (isWB: boolean) => (isWB ? 'WildBerries' : 'Fingwin'),
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
                <title>{t('Редактирование продуктов')}</title>
            </Helmet>
            <Content>
                {messageContext}
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
                    <Space>
                        <Button type="default" onClick={() => setIsUploadOpen(true)}>
                            {t('Загрузить с Wildberries')}
                        </Button>
                        <Button type="primary" onClick={() => setIsOpen(true)}>
                            {t('Новый продукт')}
                        </Button>
                    </Space>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((product) => ({ ...product, key: product.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <ProductModal data={selected} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Продукт')}?
                </Modal>
                <UploadProductModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            </Content>
        </Layout>
    )
}
