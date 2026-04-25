/**
 * Function to format number to string in ru format with spaces and dots
 * @param number
 * @returns
 */
export function formatNumber(number: number | undefined): string {
    if (typeof number !== 'number' || isNaN(number)) {
        return '0'
    }
    return new Intl.NumberFormat('ru-RU').format(number)
}
