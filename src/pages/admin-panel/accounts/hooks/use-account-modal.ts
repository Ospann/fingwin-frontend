import { useEffect } from 'react'
import { Form } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import { createAccount, updateAccount } from '@/utils/services/finance.service'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { FinanceAccountType } from '@/utils/types/finance.types'

export function useAccountModal(
    messageApi: MessageInstance,
    data: FinanceAccountType | undefined,
    onClose: () => void,
) {
    const { getURLs } = useURLParameters()
    const [form] = Form.useForm()

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data)
        } else {
            form.resetFields()
        }
    }, [data, form])

    const handleCloseModal = () => {
        onClose()
        form.resetFields()
    }

    const onSubmit = async (values: FinanceAccountType) => {
        const responsePromise = data ? updateAccount(data.id, values) : createAccount(values)
        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                form.resetFields()
                mutate(`finance/score?${getURLs().toString()}`)
                handleCloseModal()
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
    }

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value)
        messageApi.success('Скопировано в буфер обмена')
    }

    const action = data ? 'Изменить' : 'Добавить'

    return {
        form,
        onSubmit,
        handleCloseModal,
        copyToClipboard,
        action,
    }
}
