import { useEffect, useState, useMemo } from 'react'
import { Form, InputNumber, Input, Select, Button, DatePicker, message } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/utils/services'
import { createTransfer } from '@/utils/services/finance.service'
import { FinanceTransferTypes } from '@/utils/types/finance.types'
import { CurrencyCode } from '@/utils/constants/currency.consts'
import classes from '../index.module.css'
import { useFinanceFormOptions } from '../hooks/use-finance-form-options'

export default function Transfer() {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const [form] = Form.useForm<FinanceTransferTypes>()
    const { scoreOptions, scores } = useFinanceFormOptions()
    const { data: currency } = useApi<{ data: Record<CurrencyCode, number> }>('currency')

    const [exchange, setExchange] = useState<number>(1)
    const [showRateInput, setShowRateInput] = useState(false)

    // Вычисляемая сумма в валюте назначения
    const sum = Form.useWatch('sum', form)
    const sumInCurrency = useMemo(() => {
        if (!sum || !exchange) return ''
        return (+sum * exchange).toFixed(2)
    }, [sum, exchange])

    useEffect(() => {
        const { from, to } = form.getFieldsValue(['from', 'to'])

        if (!scores || !currency || !from || !to) {
            setExchange(1)
            setShowRateInput(false)
            return
        }

        const fromAccount = scores.find((a) => a.id === from)
        const toAccount = scores.find((a) => a.id === to)

        if (fromAccount && toAccount) {
            const shouldShow = fromAccount.currency !== toAccount.currency
            setShowRateInput(shouldShow)

            const fromExchange = currency?.data?.[fromAccount.currency] ?? 1
            const toExchange = currency?.data?.[toAccount.currency] ?? 1
            setExchange(+fromExchange / +toExchange)
        }
    }, [form, scores, currency, sum])

    const onFinish = async (values: FinanceTransferTypes) => {
        const payload = {
            ...values,
            date: dayjs(values.date).format('YYYY-MM-DD'),
            exchange,
        }
        createTransfer(payload)
            .then((res) => {
                messageApi.success(res.data.message)
                form.resetFields()
            })
            .catch((err) => {
                const msg = err?.response?.data?.message || t('Ошибка при создании')
                messageApi.error(msg)
            })
    }

    return (
        <div className={classes.page}>
            {messageContext}
            <Form
                form={form}
                layout="vertical"
                className={classes.form}
                onFinish={onFinish}
                initialValues={{ date: dayjs() }}
            >
                <Form.Item
                    label={t('Дата')}
                    name="date"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label={t('Со счета')}
                    name="from"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        options={scoreOptions}
                        placeholder={t('Выберите значение...')}
                        filterOption={(input, option) =>
                            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item
                    label={t('На счет')}
                    name="to"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        options={scoreOptions}
                        placeholder={t('Выберите значение...')}
                        filterOption={(input, option) =>
                            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                {showRateInput && (
                    <Form.Item label={t('Курс')} required>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={exchange}
                            onChange={(val) => setExchange(val ?? 1)}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label={t('Сумма')}
                    name="sum"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                        { pattern: /^[0-9-]/, message: t('Некорректно введенные данные') },
                    ]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        placeholder={t('Введите сумму')}
                        step="any"
                    />
                </Form.Item>

                {showRateInput && (
                    <Form.Item label={t('Сумма в валюте')}>
                        <Input value={sumInCurrency} readOnly />
                    </Form.Item>
                )}

                <Form.Item label={t('Комментарий')} name="comment">
                    <Input.TextArea rows={5} placeholder={t('Оставьте комментарий')} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {t('Отправить')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
