import { useEffect } from 'react'
import { Form, message } from 'antd'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { StorageType, createStorage, updateStorage } from '@/utils/services/storage.service'
import { MessageInstance } from 'antd/es/message/interface'

export const useStorageModal = (
    messageApi: MessageInstance,
    data: StorageType | undefined,
    onClose: () => void,
) => {
    const { getURLs } = useURLParameters()
    const [form] = Form.useForm()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name,
                description: data.description,
            })
        } else {
            form.resetFields()
        }
    }, [data, form])

    const handleCloseModal = () => {
        onClose()
        form.resetFields()
    }

    const onSubmit = async (values: StorageType) => {
        const responsePromise = data?.id ? updateStorage(data.id, values) : createStorage(values)

        responsePromise
            .then((res) => {
                form.resetFields()
                mutate(`storage?${getURLs()}`)
                handleCloseModal()
                messageApi.success(res?.data?.message || 'Успешно')
            })
            .catch((err) => {
                message.error(err?.response?.data?.message || 'Ошибка')
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
