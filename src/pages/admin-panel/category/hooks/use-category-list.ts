import { useState } from 'react'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { deleteCategory } from '@/utils/services/finance.service'
import { FinanceCategory } from '@/utils/types/finance.types'

export function useCategoryList() {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<FinanceCategory | undefined>()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [search, setSearch] = useState(getParam('search') ?? '')

    const { data, mutate } = useApi<{ data: FinanceCategory[] }>(
        `finance/category?${getURLs().toString()}`,
        {
            revalidateOnMount: true,
        },
    )

    const handleClose = () => {
        setIsOpen(false)
        setSelected(undefined)
    }

    const confirmDelete = async () => {
        if (selected) {
            await deleteCategory(selected.id)
            mutate()
        }
        setSelected(undefined)
        setIsConfirmOpen(false)
    }

    return {
        data: data?.data,
        isOpen,
        setIsOpen,
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
