import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useApi, mutate } from '@/utils/services'
import { createSales, updateSales } from '@/utils/services/sales.service'
import type { SalesType } from '@/utils/types/sales.types'
import type { ProductType } from '@/utils/services/product.service'
import type { ClientType } from '@/utils/services/client.service'
import type { StorageType } from '@/utils/services/storage.service'
import type { FinanceAccountType } from '@/utils/types/finance.types'
import { useTranslation } from 'react-i18next'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { MessageInstance } from 'antd/es/message/interface'

export type productListType = {
    id: number | null
    name: string
    quantity: number | null
    uom: string
    price: number | null
    total: number | null
}

const DEFAULT_PRODUCT: productListType = {
    id: null,
    name: '',
    quantity: null,
    uom: '',
    price: null,
    total: null,
}

export const useSalesForm = (messageApi: MessageInstance) => {
    const { id } = useParams()
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [total, setTotal] = useState(0)
    const [productList, setProductList] = useState([DEFAULT_PRODUCT])

    const { data } = useApi<{ data: SalesType }>(id ? `/sales/${id}` : '')
    const { data: products } = useApi<{ data: ProductType[] }>('product')
    const { data: clients } = useApi<{ data: ClientType[] }>('client')
    const { data: storage } = useApi<{ data: StorageType[] }>('storage')
    const { data: scoreData } = useApi<{ data: FinanceAccountType[] }>('/finance/score')

    const handleChangeProduct = (index: number, newValue: ProductType | null) => {
        const newProductList = [...productList]
        newProductList[index] = {
            ...newProductList[index],
            id: newValue?.id ?? null,
            name: newValue?.name ?? '',
            uom: newValue?.uom ?? '',
        }
        setProductList(newProductList)

        if (index === productList.length - 1) {
            setProductList([...newProductList, DEFAULT_PRODUCT])
        }
    }

    const updateProductTotal = useCallback(
        (index: number, quantity?: number | null, price?: number | null) => {
            const newProductList = [...productList]
            const item = newProductList[index]

            const q = quantity !== undefined && quantity !== null ? quantity : item.quantity
            const p = price !== undefined && price !== null ? price : item.price

            newProductList[index] = {
                ...item,
                quantity: q,
                price: p,
                total: (q || 0) * (p || 0),
            }

            setProductList(newProductList)

            const totalSum = newProductList.reduce((sum, item) => {
                return sum + (Number(item.total) || 0)
            }, 0)
            setTotal(totalSum)
        },
        [productList],
    )

    const removeProductRow = (index: number) => {
        const newProductList = productList.filter((_, i) => i !== index)
        setProductList(newProductList)

        const totalSum = newProductList.reduce((sum, item) => {
            return sum + (Number(item.total) || 0)
        }, 0)
        setTotal(totalSum)
    }

    const onSubmit = async (formData: SalesType) => {
        const filteredProducts = productList.filter((p) => p.id !== null)

        if (!formData.client || !formData.date || filteredProducts.length === 0) {
            return messageApi.error('Заполните все обязательные поля')
        }

        const submitData = {
            ...formData,
            date: formData.date ? dayjs(formData.date).format('YYYY-MM-DD') : '',
            products: filteredProducts,
        }

        const response = id ? updateSales(+id, submitData) : createSales(submitData)
        response
            .then((res) => {
                messageApi.success(res.message)
                mutate('sales')
                if (!id) {
                    form.resetFields()
                    setProductList([DEFAULT_PRODUCT])
                    setTotal(0)
                }
            })
            .catch((err) => {
                messageApi.error(err.response.data.message)
            })
    }

    useEffect(() => {
        if (id && data) {
            const formData = {
                ...data.data,
                date: data.data.date ? dayjs(data.data.date) : null,
            }
            form.setFieldsValue(formData)
            if (data.data.products) {
                setProductList([
                    ...data.data.products.map((p) => ({
                        id: (p as any).id ?? null,
                        name: (p as any).name ?? '',
                        quantity: (p as any).quantity ?? null,
                        uom: (p as any).uom ?? '',
                        price: (p as any).price ?? null,
                        total: (p as any).total ?? null,
                    })),
                    DEFAULT_PRODUCT,
                ])
            }
        }
    }, [id, data, form])

    useEffect(() => {
        if (clients?.data?.length === 1) {
            form.setFieldValue('client', clients?.data[0].id)
        }
        if (storage?.data?.length === 1 && storage?.data[0].id) {
            form.setFieldValue('storage', storage?.data[0].id)
        }
    }, [clients, storage, form])

    useEffect(() => {
        if (!id) {
            form.setFieldValue('date', dayjs())
        }
    }, [id, form])

    return {
        t,
        id,
        total,
        form,
        productList,
        products: products?.data,
        clients: clients?.data,
        storage: storage?.data,
        scoreData: scoreData?.data,
        handleChangeProduct,
        updateProductTotal,
        removeProductRow,
        onSubmit,
    }
}
