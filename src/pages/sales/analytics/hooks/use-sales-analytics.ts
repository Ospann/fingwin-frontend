import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

export type AnalyticsType = {
    stats: {
        income: number
        average: number
        incomeChangePercentage: number
        averageByMonth: number
    }
    incomeByMonth: {
        month: string
        sum: number
    }[]
    clients: {
        client: string
        total: number
    }[]
    products: {
        product: string
        total: number
        quantity: number
        uom: string
    }[]
}

export const useAnalytics = () => {
    const { getURLs } = useURLParameters()
    const { data, error, isLoading } = useApi<{ data: AnalyticsType }>(
        `sales/analytics?${getURLs()}`,
    )

    return {
        data: data?.data,
        error,
        isLoading,
    }
}
