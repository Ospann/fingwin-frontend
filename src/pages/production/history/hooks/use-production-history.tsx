import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/utils/services'
import { message } from 'antd'
import { deletePurchase } from '@/utils/services/purchase.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import type { PurchaseHistoryType } from '@/utils/types/purchase.types'
import { useTranslation } from 'react-i18next'

export function useProductionHistory() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [selected, setSelected] = useState<PurchaseHistoryType | undefined>(undefined)
    const { getURLs } = useURLParameters()
    const { data, mutate, isLoading } = useApi<{ data: PurchaseHistoryType[] }>(
        `production?${getURLs()}`,
        {
            revalidateOnMount: true,
        },
    )

    const handleDelete = async () => {
        if (!selected) return
        try {
            const res = await deletePurchase(selected.id)
            message.success(res.message || t('Успешно удалено'))
            setSelected(undefined)
            mutate()
        } catch (error) {
            message.error(t('Ошибка при удалении'))
        }
    }

    return {
        t,
        data: data?.data ?? [],
        selected,
        setSelected,
        handleDelete,
        isLoading,
        navigate,
    }
}