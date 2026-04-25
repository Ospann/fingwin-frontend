import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { Drawer, Button, Select, Form, DatePicker, Space } from 'antd'
import { useSalesFilter } from '../hooks/use-sales-filter'

const { RangePicker } = DatePicker

type FilterDrawerProps = {
    open: boolean
    onClose: () => void
}

export default function FilterDrawer({ open: isOpen, onClose }: FilterDrawerProps) {
    const { t } = useTranslation()
    const {
        filters,
        setFilters,
        storage,
        clients,
        handleSubmit,
        handleReset,
    } = useSalesFilter()

    return (
        <Drawer
            title={t('Фильтрация')}
            placement="right"
            onClose={onClose}
            open={isOpen}
            width={350}
            footer={
                <Space style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={handleReset}>{t('Очистить')}</Button>
                    <Button type="primary" onClick={handleSubmit}>
                        {t('Применить')}
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical">
                <Form.Item label={t('Дата')}>
                    <RangePicker
                        style={{ width: '100%' }}
                        value={
                            filters.startDate && filters.endDate
                                ? [dayjs(filters.startDate), dayjs(filters.endDate)]
                                : undefined
                        }
                        onChange={(dates) =>
                            setFilters((prev) => ({
                                ...prev,
                                startDate: dates?.[0]?.toISOString() ?? '',
                                endDate: dates?.[1]?.toISOString() ?? '',
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item label={t('Склад')}>
                    <Select
                        placeholder={t('Склад')}
                        value={filters.storage || undefined}
                        onChange={(value) =>
                            setFilters((prev) => ({ ...prev, storage: value }))
                        }
                        allowClear
                    >
                        {storage?.map((opt) => (
                            <Select.Option key={opt.id} value={opt.id}>
                                {opt.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label={t('Клиент')}>
                    <Select
                        placeholder={t('Клиент')}
                        value={filters.client || undefined}
                        onChange={(value) =>
                            setFilters((prev) => ({ ...prev, client: value }))
                        }
                        allowClear
                    >
                        {clients?.map((opt) => (
                            <Select.Option key={opt.id} value={opt.id}>
                                {opt.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
