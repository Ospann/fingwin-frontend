import { Modal, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LOGIN_ROUTE } from '@/utils/routes/routes.consts'

type SuccessModalProps = {
    isOpen: boolean
    onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <Modal open={isOpen} onCancel={onClose} footer={null} centered width={480}>
            <Result
                status="success"
                title={t('Компания успешно зарегистрирована!')}
                subTitle={t('Спасибо, что выбрали нас!')}
                extra={[
                    <Button key="cancel" onClick={onClose}>
                        {t('Отмена')}
                    </Button>,
                    <Button key="login" type="primary" onClick={() => navigate(LOGIN_ROUTE)}>
                        {t('Авторизоваться')}
                    </Button>,
                ]}
            />
        </Modal>
    )
}
