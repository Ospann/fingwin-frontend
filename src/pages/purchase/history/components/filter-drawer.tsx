import { Drawer, Button, DatePicker, Select, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { usePurchaseFilters } from '../hooks/use-purchase-filters'
import classes from '../index.module.css'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

export default function FilterModal() {
    const { t } = useTranslation()
    const {
        filters,
        setFilters,
        handleChange,
        toggleArchive,
        applyFilters,
        resetFilters,
        isOpen,
        setIsOpen,
        supplierData,
        products,
    } = usePurchaseFilters()

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className={classes.filterButton}>
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
                        <Button onClick={resetFilters}>{t('Очистить')}</Button>
                        <Button type="primary" onClick={applyFilters}>
                            {t('Применить')}
                        </Button>
                    </Space>
                }
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Дата')}</div>
                        <RangePicker
                            style={{ width: '100%' }}
                            value={[
                                filters.startDate ? dayjs(filters.startDate) : null,
                                filters.endDate ? dayjs(filters.endDate) : null,
                            ]}
                            onChange={(dates) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    startDate: dates?.[0]?.format('YYYY-MM-DD') || '',
                                    endDate: dates?.[1]?.format('YYYY-MM-DD') || '',
                                }))
                            }}
                        />
                    </div>

                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Поставщик')}</div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder={t('Поставщик')}
                            value={filters.supplier || undefined}
                            onChange={(value) => handleChange('supplier', value || '')}
                            allowClear
                            options={supplierData?.map((opt) => ({
                                value: String(opt.id),
                                label: opt.name,
                            }))}
                        />
                    </div>

                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Статус')}</div>
                        <Button onClick={toggleArchive} style={{ width: '100%' }}>
                            {t(filters.archive ? 'Удаленные' : 'Активные')}
                        </Button>
                    </div>

                    <div>
                        <div style={{ marginBottom: 8 }}>{t('Продукт')}</div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder={t('Выберите продукт')}
                            value={filters.product || undefined}
                            onChange={(value) => handleChange('product', value || '')}
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={products?.map((opt) => ({
                                value: String(opt.id),
                                label: opt.name,
                            }))}
                        />
                    </div>
                </Space>
            </Drawer>
        </>
    )
}