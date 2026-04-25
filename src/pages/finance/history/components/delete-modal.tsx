import { useEffect, useState } from 'react'
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { deleteTransaction, updateTransaction } from '@/utils/services/finance.service'
import type {
    FinanceAccountType,
    FinanceCategory,
    FinanceTypes,
    FinanceTypesForm,
} from '@/utils/types/finance.types'
import { useTranslation } from 'react-i18next'
import { currencies } from '@/utils/constants/currency.consts'
import dayjs from 'dayjs'

type DeleteAlertProps = {
    data: FinanceTypes
    isOpen: boolean
    onClose: () => void
}

export default function DeleteAlert({ data, isOpen, onClose }: Readonly<DeleteAlertProps>) {
    const { getURLs } = useURLParameters()
    const { t } = useTranslation()
    const [form] = Form.useForm<FinanceTypesForm>()
    const [messageApi, contextHolder] = message.useMessage()
    const [isDirty, setIsDirty] = useState(false)

    const { data: scoreResponse } = useApi<{ data: FinanceAccountType[] }>('/finance/score')
    const { data: categoryResponse } = useApi<{ data: FinanceCategory[] }>('/finance/category')
    const { data: contragentResponse } = useApi<{ data: { id: number; contragent: string }[] }>(
        '/finance/contragent',
    )

    const scoreData = scoreResponse?.data
    const categoryData = categoryResponse?.data
    const contragentData = contragentResponse?.data

    useEffect(() => {
        form.setFieldsValue({
            ...data,
            category: data.category?.id,
            contragent: data.contragent?.id,
            score: data.score?.id,
            sum: data.originalSum,
            date: data.date ? dayjs(data.date) : null,
            billingDate: data.billingDate ? dayjs(data.billingDate) : null,
        })
    }, [data, form])

    const handleDelete = async () => {
        if (data?.source !== 'Транзакции') {
            return messageApi.error(
                'Нельзя удалить транзакцию, которая является источником для продажи или закупа',
            )
        }
        deleteTransaction(data.id)
            .then((res) => {
                messageApi.success(res.data.message)
                mutate(`finance?${getURLs()}`)
                onClose()
            })
            .catch((err) => {
                messageApi.error(err?.response?.data?.message || 'Ошибка при удалении')
            })
    }

    const handleUpdate = async (values: FinanceTypesForm) => {
        const payload = {
            ...values,
            score: scoreData?.find((s) => s.id === values.score),
            category: categoryData?.find((c) => c.id === values.category),
            contragent: values.contragent
                ? contragentData?.find((c) => c.id === values.contragent)
                : undefined,
        } as Parameters<typeof updateTransaction>[1]
        updateTransaction(data.id, payload)
            .then((res) => {
                messageApi.success(res.data.message)
                mutate(`finance?${getURLs()}`)
                onClose()
            })
            .catch((err) => {
                messageApi.error(err?.response?.data?.message || 'Ошибка при обновлении')
            })
    }

    return (
        <Modal
            title={`Детали транзакции №${data.id}`}
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            {contextHolder}
            <Form<FinanceTypesForm>
                form={form}
                layout="vertical"
                onValuesChange={() => setIsDirty(true)}
                onFinish={handleUpdate}
                initialValues={{
                    ...data,
                    category: data.category?.id,
                    contragent: data.contragent?.id,
                    score: data.score?.id,
                    sum: data.originalSum,
                    date: data.date ? dayjs(data.date) : null,
                    billingDate: data.billingDate ? dayjs(data.billingDate) : null,
                }}
            >
                <Form.Item label={t('Источник')}>
                    <Input value={data?.source} readOnly />
                </Form.Item>

                <Form.Item
                    label={t('Сумма')}
                    name="sum"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                        { pattern: /^[0-9-]/, message: t('Некорректно введенные данные') },
                    ]}
                >
                    <Input type="number" step="any" placeholder={t('Введите сумму...')} />
                </Form.Item>

                <Form.Item
                    label={t('Дата')}
                    name="date"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label={t('Дата начисления')} name="billingDate">
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label={t('Выбрать счет')}
                    name="score"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder={t('Выберите значение...')}
                        optionFilterProp="label"
                        options={scoreData?.map((s) => ({
                            label: `${s.account} (${currencies.find((c) => c.code === s.currency)?.symbol ?? s.currency})`,
                            value: s.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label={t('Выбрать категорию')}
                    name="category"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder={t('Выберите значение...')}
                        optionFilterProp="label"
                        options={categoryData
                            ?.filter((c) => c.type === 'Расход' || c.type === 'Доход')
                            .map((c) => ({ label: c.category, value: c.id }))}
                    />
                </Form.Item>

                <Form.Item label={t('Выбрать контрагента')} name="contragent">
                    <Select
                        showSearch
                        placeholder={t('Выберите значение...')}
                        optionFilterProp="label"
                        options={contragentData?.map((c) => ({ label: c.contragent, value: c.id }))}
                    />
                </Form.Item>

                <Form.Item label={t('Комментарий')} name="comment">
                    <Input.TextArea rows={5} placeholder={t('Оставьте комментарий...')} />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!isDirty || data?.source !== 'Транзакции'}
                        >
                            Редактировать
                        </Button>
                        <Button
                            type="primary"
                            danger
                            disabled={
                                Boolean(data?.deletedBy?.trim()) || data?.source !== 'Транзакции'
                            }
                            onClick={handleDelete}
                        >
                            Удалить
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
