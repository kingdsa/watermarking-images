<template>
  <div class="upload-area" :class="{ dragover: isDragging }" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
    <div class="upload-content">
      <svg class="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <p class="upload-text">{{ t('upload.dragDrop') }}</p>
      <p class="upload-divider">{{ t('upload.or') }}</p>
      <label class="btn-primary">
        {{ t('upload.browse') }}
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          style="display: none"
          @change="handleFileSelect"
        />
      </label>
      <p class="upload-hint">{{ t('upload.supportedFormats') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'

const emit = defineEmits<{
  upload: [files: File[]]
}>()

const { t } = useI18n()
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement>()

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || []).filter((file) =>
    file.type.startsWith('image/')
  )
  if (files.length > 0) {
    emit('upload', files)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  if (files.length > 0) {
    emit('upload', files)
  }
  target.value = ''
}
</script>

<style scoped>
.upload-area {
  min-height: 200px;
  border: 2px dashed var(--color-border);
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.upload-area.dragover {
  border-color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.05);
}

.upload-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.upload-icon {
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.upload-text {
  font-size: 1rem;
  color: var(--color-text-primary);
  font-weight: 500;
}

.upload-divider {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.upload-hint {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.btn-primary {
  padding: 0.625rem 1.25rem;
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
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 4px 8px rgba(var(--color-accent-rgb), 0.2);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

@media (max-width: 639px) {
  .upload-area {
    min-height: 160px;
    padding: 1.5rem;
  }

  .upload-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
