<template>
  <div class="about-page fade-in">
    <div class="about-card">
      <h1 class="about-title">{{ t('app.title') }}</h1>
      <p class="about-subtitle">{{ t('app.subtitle') }}</p>

      <section class="about-section">
        <h2 class="section-heading">{{ t('about.features') }}</h2>
        <ul class="feature-list">
          <li>{{ t('about.feature1') }}</li>
          <li>{{ t('about.feature2') }}</li>
          <li>{{ t('about.feature3') }}</li>
          <li>{{ t('about.feature4') }}</li>
        </ul>
      </section>

      <section class="about-section">
        <h2 class="section-heading">{{ t('about.privacy') }}</h2>
        <p class="section-text">{{ t('about.privacyText') }}</p>
      </section>

      <div class="about-actions">
        <router-link to="/" class="btn-primary">{{ t('about.backHome') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.about-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.about-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.about-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.about-subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.about-section {
  margin-bottom: 2rem;
}

.section-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.section-text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.about-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
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

@media (max-width: 639px) {
  .about-card {
    padding: 1.5rem;
  }

  .about-title {
    font-size: 1.5rem;
  }
}
</style>
