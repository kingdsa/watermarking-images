import type { RouteLocationRaw } from 'vue-router'

export interface ToolMeta {
  id: string
  nameKey: string
  descriptionKey: string
  to: RouteLocationRaw
  icon: string
  available: boolean
  badgeKey?: string
}

export const tools: ToolMeta[] = [
  {
    id: 'image-watermark',
    nameKey: 'tools.imageWatermark.name',
    descriptionKey: 'tools.imageWatermark.description',
    to: '/tools/watermark',
    icon: 'watermark',
    available: true
  },
  {
    id: 'image-compress',
    nameKey: 'tools.imageCompress.name',
    descriptionKey: 'tools.imageCompress.description',
    to: '/tools/compress',
    icon: 'compress',
    available: false,
    badgeKey: 'tools.comingSoon'
  },
  {
    id: 'image-resize',
    nameKey: 'tools.imageResize.name',
    descriptionKey: 'tools.imageResize.description',
    to: '/tools/resize',
    icon: 'resize',
    available: false,
    badgeKey: 'tools.comingSoon'
  },
  {
    id: 'image-convert',
    nameKey: 'tools.imageConvert.name',
    descriptionKey: 'tools.imageConvert.description',
    to: '/tools/convert',
    icon: 'convert',
    available: false,
    badgeKey: 'tools.comingSoon'
  }
]

export const toolIcons: Record<string, string> = {
  watermark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 14l3-3 3 3 4-4"/><circle cx="9" cy="8" r="1.5"/></svg>`,
  compress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 9 4 4 9 4"/><polyline points="20 9 20 4 15 4"/><polyline points="4 15 4 20 9 20"/><polyline points="20 15 20 20 15 20"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>`,
  resize: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M21 7v12a2 2 0 0 1-2 2H7"/><line x1="14" y1="10" x2="14" y2="14"/><line x1="12" y1="12" x2="16" y2="12"/></svg>`,
  convert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h12l-3-3"/><path d="M20 17H8l3 3"/></svg>`
}
