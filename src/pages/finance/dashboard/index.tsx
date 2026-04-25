import StackedBarChart from './components/bar-chart'
import TableChart from './components/table-chart'
import LineChart from './components/line-chart'
import classes from './index.module.css'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import YearSelect from '@/components/shared/YearSelect'
import { useDashboard } from './hooks/use-dashboard'
import { Layout } from 'antd'

const { Content } = Layout

export default function Dashboard() {
    const { tableData, chartData, handleCheckboxChange } = useDashboard()

    return (
        <Layout>
            <Content>
                <div className={classes.upContainer}>
                    <Breadcrumbs />
                    <YearSelect />
                </div>
                <div className={classes.container}>
                    <div className={classes.tableContainer}>
                        <TableChart data={tableData} onCheckboxChange={handleCheckboxChange} />
                    </div>
                    <div className={classes.chartContainer}>
                        <LineChart data={chartData} />
                        <StackedBarChart data={chartData} />
                    </div>
                </div>
            </Content>
        </Layout>
    )
}
