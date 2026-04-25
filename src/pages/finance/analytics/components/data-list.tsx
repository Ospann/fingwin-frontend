import { Typography } from 'antd'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { useTranslation } from 'react-i18next'
import { currencies } from '@/utils/constants/currency.consts'
import classes from '../index.module.css'

const { Text } = Typography

const RED_COLOR = '#DD525A'
const GREEN_COLOR = '#5DB57A'

type ListProps = {
    data: {
        account: string
        remain: number
        currency: string
    }[]
}

export default function List({ data }: ListProps) {
    const { t } = useTranslation()

    return (
        <div className={classes.chartContainer}>
            <Text type="secondary">{t('Остатки по счетам')}</Text>
            <div className={classes.list}>
                {data.map((item) => (
                    <div
                        key={item.account}
                        className={classes.item}
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        <Text>{item.account}</Text>
                        <Text style={{ color: item.remain > 0 ? GREEN_COLOR : RED_COLOR }}>
                            {currencies.find((c) => c.code === item.currency)?.symbol}{' '}
                            {formatNumber(item.remain)}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    )
}
