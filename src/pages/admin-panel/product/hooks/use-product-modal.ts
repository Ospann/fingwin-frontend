import { useEffect } from 'react'
import { Form } from 'antd'
import { createProduct, updateProduct, ProductType } from '@/utils/services/product.service'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { MessageInstance } from 'antd/es/message/interface'

export function useProductModal(
    messageApi: MessageInstance,
    data: ProductType | undefined,
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

    const onSubmit = async (values: ProductType) => {
        const responsePromise = data ? updateProduct(data.id, values) : createProduct(values)

        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                form.resetFields()
                mutate(`product?${getURLs().toString()}`)
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
