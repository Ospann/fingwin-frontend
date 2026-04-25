import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'

export type FinanceReportType = {
    [key: string]: FinanceData | { [key: string]: number }
}

export type FinanceData = {
    data: { [key: string]: number | string }
    details: { [key: string]: { [key: string]: number } }
}

export function isFinanceData(value: any): value is FinanceData {
    return (
        value !== null &&
        typeof value === 'object' &&
        typeof value.data === 'object' &&
        !Array.isArray(value.data) &&
        Object.keys(value.data).every(
            (key) => typeof value.data[key] === 'number' || typeof value.data[key] === 'string',
        ) &&
        typeof value.details === 'object' &&
        !Array.isArray(value.details)
    )
}

export function useCashFlowReport() {
    const { getParam } = useURLParameters()
    const year = getParam('year')
    const { data } = useApi<{ data: FinanceReportType }>(year ? `/finance/report?year=${year}` : '')

    return {
        data: data?.data,
    }
}
