<template>
  <main class="ui-templates-page">
    <div class="page-inner fade-in">
      <button class="back-link" @click="goHome">
        <Icon :icon="arrowLeftIcon" :width="16" :height="16" />
        {{ t('tools.backToTools') }}
      </button>
      <h2 class="page-title">{{ t('tools.uiTemplates.name') }}</h2>
      <p class="page-subtitle">{{ t('tools.uiTemplates.description') }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import arrowLeftIcon from '@iconify-icons/lucide/arrow-left'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const { t } = useI18n()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.ui-templates-page {
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  background: var(--color-background);
}

.page-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
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
  transition: all 0.2s var(--ease-out);
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

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.fade-in {
  animation: fadeIn 0.4s var(--ease-out) backwards;
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

@media (max-width: 768px) {
  .page-inner {
    padding: 1.5rem 1rem 3rem;
  }

  .page-title {
    font-size: 1.375rem;
  }
}
</style>
