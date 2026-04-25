import { useCallback, useRef, useState } from 'react'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { issueIntegrationToken, revokeIntegrationToken } from '@/utils/services/auth.service'

function integrationTokenErrorMessage(err: unknown): string {
    const ax = err as AxiosError<{ message?: string }>
    const status = ax.response?.status
    const backend = ax.response?.data?.message
    if (backend) return backend
    if (status === 401) return 'Сессия недействительна или истекла. Войдите снова.'
    if (status === 403)
        return 'Недостаточно прав или запрос выполнен не с основным токеном авторизации.'
    if (status === 404) return 'Компания не найдена.'
    return 'Не удалось выполнить операцию с интеграционным токеном.'
}

export function useIntegrationToken(refreshSettings?: () => Promise<unknown>) {
    const refreshRef = useRef(refreshSettings)
    refreshRef.current = refreshSettings

    const [token, setToken] = useState<string | null>(null)
    const [copyDone, setCopyDone] = useState(false)
    const [issuing, setIssuing] = useState(false)
    const [revoking, setRevoking] = useState(false)

    const issue = useCallback(async () => {
        setIssuing(true)
        try {
            const {
                data: { token: newToken },
            } = await issueIntegrationToken()
            setToken(newToken ?? null)
            await refreshRef.current?.()
            message.success(
                'Новый интеграционный токен выпущен. Предыдущий токен для этой компании больше не действителен.',
            )
        } catch (err) {
            message.error(integrationTokenErrorMessage(err))
        } finally {
            setIssuing(false)
        }
    }, [])

    const revoke = useCallback(async () => {
        setRevoking(true)
        try {
            await revokeIntegrationToken()
            setToken(null)
            await refreshRef.current?.()
            message.success('Все интеграционные токены для компании отозваны.')
        } catch (err) {
            message.error(integrationTokenErrorMessage(err))
        } finally {
            setRevoking(false)
        }
    }, [])

    const copyToken = useCallback(async () => {
        if (!token) return
        try {
            await navigator.clipboard.writeText(token)
            setCopyDone(true)
            message.success('Токен скопирован')
            globalThis.setTimeout(() => setCopyDone(false), 2000)
        } catch {
            message.error('Не удалось скопировать')
        }
    }, [token])

    return {
        token,
        issuing,
        revoking,
        issue,
        revoke,
        copyToken,
        copyDone,
    }
}

