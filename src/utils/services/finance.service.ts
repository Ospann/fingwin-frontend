import {
    FinanceTransferTypes,
    FinanceTypes,
    FinanceCategory,
    FinanceAccountType,
    createFinanceType,
} from '../types/finance.types'
import $host from '.'
import dayjs from 'dayjs'

export const refreshPnl = async () => {
    const response = await $host.post('finance/pnl_refresh')
    return response
}

export const fetchFinance = async () => {
    const { data } = await $host.get('finance')
    return data as FinanceTypes[]
}

export const createIncomeExpense = async (data: FinanceTypes) => {
    const response = await $host.post('finance', data)
    return response
}

export const createTransfer = async (data: FinanceTransferTypes) => {
    const response = await $host.post('finance/transfer', data)
    return response
}

export const deleteTransaction = async (id: number) => {
    const response = await $host.delete(`finance/${id}`)
    return response
}

export const updateTransaction = async (id: number, data: createFinanceType) => {
    const response = await $host.put(`finance/${id}`, data)
    return response
}

export const uploadExcel = async (queries: string) => {
    const response = await $host.get(`finance/excel?${queries}`, { responseType: 'blob' })
    const blob = response.data
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', `Транзакции  ${dayjs().format('DD-MM-YYYY')}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link?.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(downloadUrl)
}

export const uploadKaspi = async (formData: FormData, useAi = false) => {
    try {
        const response = await $host.post(`/finance/upload?useAi=${useAi}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 360_000,
        })
        return response.data
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error)
        throw error
    }
}

export const bulkCreate = async (data: unknown) => {
    const response = await $host.post('/finance/bulk', { transactions: data })
    return response
}

// INCOME || EXPENSE CATEGORIES

export const createCategory = async (data: FinanceCategory) => {
    const response = await $host.post('finance/category', data)
    return response
}

export const updateCategory = async (id: number, data: FinanceCategory) => {
    const response = await $host.put(`finance/category/${id}`, data)
    return response
}

export const deleteCategory = async (id: number) => {
    const response = await $host.delete(`finance/category/${id}`)
    return response
}

// ACCOUNTS SCORES

export const createAccount = async (data: FinanceAccountType) => {
    const response = await $host.post('finance/score', data)
    return response
}

export const updateAccount = async (id: number, data: FinanceAccountType) => {
    const response = await $host.put(`finance/score/${id}`, data)
    return response
}

export const deleteAccount = async (id: number) => {
    const response = await $host.delete(`finance/score/${id}`)
    return response
}
