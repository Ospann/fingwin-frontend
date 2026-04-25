type ProductTypes = {
    id: number | null
    name: string | null
    quantity: number | null
    uom: string | null
    price: number | null
    total: number | null
}

export type SalesType = {
    client: number
    storage: number
    products: ProductTypes[]
    date: string
    score: number
    isWB: boolean
    returns: {
        date: string
        details: { id: number; quantity: string; product: ProductTypes }[]
        id: number
        note: string
        user_id: number | null
    }
}

export type SalesHistoryType = {
    count: string
    date: string
    id: number
    client: string
    total: string
    user: string
}

export type ReturnHistoryType = {
    count: string
    date: string
    id: number
    client: string
    total: string
    user: string
}
export type ReturnType = {
    client: number
    storage: number
    products: ProductTypes[]
    date: string
    score: number
}
