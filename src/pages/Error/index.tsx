import React from 'react'
import { useRouteError, useNavigate, isRouteErrorResponse } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useTheme } from '@/components/ui/Themed/theme-provider'

const ErrorPage: React.FC = () => {
    const error = useRouteError()
    const navigate = useNavigate()
    const { isDarkMode } = useTheme()

    const handleGoHome = () => {
        navigate('/')
    }

    let errorMessage = 'Неизвестная ошибка'

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || (error.data as string) || 'Неизвестная ошибка'
    } else if (error instanceof Error) {
        errorMessage = error.message
    }

    return (
        <Result
            status="error"
            title="Упс! Произошла ошибка"
            subTitle={errorMessage}
            extra={[
                <Button type="primary" key="home" onClick={handleGoHome}>
                    Вернуться на главную
                </Button>,
            ]}
            style={{ background: isDarkMode ? '#1f1f1f' : '#fff', padding: '2rem', borderRadius: 10, height: '100vh' }}
        />
    )
}

export default ErrorPage
