// utils/providers/ThemeProvider.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeContextType = {
    isDarkMode: boolean
    toggleTheme: () => void
    setTheme: (isDark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

type ThemeProviderProps = {
    children: ReactNode | ((isDarkMode: boolean) => ReactNode)
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme')
        return saved === 'dark'
    })

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev)
    }

    const setTheme = (isDark: boolean) => {
        setIsDarkMode(isDark)
    }

    const value = {
        isDarkMode,
        toggleTheme,
        setTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {typeof children === 'function' ? children(isDarkMode) : children}
        </ThemeContext.Provider>
    )
}