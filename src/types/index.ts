export interface WatermarkImage {
  id: string
  file: File
  originalUrl: string
  watermarkedUrl: string | null
  processing: boolean
  error?: string
}

export interface WatermarkSettings {
  text: string
  fontSize: number
  opacity: number
  color: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  rotation: number
}

export interface I18nMessages {
  [key: string]: string | I18nMessages
}

export type Locale = 'en' | 'zh'
