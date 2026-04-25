import $host from '.'

export type SettingsTypes = {
    parametr: string
    value: string
}

export const fetchSettings = async () => {
    const { data } = await $host.get<{ data: SettingsTypes[] }>('settings')
    return data?.data
}

export const updateSettings = async (data: SettingsTypes) => {
    const response = await $host.patch<{ data: SettingsTypes }>('settings', data)
    return response?.data
}

export const deleteSettings = async (id: number) => {
    const { data } = await $host.delete(`settings/${id}`)
    return data
}

export const createSettings = async (data: SettingsTypes) => {
    const response = await $host.post('settings', data)
    return response
}
