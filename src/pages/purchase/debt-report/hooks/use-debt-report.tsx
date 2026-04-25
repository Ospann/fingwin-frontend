import { useMemo, useState } from 'react'
import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

export type DebtReportType = {
    supplierId: number
    supplier: string
    debt: number
    needToPay: number
}

export function useDebtReport() {
    const { setParam } = useURLParameters()
    const [search, setSearch] = useState('')

    const { data } = useApi<{ data: DebtReportType[] }>('purchase/debt-report')

    const filteredData = useMemo(() => {
        const rows = data?.data ?? []
        if (!search.trim()) return rows
        const lowerSearch = search.toLowerCase()
        return rows.filter(({ supplier }) => supplier.toLowerCase().includes(lowerSearch))
    }, [search, data])

    return {
        search,
        setSearch,
        setParam,
        filteredData,
    }
}