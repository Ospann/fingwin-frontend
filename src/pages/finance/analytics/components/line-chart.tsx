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
import classes from '../index.module.css'

const { Text } = Typography

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
        date: string
        remain: number
    }[]
}

export default function LineChart({ data }: LineChartType) {
    const { t } = useTranslation()

    const formattedData = {
        labels: data.map((item) => item.date),
        datasets: [
            {
                backgroundColor: '#646BE1',
                borderColor: '#646BE1',
                data: data.map((item) => item.remain),
                fill: false,
            },
        ],
    }
    return (
        <div className={classes.chartContainer}>
            <Text type="secondary">{t('Остатки по счетам')}</Text>
            <Line options={options} data={formattedData} />
        </div>
    )
}
