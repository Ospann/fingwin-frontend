import { Modal, Form, Input, Button, Space, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCustomerModal } from '../hooks/use-customer-modal'
import type { ClientType } from '@/utils/services/client.service'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: ClientType | undefined
}

export default function ClientModal({ isOpen, onClose, data }: Readonly<ModalProps>) {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { form, onSubmit, handleCloseModal, action } = useCustomerModal(messageApi, data, onClose)

    return (
        <Modal
            title={t(`${action} клиента`)}
            open={isOpen}
            onCancel={handleCloseModal}
            width={600}
            footer={null}
        >
            {messageContext}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label={t('Имя')}
                    name="name"
                    rules={[
                        { required: true, message: 'Данное поле обязательное для заполнения' },
                        {
                            pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                            message: 'Некорректно введенные данные',
                        },
                    ]}
                >
                    <Input placeholder={t('Имя')} />
                </Form.Item>

                <Form.Item label={t('Адрес')} name="address">
                    <Input placeholder={t('Адрес')} />
                </Form.Item>

                <Form.Item
                    label={t('Номер телефона')}
                    name="phone"
                    rules={[
                        { len: 11, message: 'Некорректный номер телефона.' },
                        {
                            pattern: /^\d+$/,
                            message: 'Некорректный номер телефона. Используйте только цифры',
                        },
                    ]}
                >
                    <Input placeholder="+7" maxLength={11} />
                </Form.Item>

                <Form.Item
                    label={t('Email')}
                    name="email"
                    rules={[{ type: 'email', message: 'Некорректный email' }]}
                >
                    <Input type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item label={t('БИН')} name="bin">
                    <Input placeholder={t('БИН')} />
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
