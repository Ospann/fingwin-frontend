import { useEffect } from 'react'
import { Form } from 'antd'
import { createSupplier, updateSupplier, SupplierType } from '@/utils/services/supplier.service'
import { refreshData } from '@/utils/services'
import { MessageInstance } from 'antd/es/message/interface'

export function useSupplierModal(
    messageApi: MessageInstance,
    data: SupplierType | undefined,
    onClose: () => void,
) {
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

    const onSubmit = async (values: SupplierType) => {
        const responsePromise = data ? updateSupplier(data.id, values) : createSupplier(values)

        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                form.resetFields()
                refreshData(`supplier`)
                handleCloseModal()
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
    }

    return {
        form,
        onSubmit,
        handleCloseModal,
    }
}
