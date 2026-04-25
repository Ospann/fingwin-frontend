import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'

export type FinanceReportType = {
    [key: string]: FinanceData | { [key: string]: number }
}

export type FinanceData = {
    data: { [key: string]: number | string }
    details: { [key: string]: { [key: string]: number } }
}

export function isFinanceData(value: unknown): value is FinanceData {
    if (value === null || typeof value !== 'object' || !('data' in value) || !('details' in value)) {
        return false
    }
    const { data, details } = value as { data: unknown; details: unknown }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        return false
    }
    const dataRecord = data as Record<string, unknown>
    if (
        !Object.keys(dataRecord).every(
            (key) => typeof dataRecord[key] === 'number' || typeof dataRecord[key] === 'string',
        )
    ) {
        return false
    }
    return typeof details === 'object' && details !== null && !Array.isArray(details)
}

export function useCashFlowReport() {
    const { getParam } = useURLParameters()
    const year = getParam('year')
    const { data } = useApi<{ data: FinanceReportType }>(year ? `/finance/report?year=${year}` : '')

    return {
        data: data?.data,
    }
}
