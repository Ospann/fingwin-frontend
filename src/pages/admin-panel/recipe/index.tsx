import { Table, Button, Input, Space, Modal, TableColumnType, Layout, message } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import RecipeModal from './components/recipe-modal'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useRecipeList } from './hooks/use-recipe-list'
import { RecipeType } from '@/utils/types/recipe.types'

const { Content } = Layout
const { Search } = Input

export default function Recipe() {
    const [messageApi, messageContext] = message.useMessage()
    const { t } = useTranslation()
    const {
        data,
        isOpen,
        setIsOpen,
        isConfirmOpen,
        setIsConfirmOpen,
        selected,
        setSelected,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    } = useRecipeList(messageApi)

    const columns: TableColumnType<RecipeType>[] = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: t('Продукт'),
            dataIndex: 'productName',
            key: 'productName',
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
                <title>{t('Редактирование рецептов')}</title>
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
                    <Button type="primary" onClick={() => setIsOpen(true)}>
                        {t('Новый рецепт')}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.map((recipe) => ({ ...recipe, key: recipe.id }))}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
                <RecipeModal data={selected} isOpen={isOpen} onClose={handleClose} />
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
                    {t('Вы уверены, что хотите удалить')} {t('Рецепт')}?
                </Modal>
            </Content>
        </Layout>
    )
}
