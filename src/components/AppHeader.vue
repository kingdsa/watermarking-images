<template>
  <header class="header">
    <div class="header-content">
      <div class="header-brand">
        <router-link to="/" class="header-brand-link">
          <span class="header-brand-icon">
            <Icon :icon="layoutGridIcon" :width="22" :height="22" />
          </span>
          <h1 class="header-title">{{ t('site.title') }}</h1>
        </router-link>
        <nav class="header-nav">
          <router-link to="/" class="nav-link" exact-active-class="active">{{ t('nav.home') }}</router-link>
          <router-link to="/about" class="nav-link" active-class="active">{{ t('nav.about') }}</router-link>
        </nav>
      </div>

      <div class="header-controls">
        <!-- Online Users Counter -->
        <div class="online-counter">
          <Icon :icon="targetIcon" :width="16" :height="16" />
          <span class="online-count">{{ onlineCount }}</span>
          <span class="online-label">{{ t('header.onlineUsers') }}</span>
        </div>

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
          <Icon :icon="githubIcon" :width="24" :height="24" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import layoutGridIcon from '@iconify-icons/lucide/layout-grid'
import targetIcon from '@iconify-icons/lucide/target'
import githubIcon from '@iconify-icons/simple-icons/github'
import { useI18n } from '../composables/useI18n'
import { useTheme } from '../composables/useTheme'
import { useOnlineUsers } from '../composables/useOnlineUsers'
import type { Locale } from '../types'

const { t, locale, setLocale } = useI18n()
const { theme, toggleTheme } = useTheme()
const { onlineCount } = useOnlineUsers()

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

.header-brand {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-brand-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}

.header-brand-link:hover {
  opacity: 0.8;
}

.header-brand-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 0.375rem;
}

.header-brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(var(--color-accent-rgb), 0.1);
  color: var(--color-accent);
  border-radius: 0.5rem;
}

.header-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.header-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-background);
}

.nav-link.active {
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.08);
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

.online-counter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.online-counter svg {
  color: #22c55e;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.online-count {
  font-weight: 600;
  color: var(--color-text-primary);
  min-width: 1.5rem;
  text-align: center;
}

.online-label {
  color: var(--color-text-secondary);
  white-space: nowrap;
}

@media (max-width: 639px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-brand {
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .header-nav {
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.8125rem;
  }

  .header-controls {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .control-label {
    display: none;
  }

  .online-counter {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}
</style>
