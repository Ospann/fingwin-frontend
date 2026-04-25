import { useState } from 'react'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { deleteProduct, ProductType } from '@/utils/services/product.service'
import { MessageInstance } from 'antd/es/message/interface'

export function useProductList(messageApi: MessageInstance) {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [selected, setSelected] = useState<ProductType | undefined>()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [search, setSearch] = useState(getParam('search') ?? '')

    const { data, mutate } = useApi<{ data: ProductType[] }>(`product?${getURLs().toString()}`, {
        revalidateOnMount: true,
    })

    const handleClose = () => {
        setIsOpen(false)
        setSelected(undefined)
    }

    const confirmDelete = async () => {
        if (!selected) return
        const responsePromise = deleteProduct(selected.id)
        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                mutate()
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
        setSelected(undefined)
        setIsConfirmOpen(false)
    }

    return {
        data: data?.data,
        isOpen,
        setIsOpen,
        isUploadOpen,
        setIsUploadOpen,
        selected,
        setSelected,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    }
}
