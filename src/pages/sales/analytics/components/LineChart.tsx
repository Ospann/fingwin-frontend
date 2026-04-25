import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { monthsConsts } from '@/utils/constants/month.consts'
import classes from '../index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const { Text } = Typography

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        line: {
            tension: 0.4,
        },
    },
    scales: {
        x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
            },
        },
    },
}

type LineChartType = {
    data: {
        month: string
        sum: number
    }[]
}

export default function LineChart({ data }: LineChartType) {
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()

    const formattedData = {
        labels: data.map((item) => t(monthsConsts[+item.month - 1])),
        datasets: [
            {
                backgroundColor: '#646BE1',
                borderColor: '#646BE1',
                data: data.map((item) => item.sum),
                fill: false,
            },
        ],
    }
    return (
        <div
            style={{ background: isDarkMode ? 'var(--dark)' : 'var(--light)' }}
            className={classes.chartContainer}
        >
            <Text color="gray">{t('Выручка по месяцам')}</Text>
            <Line options={options} data={formattedData} />
        </div>
    )
}
