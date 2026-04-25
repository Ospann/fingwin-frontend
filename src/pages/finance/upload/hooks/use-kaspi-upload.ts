import { useState, useRef } from 'react'
import { uploadKaspi } from '@/utils/services/finance.service'
import { message } from 'antd'
import { TransactionTypes } from './use-kaspi-form'

export function useKaspiUpload(setFormData: (rows: TransactionTypes[]) => void, useAi: boolean) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileSelect = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) await uploadFile(file)
    }

    const uploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        setIsLoading(true)
        uploadKaspi(formData, useAi)
            .then((res) => {
                setFormData(res.data)
                message.success(res.data.message)
            })
            .catch((err) => {
                message.error(err.response?.data?.message || 'Ошибка при загрузке файла')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) uploadFile(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    return {
        isLoading,
        fileInputRef,
        handleFileChange,
        handleFileSelect,
        handleDrop,
        handleDragOver,
    }
}
