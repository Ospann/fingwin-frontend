import $host from '.'
import type { ReturnType } from '../types/sales.types'

export const createReturn = async (formData: ReturnType) => {
    const { data } = await $host.post(`returns`, formData)
    return data
}

export const deleteReturn = async (id: number) => {
    const { data } = await $host.delete(`returns/${id}`)
    return data
}

export const fetchReturnById = async (id: number) => {
    const { data } = await $host.get(`returns/${id}`)
    return data
}

export const updateReturn = async (id: number, formData: ReturnType) => {
    const { data } = await $host.put(`returns/${id}`, formData)
    return data
}
