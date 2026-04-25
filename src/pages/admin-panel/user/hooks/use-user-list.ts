import { useState } from 'react'
import { deleteUser, UserTypes } from '@/utils/services/user.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'

export function useUserList() {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [selectedUser, setSelectedUser] = useState<UserTypes | undefined>()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState(getParam('search') ?? '')
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const { data, mutate } = useApi<{ data: UserTypes[] }>(`user?${getURLs().toString()}`, {
        revalidateOnMount: true,
    })

    const handleClose = () => {
        setIsOpen(false)
        setSelectedUser(undefined)
    }

    const confirmDelete = async () => {
        if (selectedUser) {
            const responsePromise: Promise<any> = deleteUser(selectedUser.id)
            await responsePromise
            mutate()
        }
        setSelectedUser(undefined)
        setIsConfirmOpen(false)
    }

    return {
        data: data?.data,
        selectedUser,
        setSelectedUser,
        isOpen,
        setIsOpen,
        search,
        setSearch,
        isConfirmOpen,
        setIsConfirmOpen,
        setParam,
        handleClose,
        confirmDelete,
    }
}
