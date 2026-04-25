import { Button, Modal, Form, InputNumber, Select, Space } from 'antd'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
    type CreateCorrectType,
    type StorageType,
    createCorrect,
} from '@/utils/services/storage.service'
import { message } from 'antd'

export default function CorrectModal() {
    const [messageApi, messageContext] = message.useMessage()
    const { getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: productsRes } = useApi<{ data: { id: number; name: string; type: string }[] }>(
        '/product',
    )
    const { data: storageRes } = useApi<{ data: StorageType[] }>('/storage')
    const products = productsRes?.data
    const storage = storageRes?.data

    const onSubmit = async (values: CreateCorrectType) => {
        setIsSubmitting(true)

        createCorrect(values)
            .then((res) => {
                messageApi.success(t(res.message))
                form.resetFields()
                mutate(`storage/remain?${getURLs()}`)
                setIsOpen(false)
            })
            .catch((error) => {
                messageApi.error(error.response?.data?.message || t('Ошибка'))
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <>
            <Button type="primary" onClick={() => setIsOpen(true)}>
                {t('Корректировка')}
            </Button>
            <Modal
                title={t('Корректировка')}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={null}
                width={600}
            >
                {messageContext}
                <Form form={form} onFinish={onSubmit} layout="vertical">
                    <Form.Item
                        label={t('Склад')}
                        name="storage"
                        rules={[{ required: true, message: t('Выберите склад') }]}
                    >
                        <Select
                            placeholder={t('Выберите склад')}
                            options={storage?.map((option) => ({
                                value: option.id,
                                label: option.name,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t('Продукт')}
                        name="product"
                        rules={[{ required: true, message: t('Выберите продукт') }]}
                    >
                        <Select
                            showSearch
                            placeholder={t('Выберите продукт')}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={products?.map((option) => ({
                                value: option.id,
                                label: option.name,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t('Количество')}
                        name="quantity"
                        rules={[{ required: true, message: t('Введите количество') }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder={t('К-во')}
                            step={0.01}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setIsOpen(false)}>{t('Закрыть')}</Button>
                            <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                {t('Добавить')}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
