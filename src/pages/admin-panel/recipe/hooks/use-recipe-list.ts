import { useState } from 'react'
import { useApi } from '@/utils/services'
import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { deleteRecipe } from '@/utils/services/recipe.service'
import type { RecipeType } from '@/utils/types/recipe.types'
import { MessageInstance } from 'antd/es/message/interface'

export function useRecipeList(messageApi: MessageInstance) {
    const { getParam, setParam, getURLs } = useURLParameters()
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selected, setSelected] = useState<RecipeType | undefined>()
    const [search, setSearch] = useState(getParam('search') ?? '')

    const { data, mutate } = useApi<{ data: RecipeType[] }>(`recipe?${getURLs().toString()}`, {
        revalidateOnMount: true,
    })

    const handleClose = () => {
        setIsOpen(false)
        setSelected(undefined)
    }

    const confirmDelete = async () => {
        if (!selected) return
        const responsePromise = deleteRecipe(selected.id)
        responsePromise
            .then((res) => {
                messageApi.success(res?.data?.message || 'Успешно')
                mutate()
            })
            .catch((err) => {
                messageApi.error(err.response?.data?.message || 'Ошибка')
            })

        setSelected(undefined)
        setIsConfirmOpen(false)
    }

    return {
        data: data?.data,
        isOpen,
        setIsOpen,
        isConfirmOpen,
        setIsConfirmOpen,
        selected,
        setSelected,
        search,
        setSearch,
        setParam,
        handleClose,
        confirmDelete,
    }
}
