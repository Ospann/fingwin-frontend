import { useEffect } from 'react'
import { Form } from 'antd'
import { createClient, updateClient, ClientType } from '@/utils/services/client.service'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { MessageInstance } from 'antd/es/message/interface'

export function useCustomerModal(
    messageApi: MessageInstance,
    data: ClientType | undefined,
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

    const onSubmit = async (values: ClientType) => {
        const responsePromise = data ? updateClient(data.id, values) : createClient(values)
        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                form.resetFields()
                mutate(`client?${getURLs().toString()}`)
                handleCloseModal()
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
    }

    const action = data ? 'Изменить' : 'Добавить'

    return {
        form,
        onSubmit,
        handleCloseModal,
        action,
    }
}
