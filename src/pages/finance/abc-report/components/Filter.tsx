import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { ProductType } from '@/utils/services/product.service'
import { Drawer, Button, Select, Space, DatePicker as AntDatePicker } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = AntDatePicker

export default function FilterModal() {
    const { t } = useTranslation()
    const { getParam, setParamObject, getURLs } = useURLParameters()
    const { data: productsRes } = useApi<{ data: ProductType[] }>(`product?${getURLs()}`)
    const products = productsRes?.data

    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState({
        product: getParam('product') ?? '',
        startDate: getParam('startDate') ?? '',
        endDate: getParam('endDate') ?? '',
    })

    const handleSubmit = () => {
        setParamObject(filters)
        setIsOpen(false)
    }

    return (
        <>
            <Button type="primary" onClick={() => setIsOpen(true)}>
                {t('Фильтры')}
            </Button>
            <Drawer
                title={t('Фильтрация')}
                placement="right"
                onClose={() => setIsOpen(false)}
                open={isOpen}
                footer={
                    <Space>
                        <Button onClick={() => setIsOpen(false)}>{t('Отмена')}</Button>
                        <Button type="primary" onClick={handleSubmit}>
                            {t('Применить')}
                        </Button>
                    </Space>
                }
                width={360}
            >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Select
                        allowClear
                        placeholder={t('Выберите продукт')}
                        options={products?.map((item) => ({ value: `${item.id}`, label: item.name }))}
                        value={filters.product || undefined}
                        onChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                product: value || '',
                            }))
                        }
                        style={{ width: '100%' }}
                    />

                    <RangePicker
                        style={{ width: '100%' }}
                        value={
                            filters.startDate && filters.endDate
                                ? [dayjs(filters.startDate), dayjs(filters.endDate)]
                                : undefined
                        }
                        onChange={(dates) => {
                            setFilters((prev) => ({
                                ...prev,
                                startDate: dates?.[0] ? dates[0].format('YYYY-MM-DD') : '',
                                endDate: dates?.[1] ? dates[1].format('YYYY-MM-DD') : '',
                            }))
                        }}
                        format="YYYY-MM-DD"
                    />
                </Space>
            </Drawer>
        </>
    )
}
