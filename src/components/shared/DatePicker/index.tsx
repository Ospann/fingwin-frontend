import { DatePicker as AntDatePicker } from 'antd'
import { useState, useEffect } from 'react'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import classes from './index.module.css'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'

const { RangePicker } = AntDatePicker

type DatePickerProps = {
    handleChange?: (startDate: string, endDate: string) => void
    endDate?: string
    startDate?: string
    isURL?: boolean
}

export default function DatePicker({
    startDate,
    endDate,
    handleChange,
    isURL = false,
}: Readonly<DatePickerProps>) {
    const { setParamObject, getParam } = useURLParameters()

    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        startDate
            ? dayjs(startDate)
            : isURL && dayjs(getParam('startDate')).isValid()
                ? dayjs(getParam('startDate'))
                : dayjs().startOf('month'),
        endDate
            ? dayjs(endDate)
            : isURL && dayjs(getParam('endDate')).isValid()
                ? dayjs(getParam('endDate'))
                : dayjs().endOf('month'),
    ])

    const handleRangeChange = (dates: null | (Dayjs | null)[]) => {
        if (dates && dates[0] && dates[1]) {
            const newRange: [Dayjs, Dayjs] = [dates[0], dates[1]]
            setDateRange(newRange)

            const formattedStart = dates[0].format('YYYY-MM-DD')
            const formattedEnd = dates[1].format('YYYY-MM-DD')

            handleChange?.(formattedStart, formattedEnd)

            if (isURL) {
                setParamObject({
                    startDate: formattedStart,
                    endDate: formattedEnd,
                })
            }
        }
    }

    useEffect(() => {
        if (isURL) {
            setParamObject({
                startDate: dateRange[0].format('YYYY-MM-DD'),
                endDate: dateRange[1].format('YYYY-MM-DD'),
            })
        }
    }, [])

    const rangePresets = [
        {
            label: 'Сегодня',
            value: [dayjs().startOf('day'), dayjs().endOf('day')] as [Dayjs, Dayjs],
        },
        {
            label: 'Вчера',
            value: [
                dayjs().subtract(1, 'day').startOf('day'),
                dayjs().subtract(1, 'day').endOf('day'),
            ] as [Dayjs, Dayjs],
        },
        {
            label: 'Текущая неделя',
            value: [dayjs().startOf('week'), dayjs().endOf('week')] as [Dayjs, Dayjs],
        },
        {
            label: 'Прошлая неделя',
            value: [
                dayjs().subtract(1, 'week').startOf('week'),
                dayjs().subtract(1, 'week').endOf('week'),
            ] as [Dayjs, Dayjs],
        },
        {
            label: 'Текущий месяц',
            value: [dayjs().startOf('month'), dayjs().endOf('month')] as [Dayjs, Dayjs],
        },
        {
            label: 'Прошлый месяц',
            value: [
                dayjs().subtract(1, 'month').startOf('month'),
                dayjs().subtract(1, 'month').endOf('month'),
            ] as [Dayjs, Dayjs],
        },
        {
            label: 'Текущий год',
            value: [dayjs().startOf('year'), dayjs().endOf('year')] as [Dayjs, Dayjs],
        },
        {
            label: 'Прошлый год',
            value: [
                dayjs().subtract(1, 'year').startOf('year'),
                dayjs().subtract(1, 'year').endOf('year'),
            ] as [Dayjs, Dayjs],
        },
    ]

    return (
        <RangePicker
            value={dateRange}
            onChange={handleRangeChange}
            format="DD.MM.YYYY"
            className={classes.popoverTrigger}
            presets={rangePresets}
            placeholder={['Начало', 'Конец']}
        />
    )
}