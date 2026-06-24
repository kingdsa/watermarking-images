import { ref, computed } from 'vue'
import type { Locale, I18nMessages } from '../types'
import en from '../locales/en'
import zh from '../locales/zh'

const messages: Record<Locale, I18nMessages> = {
  en,
  zh
}

const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'en')

export function useI18n() {
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages[locale.value]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  const setLocale = (newLocale: Locale) => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  const currentLocale = computed(() => locale.value)

  return {
    t,
    locale: currentLocale,
    setLocale
  }
}
