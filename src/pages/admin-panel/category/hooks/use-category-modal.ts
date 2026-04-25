import { useEffect } from 'react'
import { Form } from 'antd'
import { createCategory, updateCategory } from '@/utils/services/finance.service'
import { FinanceCategory, createFinanceCategory } from '@/utils/types/finance.types'
import { mutate } from 'swr'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { MessageInstance } from 'antd/es/message/interface'

export function useCategoryModal(
    messageApi: MessageInstance,
    data: FinanceCategory | undefined,
    onClose: () => void,
) {
    const { getURLs } = useURLParameters()
    const [form] = Form.useForm()

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                category: data.category,
                cashflowType: data.cashflowType,
                pnlType: data.pnlType,
                id: data.id,
                type: data.type,
            })
        } else {
            form.resetFields()
        }
    }, [data, form])

    const handleCloseModal = () => {
        onClose()
        form.resetFields()
    }

    const onSubmit = async (values: createFinanceCategory) => {
        const formatted = {
            ...values,
            cashflowType: values.cashflowType || null,
            pnlType: values.pnlType || null,
        }

        const responsePromise = data
            ? updateCategory(data.id, formatted)
            : createCategory(formatted)

        responsePromise
            .then((res) => {
                form.resetFields()
                mutate(`finance/category?${getURLs().toString()}`)
                handleCloseModal()
                messageApi.success(res?.data?.message || 'Успешно')
            })
            .catch((error) => {
                messageApi.error(error.response?.data?.message || 'Ошибка')
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
