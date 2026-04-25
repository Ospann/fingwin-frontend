import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { mutate, useApi } from '@/utils/services'
import {
    createPurchase,
    updatePurchase,
    fetchPurchaseById,
} from '@/utils/services/purchase.service'
import type { ProductType } from '@/utils/services/product.service'
import type { SupplierType } from '@/utils/services/supplier.service'
import type { StorageType } from '@/utils/services/storage.service'
import type { FinanceAccountType } from '@/utils/types/finance.types'
import { PurchaseType } from '@/utils/types/purchase.types'
import { MessageInstance } from 'antd/es/message/interface'

export const usePurchaseForm = (messageApi: MessageInstance) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [total, setTotal] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: productsRes } = useApi<{ data: ProductType[] }>('product')
    const { data: suppliersRes } = useApi<{ data: SupplierType[] }>('supplier')
    const { data: storageRes } = useApi<{ data: StorageType[] }>('storage')
    const { data: scoreRes } = useApi<{ data: FinanceAccountType[] }>('/finance/score')

    const products = productsRes?.data
    const suppliers = suppliersRes?.data
    const storage = storageRes?.data
    const scoreData = scoreRes?.data

    useEffect(() => {
        if (!form) return
        if (!id) {
            form.setFieldsValue({
                date: dayjs(),
                products: [{ name: '' }],
            })
        }
    }, [id, form])

    useEffect(() => {
        if (!id || !form) return
        fetchPurchaseById(+id).then((response) => {
            const productsData = response.products || []
            console.log('productsData', productsData)
            form.setFieldsValue({
                ...response,
                date: response.date ? dayjs(response.date) : dayjs(),
                products: productsData,
            })
            setTotal(
                productsData.reduce(
                    (acc: number, item: { total: number }) => acc + (+item.total || 0),
                    0,
                ),
            )

            handleAdd()
        })
    }, [id, form])

    useEffect(() => {
        if (suppliers?.length === 1) {
            form.setFieldsValue({ supplier: suppliers[0].id })
        }
        if (storage?.length === 1 && storage[0].id) {
            form.setFieldsValue({ storage: storage[0].id })
        }
    }, [suppliers, storage, form])

    const handleChange = (index: number, newValue: ProductType | null) => {
        const currentProducts = form.getFieldValue('products') || []
        currentProducts[index] = {
            ...currentProducts[index],
            id: newValue?.id ?? null,
            name: newValue?.name ?? '',
            uom: newValue?.uom ?? '',
        }
        form.setFieldsValue({ products: currentProducts })

        if (index === (form.getFieldValue('products') || []).length - 1) {
            handleAdd()
        }
    }

    const updateTotal = useCallback(
        (index: number) => {
            const products = form.getFieldValue('products') || []
            const quantity = Number(products[index]?.quantity) || 0
            const price = Number(products[index]?.price) || 0
            const itemTotal = quantity * price

            products[index] = {
                ...products[index],
                total: itemTotal,
            }
            form.setFieldsValue({ products })

            let totalSum = 0
            products.forEach((item: { total: number }) => {
                totalSum += Number(item?.total) || 0
            })
            setTotal(totalSum)
        },
        [form],
    )

    const handleAdd = () => {
        const currentProducts = form.getFieldValue('products') || []
        form.setFieldsValue({
            products: [
                ...currentProducts,
                { id: null, name: '', quantity: null, uom: '', price: null, total: null },
            ],
        })
        setTotal((prev) => prev)
    }

    const handleRemoveRow = (index: number) => {
        const currentProducts = form.getFieldValue('products') || []
        const newProducts = currentProducts.filter((_: unknown, idx: number) => idx !== index)
        form.setFieldsValue({ products: newProducts })

        let totalSum = 0
        newProducts.forEach((item: { total: number }) => {
            totalSum += Number(item?.total) || 0
        })
        setTotal(totalSum)
    }

    const handleSubmit = async (formData: PurchaseType) => {
        if (!formData.supplier || !formData.date || !formData.products) {
            return messageApi.error('Заполните все обязательные поля')
        }

        setIsSubmitting(true)
        const formatted: PurchaseType = {
            ...formData,
            date: formData.date
                ? dayjs(formData.date).format('YYYY-MM-DD')
                : dayjs().format('YYYY-MM-DD'),
        }

        const response = id ? updatePurchase(+id, formatted) : createPurchase(formatted)
        response
            .then((res) => {
                messageApi.success(res.data.message)
                mutate('purchase')
                if (!id) {
                    form.resetFields()
                    form.setFieldsValue({ date: dayjs() })
                    setTotal(0)
                }
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка при сохранении')
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return {
        id,
        form,
        total,
        products,
        suppliers,
        storage,
        scoreData,
        isSubmitting,
        handleSubmit,
        handleAdd,
        handleRemoveRow,
        handleChange,
        updateTotal,
        navigate,
    }
}
