<template>
  <header class="header">
    <div class="header-content">
      <div class="header-brand">
        <h1 class="header-title">{{ t('app.title') }}</h1>
      </div>

      <div class="header-controls">
        <!-- Language Switcher -->
        <div class="control-group">
          <label class="control-label">{{ t('header.language') }}</label>
          <select
            class="select"
            :value="locale"
            @change="handleLocaleChange"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        <!-- Theme Toggle -->
        <div class="control-group">
          <label class="control-label">{{ t('header.darkMode') }}</label>
          <label class="toggle">
            <input
              type="checkbox"
              :checked="theme === 'dark'"
              @change="toggleTheme"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import { useTheme } from '../composables/useTheme'
import type { Locale } from '../types'

const { t, locale, setLocale } = useI18n()
const { theme, toggleTheme } = useTheme()

const handleLocaleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  setLocale(target.value as Locale)
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.header-controls {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.select {
  padding: 0.375rem 0.625rem;
  font-size: 0.875rem;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
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

.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-border);
  border-radius: 24px;
  transition: all 0.3s ease;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.toggle input:checked + .toggle-slider {
  background: var(--color-accent);
}

.toggle input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.toggle input:focus + .toggle-slider {
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.2);
}

.toggle:hover .toggle-slider {
  opacity: 0.9;
}

@media (max-width: 639px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-controls {
    width: 100%;
    justify-content: space-between;
  }

  .control-label {
    display: none;
  }
}
</style>
