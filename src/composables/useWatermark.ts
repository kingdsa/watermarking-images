import type { WatermarkSettings, WatermarkImage } from '../types'

export function applyWatermark(
  image: HTMLImageElement,
  settings: WatermarkSettings
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = image.width
    canvas.height = image.height

    // Draw original image
    ctx.drawImage(image, 0, 0)

    // 根据图片宽度自适应字体大小
    // 用户设置的fontSize作为基准（相对于1000px宽度），然后根据实际图片宽度缩放
    const scaleFactor = canvas.width / 1000
    const actualFontSize = settings.fontSize * scaleFactor

    // Configure watermark style with better rendering
    ctx.font = `bold ${actualFontSize}px Inter, -apple-system, sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'left'

    // Calculate text dimensions
    const metrics = ctx.measureText(settings.text)
    const textWidth = metrics.width
    const textHeight = actualFontSize

    // Calculate position
    let x = 0
    let y = 0
    const padding = 30 * scaleFactor

    switch (settings.position) {
      case 'top-left':
        x = padding
        y = textHeight / 2 + padding
        break
      case 'top-right':
        x = canvas.width - textWidth - padding
        y = textHeight / 2 + padding
        break
      case 'bottom-left':
        x = padding
        y = canvas.height - textHeight / 2 - padding
        break
      case 'bottom-right':
        x = canvas.width - textWidth - padding
        y = canvas.height - textHeight / 2 - padding
        break
      case 'center':
        x = (canvas.width - textWidth) / 2
        y = canvas.height / 2
        break
    }

    // Apply rotation and draw watermark
    ctx.save()

    if (settings.rotation !== 0) {
      ctx.translate(x + textWidth / 2, y)
      ctx.rotate((settings.rotation * Math.PI) / 180)
      ctx.translate(-textWidth / 2, 0)
      x = 0
      y = 0
    }

    // Draw text with stroke and shadow for better visibility
    ctx.globalAlpha = settings.opacity / 100

    // Shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Stroke for contrast (opposite color of fill)
    const isLightColor = settings.color === '#ffffff' ||
                         settings.color === '#fff' ||
                         settings.color.toLowerCase() === '#ffffff'
    ctx.strokeStyle = isLightColor ? '#000000' : '#ffffff'
    ctx.lineWidth = actualFontSize / 20
    ctx.lineJoin = 'round'
    ctx.miterLimit = 2
    ctx.strokeText(settings.text, x, y)

    // Reset shadow for fill
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Fill text
    ctx.fillStyle = settings.color
    ctx.fillText(settings.text, x, y)

    ctx.restore()

    // Convert to blob URL
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob))
      } else {
        reject(new Error('Failed to create blob from canvas'))
      }
    }, 'image/png')
  })
}

export function processImage(
  imageFile: WatermarkImage,
  settings: WatermarkSettings
): Promise<string> {
  return new Promise((resolve, reject) => {
    // 设置超时，防止永久卡住
    const timeout = setTimeout(() => {
      reject(new Error('Image processing timeout'))
    }, 30000) // 30秒超时

    const img = new Image()
    img.onload = async () => {
      try {
        const watermarkedUrl = await applyWatermark(img, settings)
        clearTimeout(timeout)
        resolve(watermarkedUrl)
      } catch (error) {
        clearTimeout(timeout)
        reject(error)
      }
    }
    img.onerror = () => {
      clearTimeout(timeout)
      reject(new Error('Failed to load image'))
    }
    img.src = imageFile.originalUrl
  })
}

export function downloadImage(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
}
