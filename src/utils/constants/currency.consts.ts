export const currencies = [
    { code: 'KZT', symbol: '₸' },
    { code: 'RUB', symbol: '₽' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'CNY', symbol: '¥' },
] as const

export type CurrencyType = (typeof currencies)[number]['code']

export type CurrencyCode = 'KZT' | 'RUB' | 'USD' | 'EUR' | 'CNY'
