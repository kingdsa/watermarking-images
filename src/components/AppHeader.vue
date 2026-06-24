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

        <!-- GitHub Link -->
        <a
          href="https://github.com/kingdsa/watermarking-images"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          aria-label="View source on GitHub"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </a>
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

.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  padding: 0.25rem;
  border-radius: 0.375rem;
}

.github-link:hover {
  color: var(--color-text-primary);
  background: var(--color-background);
}

.github-link:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.2);
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
