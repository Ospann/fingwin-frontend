import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

export default function User() {
    const { t } = useTranslation()

    return (
        <>
            <Form.Item
                label={t('Фамилия')}
                name="surname"
                rules={[
                    { required: true, message: t('Данное поле обязательное для заполнения') },
                    {
                        pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                        message: t('Некорректно введенные данные'),
                    },
                ]}
            >
                <Input placeholder={t('Фамилия')} />
            </Form.Item>

            <Form.Item
                label={t('Имя')}
                name="name"
                rules={[
                    { required: true, message: t('Данное поле обязательное для заполнения') },
                    {
                        pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                        message: t('Некорректно введенные данные'),
                    },
                ]}
            >
                <Input placeholder={t('Имя')} />
            </Form.Item>

            <Form.Item
                label={t('Email')}
                name="email"
                rules={[
                    { required: true, message: t('Введите Email') },
                    { type: 'email', message: t('Некорректный Email') },
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
                label={t('Название компании')}
                name="companyName"
                rules={[
                    { required: true, message: t('Данное поле обязательное для заполнения') },
                    {
                        pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                        message: t('Некорректно введенные данные'),
                    },
                ]}
            >
                <Input placeholder={t('Компания')} />
            </Form.Item>

            {/* <Form.Item
                label={t('Номер телефона')}
                name="phone"
                rules={[
                    { required: true, message: t('Введите номер телефона') },
                    {
                        pattern: /^\d{10}$/,
                        message: t('Номер должен содержать 10 цифр'),
                    },
                ]}
            >
                <Input
                    addonBefore="+7"
                    placeholder="7771234567"
                    maxLength={10}
                    onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '')
                        e.target.value = onlyNums
                    }}
                />
            </Form.Item> */}

            <Form.Item
                label={t('Пароль')}
                name="password"
                rules={[{ required: true, message: t('Заполните поле') }]}
            >
                <Input.Password placeholder={t('Пароль')} />
            </Form.Item>

            <Form.Item
                label={t('Подтверждение пароля')}
                name="confirm"
                dependencies={['password']}
                rules={[
                    { required: true, message: t('Заполните поле') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value)
                                return Promise.resolve()
                            return Promise.reject(new Error(t('Пароли не совпадают')))
                        },
                    }),
                ]}
            >
                <Input.Password placeholder={t('Подтверждение пароля')} />
            </Form.Item>
        </>
    )
}
