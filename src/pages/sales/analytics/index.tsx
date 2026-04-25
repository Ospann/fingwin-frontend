import DatePicker from '@/components/shared/DatePicker'
import List from './components/List'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import Stats from './components/Stats'
import LineChart from './components/LineChart'
import Donut from './components/Donut'
import classes from './index.module.css'
import Loader from './components/Loader'
import { Helmet } from 'react-helmet'
import { useAnalytics } from './hooks/use-sales-analytics'
import { Layout, Select } from 'antd'
import { useStorageList } from '@/pages/admin-panel/storage/hooks/use-storage-list.ts'
import { useURLParameters } from '@/utils/hooks/useURLParameters.tsx'

const { Content } = Layout

export default function Analytics() {
    const { data, isLoading } = useAnalytics()
    const { data: storageData } = useStorageList()
    const { setParam } = useURLParameters()

    const filterByStorage = (value: number) => {
        setParam('storageId', value ? value.toString() : '')
    }

    return (
        <Layout>
            <Helmet>
                <title>Аналитика продаж</title>
            </Helmet>
            <Content>
                <div className={classes.upcontainer}>
                    <Breadcrumbs />
                    <div className={classes.container}>
                        <Select
                            style={{ width: '180px' }}
                            allowClear
                            options={storageData?.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChange={filterByStorage}
                            placeholder="Выберите склад"
                        />
                        <DatePicker isURL />
                    </div>
                </div>
                {isLoading || !data ? (
                    <Loader />
                ) : (
                    <div className={classes.container}>
                        <div className={classes.mainBlock}>
                            <Stats data={data.stats} />
                            <LineChart data={data.incomeByMonth} />
                        </div>
                        <div className={classes.expenseBlock}>
                            <Donut data={data.products} />
                            <List data={data.products} />
                        </div>
                    </div>
                )}
            </Content>
        </Layout>
    )
}
