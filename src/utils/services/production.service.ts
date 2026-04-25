import $host from '.'
import { PurchaseType } from '../types/purchase.types'

export const createProduction = async (formData: PurchaseType) => {
    const { data } = await $host.post(`production`, formData)
    return data
}

export const deleteProduction = async (id: number) => {
    const { data } = await $host.delete(`production/${id}`)
    return data
}

export const fetchProduction = async (id: number) => {
    const { data } = await $host.get(`production/${id}`)
    return data
}

export const updateProduction = async (id: number, formData: PurchaseType) => {
    const { data } = await $host.put(`production/${id}`, formData)
    return data
}
