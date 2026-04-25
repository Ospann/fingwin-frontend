import { ConfigProvider, theme, App as AntApp } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import enUS from 'antd/locale/en_US'
import kzKZ from 'antd/locale/kk_KZ'
import { ThemeProvider } from './Themed/theme-provider'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

const antdLocales = {
    ru: ruRU,
    kz: kzKZ,
    en: enUS,
}

type AntdProviderProps = {
    children: ReactNode
}

export function AntdProvider({ children }: AntdProviderProps) {
    const { i18n } = useTranslation()
    const currentLang = (i18n.language || 'ru') as keyof typeof antdLocales

    return (
        <ThemeProvider>
            {(isDarkMode) => (
                <ConfigProvider
                    locale={antdLocales[currentLang]}
                    theme={{
                        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                        token: {
                            colorPrimary: '#9370DB',
                            colorPrimaryHover: '#9370DB',
                            colorPrimaryActive: '#9370DB',
                            colorLink: '#9370DB',
                            colorLinkHover: '#9370DB',
                            colorLinkActive: '#9370DB',
                            borderRadius: 6,
                        }

                    }}
                >
                    <AntApp>
                        {children}
                    </AntApp>
                </ConfigProvider>
            )}
        </ThemeProvider>
    )
}