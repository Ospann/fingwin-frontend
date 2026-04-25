import $host from '.'
import { UserRoles } from '../types/user.type'

export type UserTypes = {
    id: number
    confirm?: string
    email: string
    name: string
    surname: string
    password: string
    forms: string[]
    phone: string
    isActive: boolean
    telegramId: string
    refUserId?: number
    role: UserRoles
}

export type CompanyTypes = {
    companyName: string
    plan: string
    bin: string
    bik: string
    iik: string
    bank: string
    director: string
    address: string
    schema: string
} & UserTypes

export type createUserType = Omit<UserTypes, 'id'>

export const fetchUsers = async () => {
    const { data } = await $host.get('user')
    return data as UserTypes[]
}

export const createUser = async (data: UserTypes) => {
    const response = await $host.post('user', data)
    return response
}

export const updateUser = async (id: number, data: UserTypes) => {
    const response = await $host.patch(`user/${id}`, data)
    return response
}
export const deleteUser = async (id: number) => {
    const { data } = await $host.delete(`user/${id}`)
    return data
}
