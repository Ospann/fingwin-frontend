import { useState } from 'react'
import { Form, Button, message, Modal, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { createCompany } from '@/utils/services/auth.service'
import { CompanyTypes } from '@/utils/services/user.service'
import { LOGIN_ROUTE } from '@/utils/routes/routes.consts'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
// import Company from './components/company-form'
import User from './components/user-form'
// import PlanChoose from './components/plan-choose'
import classes from './index.module.css'

const { Title } = Typography

export default function Registration() {
    const [messageApi, contextHolder] = message.useMessage()
    const { t } = useTranslation()
    // const [current, setCurrent] = useState(0)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    // const [paymentLink, setPaymentLink] = useState('')
    const [form] = Form.useForm<CompanyTypes>()
    const { getParam } = useURLParameters()

    // const steps = [
    //     // {
    //     //     title: t('Компания'),
    //     //     description: t('Информация о компании'),
    //     //     content: <Company />,
    //     // },
    //     // {
    //     //     title: t('План'),
    //     //     description: t('Выберите план'),
    //     //     content: <PlanChoose form={form} />,
    //     // },
    //     {
    //         title: t('Пользователь'),
    //         description: t('Главный пользователь'),
    //         content: <User />,
    //     },
    // ]

    // const next = () => setCurrent(current + 1)
    // const prev = () => setCurrent(current - 1)

    const onFinish = async (values: CompanyTypes) => {
        const refUserId = parseInt(getParam('ref'))
        if (!Number.isNaN(refUserId)) values.refUserId = refUserId

        createCompany(values)
            .then(() => {
                // setPaymentLink(res.data.freedompay)
                form.resetFields()
                setIsSuccessModalOpen(true)
            })
            .catch((err) => {
                messageApi.error(err?.response?.data?.message || t('Ошибка при регистрации'))
            })
    }

    return (
        <div className={classes.login}>
            {contextHolder}
            <div className={classes.container}>
                <Form
                    form={form}
                    layout="vertical"
                    className={classes.formContainer}
                    onFinish={onFinish}
                >
                    <Modal
                        title={t('Успешная регистрация')}
                        open={isSuccessModalOpen}
                        onOk={() => setIsSuccessModalOpen(false)}
                        onCancel={() => setIsSuccessModalOpen(false)}
                        footer={[
                            <Button key="close" onClick={() => setIsSuccessModalOpen(false)}>
                                {t('Закрыть')}
                            </Button>,
                            <Button key="login" type="primary" onClick={() => window.location.replace(LOGIN_ROUTE)}>
                                {t('Авторизоваться')}
                            </Button>,
                            // paymentLink && (
                            //     <Button
                            //         key="pay"
                            //         type="primary"
                            //         href={paymentLink}
                            //         target="_blank"
                            //         rel="noopener noreferrer"
                            //     >
                            //         {t('Оплатить')}
                            //     </Button>
                            // ),
                        ]}
                    >
                        <p>{t('Ваша компания успешно создана!')}</p>
                        <p>
                            {t(
                                'Теперь необходимо оплатить выбранный тариф, чтобы активировать систему.',
                            )}
                        </p>
                    </Modal>

                    <Title level={3}>{t('Регистрация')}</Title>

                    {/* <Steps current={current} items={steps} /> */}
                    <User/>
                    {/* <div className={classes.form}>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                style={{ display: index === current ? 'block' : 'none' }}
                            >
                                {step.content}
                            </div>
                        ))}
                    </div> */}

                    <div className={classes.footer}>
                        <div>
                            <Link to={LOGIN_ROUTE}>{t('Уже есть аккаунт?')}</Link>
                        </div>
                        <div className={classes.button}>
                            <Button type="primary" htmlType="submit">
                                {t('Зарегистрироваться')}
                            </Button>
                            {/* {current > 0 && <Button onClick={prev}>{t('Назад')}</Button>}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={next}>
                                    {t('Далее')}
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" htmlType="submit">
                                    {t('Зарегистрироваться')}
                                </Button>
                            )} */}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
