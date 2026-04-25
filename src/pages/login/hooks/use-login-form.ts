import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { loginUser } from '@/utils/services/auth.service'
import { useCallback, useState } from 'react'
import { MAIN_ROUTE } from '@/utils/routes/routes.consts'

export type LoginFormValues = {
    email: string
    password: string
}

export function useLoginForm() {
    const [form] = Form.useForm<LoginFormValues>()
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = useCallback(async (values: LoginFormValues) => {
        const { email, password } = values
        setIsSubmitting(true)
        setError(null)

        loginUser(email, password)
            .then((response) => {
                localStorage.setItem('authToken', response.data.authToken)
                window.location.replace(MAIN_ROUTE)
            })
            .catch((err) => {
                setError(err?.response?.data?.message ?? 'Ошибка авторизации')
                setIsSubmitting(false)
            })
    }, [])

    return {
        t,
        form,
        isSubmitting,
        handleLogin,
        error,
    }
}
