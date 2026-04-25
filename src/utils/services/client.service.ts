import $host from '.'

export type ClientType = {
    id: number
    name: string
    address: null | string
    phone: string | null
    email: string | null
    bin: string | null
}

export const fetchClients = async () => {
    const { data } = await $host.get('client')
    return data as ClientType[]
}

export const createClient = async (data: ClientType) => {
    const response = await $host.post('client', data)
    return response
}

export const updateClient = async (id: number, data: ClientType) => {
    const response = await $host.put(`client/${id}`, data)
    return response
}
export const deleteClient = async (id: number) => {
    const { data } = await $host.delete(`client/${id}`)
    return data
}
