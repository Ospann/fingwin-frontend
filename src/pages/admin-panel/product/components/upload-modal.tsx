import { Modal, Table, Button, Input, Select, message, TableColumnType } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useUploadProductModal } from '../hooks/use-upload-product-modal'
import type { ProductType } from '@/utils/services/product.service'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
}

const UOM_OPTIONS = ['кг', 'л', 'шт', 'м', 'кв.м', 'пог.м.']
const TYPE_OPTIONS = ['готовая продукция', 'смесь', 'ингредиент', 'расходные материалы']

export default function UploadProductModal({ isOpen, onClose }: Readonly<ModalProps>) {
    const [messageApi, messageContext] = message.useMessage()
    const { t } = useTranslation()
    const { products, handleSave, handleDelete, handleFieldChange, handleCloseModal } =
        useUploadProductModal(messageApi, isOpen, onClose)

    const columns: TableColumnType<ProductType>[] = [
        {
            title: t('Наименование'),
            dataIndex: 'name',
            key: 'name',
            render: (text: string, _, index: number) => (
                <Input
                    value={text}
                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
            ),
        },
        {
            title: t('Единица измерения'),
            dataIndex: 'uom',
            key: 'uom',
            render: (text: string, _, index: number) => (
                <Select
                    value={text}
                    onChange={(value) => handleFieldChange(index, 'uom', value)}
                    style={{ width: '100%' }}
                    options={UOM_OPTIONS.map((opt) => ({ label: opt, value: opt }))}
                />
            ),
        },
        {
            title: t('Тип'),
            dataIndex: 'type',
            key: 'type',
            render: (text: string, _, index: number) => (
                <Select
                    value={text}
                    onChange={(value) => handleFieldChange(index, 'type', value)}
                    style={{ width: '100%' }}
                    options={TYPE_OPTIONS.map((opt) => ({ label: opt, value: opt }))}
                />
            ),
        },
        {
            title: t('Описание'),
            dataIndex: 'description',
            key: 'description',
            render: (text: string, _, index: number) => (
                <Input
                    value={text}
                    onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                />
            ),
        },
        {
            title: t('Удалить'),
            key: 'action',
            render: (_, __, index: number) => (
                <Button
                    type="text"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => handleDelete(index)}
                />
            ),
        },
    ]

    return (
        <Modal
            title={t('Добавление с Wildberries')}
            open={isOpen}
            onCancel={handleCloseModal}
            width={1000}
            footer={[
                <Button key="close" onClick={handleCloseModal}>
                    {t('Закрыть')}
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    {t('Сохранить')}
                </Button>,
            ]}
        >
            {messageContext}
            <Table
                columns={columns}
                dataSource={products.map((product, index) => ({
                    ...product,
                    key: product.nmId || index,
                }))}
                pagination={false}
                scroll={{ y: 400 }}
                rowClassName={(record) => (record.isWB ? 'bg-yellow-50' : '')}
                onRow={(record) => ({
                    ...(record.isWB && {
                        title: 'Этот товар уже есть в базе',
                    }),
                })}
            />
        </Modal>
    )
}
