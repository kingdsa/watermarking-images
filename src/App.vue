<template>
  <div id="app">
    <AppHeader />

    <main class="main-content">
      <!-- Left Sidebar: Watermark Settings -->
      <aside class="sidebar fade-in">
        <div class="sidebar-content">
          <h2 class="sidebar-title">{{ t('settings.title') }}</h2>

          <WatermarkSettings v-model="settings" />

          <!-- Actions -->
          <div class="sidebar-actions">
            <button
              class="btn-primary btn-full"
              :disabled="!canDownloadAll"
              @click="downloadAllAsZip"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {{ hasProcessingImages ? t('actions.downloadAllProcessing') : t('actions.downloadAll') }}
            </button>
            <button
              class="btn-secondary btn-full"
              @click="clearAll"
              :disabled="images.length === 0"
            >
              {{ t('actions.clear') }}
            </button>
          </div>
        </div>
      </aside>

      <!-- Right Content: Upload and Preview -->
      <div class="content-area">
        <div class="content-inner">
          <!-- Hero -->
          <div class="hero fade-in fade-in-delay-1">
            <h2 class="hero-title">{{ t('app.subtitle') }}</h2>
          </div>

          <!-- Upload Section -->
          <section class="section fade-in fade-in-delay-2">
            <FileUpload @upload="handleUpload" />
          </section>

          <!-- Images Grid -->
          <section v-if="images.length > 0" class="section fade-in fade-in-delay-3">
            <ImageGrid
              :images="images"
              @download="downloadImage"
              @remove="removeImage"
            />
          </section>

          <!-- Empty State -->
          <section v-if="images.length === 0" class="empty-state fade-in fade-in-delay-3">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <p class="empty-text">{{ t('status.noImages') }}</p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import JSZip from 'jszip'
import AppHeader from './components/AppHeader.vue'
import FileUpload from './components/FileUpload.vue'
import WatermarkSettings from './components/WatermarkSettings.vue'
import ImageGrid from './components/ImageGrid.vue'
import { useI18n } from './composables/useI18n'
import { processImage, downloadImage as download } from './composables/useWatermark'
import type { WatermarkImage, WatermarkSettings as WatermarkSettingsType } from './types'

const { t } = useI18n()

const images = ref<WatermarkImage[]>([])
const settings = ref<WatermarkSettingsType>({
  text: 'Watermark',
  fontSize: 64,
  opacity: 80,
  color: '#ffffff',
  position: 'bottom-right',
  rotation: 0
})

const hasProcessedImages = computed(() =>
  images.value.some((img) => img.watermarkedUrl !== null)
)

const hasProcessingImages = computed(() =>
  images.value.some((img) => img.processing)
)

const canDownloadAll = computed(() =>
  hasProcessedImages.value && !hasProcessingImages.value
)

// 防抖定时器
let debounceTimer: number | null = null
// 处理中标志，防止重复处理
let isProcessing = false

// 监听设置变化，带防抖的自动更新所有图片预览
watch(
  settings,
  () => {
    if (images.value.length > 0 && settings.value.text.trim()) {
      // 清除之前的定时器
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer)
      }
      // 设置新的定时器，500ms 后执行
      debounceTimer = window.setTimeout(async () => {
        if (!isProcessing) {
          await processAllImages()
        }
        debounceTimer = null
      }, 500)
    }
  },
  { deep: true }
)

const handleUpload = async (files: File[]) => {
  const newImages: WatermarkImage[] = files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    originalUrl: URL.createObjectURL(file),
    watermarkedUrl: null,
    processing: false,
    error: undefined
  }))
  images.value.push(...newImages)

  // 如果有水印文本，自动处理新上传的图片（并行）
  if (settings.value.text.trim()) {
    await Promise.all(
      newImages.map(image => processSingleImage(image))
    )
  }
}

const processAllImages = async () => {
  if (!settings.value.text.trim() || isProcessing) {
    return
  }

  isProcessing = true
  try {
    // 并行处理所有图片，而不是串行
    await Promise.all(
      images.value.map(image => processSingleImage(image))
    )
  } finally {
    isProcessing = false
  }
}

