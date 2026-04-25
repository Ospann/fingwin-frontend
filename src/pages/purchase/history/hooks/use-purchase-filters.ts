import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { useState } from 'react'
import { ProductType } from '@/utils/services/product.service'

export const usePurchaseFilters = () => {
    const { getParam, setParamObject, clearParams } = useURLParameters()

    const [isOpen, setIsOpen] = useState(false)
    const { data: supplierRes } = useApi<{ data: { id: number; name: string }[] }>('/supplier')
    const { data: productsRes } = useApi<{ data: ProductType[] }>('product')
    const supplierData = supplierRes?.data
    const products = productsRes?.data

    const [filters, setFilters] = useState({
        startDate: getParam('startDate'),
        endDate: getParam('endDate'),
        supplier: getParam('supplier'),
        archive: getParam('archive'),
        product: getParam('product'),
    })

    const handleChange = (field: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }))
    }

    const toggleArchive = () => {
        setFilters((prev) => ({
            ...prev,
            archive: prev.archive ? '' : 'true',
        }))
    }

    const applyFilters = () => {
        setParamObject(filters)
        setIsOpen(false)
    }

    const resetFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            supplier: '',
            archive: '',
            product: '',
        })
        clearParams()
        setIsOpen(false)
    }

    return {
        filters,
        setFilters,
        handleChange,
        toggleArchive,
        applyFilters,
        resetFilters,
        isOpen,
        setIsOpen,
        supplierData,
        products,
    }
}
