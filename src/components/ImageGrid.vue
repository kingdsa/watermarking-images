<template>
  <div class="image-grid">
    <div v-for="image in images" :key="image.id" class="image-card">
      <div class="image-preview-wrapper">
        <img
          :src="image.watermarkedUrl || image.originalUrl"
          :alt="image.file.name"
          class="image-preview"
        />
        <div v-if="image.processing" class="processing-overlay">
          <div class="spinner"></div>
          <span class="processing-text">{{ t('status.processing') }}</span>
        </div>
        <div v-else-if="image.error" class="error-overlay">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span class="error-text">{{ image.error }}</span>
        </div>
      </div>

      <div class="image-info">
        <p class="image-name">{{ image.file.name }}</p>
        <p class="image-size">{{ formatFileSize(image.file.size) }}</p>
      </div>

      <div class="image-actions">
        <button
          class="btn-secondary btn-small"
          :disabled="!image.watermarkedUrl || image.processing"
          @click="$emit('download', image)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {{ t('actions.download') }}
        </button>
        <button
          class="btn-secondary btn-small btn-danger"
          @click="$emit('remove', image.id)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          {{ t('actions.remove') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import type { WatermarkImage } from '../types'

defineProps<{
  images: WatermarkImage[]
}>()

defineEmits<{
  download: [image: WatermarkImage]
  remove: [id: string]
}>()

const { t } = useI18n()

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.image-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
  animation: fadeIn 0.4s var(--ease-out) forwards;
}

.image-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.image-preview-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: repeating-conic-gradient(
    rgba(var(--color-border-rgb), 0.3) 0% 25%,
    transparent 0% 50%
  ) 50% / 20px 20px;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.processing-overlay {
  position: absolute;
  inset: 0;
  background: rgba(var(--color-surface-rgb), 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.error-overlay {
  position: absolute;
  inset: 0;
  background: rgba(var(--color-error-rgb), 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
}

.error-overlay svg {
  color: var(--color-error);
}

.error-text {
  font-size: 0.8125rem;
  color: var(--color-error);
  font-weight: 500;
  text-align: center;
}

.spinner {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.processing-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.image-info {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.image-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.25rem;
}

.image-size {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.image-actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.btn-secondary {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}

.btn-secondary:hover {
  background: var(--color-background);
  border-color: var(--color-text-secondary);
}

.btn-secondary:active {
  background: rgba(var(--color-border-rgb), 0.5);
}

.btn-secondary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-small {
  font-size: 0.8125rem;
  padding: 0.5rem 0.75rem;
}

.btn-danger:hover {
  border-color: var(--color-error);
  color: var(--color-error);
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

@media (max-width: 639px) {
  .image-grid {
    grid-template-columns: 1fr;
  }

  .image-actions {
    flex-direction: column;
  }

  .btn-secondary {
    width: 100%;
  }
}
</style>
