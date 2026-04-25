import { Dayjs } from "dayjs"

type ProductsType = {
    id: number | null
    name: string | null
    quantity: number | null
    uom: string | null
    price: number | null
    total: number | null
}

export type PurchaseType = {
    supplier: number
    storage: number
    products: ProductsType[]
    date: string | Dayjs
    score: number
}

export type PurchaseHistoryType = {
    count: string
    date: string
    id: number
    supplier: string
    total: string
    user: string
}
