import { Modal, Form, Input, Button, Space, Checkbox, Select, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCategoryModal } from '../hooks/use-category-modal'
import type { FinanceCategory } from '@/utils/types/finance.types'
import { useApi } from '@/utils/services'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: FinanceCategory | undefined
}

export default function CategoryModal({ isOpen, onClose, data }: Readonly<ModalProps>) {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { data: pnlTypesRes } = useApi<{ data: { id: number; name: string }[] }>('finance/pnl_types')
    const pnlTypes = pnlTypesRes?.data
    const { form, onSubmit, handleCloseModal, action } = useCategoryModal(messageApi, data, onClose)

    return (
        <Modal
            title={t(`${action} категорию`)}
            open={isOpen}
            onCancel={handleCloseModal}
            width={600}
            footer={null}
        >
            {messageContext}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label={t('Наименование')}
                    name="category"
                    rules={[
                        { required: true, message: 'Данное поле обязательное для заполнения' },
                        {
                            pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_\s.,;:!?"'()]{2,40}$/,
                            message: 'Некорректно введенные данные',
                        },
                    ]}
                >
                    <Input placeholder={t('Наименование')} />
                </Form.Item>

                <Form.Item name="cashflowType" valuePropName="checked">
                    <Checkbox>{t('Отображать в ДДС')}</Checkbox>
                </Form.Item>

                <Form.Item label={t('Тип категории')} name="type">
                    <Select placeholder={t('Выберите')} allowClear>
                        {['Доход', 'Расход'].map((type) => (
                            <Select.Option key={type} value={type}>
                                {type}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label={t('ОПИУ категория')} name="pnlType">
                    <Select placeholder={t('Выберите')} allowClear>
                        {pnlTypes
                            ?.filter((opt) => opt.name !== 'EBITDA')
                            ?.map((type) => (
                                <Select.Option key={type.id} value={type.id}>
                                    {type.name}
                                </Select.Option>
                            ))}
                    </Select>
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
