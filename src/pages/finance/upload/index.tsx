import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useKaspiForm } from './hooks/use-kaspi-form'
import { useKaspiUpload } from './hooks/use-kaspi-upload'
import { useKaspiData } from './hooks/use-kaspi-data'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Prompt from '@/components/shared/Prompt'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Button, Table, Switch, Spin, Space, Typography, Form, Select as AntSelect, Input, Layout } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTheme } from '@/components/ui/Themed/theme-provider'

dayjs.extend(customParseFormat)

const { Content } = Layout
const { Text } = Typography

export default function Kaspi() {
    const { t } = useTranslation()
    const { categoryData, scoreData } = useKaspiData()
    const { fields, remove, setValue, isDirty, onSubmit, isSubmitting } = useKaspiForm()
    const { isDarkMode } = useTheme()

    const [useAi, setUseAi] = useState(false)
    const {
        isLoading,
        fileInputRef,
        handleFileChange,
        handleFileSelect,
        handleDrop,
        handleDragOver,
    } = useKaspiUpload((rows) => setValue('data', rows), useAi)

    const [form] = Form.useForm()

    const handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                onSubmit(values)
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo)
            })
    }

    const columns = [
        {
            title: t('Дата'),
            dataIndex: 'date',
            key: 'date',
            width: 120,
            render: (text: string, _: unknown, index: number) => (
                <Form.Item
                    name={['data', index, 'date']}
                    rules={[{ required: true, message: t('Введите дату') }]}
                    initialValue={text}
                    style={{ margin: 0 }}
                >
                    <Input readOnly />
                </Form.Item>
            ),
        },
        {
            title: t('Сумма'),
            dataIndex: 'sum',
            key: 'sum',
            width: 120,
            render: (text: string, _: unknown, index: number) => (
                <Form.Item
                    name={['data', index, 'sum']}
                    rules={[{ required: true, message: t('Введите сумму') }]}
                    initialValue={text}
                    style={{ margin: 0 }}
                >
                    <Input readOnly />
                </Form.Item>
            ),
        },
        {
            title: t('Детали'),
            dataIndex: 'details',
            key: 'details',
            width: 250,
            render: (text: string, _: unknown, index: number) => (
                <Form.Item
                    name={['data', index, 'details']}
                    rules={[{ required: true, message: t('Введите детали') }]}
                    initialValue={text}
                    style={{ margin: 0 }}
                >
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} readOnly />
                </Form.Item>
            ),
        },
        {
            title: t('Категория'),
            dataIndex: 'category',
            key: 'category',
            width: 200,
            render: (text: string, _: unknown, index: number) => (
                <Form.Item
                    name={['data', index, 'category']}
                    rules={[{ required: true, message: t('Выберите категорию') }]}
                    initialValue={text}
                    style={{ margin: 0 }}
                >
                    <AntSelect
                        options={categoryData?.map((c) => ({
                            value: c.id.toString(),
                            label: c.category,
                        }))}
                        placeholder={t('Выберите категорию')}
                        showSearch
                        optionFilterProp="label"
                    />
                </Form.Item>
            ),
        },
        ...(fields.every((f) => !!f.confidencePercent)
            ? [
                {
                    title: t('Процент уверенности AI'),
                    dataIndex: 'confidencePercent',
                    key: 'confidencePercent',
                    width: 150,
                },
            ]
            : []),
        {
            title: '',
            key: 'actions',
            width: 60,
            fixed: 'right' as const,
            render: (_: unknown, __: unknown, index: number) => (
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(index)} />
            ),
        },
    ]

    return (
        <Layout>
            <Content>
                <Breadcrumbs />
                <Prompt
                    when={isDirty}
                    message="У вас есть несохранённые изменения. Вы уверены, что хотите уйти?"
                />
                <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    layout="vertical"
                    initialValues={{ data: fields }}
                >
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Space size="large" align="start">
                            <Form.Item
                                label={t('Счет')}
                                name="score"
                                rules={[{ required: true, message: t('Выберите счет') }]}
                                style={{ minWidth: 300, marginBottom: 0 }}
                            >
                                <AntSelect
                                    options={scoreData?.map((s) => ({ value: s.id, label: s.account }))}
                                    placeholder={t('Выберите счет')}
                                    showSearch
                                    optionFilterProp="label"
                                />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                {t('Загрузить')}
                            </Button>
                        </Space>

                        <Space size="large" align="center" wrap>
                            <div>
                                <Text>
                                    {t('Загрузите файл в нужном формате')}:
                                    <br />
                                    <strong style={{ color: '#ff4d4f' }}>Kaspi Gold</strong> - PDF
                                    <br />
                                    <strong style={{ color: '#8c8c8c' }}>Kaspi Pay</strong> - Excel
                                </Text>
                            </div>
                            <Space>
                                <Switch
                                    checked={useAi}
                                    onChange={setUseAi}
                                    disabled={fields.length > 0}
                                />
                                <span>{t('Использовать ИИ')}</span>
                            </Space>
                            {isDirty && (
                                <Button
                                    type="text"
                                    onClick={() => {
                                        setValue('data', [])
                                        form.setFieldsValue({ data: [] })
                                    }}
                                >
                                    {t('Очистить все')}
                                </Button>
                            )}
                        </Space>

                        {fields.length === 0 && (
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                style={{
                                    border: '2px dashed #d9d9d9',
                                    borderRadius: '8px',
                                    padding: '40px 16px',
                                    textAlign: 'center',
                                    backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#1890ff'
                                    e.currentTarget.style.backgroundColor = isDarkMode ? 'var(--dark-hover)' : '#f0f5ff'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#d9d9d9'
                                    e.currentTarget.style.backgroundColor = isDarkMode ? 'var(--dark)' : '#fafafa'
                                }}
                            >
                                {isLoading ? (
                                    <Spin size="large" tip={t('Загрузка...')} />
                                ) : (
                                    <Space direction="vertical" size="middle">
                                        <input
                                            type="file"
                                            accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <Button
                                            size="large"
                                            icon={<UploadOutlined />}
                                            onClick={handleFileSelect}
                                        >
                                            {t('Загрузите файл')}
                                        </Button>
                                        <Text type="secondary">{t('или перетащите файл сюда')}</Text>
                                    </Space>
                                )}
                            </div>
                        )}

                        {fields.length > 0 && (
                            <Table
                                dataSource={fields.map((f, index) => ({ ...f, key: index }))}
                                columns={columns}
                                pagination={false}
                                scroll={{ x: 'max-content', y: '60vh' }}
                                bordered
                                size="small"
                            />
                        )}
                    </Space>
                </Form>
            </Content>
        </Layout>
    )
}