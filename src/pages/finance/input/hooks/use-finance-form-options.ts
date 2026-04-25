import { useMemo } from 'react'
import { useApi } from '@/utils/services'
import { currencies } from '@/utils/constants/currency.consts'
import { FinanceAccountType, FinanceCategory } from '@/utils/types/finance.types'

type ContragentRow = { id: number; contragent: string }

function buildScoreOptions(accounts: FinanceAccountType[]) {
    return accounts.map((s) => ({
        label: `${s.account}${
            s.currency
                ? ` (${currencies.find((c) => c.code === s.currency)?.symbol ?? s.currency})`
                : ''
        }`,
        value: s.id,
    }))
}

function buildCategoryOptions(categories: FinanceCategory[], type: 'Расход' | 'Доход') {
    return categories
        .filter((c) => c.type === type)
        .map((c) => ({ label: c.category, value: c.id }))
}

function buildContragentOptions(rows: ContragentRow[]) {
    return rows.map((c) => ({ label: c.contragent, value: c.id }))
}

/**
 * Счета, категории (по типу) и контрагенты для форм ввода финансов.
 * @param categoryType — если задан, categoryOptions только этого типа; иначе пустой массив.
 */
export function useFinanceFormOptions(categoryType?: 'Расход' | 'Доход') {
    const { data: scoreData } = useApi<{ data: FinanceAccountType[] }>('/finance/score')
    const { data: categoryData } = useApi<{ data: FinanceCategory[] }>('/finance/category')
    const { data: contragentData } = useApi<{ data: ContragentRow[] }>('/finance/contragent')

    const scores = scoreData?.data
    const categories = categoryData?.data
    const contragents = contragentData?.data

    const scoreOptions = useMemo(
        () => buildScoreOptions(scores ?? []),
        [scores],
    )

    const categoryOptions = useMemo(
        () =>
            categoryType && categories?.length
                ? buildCategoryOptions(categories, categoryType)
                : [],
        [categories, categoryType],
    )

    const contragentOptions = useMemo(
        () => buildContragentOptions(contragents ?? []),
        [contragents],
    )

    return {
        scoreOptions,
        categoryOptions,
        contragentOptions,
        scores,
    }
}
