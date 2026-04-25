import { Modal, Form, Input, Button, Select, Space, message } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { CreateRecipeType } from '@/utils/types/recipe.types'
import { useTranslation } from 'react-i18next'
import { useRecipeModal } from '../hooks/use-recipe-modal'

const { TextArea } = Input

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    data: CreateRecipeType | undefined
}

export default function RecipeModal({ isOpen, onClose, data }: ModalProps) {
    const { t } = useTranslation()
    const [messageApi, messageContext] = message.useMessage()
    const { products, form, onSubmit, handleCloseModal } = useRecipeModal(messageApi, data, onClose)

    const action = data ? 'Изменить' : 'Добавить'

    return (
        <Modal
            title={t(`${action} рецепт`)}
            open={isOpen}
            onCancel={handleCloseModal}
            width={700}
            footer={null}
        >
            {messageContext}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item
                    label={t('Продукт')}
                    name="product"
                    rules={[{ required: true, message: t('Данное поле обязательное') }]}
                >
                    <Select
                        placeholder={t('Выберите')}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={products
                            ?.filter((p) => p.type === 'готовая продукция')
                            ?.map((p) => ({ label: p.name, value: p.id }))}
                    />
                </Form.Item>

                <Form.List name="ingredients">
                    {(fields, { add, remove }) => (
                        <Form.Item label={t('Ингредиенты')} required>
                            <Space direction="vertical" style={{ width: '100%' }} size="middle">
                                {fields.map(({ key, name }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Form.Item
                                            name={[name, 'product']}
                                            rules={[
                                                { required: true, message: t('Выберите продукт') },
                                            ]}
                                            style={{ flex: 1 }}
                                        >
                                            <Select
                                                placeholder={t('Выберите')}
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(input.toLowerCase())
                                                }
                                                style={{ width: 300 }}
                                                options={products
                                                    ?.filter((p) => p.type !== 'готовая продукция')
                                                    ?.map((p) => ({
                                                        label: p.name,
                                                        value: p.id,
                                                    }))}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name={[name, 'quantity']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('Введите количество'),
                                                },
                                            ]}
                                            style={{ flex: 1 }}
                                        >
                                            <Input type="number" placeholder={t('Количество')} />
                                        </Form.Item>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<CloseOutlined />}
                                            onClick={() => remove(name)}
                                            disabled={fields.length === 1}
                                        />
                                    </Space>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add({ product: null, quantity: null })}
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    {t('Добавить')}
                                </Button>
                            </Space>
                        </Form.Item>
                    )}
                </Form.List>

                <Form.Item label={t('Описание')} name="description">
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
