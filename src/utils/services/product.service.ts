import $host from '.'

export type ProductType = {
    id: number
    name: string
    description: string
    uom: string
    type: string
    hasRecipe: boolean
    isDeleted: boolean
    nmId?: number
    isWB?: boolean
}

export const fetchProduct = async () => {
    const { data } = await $host.get('product')
    return data as ProductType[]
}

export const createProduct = async (data: ProductType) => {
    const response = await $host.post('product', data)
    return response
}

export const bulkCreateProduct = async (data: ProductType[], overwrite: boolean) => {
    const response = await $host.post('product/bulk', { data, overwrite })
    return response
}

export const updateProduct = async (id: number, data: ProductType) => {
    const response = await $host.put(`product/${id}`, data)
    return response
}
export const deleteProduct = async (id: number) => {
    const { data } = await $host.delete(`product/${id}`)
    return data
}

export const parseWBProduct = async () => {
    const { data } = await $host.get('product/wb')
    return data
}
