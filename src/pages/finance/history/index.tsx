import { Helmet } from 'react-helmet'
import { Button, Tooltip, Row, Col, Table, Layout } from 'antd'
import { DownloadOutlined, FilterOutlined } from '@ant-design/icons'
import { uploadExcel } from '@/utils/services/finance.service'
import FilterDrawer from './components/filter-drawer'
import DeleteModal from './components/delete-modal'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useFinanceHistory } from './hooks/use-finance-history'
import { useState } from 'react'
import classes from './index.module.css'
import { FinanceTypes } from '@/utils/types/finance.types'

const { Content } = Layout

export default function History() {
    const { getURLs, data, columns } = useFinanceHistory()
    const [filterOpen, setFilterOpen] = useState(false)
    const [selected, setSelected] = useState<FinanceTypes | undefined>()

    return (
        <Layout>
            <Helmet>
                <title>Финансы история</title>
            </Helmet>
            <Content>
                <div className={classes.container}>
                    <Breadcrumbs />
                    <Row gutter={8} justify="end" className={classes.rightBlock}>
                        <Col>
                            <Tooltip title="Скачать Excel">
                                <Button
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    onClick={() => uploadExcel(getURLs())}
                                >
                                    Скачать
                                </Button>
                            </Tooltip>
                        </Col>
                        <Col>
                            <Button
                                type="default"
                                icon={<FilterOutlined />}
                                onClick={() => setFilterOpen(true)}
                            >
                                Фильтры
                            </Button>
                        </Col>
                    </Row>
                </div>

                <FilterDrawer open={filterOpen} setOpen={setFilterOpen} />

                <div className={classes.tableWrapper}>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={data ?? []}
                        pagination={{ pageSize: 10 }}
                        onRow={(record) => ({
                            onClick: () => setSelected(record),
                            style: { cursor: 'pointer' },
                        })}
                    />
                </div>

                {selected && (
                    <DeleteModal
                        data={selected}
                        isOpen={!!selected}
                        onClose={() => setSelected(undefined)}
                    />
                )}
            </Content>
        </Layout>
    )
}
