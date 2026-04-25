import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

export type AnalyticsType = {
    stats: {
        income: number
        expense: number
        remain: number
    }
    remainsByDay: {
        date: string
        remain: number
    }[]
    expenses: {
        category: string
        sum: number
    }[]
    remains: {
        account: string
        remain: number
        currency: string
    }[]
}

export function useFinanceAnalytics() {
    const { getURLs } = useURLParameters()
    const { data, isLoading, error } = useApi<{ data: AnalyticsType }>(
        `finance/analytics?${getURLs()}`,
    )

    return {
        data: data?.data,
        isLoading,
        error,
    }
}
