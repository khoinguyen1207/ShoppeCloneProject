import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// English
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import ERROR_EN from 'src/locales/en/errorMessage.json'
import PROFILE_EN from 'src/locales/en/profile.json'

// Vietnamese
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import ERROR_VI from 'src/locales/vi/errorMessage.json'
import PROFILE_VI from 'src/locales/vi/profile.json'

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
}

export const resources = {
    en: {
        home: HOME_EN,
        product: PRODUCT_EN,
        error: ERROR_EN,
        profile: PROFILE_EN
    },
    vi: {
        home: HOME_VI,
        product: PRODUCT_VI,
        error: ERROR_VI,
        profile: PROFILE_VI
    }
}

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    ns: ['home', 'product', 'error', 'profile'],
    defaultNS,
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false // react already safes from xss
    }
})
