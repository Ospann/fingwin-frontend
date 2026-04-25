import $host from '.'
import dayjs from 'dayjs'

export type CreateCorrectType = {
    storage: number
    product: number
    quantity: number
}

export const createCorrect = async (formData: CreateCorrectType) => {
    const { data } = await $host.post(`storage/correct`, formData)
    return data
}

export const uploadExcelCorrect = async (queries: string) => {
    const response = await $host.get(`storage/remain/excel?${queries}`, { responseType: 'blob' })
    const blob = response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', `Остатки ${dayjs().format('DD-MM-YYYY')}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
}

export type StorageType = {
    id?: number
    name: string
    description: string
}

export const createStorage = async (formData: StorageType) => {
    const { data } = await $host.post(`storage`, formData)
    return data
}

export const updateStorage = async (id: number, formData: StorageType) => {
    const { data } = await $host.put(`storage/${id}`, formData)
    return data
}

export const deleteStorage = async (id: number) => {
    const { data } = await $host.delete(`storage/${id}`)
    return data
}
