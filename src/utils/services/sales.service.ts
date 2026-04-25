import $host from '.'
import { SalesType } from '../types/sales.types'
import dayjs from 'dayjs'

export const createSales = async (formData: SalesType) => {
    const { data } = await $host.post(`sales`, formData)
    return data
}

export const deleteSales = async (id: number) => {
    const { data } = await $host.delete(`sales/${id}`)
    return data
}

export const fetchSalesById = async (id: number) => {
    const { data } = await $host.get(`sales/${id}`)
    return data
}

export const updateSales = async (id: number, formData: SalesType) => {
    const { data } = await $host.put(`sales/${id}`, formData)
    return data
}

export const uploadExcel = async (queries: string) => {
    const response = await $host.get(`sales/excel?${queries}`, { responseType: 'blob' })
    const blob = response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', `Продажа ${dayjs().format('DD-MM-YYYY')}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
}

export const uploadTopProductsExcel = async (queries: string) => {
    const response = await $host.get(`sales/product/excel?${queries}`, { responseType: 'blob' })
    const blob = response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', `Топ продуктов ${dayjs().format('DD-MM-YYYY')}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
}