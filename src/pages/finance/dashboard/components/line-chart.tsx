import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    type TooltipItem,
} from 'chart.js'
import { monthsConsts } from '@/utils/constants/month.consts'
import { useTheme } from '@/components/ui/Themed/theme-provider'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
)

type StackedLineChartProps = {
    data: {
        label: string
        data: number[]
        fill: boolean
        checked: boolean
        backgroundColor: string
    }[]
}

export default function StackedLineChart({ data: datasets }: StackedLineChartProps) {
    const { isDarkMode } = useTheme()

    const data = {
        labels: monthsConsts,
        datasets,
    }

    const options = {
        scales: {
            x: {
                time: {
                    unit: 'month' as const,
                },
            },
            y: {
                stacked: true,
                ticks: {
                    callback: (value: number | string) => {
                        const num = Number(value)
                        return `${(num * 100).toFixed(2)}%`
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                callbacks: {
                    label: (context: TooltipItem<'line'>) => {
                        let label = context.dataset.label || ''
                        if (label) label += ': '

                        const val = context.parsed.y
                        if (val !== null) {
                            label += `${(val * 100).toFixed(2)}%`
                        }

                        return label
                    },
                },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
        elements: {
            line: {
                tension: 0.4,
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
            <Line data={data} options={options} />
        </div>
    )
}
