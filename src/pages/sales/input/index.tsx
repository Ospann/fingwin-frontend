import { Helmet } from 'react-helmet'
import {
    Typography,
    Input,
    Table,
    Button,
    Form,
    Select,
    DatePicker,
    TableColumnType,
    Layout,
    message,
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { productListType, useSalesForm } from './hooks/use-sales-form'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

const { Content } = Layout
const { Title, Text } = Typography

export default function Sales() {
    const [messageApi, contextHolder] = message.useMessage()

    const {
        t,
        id,
        total,
        form,
        productList,
        products,
        clients,
        storage,
        scoreData,
        handleChangeProduct,
        updateProductTotal,
        removeProductRow,
        onSubmit,
    } = useSalesForm(messageApi)

    const columns: TableColumnType<productListType>[] = [
        {
            title: t('Наименование'),
            dataIndex: 'name',
            key: 'name',
            width: '55%',
            render: (_, record, index: number) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder={t('Выберите продукт')}
                    value={record.name || undefined}
                    onChange={(value) => {
                        const product = products?.find((p) => p.name === value)
                        handleChangeProduct(index, product || null)
                    }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={products
                        ?.filter((p) => p.type === 'готовая продукция')
                        .map((p) => ({
                            label: p.name,
                            value: p.name,
                        }))}
                />
            ),
        },
        {
            title: t('К-во'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%',
            render: (_, record, index: number) => (
                <Input
                    type="number"
                    step={0.1}
                    value={record.quantity ?? ''}
                    onChange={(e) =>
                        updateProductTotal(index, Number(e.target.value), record.price)
                    }
                />
            ),
        },
        {
            title: t('Е.И.'),
            dataIndex: 'uom',
            key: 'uom',
            width: '10%',
            render: (_, record) => <Input readOnly value={record.uom ?? ''} />,
        },
        {
            title: t('Цена'),
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (_, record, index: number) => (
                <Input
                    type="number"
                    step={0.1}
                    value={record.price ?? ''}
                    onChange={(e) =>
                        updateProductTotal(index, record.quantity, Number(e.target.value))
                    }
                />
            ),
        },
        {
            title: t('Итого'),
            dataIndex: 'total',
            key: 'total',
            width: '10%',
            render: (_, record) => (
                <Text>{record.total ? formatNumber(Number(record.total)) : ''}</Text>
            ),
        },
        {
            title: '',
            key: 'action',
            width: '5%',
            render: (_, __, index: number) => (
                <Button
                    danger
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => removeProductRow(index)}
                />
            ),
        },
    ]

    return (
        <Layout>
            {contextHolder}
            <Helmet>
                <title>{t('Ввод Продаж')}</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                {id && (
                    <Title level={4}>
                        {t('Редактирование продажи')} №{id}
                    </Title>
                )}
                <Form
                    form={form}
                    onFinish={onSubmit}
                    layout="vertical"
                    className={classes.container}
                >
                    <div className={classes.upblock}>
                        <div className={classes.filter}>
                            <Form.Item
                                name="client"
                                rules={[{ required: true, message: 'Обязательное поле' }]}
                                style={{ width: 'fit-content', minWidth: '250px' }}
                            >
                                <Select
                                    placeholder={t('Выберите клиента') + '*'}
                                    allowClear
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={clients?.map((c) => ({
                                        label: c.name,
                                        value: c.id,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                name="storage"
                                rules={[{ required: true, message: 'Обязательное поле' }]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    placeholder={t('Выберите склад') + '*'}
                                    allowClear
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={storage?.map((s) => ({
                                        label: s.name,
                                        value: s.id,
                                    }))}
                                />
                            </Form.Item>
                        </div>
                        <div className={classes.filter}>
                            <Form.Item
                                name="score"
                                style={{ width: 'fit-content', minWidth: '250px' }}
                            >
                                <Select
                                    placeholder={t('Выберите счет')}
                                    allowClear
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={scoreData
                                        ?.filter((opt) => opt.currency === 'KZT')
                                        .map((s) => ({
                                            label: s.account,
                                            value: s.id,
                                        }))}
                                />
                            </Form.Item>
                            <Form.Item
                                name="date"
                                rules={[{ required: true, message: 'Обязательное поле' }]}
                                style={{ width: 'fit-content' }}
                            >
                                <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </div>

                    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                        <Table
                            columns={columns}
                            dataSource={productList.map((item, index) => ({
                                ...item,
                                key: index,
                            }))}
                            pagination={false}
                            scroll={{ x: 'max-content' }}
                            className={classes.table}
                            footer={() => (
                                <div style={{ textAlign: 'right', fontWeight: 600 }}>
                                    {t('Итого')}: {formatNumber(total)}
                                </div>
                            )}
                        />
                    </div>

                    <div className={classes.buttons}>
                        <Button type="primary" htmlType="submit" style={{ flex: 1 }}>
                            {t(id ? 'Обновить' : 'Отправить')}
                        </Button>
                    </div>
                </Form>
            </Content>
        </Layout>
    )
}
