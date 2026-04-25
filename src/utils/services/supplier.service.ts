import $host from '.'

export type SupplierType = {
    id: number
    name: string
    address: null | string
    phone: string | null
    email: string | null
    bin: string | null
}

export const fetchSupplier = async () => {
    const { data } = await $host.get('supplier')
    return data as SupplierType[]
}

export const createSupplier = async (data: SupplierType) => {
    const response = await $host.post('supplier', data)
    return response
}

export const updateSupplier = async (id: number, data: SupplierType) => {
    const response = await $host.put(`supplier/${id}`, data)
    return response
}
export const deleteSupplier = async (id: number) => {
    const { data } = await $host.delete(`supplier/${id}`)
    return data
}
