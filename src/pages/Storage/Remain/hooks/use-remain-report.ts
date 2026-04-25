import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { uploadExcelCorrect } from '@/utils/services/storage.service'

export type RemainReportType = {
    quantity: number
    total: number
    product: string
}

export function useRemainReport() {
    const { getURLs } = useURLParameters()
    const { data, isLoading, error, mutate } = useApi<{ data: RemainReportType[] }>(
        `storage/remain?${getURLs()}`,
        {
            revalidateOnMount: true,
        },
    )

    const handleDownload = () => {
        uploadExcelCorrect(getURLs())
    }

    const totalSum = data?.data?.reduce((acc, curr) => acc + curr.total, 0) ?? 0

    return {
        data: data?.data,
        mutate,
        isLoading,
        error,
        handleDownload,
        totalSum,
    }
}
