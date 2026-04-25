import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { useState } from 'react'
import { refreshPnl } from '@/utils/services/finance.service'
import { SettingsTypes } from '@/utils/services/settings.service'

type PnlDataType = {
    [key: string]: {
        data: { [key: string]: number | string }
        details: { [key: string]: { [key: string]: number } }
    }
}

export function usePNLReport() {
    const { getParam } = useURLParameters()
    const year = getParam('year')
    const { data, loading, mutate } = useApi<{ data: PnlDataType }>(
        year ? `/finance/pnl?year=${year}` : '',
    )
    const { data: settingsResponse, mutate: mutateSettings } = useApi<{
        data: SettingsTypes[]
    }>('/settings')

    const [isLoading, setIsLoading] = useState(false)

    const handleRefresh = () => {
        setIsLoading(true)
        refreshPnl().then(() => {
            mutate()
            mutateSettings()
            setIsLoading(false)
        })
    }

    return {
        data: data?.data,
        loading,
        isLoading,
        settings: settingsResponse?.data,
        handleRefresh,
    }
}
