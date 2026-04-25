import { Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduction, updateProduction } from '@/utils/services/production.service'
import { fetchPurchaseById } from '@/utils/services/purchase.service'
import { mutate, useApi } from '@/utils/services'
import { ProductType } from '@/utils/services/product.service'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import type { StorageType } from '@/utils/services/storage.service'

const DEFAULT = {
    id: null,
    name: '',
    quantity: null,
    uom: '',
    price: null,
    total: null,
}

export function useProductionForm() {
    const { t } = useTranslation()
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fields, setFields] = useState<any[]>([DEFAULT])

    const { data: productsRes } = useApi<{ data: ProductType[] }>('product')
    const { data: storageRes } = useApi<{ data: StorageType[] }>('storage')
    const products = productsRes?.data
    const storage = storageRes?.data

    useEffect(() => {
        if (id) {
            fetchPurchaseById(+id).then((res) => {
                form.setFieldsValue({
                    date: res.date ? dayjs(res.date) : dayjs(),
                    storage: res.storage,
                    products: res.products,
                })
                setFields(res.products || [DEFAULT])
            })
        } else {
            form.setFieldsValue({
                date: dayjs(),
                products: [DEFAULT],
            })
        }
    }, [id])

    const handleChange = (index: number, value: ProductType | null) => {
        if (!value) return

        const currentProducts = form.getFieldValue('products') || []
        currentProducts[index] = {
            ...currentProducts[index],
            id: value.id,
            name: value.name,
            uom: value.uom,
        }

        form.setFieldsValue({ products: currentProducts })

        if (index === fields.length - 1) handleAdd()
    }

    const handleAdd = () => {
        const newFields = [...fields, DEFAULT]
        setFields(newFields)

        const currentProducts = form.getFieldValue('products') || []
        form.setFieldsValue({ products: [...currentProducts, DEFAULT] })
    }

    const handleRemoveRow = (index: number) => {
        if (fields.length <= 1) return

        const newFields = fields.filter((_, i) => i !== index)
        setFields(newFields)

        const currentProducts = form.getFieldValue('products') || []
        form.setFieldsValue({
            products: currentProducts.filter((_: any, i: number) => i !== index),
        })
    }

    const handleSendForm = async (values: any) => {
        const formData = {
            ...values,
            date: values.date?.format('YYYY-MM-DD'),
            products: values.products?.filter((p: any) => p.id) || [],
        }

        if (!formData.date || !formData.storage) {
            message.error(t('Заполните все обязательные поля'))
            return
        }

        setIsSubmitting(true)
        const hide = message.loading(t('Загрузка...'), 0)

        try {
            id ? await updateProduction(+id, formData) : await createProduction(formData)

            hide()
            message.success(t('Успешно сохранено'))
            mutate('purchase')

            if (!id) {
                form.resetFields()
                setFields([DEFAULT])
            }
        } catch (error) {
            hide()
            console.error('Error submitting form:', error)
            message.error(t('Ошибка при сохранении'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        id,
        form,
        fields,
        products,
        isSubmitting,
        handleAdd,
        handleChange,
        handleRemoveRow,
        handleSendForm,
        navigate,
        storage,
    }
}
