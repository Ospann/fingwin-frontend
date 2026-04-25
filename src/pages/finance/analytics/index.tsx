import DatePicker from '@/components/shared/DatePicker'
import List from './components/data-list'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Stats from './components/main-stats'
import LineChart from './components/line-chart'
import Donut from './components/donut-chart'
import classes from './index.module.css'
import Loader from './components/analytics-loader'
import { useFinanceAnalytics } from './hooks/use-finance-analytics'
import { Layout } from 'antd'

const { Content } = Layout

export default function Analytics() {
    const { data, isLoading } = useFinanceAnalytics()

    return (
        <Layout>
            <Content>
                <div className={classes.upcontainer}>
                    <Breadcrumbs />
                    <DatePicker isURL />
                </div>
                {isLoading || !data ? (
                    <Loader />
                ) : (
                    <div className={classes.container}>
                        <div className={classes.mainBlock}>
                            <Stats data={data.stats} />
                            <LineChart data={data.remainsByDay} />
                        </div>
                        <div className={classes.expenseBlock}>
                            <Donut data={data.expenses} />
                            <List data={data.remains} />
                        </div>
                    </div>
                )}
            </Content>
        </Layout>
    )
}
