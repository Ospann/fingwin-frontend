import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export function useFinanceFilters() {
    const { getParam, setParamObject, clearParams } = useURLParameters()
    const { t } = useTranslation()

    const { data: categoryData } = useApi<{ data: { id: number; category: string }[] }>(
        '/finance/category',
    )
    const { data: scoreData } = useApi<{ data: { id: number; account: string }[] }>(
        '/finance/score',
    )
    const { data: contragentData } = useApi<{ data: { id: number; contragent: string }[] }>(
        '/finance/contragent',
    )

    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({
        startDate: getParam('startDate'),
        endDate: getParam('endDate'),
        category: (getParam('category')?.split(',') || []).filter(Boolean) as string[],
        score: (getParam('score')?.split(',') || []).filter(Boolean) as string[],
        archive: getParam('archive'),
        contragent: (getParam('contragent')?.split(',') || []).filter(Boolean) as string[],
    })

    const handleChange = (field: string, value: number | string | null | string[]) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        setParamObject({
            ...filters,
            category: filters.category.join(','),
            score: filters.score.join(','),
            contragent: filters.contragent.join(','),
        })
        setOpen(false)
    }

    const handleReset = () => {
        setFilters({
            startDate: '',
            endDate: '',
            category: [],
            archive: '',
            score: [],
            contragent: [],
        })
        clearParams()
        setOpen(false)
    }

    return {
        t,
        open,
        setOpen,
        filters,
        setFilters,
        handleChange,
        handleSubmit,
        handleReset,
        categoryData: categoryData?.data,
        scoreData: scoreData?.data,
        contragentData: contragentData?.data,
    }
}
