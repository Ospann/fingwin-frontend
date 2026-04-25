import { Helmet } from 'react-helmet'
import { Alert, Button, Form, Input, Modal, Select, Typography, Space, Tooltip, Layout } from 'antd'
import { CopyOutlined, CheckOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import classes from './index.module.css'
import { useSettingsForm } from './hooks/use-settings-form'
import { useIntegrationToken } from './hooks/use-integration-token'
import { useTheme } from '@/components/ui/Themed/theme-provider'
import { useAppContext } from '@/utils/providers/Context'
import { UserRoles } from '@/utils/types/user.type'

const { Content } = Layout
const { Title, Text } = Typography

function previewJti(jti: string) {
    const v = jti.trim()
    if (v.length <= 16) return v
    return `${v.slice(0, 8)}…${v.slice(-8)}`
}

export default function Settings() {
    const { t } = useTranslation()
    const { isDarkMode } = useTheme()
    const { user } = useAppContext()
    const { form, onSubmit, scoreData, hasCopied, handleCopy, integrationTokenJti, refreshSettings } =
        useSettingsForm()
    const {
        token: integrationToken,
        issuing: integrationTokenIssuing,
        revoking: integrationTokenRevoking,
        issue: issueIntegrationToken,
        revoke: revokeIntegrationToken,
        copyToken: copyIntegrationToken,
        copyDone: integrationTokenCopyDone,
    } = useIntegrationToken(() => refreshSettings())

    const isAdmin = user?.role === UserRoles.ADMIN

    const confirmRevokeIntegrationToken = () => {
        Modal.confirm({
            title: t('Отозвать интеграционные токены?'),
            content: t(
                'Все ранее выданные интеграционные токены перестанут работать. Потребуется выпустить новый токен.',
            ),
            okText: t('Отозвать'),
            cancelText: t('Отмена'),
            okButtonProps: { danger: true },
            onOk: () => revokeIntegrationToken(),
        })
    }

    return (
        <Layout>
            <Helmet>
                <title>{t('Настройки')}</title>
            </Helmet>
            <Content>
                <Breadcrumbs />
                <div
                    className={classes.container}
                    style={{ background: isDarkMode ? 'var(--dark)' : 'var(--light)' }}
                >
                    <Form form={form} onFinish={onSubmit} layout="vertical">
                        <Title level={4} style={{ marginBottom: '16px' }}>
                            {t('Wildberries Интеграция')}
                        </Title>
                        <hr style={{ marginBottom: '24px' }} />

                        <Form.Item
                            label={
                                <Space>
                                    {t('API-ключ Wildberries')}
                                    <Tooltip
                                        title={t(
                                            'Добавляется возможность получение заказов из wildberries. Добавление товаров из wildberries. Также необходимо выбрать счет, к которому будет привязаны заказы с wildberries',
                                        )}
                                    >
                                        <InfoCircleOutlined style={{ cursor: 'pointer' }} />
                                    </Tooltip>
                                </Space>
                            }
                            name="wbkey"
                            rules={[{ required: true, message: t('Введите API-ключ') }]}
                        >
                            <Input
                                placeholder={t('Ключ интеграции Wildberries')}
                                suffix={
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={hasCopied ? <CheckOutlined /> : <CopyOutlined />}
                                        onClick={handleCopy}
                                    />
                                }
                            />
                        </Form.Item>

                        <Text style={{ display: 'block', marginBottom: '16px' }}>
                            {t(
                                'Выберите статистику и поставщиков в интеграции и получите API ключ по ссылке',
                            )}
                        </Text>

                        <Form.Item label={t('Счет для Wildberries')} name="account">
                            <Select placeholder={t('Выберите счет')}>
                                {scoreData?.map((opt) => (
                                    <Select.Option key={opt.id} value={opt.id.toString()}>
                                        {opt.account}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                {t('Сохранить')}
                            </Button>
                        </Form.Item>
                    </Form>

                    {isAdmin && (
                        <>
                            <Title level={4} style={{ marginTop: '32px', marginBottom: '16px' }}>
                                {t('Интеграция с внешними сервисами')}
                            </Title>
                            <hr style={{ marginBottom: '24px' }} />

                            <Text style={{ display: 'block', marginBottom: '12px' }}>
                                {t(
                                    'Токен для доступа к API внешних сервисов (только GET). Выпускайте с основной учётной записи администратора. Каждый новый выпуск отключает предыдущий токен компании.',
                                )}
                            </Text>

                            <Space wrap style={{ marginBottom: '16px' }}>
                                <Button
                                    type="primary"
                                    loading={integrationTokenIssuing}
                                    onClick={issueIntegrationToken}
                                >
                                    {t('Выпустить интеграционный токен')}
                                </Button>
                                <Button
                                    danger
                                    loading={integrationTokenRevoking}
                                    onClick={confirmRevokeIntegrationToken}
                                >
                                    {t('Отозвать интеграционные токены')}
                                </Button>
                            </Space>

                            {integrationTokenJti && (
                                <Alert
                                    type="info"
                                    showIcon
                                    style={{ marginBottom: '16px' }}
                                    message={t('Интеграционный токен выпущен')}
                                    description={
                                        <Text code copyable={{ text: integrationTokenJti }}>
                                            {t('Идентификатор выпуска (jti)')}:{' '}
                                            {previewJti(integrationTokenJti)}
                                        </Text>
                                    }
                                />
                            )}

                            {integrationToken && (
                                <>
                                    <Alert
                                        type="warning"
                                        showIcon
                                        style={{ marginBottom: '12px' }}
                                        message={t(
                                            'Сохраните токен сейчас: предыдущий токен компании уже недействителен, повторно показать этот JWT можно только выпустив новый.',
                                        )}
                                    />
                                    <Input.TextArea
                                        readOnly
                                        value={integrationToken}
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        style={{ fontFamily: 'monospace', marginBottom: '8px' }}
                                    />
                                    <Button
                                        icon={
                                            integrationTokenCopyDone ? <CheckOutlined /> : <CopyOutlined />
                                        }
                                        onClick={copyIntegrationToken}
                                    >
                                        {t('Скопировать токен')}
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </Content>
        </Layout>
    )
}
