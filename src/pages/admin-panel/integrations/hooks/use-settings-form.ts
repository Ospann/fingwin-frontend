import { useEffect, useState } from 'react'
import { Form, message } from 'antd'
import { useApi } from '@/utils/services'
import { createSettings, SettingsTypes } from '@/utils/services/settings.service'

interface SettingsForm {
    wbkey: string
    account: string
}

export function useSettingsForm() {
    const [form] = Form.useForm<SettingsForm>()
    const { data, mutate } = useApi<{ data: SettingsTypes[] }>('settings')
    const { data: scoreResponse } = useApi<{ data: { id: number; account: string }[] }>(
        '/finance/score',
    )

    const [apiKey, setApiKey] = useState<string>('')
    const [hasCopied, setHasCopied] = useState<boolean>(false)

    useEffect(() => {
        if (data) {
            const fetchedApiKey = data?.data?.find((item) => item.parametr === 'wbkey')?.value
            const fetchedAccount = data?.data?.find((item) => item.parametr === 'wb-account')?.value

            if (fetchedApiKey) {
                form.setFieldsValue({ wbkey: fetchedApiKey })
                setApiKey(fetchedApiKey)
            }

            if (fetchedAccount) {
                form.setFieldsValue({ account: fetchedAccount })
            }
        }
    }, [data, form])

    const onSubmit = async (formData: SettingsForm) => {
        try {
            const promises = [createSettings({ parametr: 'wbkey', value: formData.wbkey })]

            if (formData.account) {
                promises.push(createSettings({ parametr: 'wb-account', value: formData.account }))
            }

            const responsePromise = Promise.all(promises)
            await responsePromise

            message.success('API-ключ успешно обновлен')
        } catch (err) {
            console.error('Ошибка обновления API-ключа:', err)
            message.error('Ошибка обновления API-ключа')
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(apiKey)
            setHasCopied(true)
            message.success('Скопировано в буфер обмена')
            setTimeout(() => setHasCopied(false), 2000)
        } catch (err) {
            console.error('Ошибка при копировании: ', err)
            message.error('Ошибка при копировании')
        }
    }

    const integrationTokenJti = data?.data?.find((item) => item.parametr === 'edara_token')?.value

    return {
        form,
        onSubmit,
        scoreData: scoreResponse?.data,
        apiKey,
        hasCopied,
        handleCopy,
        integrationTokenJti,
        refreshSettings: mutate,
    }
}