const processSingleImage = async (image: WatermarkImage) => {
  try {
    // 使用 Vue 的响应式方式更新状态
    const index = images.value.findIndex(img => img.id === image.id)
    if (index === -1) return

    images.value[index].processing = true
    images.value[index].error = undefined

    // 如果之前有水印URL，先释放它
    if (image.watermarkedUrl) {
      URL.revokeObjectURL(image.watermarkedUrl)
    }

    const watermarkedUrl = await processImage(image, settings.value)

    // 确保图片还在列表中（用户可能已经删除）
    const currentIndex = images.value.findIndex(img => img.id === image.id)
    if (currentIndex !== -1) {
      images.value[currentIndex].watermarkedUrl = watermarkedUrl
      images.value[currentIndex].processing = false
      images.value[currentIndex].error = undefined
    }
  } catch (error) {
    console.error('Failed to process image:', error)
    const index = images.value.findIndex(img => img.id === image.id)
    if (index !== -1) {
      images.value[index].processing = false
      images.value[index].error = error instanceof Error ? error.message : t('status.error')
    }
  }
}

const downloadImage = (image: WatermarkImage) => {
  if (image.watermarkedUrl) {
    const filename = image.file.name.replace(/\.[^/.]+$/, '') + '_watermarked.png'
    download(image.watermarkedUrl, filename)
  }
}

const downloadAllAsZip = async () => {
  const zip = new JSZip()
  const processedImages = images.value.filter((img) => img.watermarkedUrl)

  for (const image of processedImages) {
    const response = await fetch(image.watermarkedUrl!)
    const blob = await response.blob()
    const filename = image.file.name.replace(/\.[^/.]+$/, '') + '_watermarked.png'
    zip.file(filename, blob)
  }

  const content = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(content)
  download(url, 'watermarked_images.zip')
  URL.revokeObjectURL(url)
}

const removeImage = (id: string) => {
  const index = images.value.findIndex((img) => img.id === id)
  if (index !== -1) {
    const image = images.value[index]
    URL.revokeObjectURL(image.originalUrl)
    if (image.watermarkedUrl) {
      URL.revokeObjectURL(image.watermarkedUrl)
    }
    images.value.splice(index, 1)
  }
}

const clearAll = () => {
  images.value.forEach((image) => {
    URL.revokeObjectURL(image.originalUrl)
    if (image.watermarkedUrl) {
      URL.revokeObjectURL(image.watermarkedUrl)
    }
  })
  images.value = []
}
</script>

<style scoped>
.main-content {
  display: flex;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  background: var(--color-background);
}

/* Left Sidebar */
.sidebar {
  width: 360px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
  position: sticky;
  top: 70px;
  height: calc(100vh - 70px);
}

.sidebar-content {
  padding: 2rem 1.5rem;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.sidebar-actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

/* Right Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
}

.content-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.section {
  margin-bottom: 2rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: #FFFFFF;
  background: var(--color-accent);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
  box-shadow: 0 4px 8px rgba(var(--color-accent-rgb), 0.2);
  transform: translateY(-1px);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-full {
  width: 100%;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-background);
  border-color: var(--color-text-secondary);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 6rem 1rem;
}

.empty-state svg {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.fade-in {
  animation: fadeIn 0.4s var(--ease-out) forwards;
}

.fade-in-delay-1 {
  animation-delay: 0.1s;
  opacity: 0;
}

.fade-in-delay-2 {
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-in-delay-3 {
  animation-delay: 0.3s;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tablet and Mobile */
@media (max-width: 1023px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }

  .sidebar-content {
    padding: 1.5rem;
  }

  .sidebar-title {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .sidebar-actions {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }

  .content-inner {
    padding: 1.5rem;
  }

  .hero-title {
    font-size: 1.125rem;
  }
}

/* Mobile */
@media (max-width: 639px) {
  .sidebar-content {
    padding: 1rem;
  }

  .content-inner {
    padding: 1rem;
  }

  .empty-state {
    padding: 4rem 1rem;
  }
}
</style>
