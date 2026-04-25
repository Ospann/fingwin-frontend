import { Modal, Form, Input, Button, Select, Checkbox, Space, message } from 'antd'
import type { UserTypes } from '@/utils/services/user.service'
import { useTranslation } from 'react-i18next'
import { useUserModal } from '../hooks/use-user-modal'
import { UserRoles } from '@/utils/types/user.type'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: UserTypes | undefined
}

const FORMS = ['Админ панель', 'Продажи', 'Закуп', 'Склад', 'Производство', 'Финансы']
const ROLES = [
    { value: UserRoles.ADMIN, label: UserRoles.ADMIN },
    { value: UserRoles.MANAGER, label: UserRoles.MANAGER },
]

const UserModal = ({ isOpen, onClose, data }: ModalProps) => {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { form, onSubmit, handleCloseModal, action } = useUserModal(messageApi, data, onClose)

    return (
        <Modal
            title={t(`${action} пользователя`)}
            open={isOpen}
            onCancel={handleCloseModal}
            width={600}
            footer={null}
        >
            {messageContext}
            <Form
                form={form}
                onFinish={onSubmit}
                layout="vertical"
                initialValues={{ isActive: true, forms: [] }}
            >
                <Form.Item
                    label={t('Фамилия')}
                    name="surname"
                    rules={[
                        { required: true, message: 'Данное поле обязательное для заполнения' },
                        {
                            pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                            message: 'Некорректно введенные данные',
                        },
                    ]}
                >
                    <Input placeholder={t('Фамилия')} />
                </Form.Item>

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

                <Form.Item
                    label={t('Email')}
                    name="email"
                    rules={[
                        { required: true, message: 'Данное поле обязательное для заполнения' },
                        { type: 'email', message: 'Некорректный email' },
                    ]}
                >
                    <Input type="email" placeholder={t('Email')} />
                </Form.Item>

                <Form.Item
                    label={t('Номер телефона')}
                    name="phone"
                    rules={[
                        { required: true, message: 'Это поле обязательно к заполнению' },
                        { len: 11, message: 'Некорректный номер телефона.' },
                        {
                            pattern: /^\d+$/,
                            message: 'Некорректный номер телефона. Используйте только цифры',
                        },
                    ]}
                >
                    <Input placeholder="+7" maxLength={11} />
                </Form.Item>

                <Form.Item label={t('Telegram Id')} name="telegramId">
                    <Input />
                </Form.Item>

                <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>{t('Активный')}</Checkbox>
                </Form.Item>

                <Form.Item
                    label={t('Роль')}
                    name="role"
                    rules={[{ required: true, message: 'Выберите роль пользователя' }]}
                >
                    <Select placeholder={t('Выберите роль')} options={ROLES} />
                </Form.Item>

                <Form.Item label={t('Доступы')} name="forms">
                    <Select
                        mode="multiple"
                        placeholder={t('Доступы')}
                        options={FORMS.map((form) => ({
                            label: form,
                            value: form,
                        }))}
                    />
                </Form.Item>

                <Form.Item label={t('Пароль')} name="password">
                    <Input.Password placeholder={t('Пароль')} />
                </Form.Item>

                <Form.Item label={t('Подтверждение пароля')} name="confirm">
                    <Input.Password placeholder={t('Подтверждение пароля')} />
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

export default UserModal
