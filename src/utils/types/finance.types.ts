import { Dayjs } from 'dayjs'

export type FinanceTypes = {
    id: number
    sum: number
    originalSum: number
    date: string | Dayjs | null
    billingDate: string | Dayjs | null
    score: FinanceAccountType
    category: { id: number; category: string }
    contragent?: { id: number; contragent: string }
    comment: string
    createdBy: string
    deletedBy: string
    source?: string
}

export type FinanceTypesForm = {
    id: number
    sum: number
    originalSum: number
    date: string | Dayjs | null
    billingDate: string | Dayjs | null
    score: number
    category: number
    contragent?: number
    comment: string
    createdBy: string
    deletedBy: string
    source?: string
}

export type FinanceTransferTypes = {
    sum: number
    date: string
    billingDate: string
    from: number
    to: number
    comment: string
}

export type FinanceCategory = {
    cashflowType?: number | null
    cashflowTypeName?: string
    category: string
    id: number
    pnlType?: number | null
    pnlTypeName?: string
    type: 'Доход' | 'Расход'
}

export type createFinanceCategory = {
    cashflowType?: number | null
    type: 'Доход' | 'Расход'
    category: string
    id: number
    pnlType?: number | null
}

export type FinanceAccountType = {
    id: number
    account: string
    currency: 'RUB' | 'USD' | 'EUR' | 'KZT' | 'CNY'
    initialBalance?: number
    accountNumber?: string
}
export type createFinanceType = Omit<FinanceTypes, 'id'>
