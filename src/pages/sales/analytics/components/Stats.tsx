import { Card, Row, Col, Statistic, Avatar } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { useTheme } from '@/components/ui/Themed/theme-provider'

type StatsProps = {
    data: {
        average: number
        income: number
        incomeChangePercentage: number
        averageByMonth: number
    }
}

export default function Stats({
    data: { average, income, incomeChangePercentage, averageByMonth },
}: StatsProps) {
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()
    const trendPositive = +incomeChangePercentage > 0

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
                <Card style={{ backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)' }}>
                    <Statistic
                        title={t('Выручка')}
                        value={formatNumber(income)}
                        prefix={<Avatar src="https://cdn-icons-png.flaticon.com/512/5198/5198491.png" />}
                        suffix="₸"
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card style={{ backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)' }}>
                    <Statistic
                        title={t('Cредняя выручка')}
                        value={formatNumber(averageByMonth)}
                        prefix={<Avatar src="https://cdn-icons-png.flaticon.com/512/9285/9285976.png" />}
                        suffix="₸"
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card style={{ backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)' }}>
                    <Statistic
                        title={t('Cредний чек')}
                        value={formatNumber(average)}
                        prefix={<Avatar src="https://cdn-icons-png.flaticon.com/512/6594/6594078.png" />}
                        suffix="₸"
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card style={{ backgroundColor: isDarkMode ? 'var(--dark)' : 'var(--light)' }}>
                    <Statistic
                        title={t('Сравнение')}
                        value={Math.abs(incomeChangePercentage)}
                        precision={2}
                        valueStyle={{ color: trendPositive ? 'green' : 'red' }}
                        prefix={
                            <Avatar
                                src="https://cdn-icons-png.flaticon.com/512/6577/6577279.png"
                                style={{ marginRight: 8 }}
                            />
                        }
                        suffix={trendPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    />
                </Card>
            </Col>
        </Row>
    )
}
