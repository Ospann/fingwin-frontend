import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from '../index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'

const { Text } = Typography

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
    },
}

type DonutType = {
    data: {
        product: string
        total: number
        uom: string
    }[]
}

export default function Donut({ data }: DonutType) {
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()
    const formattedData = {
        labels: data.map((item) => item.product),
        datasets: [
            {
                label: t('Продукт'),
                data: data.map((item) => item.total),
                backgroundColor: ['#72DEF6', '#AFE9C2', '#FFB26A', '#FBE77F'],
                borderColor: ['#72DEF6', '#AFE9C2', '#FFB26A', '#FBE77F'],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div
            style={{ background: isDarkMode ? 'var(--dark)' : 'var(--light)' }}
            className={classes.chartContainer}
        >
            <Text color="gray">{t('Топ продукты')}</Text>
            <Doughnut data={formattedData} options={options} />
        </div>
    )
}
