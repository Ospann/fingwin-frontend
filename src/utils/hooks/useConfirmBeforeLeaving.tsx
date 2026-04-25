import { useEffect } from 'react'

export const useConfirmBeforeLeaving = (isDirty: boolean) => {
    useEffect(() => {
        if (isDirty) {
            window.history.pushState(null, document.title, window.location.href)
        }

        const handleBeforeUnload = (event: any) => {
            if (isDirty) {
                event.preventDefault()
                event.returnValue =
                    'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?'
                return 'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?'
            }
        }

        const handlePopState = () => {
            if (isDirty) {
                const confirmLeave = window.confirm(
                    'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?',
                )
                if (!confirmLeave) {
                    window.history.pushState(null, document.title, window.location.href)
                }
            }
        }

        window.addEventListener('popstate', handlePopState)
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('popstate', handlePopState)
            window.removeEventListener('beforeunload', handleBeforeUnload)
            if (isDirty) {
                window.history.go(-1)
            }
        }
    }, [isDirty])
}
