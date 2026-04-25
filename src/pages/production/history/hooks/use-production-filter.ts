import { useState } from 'react'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'

export function useProductionFilter() {
    const { getParam, setParamObject, clearParams } = useURLParameters()

    const [isOpen, setIsOpen] = useState(false)

    const [filters, setFilters] = useState({
        startDate: getParam('startDate') || '',
        endDate: getParam('endDate') || '',
        supplier: getParam('supplier') || '',
        archive: getParam('archive') || '',
    })

    const { data: supplierRes, isLoading: isSuppliersLoading } = useApi<{
        data: { id: number; name: string }[]
    }>('/supplier')
    const supplierData = supplierRes?.data

    const handleChange = (name: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDateChange = (startDate: string, endDate: string) => {
        setFilters((prev) => ({
            ...prev,
            startDate,
            endDate,
        }))
    }

    const handleToggleArchive = () => {
        setFilters((prev) => ({
            ...prev,
            archive: prev.archive ? '' : 'true',
        }))
    }

    const handleSubmit = () => {
        setParamObject(filters)
        setIsOpen(false)
    }

    const handleReset = () => {
        setFilters({
            startDate: '',
            endDate: '',
            supplier: '',
            archive: '',
        })
        clearParams()
        setIsOpen(false)
    }

    return {
        filters,
        isOpen,
        setIsOpen,
        handleSubmit,
        handleReset,
        handleChange,
        handleDateChange,
        handleToggleArchive,
        supplierData,
        isSuppliersLoading,
    }
}
