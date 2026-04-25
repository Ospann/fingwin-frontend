import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { deleteAccount } from '@/utils/services/finance.service'
import { FinanceAccountType } from '@/utils/types/finance.types'
import { MessageInstance } from 'antd/es/message/interface'

export function useAccountList(messageApi: MessageInstance) {
    const { t } = useTranslation()
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<FinanceAccountType | undefined>()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [search, setSearch] = useState(getParam('search') ?? '')
    const { data, mutate } = useApi<{ data: FinanceAccountType[] }>(
        `finance/score?${getURLs().toString()}`,
        {
            revalidateOnMount: true,
        },
    )

    const handleClose = () => {
        setIsOpen(false)
        setSelected(undefined)
    }

    const confirmDelete = async () => {
        if (!selected) return

        deleteAccount(selected.id)
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                mutate()
                setSelected(undefined)
                setIsConfirmOpen(false)
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
    }

    return {
        t,
        data: data?.data,
        isOpen,
        setIsOpen,
        selected,
        setSelected,
        isConfirmOpen,
        setIsConfirmOpen,
        handleClose,
        confirmDelete,
        search,
        setSearch,
        getParam,
        setParam,
    }
}
