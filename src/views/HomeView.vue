<template>
  <div class="home-page fade-in">
    <section class="hero">
      <div class="hero-eyebrow">
        <span class="dot"></span>
        <span>{{ t('home.eyebrow') }}</span>
      </div>
      <h1 class="hero-title">{{ t('home.title') }}</h1>
      <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
    </section>

    <section class="tools-section">
      <div class="tools-grid">
        <component
          :is="tool.available ? 'router-link' : 'div'"
          v-for="(tool, index) in tools"
          :key="tool.id"
          :to="tool.available ? tool.to : undefined"
          class="tool-card fade-in"
          :class="{ 'is-disabled': !tool.available }"
          :style="{ animationDelay: `${0.1 + index * 0.08}s` }"
        >
          <div class="tool-card-header">
            <div class="tool-icon">
              <Icon :icon="toolIcons[tool.icon]" />
            </div>
            <span v-if="tool.badgeKey" class="tool-badge">{{ t(tool.badgeKey) }}</span>
          </div>

          <div class="tool-card-body">
            <h2 class="tool-name">{{ t(tool.nameKey) }}</h2>
            <p class="tool-desc">{{ t(tool.descriptionKey) }}</p>
          </div>

          <div class="tool-card-footer">
            <span class="tool-action">
              {{ tool.available ? t('home.enter') : t('home.stayTuned') }}
            </span>
            <Icon class="tool-arrow" :icon="arrowRightIcon" :width="18" :height="18" />
          </div>
        </component>
      </div>
    </section>

    <footer class="home-footer">
      <p>{{ t('home.footerHint') }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import arrowRightIcon from '@iconify-icons/lucide/arrow-right'
import { useI18n } from '../composables/useI18n'
import { tools, toolIcons } from '../config/tools'

const { t } = useI18n()
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 70px auto 0;
  padding: 2.5rem 1.5rem 3rem;
}

/* Hero */
.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: rgba(var(--color-accent-rgb), 0.08);
  border: 1px solid rgba(var(--color-accent-rgb), 0.18);
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.hero-eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.2);
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(
    180deg,
    var(--color-text-primary) 0%,
    var(--color-text-secondary) 130%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.65;
}

/* Tools Grid */
.tools-section {
  margin-bottom: 3rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Tool Card */
.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.875rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s var(--ease-out),
              box-shadow 0.2s var(--ease-out),
              border-color 0.2s var(--ease-out);
  cursor: pointer;
  min-height: 220px;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), transparent);
  opacity: 0;
  transition: opacity 0.2s var(--ease-out);
}

.tool-card:hover:not(.is-disabled) {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.tool-card:hover:not(.is-disabled)::before {
  opacity: 1;
}

.tool-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.tool-card.is-disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.tool-card.is-disabled .tool-icon {
  background: rgba(var(--color-border-rgb), 0.4);
  color: var(--color-text-secondary);
}

.tool-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.tool-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--color-accent-rgb), 0.1);
  color: var(--color-accent);
  border-radius: 0.75rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.tool-icon :deep(svg) {
  width: 26px;
  height: 26px;
}

.tool-card:hover:not(.is-disabled) .tool-icon {
  background: var(--color-accent);
  color: #ffffff;
}

.tool-badge {
  flex-shrink: 0;
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-text-secondary);
  background: rgba(var(--color-border-rgb), 0.6);
  border-radius: 999px;
  text-transform: uppercase;
}

.tool-card-body {
  flex: 1;
}

.tool-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.375rem;
  letter-spacing: -0.01em;
}

.tool-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.tool-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.tool-action {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.01em;
}

.tool-card.is-disabled .tool-action {
  color: var(--color-text-secondary);
}

.tool-arrow {
  color: var(--color-accent);
  transition: transform 0.2s var(--ease-out);
}

.tool-card.is-disabled .tool-arrow {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

.tool-card:hover:not(.is-disabled) .tool-arrow {
  transform: translateX(4px);
}

/* Footer */
.home-footer {
  text-align: center;
  padding: 2rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
  margin-top: 3rem;
}

/* Animations */
.fade-in {
  animation: fadeIn 0.4s var(--ease-out) backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .home-page {
    padding: 1.5rem 1.25rem 2rem;
  }

  .hero {
    margin-bottom: 2.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .tool-card {
    min-height: 0;
    padding: 1.25rem;
  }
}

@media (max-width: 639px) {
  .hero-eyebrow {
    font-size: 0.75rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }
}
</style>
