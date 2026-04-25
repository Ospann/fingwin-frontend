import { useState } from 'react'
import { message } from 'antd'
import { bulkCreate } from '@/utils/services/finance.service'

export type TransactionTypes = {
    date: string
    sum: string
    details: string
    category: string | number
    confidencePercent?: string
}

export function useKaspiForm() {
    const [fields, setFields] = useState<TransactionTypes[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const setValue = (key: string, value: TransactionTypes[]) => {
        if (key === 'data') {
            setFields(value)
        }
    }

    const remove = (index: number) => {
        setFields((prev) => prev.filter((_, i) => i !== index))
    }

    const isDirty = fields.length > 0

    const onSubmit = async (values: { data: TransactionTypes[]; score: number }) => {
        const { data, score } = values

        if (!data || data.length === 0) {
            message.error('Необходимо загрузить данные')
            return
        }

        if (!score) {
            message.error('Выберите счет')
            return
        }

        // Проверка на заполненность всех полей
        const hasEmptyFields = data.some(
            (item: TransactionTypes) => !item.date || !item.sum || !item.details || !item.category,
        )

        if (hasEmptyFields) {
            message.error('Заполните все обязательные поля')
            return
        }

        setIsSubmitting(true)

        const formatted = data.map((item: TransactionTypes) => {
            const [day, month, year] = item.date.split('.')
            return {
                date: `${year}-${month}-${day}`,
                sum: item.sum.replace(/[₸+]/g, '').replace(',', '.'),
                category: item.category,
                comment: item.details,
                score,
            }
        })

        bulkCreate(formatted)
            .then((res) => {
                message.success(res.data.message)
                setFields([])
            })
            .catch((err) => {
                message.error(err.response?.data?.message || 'Ошибка при загрузке данных')
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return {
        setValue,
        fields,
        remove,
        isDirty,
        onSubmit,
        isSubmitting,
    }
}
