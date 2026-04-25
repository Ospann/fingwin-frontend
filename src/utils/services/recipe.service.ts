import $host from '.'
import { CreateRecipeType } from '../types/recipe.types'

export const createRecipe = async (formData: CreateRecipeType) => {
    const { data } = await $host.post(`recipe`, formData)
    return data
}

export const deleteRecipe = async (id: number) => {
    const { data } = await $host.delete(`recipe/${id}`)
    return data
}

export const fetchRecipeById = async (id: number) => {
    const { data } = await $host.get(`recipe/${id}`)
    return data
}

export const updateRecipe = async (id: number, formData: CreateRecipeType) => {
    const { data } = await $host.put(`recipe/${id}`, formData)
    return data
}
