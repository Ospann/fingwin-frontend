import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TooltipItem,
} from 'chart.js'
import { monthsConsts } from '@/utils/constants/month.consts'
import { useTheme } from '@/components/ui/Themed/theme-provider'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type StackedBarChartProps = {
    data: {
        label: string
        data: number[]
        fill: boolean
        checked: boolean
        backgroundColor: string
    }[]
}
export default function StackedBarChart({ data }: StackedBarChartProps) {
    const defaultData = {
        labels: monthsConsts,
        datasets: data,
    }
    const { isDarkMode } = useTheme()

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        let label = context.dataset.label || ''
                        if (label) {
                            label += ': '
                        }
                        const value = context.raw as number
                        label += `${(value * 100).toFixed(2)}%`
                        return label
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                ticks: {
                    callback: (value: string | number) => {
                        const val = Number(value)
                        return `${(val * 100).toFixed(2)}%`
                    },
                },
            },
        },
    }

    return (
        <div
            style={{
                background: isDarkMode ? 'var(--dark)' : 'var(--light)',
                border: isDarkMode ? '1px solid #444' : '1px solid #eee',
                padding: '2rem',
                borderRadius: 10,
                flex: 1,
            }}
        >
            {' '}
            <Bar data={defaultData} options={options} />
        </div>
    )
}
