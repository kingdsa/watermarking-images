<template>
  <div class="settings-panel">
    <h2 class="settings-title">{{ t('settings.title') }}</h2>

    <div class="settings-grid">
      <!-- Watermark Text -->
      <div class="setting-item">
        <label class="setting-label">{{ t('settings.text') }}</label>
        <input
          type="text"
          class="input"
          :placeholder="t('settings.textPlaceholder')"
          :value="modelValue.text"
          @input="updateSetting('text', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Font Size -->
      <div class="setting-item">
        <label class="setting-label">
          {{ t('settings.fontSize') }}: {{ modelValue.fontSize }}px
        </label>
        <input
          type="range"
          class="slider"
          min="12"
          max="120"
          :value="modelValue.fontSize"
          @input="updateSetting('fontSize', Number(($event.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Opacity -->
      <div class="setting-item">
        <label class="setting-label">
          {{ t('settings.opacity') }}: {{ modelValue.opacity }}%
        </label>
        <input
          type="range"
          class="slider"
          min="0"
          max="100"
          :value="modelValue.opacity"
          @input="updateSetting('opacity', Number(($event.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Color -->
      <div class="setting-item">
        <label class="setting-label">{{ t('settings.color') }}</label>
        <div class="color-picker-wrapper">
          <input
            type="color"
            class="color-picker"
            :value="modelValue.color"
            @input="updateSetting('color', ($event.target as HTMLInputElement).value)"
          />
          <span class="color-value">{{ modelValue.color }}</span>
        </div>
      </div>

      <!-- Position -->
      <div class="setting-item">
        <label class="setting-label">{{ t('settings.position') }}</label>
        <select
          class="select"
          :value="modelValue.position"
          @change="updateSetting('position', ($event.target as HTMLSelectElement).value)"
        >
          <option value="top-left">{{ t('positions.top-left') }}</option>
          <option value="top-right">{{ t('positions.top-right') }}</option>
          <option value="bottom-left">{{ t('positions.bottom-left') }}</option>
          <option value="bottom-right">{{ t('positions.bottom-right') }}</option>
          <option value="center">{{ t('positions.center') }}</option>
        </select>
      </div>

      <!-- Rotation -->
      <div class="setting-item">
        <label class="setting-label">
          {{ t('settings.rotation') }}: {{ modelValue.rotation }}°
        </label>
        <input
          type="range"
          class="slider"
          min="-45"
          max="45"
          :value="modelValue.rotation"
          @input="updateSetting('rotation', Number(($event.target as HTMLInputElement).value))"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import type { WatermarkSettings } from '../types'

const props = defineProps<{
  modelValue: WatermarkSettings
}>()

const emit = defineEmits<{
  'update:modelValue': [value: WatermarkSettings]
}>()

const { t } = useI18n()

const updateSetting = (key: keyof WatermarkSettings, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>

<style scoped>
.settings-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.settings-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.settings-grid {
  display: grid;
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setting-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.input:hover {
  border-color: var(--color-text-secondary);
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.1);
}

.input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  outline: none;
  transition: background 0.2s ease;
}

.slider:hover {
  background: rgba(var(--color-border-rgb), 1.2);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--color-accent);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-thumb:hover {
  background: var(--color-accent-hover);
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(var(--color-accent-rgb), 0.3);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: var(--color-accent);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb:hover {
  background: var(--color-accent-hover);
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(var(--color-accent-rgb), 0.3);
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.color-picker {
  width: 60px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
}

.color-value {
  font-size: 0.875rem;
  font-family: monospace;
  color: var(--color-text-secondary);
}

.select {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.select:hover {
  border-color: var(--color-text-secondary);
}

.select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.1);
}

@media (max-width: 639px) {
  .slider {
    height: 8px;
  }

  .slider::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
  }
}
</style>
