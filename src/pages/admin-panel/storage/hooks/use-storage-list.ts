import { useState } from 'react'
import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { StorageType, deleteStorage } from '@/utils/services/storage.service'

export const useStorageList = () => {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<StorageType | undefined>()
    const [search, setSearch] = useState(getParam('search') ?? '')
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const { data, mutate } = useApi<{ data: StorageType[] }>(`storage?${getURLs().toString()}`, {
        revalidateOnMount: true,
    })

    const handleClose = () => {
        setIsOpen(false)
        setSelected(undefined)
    }

    const confirmDelete = async () => {
        if (selected?.id) {
            await deleteStorage(selected.id)
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
        search,
        setSearch,
        setParam,
        getURLs,
        isConfirmOpen,
        setIsConfirmOpen,
        confirmDelete,
        handleClose,
    }
}
