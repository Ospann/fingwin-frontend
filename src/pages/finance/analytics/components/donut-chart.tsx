import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from '../index.module.css'

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
        category: string
        sum: number
    }[]
}

export default function Donut({ data }: DonutType) {
    const { t } = useTranslation()

    const formattedData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: t('Расходы'),
                data: data.map((item) => item.sum),
                backgroundColor: ['#72DEF6', '#AFE9C2', '#FFB26A', '#FBE77F'],
                borderColor: ['#72DEF6', '#AFE9C2', '#FFB26A', '#FBE77F'],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className={classes.chartContainer}>
            <Text type="secondary">{t('Расходы')}</Text>
            <Doughnut data={formattedData} options={options} />
        </div>
    )
}
