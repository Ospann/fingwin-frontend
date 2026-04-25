import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
    Typography,
    Table,
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    TableColumnType,
    Layout,
    message,
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { PURCHASE_HISTORY_ROUTE } from '@/utils/routes/routes.consts'
import { useTranslation } from 'react-i18next'

import type { ProductType } from '@/utils/services/product.service'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { usePurchaseForm } from './hooks/use-purchase-form'

const { Content } = Layout
const { Title } = Typography

export default function Purchase() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { t } = useTranslation()
    const {
        id,
        form,
        handleSubmit,
        handleChange,
        handleRemoveRow,
        products,
        updateTotal,
        suppliers,
        storage,
        scoreData,
        isSubmitting,
        total,
    } = usePurchaseForm(messageApi)

    const columns: TableColumnType<ProductType>[] = [
        {
            title: t('Наименование'),
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            render: (_, __, index: number) => (
                <Form.Item name={['products', index, 'id']} noStyle>
                    <Select
                        showSearch
                        placeholder={t('Выберите продукт')}
                        onChange={(value) => {
                            const product = products?.find((p) => p.id === value)
                            handleChange(index, product || null)
                        }}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={products?.map((p) => ({
                            label: p.name,
                            value: p.id,
                        }))}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: t('К-во'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, __, index: number) => (
                <Form.Item name={['products', index, 'quantity']} noStyle>
                    <Input
                        type="number"
                        step={0.1}
                        onChange={() => updateTotal(index)}
                        style={{ padding: '4px 8px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: t('Е.И.'),
            dataIndex: 'uom',
            key: 'uom',
            render: (_, __, index: number) => (
                <Form.Item name={['products', index, 'uom']} noStyle>
                    <Input readOnly style={{ padding: '4px 8px' }} />
                </Form.Item>
            ),
        },
        {
            title: t('Цена'),
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (_, __, index: number) => (
                <Form.Item name={['products', index, 'price']} noStyle>
                    <Input
                        type="number"
                        step={0.1}
                        onChange={() => updateTotal(index)}
                        style={{ padding: '4px 8px' }}
                    />
                </Form.Item>
            ),
        },
        {
            title: t('Итого'),
            dataIndex: 'total',
            key: 'total',
            render: (_, __, index: number) => {
                const products = form.getFieldValue('products') || []
                const quantity = Number(products[index]?.quantity) || 0
                const price = Number(products[index]?.price) || 0
                const result = quantity * price
                return result ? formatNumber(result) : ''
            },
        },
        {
            title: '',
            key: 'action',
            render: (_, __, index: number) => (
                <Button
                    danger
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
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
                {contextHolder}
                <Breadcrumbs />
                {id && (
                    <Title level={4}>
                        {t('Редактирование закупки')} №{id}
                    </Title>
                )}
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    className={classes.container}
                >
                    <div className={classes.upblock}>
                        <div className={classes.filter}>
                            <Form.Item
                                name="score"
                                style={{ marginBottom: 0, width: 'fit-content' }}
                            >
                                <Select
                                    placeholder={t('Выберите счет')}
                                    allowClear
                                    options={scoreData
                                        ?.filter((opt) => opt.currency === 'KZT')
                                        ?.map((opt) => ({
                                            label: opt.account,
                                            value: opt.id,
                                        }))}
                                />
                            </Form.Item>
                            <Form.Item
                                name="date"
                                rules={[{ required: true }]}
                                style={{ marginBottom: 0, width: 'fit-content' }}
                            >
                                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div className={classes.filter}>
                            <Form.Item
                                name="supplier"
                                rules={[{ required: true, message: t('Обязательное поле') }]}
                                style={{ marginBottom: 0, width: 'fit-content' }}
                            >
                                <Select
                                    placeholder={t('Выберите поставщика')}
                                    allowClear
                                    options={suppliers?.map((s) => ({
                                        label: s.name,
                                        value: s.id,
                                    }))}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="storage"
                                rules={[{ required: true, message: t('Обязательное поле') }]}
                                style={{ marginBottom: 0, width: 'fit-content' }}
                            >
                                <Select
                                    placeholder={t('Выберите склад')}
                                    allowClear
                                    options={storage?.map((s) => ({
                                        label: s.name,
                                        value: s.id,
                                    }))}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={form.getFieldValue('products') || []}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                        footer={() => (
                            <div style={{ textAlign: 'right', fontWeight: 600 }}>
                                {t('Итого')}: {formatNumber(total)}
                            </div>
                        )}
                        rowKey="id"
                    />

                    <div className={classes.buttons}>
                        {id && (
                            <Button
                                danger
                                onClick={() => navigate(PURCHASE_HISTORY_ROUTE)}
                                style={{ flex: 1 }}
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
