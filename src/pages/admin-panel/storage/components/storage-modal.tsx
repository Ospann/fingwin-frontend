import { Modal, Form, Input, Button, Space, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useStorageModal } from '../hooks/use-storage-modal'
import type { StorageType } from '@/utils/services/storage.service'

const { TextArea } = Input

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: StorageType | undefined
}

export default function StorageModal({ isOpen, onClose, data }: Readonly<ModalProps>) {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { form, onSubmit, handleCloseModal, action } = useStorageModal(messageApi, data, onClose)

    return (
        <Modal
            title={t(`${action} склад`)}
            open={isOpen}
            onCancel={handleCloseModal}
            width={600}
            footer={null}
        >
            {messageContext}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label={t('Название')}
                    name="name"
                    rules={[{ required: true, message: 'Данное поле обязательное для заполнения' }]}
                >
                    <Input placeholder={t('Название')} />
                </Form.Item>

                <Form.Item label={t('Описание')} name="description">
                    <TextArea rows={5} placeholder={t('Описание')} style={{ resize: 'none' }} />
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseModal}>{t('Закрыть')}</Button>
                        <Button type="primary" htmlType="submit">
                            {t(action)}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}
