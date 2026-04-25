import { useEffect } from 'react'
import { Form } from 'antd'
import type { UserTypes } from '@/utils/services/user.service'
import { createUser, updateUser } from '@/utils/services/user.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { mutate } from 'swr'
import { MessageInstance } from 'antd/es/message/interface'

export const useUserModal = (
    messageApi: MessageInstance,
    data: UserTypes | undefined,
    onClose: () => void,
) => {
    const { getURLs } = useURLParameters()
    const [form] = Form.useForm()

    const action = data ? 'Изменить' : 'Добавить'

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data)
        } else {
            form.resetFields()
            form.setFieldsValue({
                forms: [],
                isActive: true,
            })
        }
    }, [data, form])

    const handleCloseModal = () => {
        onClose()
        form.resetFields()
    }

    const onSubmit = async (values: UserTypes) => {
        // Валидация паролей
        if (values.password && values.password !== values.confirm) {
            messageApi.error('Пароли не совпадают')
            return
        }

        const responsePromise = data ? updateUser(data.id, values) : createUser(values)

        responsePromise
            .then((res) => {
                form.resetFields()
                mutate(`user?${getURLs().toString()}`)
                handleCloseModal()
                messageApi.success(res.data.message)
            })
            .catch((error) => {
                messageApi.error(error.response?.data?.message || 'Ошибка')
            })
    }

    return {
        form,
        onSubmit,
        handleCloseModal,
        action,
    }
}
