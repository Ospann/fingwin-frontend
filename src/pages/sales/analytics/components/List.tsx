import { Button, Flex, Tooltip, Typography } from 'antd'
import { formatNumber } from '@/utils/helpers/formatNumber'
import { useTranslation } from 'react-i18next'
import classes from '../index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'
import { DownloadOutlined } from "@ant-design/icons";
import { useURLParameters } from "@/utils/hooks/useURLParameters.tsx";
import { uploadTopProductsExcel } from "@/utils/services/sales.service.ts";

const RED_COLOR = '#DD525A'
const GREEN_COLOR = '#5DB57A'

type ListProps = {
    data: {
        product: string
        quantity: number
        uom: string
        total: number
    }[]
}

const { Text } = Typography

export default function List({ data }: ListProps) {
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()
    const { getURLs } = useURLParameters();

    return (
        <div
            style={{ background: isDarkMode ? 'var(--dark)' : 'var(--light)' }}
            className={classes.chartContainer}
        >
            <Tooltip title="Скачать Excel">
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                        uploadTopProductsExcel(getURLs())
                    }}
                >
                    Скачать
                </Button>
            </Tooltip>
            <Text color="gray">{t('Топ продукты')}</Text>
            <div className={classes.list}>
                {data.slice(0, 10).map((item) => (
                    <Flex
                        justify="space-between"
                        key={item.product}
                        className={classes.item}
                    >
                        <Text>{item.product}</Text>
                        <Text>
                            {item.quantity} {item.uom}
                        </Text>
                        <Text color={item.total > 0 ? GREEN_COLOR : RED_COLOR}>
                            ₸{formatNumber(item.total)}
                        </Text>
                    </Flex>
                ))}
            </div>
        </div>
    )
}
