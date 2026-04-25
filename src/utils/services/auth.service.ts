import $host from '.'
import { CompanyTypes } from './user.service'

export const checkAuth = async () => {
    const { data } = await $host.get(`auth`)
    return data
}

export const loginUser = async (email: string, password: string) => {
    const { data } = await $host.post('auth/login', { email, password })
    return data
}

export const createCompany = async (data: CompanyTypes) => {
    const response = await $host.post('auth/register', data)
    return response
}

export type IntegrationTokenResponse = {
    token: string
}

export const issueIntegrationToken = async () => {
    const { data } = await $host.post<{ data: IntegrationTokenResponse }>('auth/edara-token', {})
    return data
}

export const revokeIntegrationToken = async () => {
    await $host.delete('auth/edara-token')
}
