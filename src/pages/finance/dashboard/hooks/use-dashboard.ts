import { useEffect, useMemo, useState } from 'react'
import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'

const colors = [
    '#D32F2F',
    '#C2185B',
    '#7B1FA2',
    '#512DA8',
    '#303F9F',
    '#1976D2',
    '#0288D1',
    '#0097A7',
    '#00796B',
    '#388E3C',
    '#689F38',
    '#AFB42B',
    '#FBC02D',
    '#FFA000',
    '#F57C00',
    '#E64A19',
    '#5D4037',
    '#616161',
    '#455A64',
    '#000000',
    '#795548',
    '#9E9E9E',
    '#607D8B',
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
]

export type DashboardDataType = {
    label: string
    data: number[]
    fill: boolean
    pointRadius: number
    backgroundColor: string
    checked: boolean
}

type CheckedState = Record<string, boolean>

export function useDashboard() {
    const { getParam } = useURLParameters()
    const year = getParam('year')

    const { data: stats } = useApi<{ data: DashboardDataType[] }>(
        year ? `finance/dashboard?year=${year}` : '',
    )
    const [checkedState, setCheckedState] = useState<CheckedState>({})

    useEffect(() => {
        if (stats) {
            const initialCheckedState: CheckedState = {}
            stats?.data?.forEach((item) => {
                initialCheckedState[item.label] = true
            })
            setCheckedState(initialCheckedState)
        }
    }, [stats])

    const handleCheckboxChange = (label: string) => {
        setCheckedState((prev) => ({
            ...prev,
            [label]: !prev[label],
        }))
    }

    const tableData = useMemo(() => {
        return (
            stats?.data?.map((item, index) => ({
                ...item,
                fill: false,
                pointRadius: 0,
                backgroundColor: colors[index % colors.length],
                checked: checkedState[item.label] ?? true,
            })) ?? []
        )
    }, [stats, checkedState])

    const chartData = useMemo(() => {
        return tableData.filter((item) => checkedState[item.label])
    }, [tableData, checkedState])

    return {
        tableData,
        chartData,
        handleCheckboxChange,
    }
}
