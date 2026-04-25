import { useURLParameters } from '@/utils/hooks/useURLParameters'
import { FinanceTypes } from '@/utils/types/finance.types'
import { useApi } from '@/utils/services'
import { useTranslation } from 'react-i18next'
import { currencies } from '@/utils/constants/currency.consts'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'

export function useFinanceHistory() {
    const { getURLs } = useURLParameters()
    const { t } = useTranslation()
    const { data: financeResponse } = useApi<{ data: FinanceTypes[] }>(`finance?${getURLs()}`, {
        revalidateOnMount: true,
    })
    const data = financeResponse?.data

    const columns: ColumnsType<FinanceTypes> = [
        {
            title: '№',
            key: 'index',
            render: (_, __, index) => index + 1,
        },
        {
            title: t('Дата'),
            dataIndex: 'date',
            key: 'date',
            render: (value) => dayjs(value).format('DD.MM.YYYY'),
        },
        {
            title: t('Счет'),
            dataIndex: ['score', 'account'],
            key: 'score',
        },
        {
            title: t('Категория'),
            dataIndex: ['category', 'category'],
            key: 'category',
            render: (_, record) => record.category?.category,
        },
        {
            title: t('Контрагент'),
            dataIndex: ['contragent', 'contragent'],
            key: 'contragent',
            render: (_, record) => record.contragent?.contragent ?? '-',
        },
        {
            title: t('Сумма'),
            key: 'originalSum',
            align: 'right',
            render: (_, record) =>
                `${record.originalSum.toLocaleString()} ${currencies.find((c) => c.code === record?.score?.currency)?.symbol ?? '₸'
                }`,
        },
        {
            title: t('Комментарий'),
            dataIndex: 'comment',
            key: 'comment',
        },
    ];

    return {
        getURLs,
        data,
        columns,
    }
}
