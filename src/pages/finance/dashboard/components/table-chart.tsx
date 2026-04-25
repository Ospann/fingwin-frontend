import { Table, Checkbox, Typography, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { monthsConsts } from '@/utils/constants/month.consts'

type Row = {
    key: number
    label: string
    data: number[]
    fill: boolean
    checked: boolean
    backgroundColor: string
}

type TableChartProps = {
    data: {
        label: string
        data: number[]
        fill: boolean
        checked: boolean
        backgroundColor: string
    }[]
    onCheckboxChange: (label: string) => void
}

export default function TableChart({ data, onCheckboxChange }: TableChartProps) {
    const columns: ColumnsType<Row> = [
        {
            title: 'Категория',
            dataIndex: 'label',
            key: 'label',
            fixed: 'left',
            width: 230,
            render: (_, record: Row) => (
                <Space style={{ width: '100%', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => onCheckboxChange(record.label)}>
                    <Space>
                        <Checkbox checked={record.checked} />
                        <Typography.Text style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{record.label}</Typography.Text>
                    </Space>
                    <div style={{ backgroundColor: record.backgroundColor, width: 20, height: 20, borderRadius: '50%' }} />
                </Space>
            ),
        },
        ...monthsConsts.map((month: string, idx: number) => ({
            title: month,
            dataIndex: `month${idx}`,
            key: `month${idx}`,
            width: 100,
            render: (_: unknown, record: Row) => {
                const value = record.data[idx]
                return <Typography.Text>{(value * 100).toFixed(1)}%</Typography.Text>
            },
        })),
    ]

    const tableData = data.map((item, index) => ({ ...item, key: index }))

    return (
        <Table<Row>
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ x: 230 + monthsConsts.length * 100 }}
            bordered
        />
    )
}
