import { useEffect } from 'react'
import { useBlocker } from 'react-router-dom'

interface PromptProps {
    when: boolean
    message: string
}

function Prompt({ when, message }: PromptProps) {
    useBlocker(when)

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (when) {
                event.preventDefault()
                event.returnValue = message
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [when])

    return null
}

export default Prompt
