import type { RouteLocationRaw } from 'vue-router'
import type { IconifyIcon } from '@iconify/types'
import stampIcon from '@iconify-icons/lucide/stamp'
import expandIcon from '@iconify-icons/lucide/expand'
import scalingIcon from '@iconify-icons/lucide/scaling'
import arrowRightLeftIcon from '@iconify-icons/lucide/arrow-right-left'
import paletteIcon from '@iconify-icons/lucide/palette'

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
  },
  {
    id: 'ui-color',
    nameKey: 'tools.uiColor.name',
    descriptionKey: 'tools.uiColor.description',
    to: '/tools/ui-color',
    icon: 'uiColor',
    available: true
  }
]

export const toolIcons: Record<string, IconifyIcon> = {
  watermark: stampIcon,
  compress: expandIcon,
  resize: scalingIcon,
  convert: arrowRightLeftIcon,
  uiColor: paletteIcon
}
