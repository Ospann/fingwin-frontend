import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

export default function Company() {
    const { t } = useTranslation()

    return (
        <>
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

            <Form.Item
                label={t('Юридический адрес')}
                name="address"
                rules={[
                    {
                        pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                        message: t('Некорректно введенные данные'),
                    },
                ]}
            >
                <Input placeholder={t('Адрес')} />
            </Form.Item>

            <Form.Item
                label={t('БИН')}
                name="bin"
                rules={[{ pattern: /^\d+$/, message: t('Некорректно введенные данные') }]}
            >
                <Input placeholder={t('БИН')} />
            </Form.Item>

            <Form.Item
                label={t('БИК')}
                name="bik"
                rules={[{ pattern: /^\d+$/, message: t('Некорректно введенные данные') }]}
            >
                <Input placeholder={t('БИК')} />
            </Form.Item>

            <Form.Item
                label={t('ИИК')}
                name="iik"
                rules={[{ pattern: /^\d+$/, message: t('Некорректно введенные данные') }]}
            >
                <Input placeholder={t('ИИК')} />
            </Form.Item>

            <Form.Item
                label={t('Директор')}
                name="director"
                rules={[
                    {
                        pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                        message: t('Некорректно введенные данные'),
                    },
                ]}
            >
                <Input placeholder={t('Директор')} />
            </Form.Item>
        </>
    )
}
