import { Card, Form, FormInstance, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './index.module.css'

type Props = { form: FormInstance }

export default function PlanChoose({ form }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<string>('')
    const { t } = useTranslation()

    const plans = [
        {
            key: 'basic',
            title: 'Базовый',
            subtitle: 'Для ИП и малого бизнеса на старте',
            price: '30 000 ₸',
            features: [
                'Ввод доходов и расходов вручную',
                'Загрузка выписок Kaspi',
                'Финансовые отчеты ОПиУ, ДДС',
                'Складской учет',
                'Telegram-бот для ввода данных и быстрых отчетов',
            ],
        },
        {
            key: 'standard',
            title: 'Стандартный',
            subtitle: 'Для растущего бизнеса с сотрудниками',
            price: '50 000 ₸',
            features: [
                'Всё из базового',
                'ИИ-советник (анализ цифр и рекомендации)',
                'Персональный менеджер в чате',
                'Синхронизация с WB и другими маркетплейсами',
                'Дашборды и аналитика',
                'Персональный чат с финансовым консультантом',
            ],
        },
        {
            key: 'advanced',
            title: 'Advanced',
            subtitle: 'Для тех, кто хочет заменить финдира',
            price: '100 000 ₸',
            features: [
                'Всё из стандартного',
                'ABC-XYZ анализ',
                'Балансовый отчет',
                'Индивидуальные консультации с финансовым экспертом',
                'Индивидуальные настройки под бизнес-модель',
            ],
        },
    ]

    useEffect(() => {
        console.log(selectedPlan)
        if (selectedPlan) form.setFieldValue('plan', selectedPlan)
    }, [selectedPlan])

    return (
        <>
            <Form.Item
                hidden
                name="plan"
                rules={[
                    { required: true, message: t('Данное поле обязательное для заполнения') },
                    {
                        pattern: /^[a-zа-яA-ZА-Я][a-zа-яA-ZА-Я0-9-_ ]{2,40}$/,
                        message: t('Некорректно введенные данные'),
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <div className={classes.container}>
                {plans.map((plan) => (
                    <Card
                        key={plan.key}
                        title={plan.title}
                        extra={plan.price}
                        onClick={() => setSelectedPlan(plan.key)}
                        style={{
                            width: '100%',
                            cursor: 'pointer',
                            borderColor: selectedPlan === plan.key ? '#1677ff' : undefined,
                        }}
                    >
                        <p>{plan.subtitle}</p>
                        <ul>
                            {plan.features.map((f) => (
                                <li key={f}>{f}</li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </>
    )
}
