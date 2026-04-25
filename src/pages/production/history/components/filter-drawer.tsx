import { Drawer, Button, DatePicker, Select, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useProductionFilter } from '../hooks/use-production-filter'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

export default function FilterDrawer() {
    const { t } = useTranslation()
    const {
        filters,
        isOpen,
        setIsOpen,
        handleSubmit,
        handleReset,
        handleChange,
        handleDateChange,
        handleToggleArchive,
        supplierData,
    } = useProductionFilter()

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
                        <Button onClick={handleReset}>{t('Очистить')}</Button>
                        <Button type="primary" onClick={handleSubmit}>
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
                                handleDateChange(
                                    dates?.[0]?.format('YYYY-MM-DD') || '',
                                    dates?.[1]?.format('YYYY-MM-DD') || ''
                                )
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
                        <Button onClick={handleToggleArchive} style={{ width: '100%' }}>
                            {t(filters.archive ? 'Удаленные' : 'Активные')}
                        </Button>
                    </div>
                </Space>
            </Drawer>
        </>
    )
}