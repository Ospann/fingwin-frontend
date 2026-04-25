import { useEffect, useCallback, useState } from 'react'
import { Form } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { mutate, useApi } from '@/utils/services'
import { createReturn, updateReturn } from '@/utils/services/return.service'
import type { ReturnType } from '@/utils/types/sales.types'
import type { ProductType } from '@/utils/services/product.service'
import type { ClientType } from '@/utils/services/client.service'
import type { StorageType } from '@/utils/services/storage.service'
import type { FinanceAccountType } from '@/utils/types/finance.types'
import { useTranslation } from 'react-i18next'
import type { productListType } from '../../input/hooks/use-sales-form'
import { MessageInstance } from 'antd/es/message/interface'

type ReturnFormValues = Omit<ReturnType, 'date'> & { date: Dayjs | null }

type ReturnProductRow = NonNullable<ReturnType['products']>[number]

const DEFAULT: productListType = {
    id: null,
    name: '',
    quantity: null,
    uom: '',
    price: null,
    total: null,
}

export const useReturnForm = (messageApi: MessageInstance) => {
    const { id } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [total, setTotal] = useState(0)
    const [fields, setFields] = useState([DEFAULT])

    const { data } = useApi<{ data: ReturnType }>(id ? `/returns/${id}` : '')
    const { data: products } = useApi<{ data: ProductType[] }>('product')
    const { data: clients } = useApi<{ data: ClientType[] }>('client')
    const { data: storage } = useApi<{ data: StorageType[] }>('storage')
    const { data: scoreData } = useApi<{ data: FinanceAccountType[] }>('/finance/score')

    const handleChange = (index: number, newValue: ProductType | null) => {
        const newFields = [...fields]
        newFields[index] = {
            ...newFields[index],
            id: newValue?.id ?? null,
            name: newValue?.name ?? '',
            uom: newValue?.uom ?? '',
        }
        setFields(newFields)

        if (index === fields.length - 1) {
            setFields([...newFields, DEFAULT])
        }
    }

    const updateTotal = useCallback(
        (index: number, field: 'quantity' | 'price', value: number) => {
            const newFields = [...fields]
            newFields[index] = {
                ...newFields[index],
                [field]: value,
            }

            const quantity = Number(newFields[index].quantity || 0)
            const price = Number(newFields[index].price || 0)
            newFields[index].total = quantity * price

            setFields(newFields)

            const totalSum = newFields.reduce((sum, item) => {
                return sum + (Number(item.total) || 0)
            }, 0)
            setTotal(totalSum)
        },
        [fields],
    )

    const handleRemoveRow = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index)
        setFields(newFields)

        const totalSum = newFields.reduce((sum, item) => {
            return sum + (Number(item.total) || 0)
        }, 0)
        setTotal(totalSum)
    }

    const onSubmit = async (formData: ReturnFormValues) => {
        const filteredProducts = fields.filter((f) => f.id !== null)

        if (!formData.client || !formData.date || filteredProducts.length === 0) {
            return messageApi.error('Заполните все обязательные поля')
        }

        // Преобразуем dayjs объект в строку для отправки на сервер
        const submitData: ReturnType = {
            ...formData,
            date: formData.date ? dayjs(formData.date).format('YYYY-MM-DD') : '',
            products: filteredProducts as ReturnType['products'],
        }

        const response = id ? updateReturn(+id, submitData) : createReturn(submitData)
        response
            .then((res) => {
                mutate('purchase')
                if (!id) {
                    form.resetFields()
                    setFields([DEFAULT])
                    setTotal(0)
                }
                messageApi.success(res.message)
            })
            .catch((err) => {
                messageApi.error(err.response.data.message)
            })
    }

    useEffect(() => {
        if (id && data) {
            // Преобразуем строку даты в dayjs объект для формы
            const formData = {
                ...data.data,
                date: data.data.date ? dayjs(data.data.date) : null,
            }
            form.setFieldsValue(formData)
            if (data.data.products) {
                setFields([
                    ...data.data.products.map((p: ReturnProductRow) => ({
                        id: p.id ?? null,
                        name: p.name ?? '',
                        quantity: p.quantity ?? null,
                        uom: p.uom ?? '',
                        price: p.price ?? null,
                        total: p.total ?? null,
                    })),
                    DEFAULT,
                ])
            }
        }
    }, [id, data, form])

    useEffect(() => {
        if (clients?.data?.length === 1) {
            form.setFieldValue('client', clients?.data?.[0]?.id)
        }
        if (storage?.data?.length === 1 && storage?.data?.[0]?.id) {
            form.setFieldValue('storage', storage?.data?.[0]?.id)
        }
    }, [clients, storage, form])

    useEffect(() => {
        if (!id) {
            // Устанавливаем dayjs объект для DatePicker
            form.setFieldValue('date', dayjs())
        }
    }, [id, form])

    return {
        t,
        id,
        total,
        form,
        fields,
        setFields,
        handleChange,
        handleRemoveRow,
        updateTotal,
        onSubmit,
        navigate,
        clients: clients?.data,
        storage: storage?.data,
        products: products?.data,
        scoreData: scoreData?.data,
        data: data?.data,
    }
}
