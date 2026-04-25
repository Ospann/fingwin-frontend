import { useState } from 'react'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { deleteClient, ClientType } from '@/utils/services/client.service'

export function useCustomerList() {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<ClientType | undefined>()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [search, setSearch] = useState(getParam('search') ?? '')

    const { data, mutate } = useApi<{ data: ClientType[] }>(`client?${getURLs().toString()}`, {
        revalidateOnMount: true,
    })

    const handleClose = () => {
        setIsOpen(false)
        setSelectedUser(undefined)
    }

    const confirmDelete = async () => {
        if (selectedUser) {
            const responsePromise = deleteClient(selectedUser.id)
            await responsePromise
            mutate()
        }
        setSelectedUser(undefined)
        setIsConfirmOpen(false)
    }

    return {
        data: data?.data,
        isOpen,
        setIsOpen,
        selectedUser,
        setSelectedUser,
        isConfirmOpen,
        setIsConfirmOpen,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    }
}
