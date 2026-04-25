import { useState, useCallback } from 'react'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { StorageType } from '@/utils/services/storage.service'
import { ClientType } from '@/utils/services/client.service'

export const useSalesFilter = () => {
    const { getParam, setParamObject, clearParams } = useURLParameters()

    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState({
        startDate: getParam('startDate'),
        endDate: getParam('endDate'),
        storage: getParam('storage'),
        archive: getParam('archive'),
        client: getParam('client'),
    })

    const { data: storageRes } = useApi<{ data: StorageType[] }>('/storage')
    const { data: clientsRes } = useApi<{ data: ClientType[] }>('client')
    const storage = storageRes?.data
    const clients = clientsRes?.data

    const handleSubmit = useCallback(() => {
        setParamObject(filters)
        setIsOpen(false)
    }, [filters, setParamObject])

    const handleReset = useCallback(() => {
        setFilters({
            startDate: '',
            endDate: '',
            storage: '',
            archive: '',
            client: '',
        })
        clearParams()
        setIsOpen(false)
    }, [clearParams])

    return {
        filters,
        setFilters,
        isOpen,
        setIsOpen,
        storage,
        clients,
        handleSubmit,
        handleReset,
    }
}
