import { Drawer, Button, DatePicker, Select, Space } from 'antd'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { useApi } from '@/utils/services'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProductType } from '@/utils/services/product.service'
import { StorageType } from '@/utils/services/storage.service'
import dayjs from 'dayjs'

export default function FilterModal() {
    const { t } = useTranslation()
    const { getParam, setParamObject, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const { data: productsRes } = useApi<{ data: ProductType[] }>(`product?${getURLs()}`)
    const { data: storageRes } = useApi<{ data: StorageType[] }>(`storage?${getURLs()}`)
    const products = productsRes?.data
    const storage = storageRes?.data

    const [filters, setFilters] = useState<{
        date: string
        product: string
        storage: string
    }>({
        date: getParam('date') ?? '',
        product: getParam('product') ?? '',
        storage: getParam('storage') ?? '',
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
                open={isOpen}
                onClose={() => setIsOpen(false)}
                width={400}
                footer={
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setIsOpen(false)}>{t('Отмена')}</Button>
                        <Button type="primary" onClick={handleSubmit}>
                            {t('Применить')}
                        </Button>
                    </Space>
                }
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Склад')}</div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder={t('Выберите склад')}
                            value={filters.storage || undefined}
                            onChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    storage: value?.toString() ?? '',
                                }))
                            }
                            allowClear
                            options={storage?.map((item) => ({
                                value: String(item.id),
                                label: item.name,
                            }))}
                        />
                    </div>

                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Продукт')}</div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder={t('Выберите продукт')}
                            value={filters.product || undefined}
                            onChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    product: value?.toString() ?? '',
                                }))
                            }
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={products?.map((item) => ({
                                value: String(item.id),
                                label: item.name,
                            }))}
                        />
                    </div>

                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Дата')}</div>
                        <DatePicker
                            style={{ width: '100%' }}
                            value={filters.date ? dayjs(filters.date) : null}
                            onChange={(date) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    date: date?.format('YYYY-MM-DD') ?? '',
                                }))
                            }
                            format="DD.MM.YYYY"
                        />
                    </div>
                </Space>
            </Drawer>
        </>
    )
}
