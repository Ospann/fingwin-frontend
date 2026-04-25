import { useState } from 'react'
import { Form, InputNumber, DatePicker, Select, Input, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { createIncomeExpense } from '@/utils/services/finance.service'
import { FinanceTypes } from '@/utils/types/finance.types'
import dayjs from 'dayjs'
import classes from '../index.module.css'
import { useFinanceFormOptions } from '../hooks/use-finance-form-options'

export default function Income() {
    const [form] = Form.useForm<FinanceTypes>()
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { scoreOptions, categoryOptions, contragentOptions } = useFinanceFormOptions('Доход')

    const [loading, setLoading] = useState(false)

    const onFinish = async (values: FinanceTypes) => {
        setLoading(true)
        const payload = {
            ...values,
            date: values.date
                ? dayjs(values.date).format('YYYY-MM-DD')
                : dayjs().format('YYYY-MM-DD'),
        }
        createIncomeExpense(payload)
            .then((res) => {
                form.resetFields()
                messageApi.success(res.data.message)
            })
            .catch((err) => {
                messageApi.error(err?.response?.data?.message || t('Ошибка при создании'))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={classes.page}>
            {messageContext}
            <Form
                form={form}
                className={classes.form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ date: dayjs() }}
            >
                <Form.Item
                    name="sum"
                    label={t('Сумма')}
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                        {
                            pattern: /^[0-9-]/,
                            message: t('Некорректно введенные данные'),
                        },
                    ]}
                >
                    <InputNumber
                        placeholder={t('Введите сумму')}
                        style={{ width: '100%' }}
                        step="any"
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    label={t('Дата')}
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="score"
                    label={t('Выбрать счет')}
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        placeholder={t('Выберите значение...')}
                        options={scoreOptions}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="category"
                    label={t('Выбрать категорию')}
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        placeholder={t('Выберите значение...')}
                        options={categoryOptions}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item name="contragent" label={t('Выбрать контрагента')}>
                    <Select
                        allowClear
                        showSearch
                        placeholder={t('Выберите значение...')}
                        options={contragentOptions}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item name="comment" label={t('Комментарий')}>
                    <Input.TextArea rows={5} placeholder={t('Оставьте комментарий')} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ width: '100%' }}
                    >
                        {t('Отправить')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
