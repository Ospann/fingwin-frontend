import { Drawer, Button, Form, Select, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import { useFinanceFilters } from '../hooks/use-finance-filter'

const { RangePicker } = DatePicker

type FilterDrawerProps = {
    open: boolean
    setOpen: (val: boolean) => void
}

export default function FilterDrawer({ open, setOpen }: FilterDrawerProps) {
    const {
        t,
        filters,
        handleChange,
        handleSubmit,
        handleReset,
        categoryData,
        scoreData,
        contragentData,
    } = useFinanceFilters()

    return (
        <Drawer
            title={t('Фильтрация')}
            placement="right"
            onClose={() => setOpen(false)}
            open={open}
            width={360}
        >
            <Form layout="vertical" style={{ gap: '12px' }}>
                <Form.Item label={t('Дата')}>
                    <RangePicker
                        style={{ width: '100%' }}
                        value={[
                            filters.startDate ? dayjs(filters.startDate) : null,
                            filters.endDate ? dayjs(filters.endDate) : null,
                        ]}
                        onChange={(dates) => {
                            handleChange('startDate', dates?.[0]?.toISOString() || '')
                            handleChange('endDate', dates?.[1]?.toISOString() || '')
                        }}
                    />
                </Form.Item>

                <Form.Item label={t('Категория')}>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={t('Выберите категорию')}
                        value={filters.category}
                        onChange={(vals) => handleChange('category', vals)}
                        options={categoryData?.map((opt) => ({
                            label: opt.category,
                            value: String(opt.id),
                        }))}
                    />
                </Form.Item>

                <Form.Item label={t('Контрагент')}>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={t('Выберите контрагента')}
                        value={filters.contragent}
                        onChange={(vals) => handleChange('contragent', vals)}
                        options={contragentData?.map((opt) => ({
                            label: opt.contragent,
                            value: String(opt.id),
                        }))}
                    />
                </Form.Item>

                <Form.Item label={t('Счет')}>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={t('Выберите счет')}
                        value={filters.score}
                        onChange={(vals) => handleChange('score', vals)}
                        options={scoreData?.map((opt) => ({
                            label: opt.account,
                            value: String(opt.id),
                        }))}
                    />
                </Form.Item>

                <Form.Item label={t('Статус')}>
                    <Button
                        type={filters.archive ? 'default' : 'primary'}
                        onClick={() => handleChange('archive', filters.archive ? '' : 'true')}
                        style={{ width: '100%' }}
                    >
                        {t(filters.archive ? 'Удаленные' : 'Активные')}
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button onClick={handleReset}>{t('Очистить')}</Button>
                        <Button type="primary" onClick={handleSubmit}>
                            {t('Применить')}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
