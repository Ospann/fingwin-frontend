import { SWRConfig } from 'swr'
import { ContextProvider } from './utils/providers/Context.tsx'
import { AntdProvider } from './components/ui/provider.tsx'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import ruTranslation from './utils/constants/langs/ru.json'
import kzTranslation from './utils/constants/langs/kz.json'
import enTranslation from './utils/constants/langs/en.json'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import i18n from 'i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import 'dayjs/locale/kk'
import 'dayjs/locale/en'
import 'antd/dist/reset.css'
import './index.css'

i18n.use(initReactI18next).init({
    resources: {
        ru: { translation: ruTranslation },
        kz: { translation: kzTranslation },
        en: { translation: enTranslation },
    },
    lng: localStorage.getItem('lang') ?? 'ru',
    fallbackLng: 'ru',
})

const dayjsLocales = {
    ru: 'ru',
    kz: 'kk',
    en: 'en',
}

const currentLang = (localStorage.getItem('lang') ?? 'ru') as keyof typeof dayjsLocales
dayjs.locale(dayjsLocales[currentLang])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
        <AntdProvider>
            <ContextProvider>
                <SWRConfig
                    value={{
                        revalidateIfStale: false,
                        shouldRetryOnError: false,
                        revalidateOnFocus: false,
                    }}
                >
                    <App />
                </SWRConfig>
            </ContextProvider>
        </AntdProvider>
    </I18nextProvider>,
)