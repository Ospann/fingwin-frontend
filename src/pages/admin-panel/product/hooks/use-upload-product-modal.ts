import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { bulkCreateProduct, ProductType } from '@/utils/services/product.service'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { MessageInstance } from 'antd/es/message/interface'

export function useUploadProductModal(
    messageApi: MessageInstance,
    isOpen: boolean,
    onClose: () => void,
) {
    const { getURLs } = useURLParameters()
    const [products, setProducts] = useState<ProductType[]>([])

    const { data } = useApi<{ data: ProductType[] }>(isOpen ? '/product/wb' : '', {
        revalidateOnMount: true,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 0,
    })

    useEffect(() => {
        if (data?.data) {
            setProducts(data.data)
        }
    }, [data])

    const handleCloseModal = () => {
        onClose()
    }

    const handleSave = async () => {
        const existingProducts = products.filter((product) => product.isWB)

        const confirmOverwrite =
            existingProducts.length > 0
                ? await new Promise<boolean>((resolve) => {
                      Modal.confirm({
                          title: 'Подтверждение',
                          content:
                              'Некоторые товары уже есть в базе данных. Вы хотите перезаписать их?',
                          onOk: () => resolve(true),
                          onCancel: () => resolve(false),
                          okText: 'Да',
                          cancelText: 'Нет',
                      })
                  })
                : false

        const responsePromise = bulkCreateProduct(products, confirmOverwrite)

        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                mutate(`product?${getURLs().toString()}`)
                handleCloseModal()
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
    }

    const handleDelete = (index: number) => {
        Modal.confirm({
            title: 'Подтверждение',
            content: 'Вы уверены, что хотите удалить этот продукт?',
            onOk: () => {
                setProducts((prev) => prev.filter((_, i) => i !== index))
            },
            okText: 'Да',
            cancelText: 'Нет',
            okButtonProps: { danger: true },
        })
    }

    const handleFieldChange = (
        index: number,
        field: keyof ProductType,
        value: string | number | null,
    ) => {
        setProducts((prev) => {
            const newProducts = [...prev]
            newProducts[index] = { ...newProducts[index], [field]: value }
            return newProducts
        })
    }

    return {
        products,
        handleSave,
        handleDelete,
        handleFieldChange,
        handleCloseModal,
    }
}
