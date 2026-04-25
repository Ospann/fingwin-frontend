import { Helmet } from 'react-helmet'
import { Typography, Input, Table, Button, DatePicker, Select, Form, Layout } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useProductionForm } from './hooks/use-production-form'
import { PURCHASE_HISTORY_ROUTE } from '@/utils/routes/routes.consts'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import type { ColumnsType } from 'antd/es/table'
import { ProductType } from '@/utils/services/product.service'

const { Content } = Layout
const { Title } = Typography

export default function Production() {
    const { t } = useTranslation()
    const {
        id,
        form,
        products,
        fields,
        isSubmitting,
        handleChange,
        handleRemoveRow,
        handleSendForm,
        navigate,
        storage,
    } = useProductionForm()

    const columns: ColumnsType<ProductType> = [
        {
            title: t('Наименование'),
            dataIndex: 'name',
            key: 'name',
            width: '60%',
            render: (_, __, index) => (
                <Form.Item name={['products', index, 'id']} style={{ marginBottom: 0 }}>
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder={t('Выберите продукт')}
                        onChange={(val) => {
                            const product = products?.find((p) => p.id === val)
                            handleChange(index, product || null)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={products
                            ?.filter((p) => p.type === 'готовая продукция' && p.hasRecipe)
                            .map((p) => ({
                                value: p.id,
                                label: p.name,
                            }))}
                    />
                </Form.Item>
            ),
        },
        {
            title: t('К-во'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
            render: (_, __, index) => (
                <Form.Item name={['products', index, 'quantity']} style={{ marginBottom: 0 }}>
                    <Input type="number" step="any" />
                </Form.Item>
            ),
        },
        {
            title: t('Е.И.'),
            dataIndex: 'uom',
            key: 'uom',
            width: '15%',
            render: (_, __, index) => (
                <Form.Item name={['products', index, 'uom']} style={{ marginBottom: 0 }}>
                    <Input readOnly />
                </Form.Item>
            ),
        },
        {
            title: '',
            key: 'actions',
            width: '5%',
            render: (_, __, index) => (
                <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveRow(index)}
                />
            ),
        },
    ]

    return (
        <Layout>
            <Helmet>
                <title>{t('Ввод Закупок')}</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                {id && (
                    <Title level={4}>
                        {t('Редактирование производства')} №{id}
                    </Title>
                )}
                <Form
                    form={form}
                    onFinish={handleSendForm}
                    className={classes.container}
                    layout="vertical"
                >
                    <div className={classes.upblock}>
                        <Form.Item
                            name="date"
                            rules={[{ required: true, message: t('Обязательное поле') }]}
                            style={{ marginBottom: 0, flex: 1 }}
                        >
                            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                        </Form.Item>

                        <Form.Item
                            name="storage"
                            rules={[{ required: true, message: t('Обязательное поле') }]}
                            style={{ marginBottom: 0, flex: 1 }}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder={t('Выберите склад')}
                                options={storage?.map((s) => ({
                                    value: s.id,
                                    label: s.name,
                                }))}
                            />
                        </Form.Item>
                    </div>

                    <Table
                        dataSource={fields}
                        columns={columns}
                        pagination={false}
                        rowKey={(_, index) => index?.toString() || '0'}
                        bordered
                    />

                    <div className={classes.buttons}>
                        {id && (
                            <Button
                                style={{ flex: 1 }}
                                danger
                                onClick={() => navigate(PURCHASE_HISTORY_ROUTE)}
                            >
                                {t('Отмена')}
                            </Button>
                        )}
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            style={{ flex: 1 }}
                        >
                            {t(id ? 'Обновить' : 'Отправить')}
                        </Button>
                    </div>
                </Form>
            </Content>
        </Layout>
    )
}
