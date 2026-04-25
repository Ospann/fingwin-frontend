import { Form, Input, Button, Typography, Alert } from 'antd'
import { REGISTRATION_ROUTE } from '@/utils/routes/routes.consts'
import { Link } from 'react-router-dom'
import { useLoginForm } from './hooks/use-login-form'
import classes from './index.module.css'
import { useTheme } from '@/components/ui/Themed/theme-provider'

const { Title, Link: AntLink } = Typography

export default function Login() {
    const { t, form, isSubmitting, handleLogin, error } = useLoginForm()
    const { isDarkMode } = useTheme()

    return (
        <div className={classes.login}>
            <div className={classes.form} style={{ background: isDarkMode ? 'var(--dark)' : 'var(--light)' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    {t('Вход в аккаунт')}
                </Title>

                <Form form={form} onFinish={handleLogin} layout="vertical" autoComplete="off">
                    <Form.Item
                        label={t('Email')}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: t('Это поле обязательно для заполнения'),
                            },
                            {
                                type: 'email',
                                message: t('Некорректный адрес электронной почты'),
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            placeholder="Введите email"
                            autoComplete="email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label={t('Пароль')}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t('Это поле обязательно к заполнению'),
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Введите пароль"
                            autoComplete="current-password"
                            size="large"
                        />
                    </Form.Item>

                    {error && (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            closable
                            style={{ marginBottom: 16 }}
                        />
                    )}

                    <Form.Item style={{ marginBottom: 8 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            block
                            size="large"
                        >
                            {t('Войти')}
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Link to={REGISTRATION_ROUTE}>
                            <AntLink>{t('Зарегистрироваться')}</AntLink>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}
