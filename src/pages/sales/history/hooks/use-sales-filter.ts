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

    const { data: storage } = useApi<{ data: StorageType[] }>('/storage')
    const { data: clients } = useApi<{ data: ClientType[] }>('client')

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

    const toggleArchive = () => {
        const archive = Boolean(filters.archive)
        setFilters((prev) => ({
            ...prev,
            archive: archive ? '' : 'true',
        }))
    }

    return {
        filters,
        setFilters,
        isOpen,
        setIsOpen,
        storage: storage?.data ?? [],
        clients: clients?.data ?? [],
        handleSubmit,
        handleReset,
        toggleArchive,
    }
}
