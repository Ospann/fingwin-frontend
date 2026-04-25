import { useApi } from '@/utils/services'
import { FinanceCategory } from '@/utils/types/finance.types'

export function useKaspiData() {
    const { data: categoryData } = useApi<{ data: FinanceCategory[] }>('/finance/category')
    const { data: scoreData } = useApi<{ data: { id: number; account: string }[] }>(
        '/finance/score',
    )

    return {
        categoryData: categoryData?.data,
        scoreData: scoreData?.data,
    }
}
