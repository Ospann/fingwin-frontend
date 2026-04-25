import { useState } from 'react'
import { deleteSupplier, SupplierType } from '@/utils/services/supplier.service'
import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

export const useSupplierList = () => {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<SupplierType | undefined>()
    const [search, setSearch] = useState(getParam('search') ?? '')
    const { data, mutate } = useApi<{ data: SupplierType[] }>(`supplier?${getURLs().toString()}`, {
        revalidateOnMount: true,
    })

    const handleClose = () => {
        setIsOpen(false)
        setSelectedUser(undefined)
    }

    const confirmDelete = async () => {
        if (selectedUser) {
            await deleteSupplier(selectedUser.id)
            mutate()
        }
        setSelectedUser(undefined)
        setIsConfirmOpen(false)
    }

    return {
        isOpen,
        setIsOpen,
        selectedUser,
        setSelectedUser,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        data: data?.data,
        confirmDelete,
        handleClose,
    }
}
