import { useState, useMemo } from 'react'
import { Form, Input, Select as AntSelect, Button, message } from 'antd'
import dayjs from 'dayjs'
import { createIncomeExpense } from '@/utils/services/finance.service'
import { FinanceTypes } from '@/utils/types/finance.types'
import { useTranslation } from 'react-i18next'
import classes from '../index.module.css'
import { useFinanceFormOptions } from '../hooks/use-finance-form-options'

const { TextArea } = Input

export default function Expense() {
    const [form] = Form.useForm<FinanceTypes>()
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { scoreOptions, categoryOptions, contragentOptions } = useFinanceFormOptions('Расход')

    const initialValues = useMemo(
        () => ({
            date: dayjs().format('YYYY-MM-DD'),
        }),
        [],
    )

    const onFinish = async (values: FinanceTypes) => {
        setIsSubmitting(true)
        const payload: Partial<FinanceTypes> = {
            ...values,
            sum: -Number(values.sum),
        }
        if (!payload.billingDate) delete payload.billingDate

        createIncomeExpense(payload as FinanceTypes)
            .then((res) => {
                form.resetFields()
                form.setFieldsValue(initialValues)
                message.success(res.data.message)
            })
            .catch((error) => {
                const errMsg = error?.response?.data?.message || t('Ошибка при создании')
                message.error(errMsg)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <div className={classes.page}>
            <Form<FinanceTypes>
                form={form}
                className={classes.form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item
                    label={t('Сумма')}
                    name="sum"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                        { pattern: /^[0-9-]/, message: t('Некорректно введенные данные') },
                    ]}
                    validateTrigger={['onBlur', 'onSubmit']}
                >
                    <Input
                        type="number"
                        placeholder={t('Введите сумму')}
                        onWheel={(e) => (e.target as HTMLElement).blur()}
                        step="any"
                    />
                </Form.Item>

                <Form.Item
                    label={t('Дата')}
                    name="date"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <Input type="date" />
                </Form.Item>

                <Form.Item label={t('Дата начисления')} name="billingDate">
                    <Input
                        type="date"
                        onChange={(e) => {
                            const val = e.target.value || null
                            form.setFieldsValue({ billingDate: val })
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label={t('Выбрать счет')}
                    name="score"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <AntSelect
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
                    label={t('Выбрать категорию')}
                    name="category"
                    rules={[
                        { required: true, message: t('Данное поле обязательное для заполнения') },
                    ]}
                >
                    <AntSelect
                        allowClear
                        showSearch
                        placeholder={t('Выберите значение...')}
                        options={categoryOptions}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item label={t('Выбрать контрагента')} name="contragent">
                    <AntSelect
                        allowClear
                        showSearch
                        placeholder={t('Выберите значение...')}
                        options={contragentOptions}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item label={t('Комментарий')} name="comment">
                    <TextArea rows={5} placeholder={t('Оставьте комментарий')} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        style={{ width: '100%' }}
                    >
                        {t('Отправить')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
