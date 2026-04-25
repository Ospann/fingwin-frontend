import { forwardRef } from 'react'
import { Input as AntInput, type InputProps } from 'antd'

// Если у тебя есть кастомная тема — можно оставить этот компонент
import type { InputRef } from 'antd'

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
    return (
        <AntInput
            ref={ref}
            {...props}
            style={{
                backgroundColor: 'var(--light)',
                ...(props.style || {}),
            }}
        />
    )
})

Input.displayName = 'Input'
