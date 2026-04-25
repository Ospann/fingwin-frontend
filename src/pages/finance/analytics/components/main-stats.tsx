import { Card, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { useTranslation } from 'react-i18next'
import IncomeSVG from '../svg/income'
import ExpenseSVG from '../svg/expense'
import RemainSVG from '../svg/remain'
import classes from '../index.module.css'

type StatsProps = {
    data: {
        remain: number
        income: number
        expense: number
    }
}

export default function Stats({ data }: StatsProps) {
    const { t } = useTranslation()

    return (
        <div
            className={classes.statContainer}
            style={{
                display: 'flex',
                gap: '16px',
                width: '100%',
            }}
        >
            <Card
                className={classes.chartContainer}
                style={{
                    flex: 1,
                    padding: 0,
                }}
            >
                <div className={classes.iconContainer}>
                    <RemainSVG />
                </div>
                <Statistic title={t('Остаток')} value={formatNumber(data.remain)} prefix="₸" />
            </Card>

            <Card
                className={classes.chartContainer}
                style={{
                    flex: 1,
                    position: 'relative',
                    padding: 0,
                }}
            >
                <div className={classes.iconContainer}>
                    <IncomeSVG />
                </div>
                <Statistic title={t('Приход')} value={formatNumber(data.income)} prefix="₸" />
                <div style={{ flex: 1, position: 'absolute', top: 8, right: 8 }}>
                    <ArrowUpOutlined style={{ color: '#52c41a' }} />
                </div>
            </Card>

            <Card
                className={classes.chartContainer}
                style={{
                    flex: 1,
                    padding: 0,
                    position: 'relative',
                }}
            >
                <div className={classes.iconContainer}>
                    <ExpenseSVG />
                </div>
                <Statistic title={t('Расход')} value={formatNumber(data.expense)} prefix="₸" />
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                </div>
            </Card>
        </div>
    )
}
