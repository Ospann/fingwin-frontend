import { Modal, Form, Input, Button, Select, Space, InputNumber, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { FinanceAccountType } from '@/utils/types/finance.types'
import { currencies } from '@/utils/constants/currency.consts'
import { useAccountModal } from '../hooks/use-account-modal'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: FinanceAccountType | undefined
}

export default function AccountModal({ isOpen, onClose, data }: Readonly<ModalProps>) {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()

    const { form, onSubmit, handleCloseModal, copyToClipboard, action } = useAccountModal(
        messageApi,
        data,
        onClose,
    )

    return (
        <Modal
            title={t(`${action} счет`)}
            open={isOpen}
            onCancel={handleCloseModal}
            width={600}
            footer={null}
            afterClose={() => form.resetFields()}
        >
            {messageContext}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label={t('Имя')}
                    name="account"
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
                    label={t('Валюта')}
                    name="currency"
                    rules={[{ required: true, message: 'Данное поле обязательное для заполнения' }]}
                >
                    <Select
                        placeholder={t('Валюта')}
                        options={currencies.map((currency) => ({
                            label: currency.code,
                            value: currency.code,
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label={t('Номер счета')}
                    name="accountNumber"
                    rules={[
                        {
                            pattern: /^\d{16}$/,
                            message: 'Номер счета должен состоять из 16 цифр',
                        },
                    ]}
                >
                    <Input
                        type="number"
                        maxLength={16}
                        placeholder={t('Введите номер счета')}
                        suffix={
                            <Button
                                type="text"
                                size="small"
                                icon={<CopyOutlined />}
                                onClick={() =>
                                    copyToClipboard(
                                        String(form.getFieldValue('accountNumber') || ''),
                                    )
                                }
                            />
                        }
                    />
                </Form.Item>

                <Form.Item label={t('Стартовый Баланс')} name="initialBalance">
                    <InputNumber style={{ width: '100%' }} placeholder={t('Стартовый Баланс')} />
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
