import $host from '.'
import { PurchaseType } from '../types/purchase.types'
import dayjs from 'dayjs'

export const createPurchase = async (formData: PurchaseType) => {
    const { data } = await $host.post(`purchase`, formData)
    return data
}

export const deletePurchase = async (id: number) => {
    const { data } = await $host.delete(`purchase/${id}`)
    return data
}

export const fetchPurchaseById = async (id: number) => {
    const { data } = await $host.get(`purchase/${id}`)
    return data
}

export const updatePurchase = async (id: number, formData: PurchaseType) => {
    const { data } = await $host.put(`purchase/${id}`, formData)
    return data
}

export const uploadExcel = async (queries: string) => {
    const response = await $host.get(`purchase/excel?${queries}`, { responseType: 'blob' })
    const blob = response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', `Закуп ${dayjs().format('DD-MM-YYYY')}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
}
