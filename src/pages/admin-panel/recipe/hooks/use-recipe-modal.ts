import { Form } from 'antd'
import { CreateRecipeType } from '@/utils/types/recipe.types'
import { useApi } from '@/utils/services'
import { createRecipe, updateRecipe } from '@/utils/services/recipe.service'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { mutate } from 'swr'
import type { ProductType } from '@/utils/services/product.service'
import { MessageInstance } from 'antd/es/message/interface'
import { useEffect } from 'react'

export function useRecipeModal(
    messageApi: MessageInstance,
    data: CreateRecipeType | undefined,
    onClose: () => void,
) {
    const { getURLs } = useURLParameters()
    const [form] = Form.useForm()
    const { data: productsRes } = useApi<{ data: ProductType[] }>('product')

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                product: data.product,
                description: data.description,
                ingredients: data.ingredients?.length
                    ? data.ingredients
                    : [{ product: null, quantity: null }],
            })
        } else {
            form.resetFields()
            form.setFieldsValue({
                ingredients: [{ product: null, quantity: null }],
            })
        }
    }, [data, form])

    const handleCloseModal = () => {
        onClose()
        form.resetFields()
        form.setFieldsValue({
            ingredients: [{ product: null, quantity: null }],
        })
    }

    const onSubmit = async (values: CreateRecipeType) => {
        console.log(values)
        const hasEmpty = values.ingredients?.some((i) => !i.product || !i.quantity)
        if (hasEmpty) {
            messageApi.error('Заполните все поля ингредиентов')
            return
        }

        const responsePromise = data?.id ? updateRecipe(data.id, values) : createRecipe(values)

        responsePromise
            .then((res) => {
                mutate(`recipe?${getURLs().toString()}`)
                handleCloseModal()
                messageApi.success(res?.data?.message || 'Успешно')
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })
    }

    return {
        products: productsRes?.data,
        form,
        onSubmit,
        handleCloseModal,
    }
}
