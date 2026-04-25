import { useApi } from '@/utils/services'
import { deletePurchase, uploadExcel } from '@/utils/services/purchase.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PURCHASE_INPUT_ROUTE } from '@/utils/routes/routes.consts'
import type { PurchaseHistoryType } from '@/utils/types/purchase.types'

export const usePurchaseHistory = () => {
    const navigate = useNavigate()
    const { getURLs } = useURLParameters()
    const [selected, setSelected] = useState<PurchaseHistoryType | undefined>(undefined)

    const { data: purchasesResponse, mutate } = useApi<{ data: PurchaseHistoryType[] }>(
        `purchase?${getURLs()}`,
        {
            revalidateOnMount: true,
        },
    )
    const purchases = purchasesResponse?.data

    const handleDelete = async () => {
        if (selected) {
            try {
                const res = await deletePurchase(selected.id)
                message.success(res.message || 'Закупка успешно удалена')
                setSelected(undefined)
                mutate()
            } catch (error) {
                message.error('Ошибка при удалении')
            }
        }
    }

    const handleEdit = (id: number) => {
        navigate(`${PURCHASE_INPUT_ROUTE}/${id}`)
    }

    const handleDownload = () => {
        uploadExcel(getURLs())
    }

    return {
        purchases,
        selected,
        setSelected,
        handleDelete,
        handleDownload,
        handleEdit,
    }
}