import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useEffect } from 'react'
import { Select } from 'antd'
import dayjs from 'dayjs'
import styles from './index.module.css'

export default function YearSelect() {
    const { getParam, setParam } = useURLParameters()

    useEffect(() => {
        const year = getParam('year') || dayjs().year().toString()
        setParam('year', year)
    }, [])

    const years = [2026, 2025, 2024, 2023, 2022, 2021]

    return (
        <div className={styles.container}>
            <Select
                className={styles.select}
                defaultValue={getParam('year') || dayjs().year().toString()}
                onChange={(value) => setParam('year', value)}
                style={{ width: 120, borderRadius: 5 }}
                options={years.map((year) => ({
                    label: year,
                    value: year.toString(),
                }))}
            />
        </div>
    )
}
