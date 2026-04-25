import { Modal, Form, Input, Button, Select, Space, message } from 'antd'
import type { ProductType } from '@/utils/services/product.service'
import { useTranslation } from 'react-i18next'
import { useProductModal } from '../hooks/use-product-modal'

const { TextArea } = Input

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: ProductType | undefined
}

const UOM_OPTIONS = ['кг', 'л', 'шт', 'м', 'кв.м', 'пог.м.']
const TYPE_OPTIONS = ['готовая продукция', 'смесь', 'ингредиент', 'расходные материалы']

export default function ProductModal({ isOpen, onClose, data }: Readonly<ModalProps>) {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { form, onSubmit, handleCloseModal, action } = useProductModal(messageApi, data, onClose)

    return (
        <Modal
            title={`${action} продукцию`}
            open={isOpen}
            onCancel={handleCloseModal}
            width={600}
            footer={null}
        >
            {messageContext}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label={t('Наименование')}
                    name="name"
                    rules={[{ required: true, message: 'Данное поле обязательное для заполнения' }]}
                >
                    <Input placeholder={t('Имя')} />
                </Form.Item>

                <Form.Item
                    label={t('Единица измерения')}
                    name="uom"
                    rules={[{ required: true, message: 'Данное поле обязательное для заполнения' }]}
                >
                    <Select
                        placeholder={t('Выберите')}
                        options={UOM_OPTIONS.map((opt) => ({ label: opt, value: opt }))}
                    />
                </Form.Item>

                <Form.Item
                    label={t('Тип')}
                    name="type"
                    rules={[{ required: true, message: 'Данное поле обязательное для заполнения' }]}
                >
                    <Select
                        placeholder={t('Выберите')}
                        options={TYPE_OPTIONS.map((opt) => ({ label: opt, value: opt }))}
                    />
                </Form.Item>

                <Form.Item
                    label={t('Описание')}
                    name="description"
                    rules={[{ required: true, message: 'Это поле обязательно к заполнению' }]}
                >
                    <TextArea rows={5} placeholder={t('Описание')} />
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal}>{t('Закрыть')}</Button>
                        <Button type="primary" htmlType="submit">
                            {action}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}
