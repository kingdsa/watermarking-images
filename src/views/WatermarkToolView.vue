<template>
  <main class="main-content">
    <!-- Left Sidebar: Watermark Settings -->
    <aside class="sidebar fade-in">
      <div class="sidebar-content">
        <WatermarkSettings v-model="settings" />

        <!-- Actions -->
        <div class="sidebar-actions">
          <button
            class="btn-primary btn-full"
            :disabled="!canDownloadAll"
            @click="downloadAllAsZip"
          >
            <Icon :icon="downloadIcon" :width="20" :height="20" />
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
    <div class="content-area" :class="{ 'no-scroll': images.length === 0 }">
      <div class="content-inner">
        <!-- Hero -->
        <div class="hero fade-in fade-in-delay-1">
          <button class="back-link" @click="goHome">
            <Icon :icon="arrowLeftIcon" :width="16" :height="16" />
            {{ t('tools.backToTools') }}
          </button>
          <h2 class="hero-title">{{ t('tools.imageWatermark.name') }}</h2>
          <p class="hero-subtitle">{{ t('app.subtitle') }}</p>
        </div>

        <!-- Upload Section (Only show when no images) -->
        <section v-if="images.length === 0" class="section fade-in fade-in-delay-2">
          <FileUpload @upload="handleUpload" />
        </section>

        <!-- Images Grid with inline upload -->
        <section v-if="images.length > 0" class="section fade-in fade-in-delay-3">
          <ImageGrid
            :images="images"
            @download="downloadImage"
            @remove="removeImage"
            @upload="handleUpload"
          />
        </section>

        <!-- Empty State -->
        <section v-if="images.length === 0" class="empty-state fade-in fade-in-delay-3">
          <Icon :icon="imageIcon" :width="64" :height="64" />
          <p class="empty-text">{{ t('status.noImages') }}</p>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import downloadIcon from '@iconify-icons/lucide/download'
import arrowLeftIcon from '@iconify-icons/lucide/arrow-left'
import imageIcon from '@iconify-icons/lucide/image'
import JSZip from 'jszip'
import FileUpload from '../components/FileUpload.vue'
import WatermarkSettings from '../components/WatermarkSettings.vue'
import ImageGrid from '../components/ImageGrid.vue'
import { useI18n } from '../composables/useI18n'
import { processImage, downloadImage as download } from '../composables/useWatermark'
import type { WatermarkImage, WatermarkSettings as WatermarkSettingsType } from '../types'

const router = useRouter()
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

let debounceTimer: number | null = null
let isProcessing = false

watch(
  settings,
  () => {
    if (images.value.length > 0 && settings.value.text.trim()) {
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer)
      }
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
    await Promise.all(
      images.value.map(image => processSingleImage(image))
    )
  } finally {
    isProcessing = false
  }
}

const processSingleImage = async (image: WatermarkImage) => {
  try {
    const index = images.value.findIndex(img => img.id === image.id)
    if (index === -1) return

    images.value[index].processing = true
    images.value[index].error = undefined

    if (image.watermarkedUrl) {
      URL.revokeObjectURL(image.watermarkedUrl)
    }

    const watermarkedUrl = await processImage(image, settings.value)

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

const goHome = () => {
  router.push('/')
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
  min-height: 0;
}

.content-area.no-scroll {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2rem;
  width: 100%;
}

.no-scroll .content-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.08);
}

.back-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.hero-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin-bottom: 0.375rem;
}

.hero-subtitle {
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  line-height: 1.5;
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

  .sidebar-actions {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }

  .content-inner {
    padding: 1.5rem;
  }

  .hero-title {
    font-size: 1.25rem;
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
