<template>
  <div class="not-found fade-in">
    <div class="not-found-code">404</div>
    <p class="not-found-text">{{ t('notFound.message') }}</p>
    <router-link to="/" class="btn-primary">{{ t('notFound.backHome') }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.not-found {
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.not-found-code {
  font-size: 6rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 1rem;
}

.not-found-text {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: #FFFFFF;
  background: var(--color-accent);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 4px 8px rgba(var(--color-accent-rgb), 0.2);
  transform: translateY(-1px);
}

.fade-in {
  animation: fadeIn 0.4s var(--ease-out) forwards;
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
</style>
