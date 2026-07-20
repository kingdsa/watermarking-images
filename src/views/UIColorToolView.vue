<template>
  <main class="ui-color-page">
    <div class="page-inner fade-in">
      <button class="back-link" @click="goHome">
        <Icon :icon="arrowLeftIcon" :width="16" :height="16" />
        {{ t('tools.backToTools') }}
      </button>
      <h2 class="page-title">{{ t('tools.uiColor.name') }}</h2>
      <p class="page-subtitle">{{ t('tools.uiColor.description') }}</p>

      <div class="tabs-bar" role="tablist">
        <button
          v-for="p in platforms"
          :key="p"
          class="tab-btn"
          :class="{ active: activePlatform === p }"
          role="tab"
          :aria-selected="activePlatform === p"
          @click="activePlatform = p"
        >
          <Icon
            :icon="p === 'mobile' ? smartphoneIcon : monitorIcon"
            :width="15"
            :height="15"
          />
          <span>{{ t(`uiColor.section${p === 'mobile' ? 'Mobile' : 'PC'}`) }}</span>
          <span class="tab-count">{{ schemes.length }}</span>
        </button>
      </div>

      <section class="scheme-section">
        <div class="schemes-grid" :key="activePlatform">
          <article
            v-for="(scheme, index) in schemes"
            :key="`${activePlatform}-${scheme.id}`"
            class="scheme-card fade-in"
            :style="{ animationDelay: `${0.04 + index * 0.05}s` }"
          >
            <div class="preview-wrap" :style="posterStyle(scheme)">
              <div class="poster-panel" :style="posterPanelStyle(scheme)">
                <div class="poster-strips">
                  <div
                    v-for="role in paletteRoles"
                    :key="role"
                    class="poster-swatch-column"
                  >
                    <span class="poster-strip" :style="posterStripStyle(scheme, role)"></span>
                    <span class="poster-hex" :style="posterHexStyle(scheme, role)">
                      {{ schemeColors(scheme)[role] }}
                    </span>
                  </div>
                </div>
                <div class="poster-gradients">
                  <span
                    v-for="(pair, dotIndex) in gradientPairs"
                    :key="dotIndex"
                    class="poster-gradient-dot"
                    :style="posterGradientDotStyle(scheme, pair)"
                  ></span>
                </div>
              </div>
            </div>

            <div class="palette">
              <button
                v-for="role in paletteRoles"
                :key="role"
                class="swatch"
                :class="{ copied: copiedKey === `${activePlatform}-${scheme.id}-${role}` }"
                :style="swatchStyle(scheme, role)"
                :title="t(`uiColor.schemeTags.${role}`)"
                @click="copyColor(scheme, role, `${activePlatform}-${scheme.id}-${role}`)"
              >
                <span class="swatch-hex">{{ schemeColors(scheme)[role] }}</span>
                <span class="swatch-tag">{{ t(`uiColor.schemeTags.${role}`) }}</span>
                <span v-if="copiedKey === `${activePlatform}-${scheme.id}-${role}`" class="swatch-copied">
                  <Icon :icon="checkIcon" :width="12" :height="12" />
                  {{ t('uiColor.copied') }}
                </span>
              </button>
            </div>

            <div class="card-desc">
              <div class="desc-head">
                <h4 class="desc-name">{{ t(`uiColor.schemes.${scheme.id}.name`) }}</h4>
                <span class="desc-tag" :style="descTagStyle(scheme)">
                  {{ t(activePlatform === 'mobile' ? 'uiColor.sectionMobile' : 'uiColor.sectionPC') }}
                </span>
              </div>
              <p class="desc-summary">{{ t(`uiColor.schemes.${scheme.id}.summary`) }}</p>
              <p class="desc-detail">{{ t(`uiColor.schemes.${scheme.id}.description`) }}</p>
              <p class="copy-hint">{{ t('uiColor.copyHint') }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import arrowLeftIcon from '@iconify-icons/lucide/arrow-left'
import checkIcon from '@iconify-icons/lucide/check'
import smartphoneIcon from '@iconify-icons/lucide/smartphone'
import monitorIcon from '@iconify-icons/lucide/monitor'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { t } = useI18n()
const { theme } = useTheme()

type SchemeRole = 'primary' | 'secondary' | 'accent' | 'background' | 'surface'
type GradientPair = [SchemeRole, SchemeRole]
interface SchemeColorSet {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  textPrimary: string
  textSecondary: string
  border: string
}
interface ColorScheme {
  id: string
  light: SchemeColorSet
  dark: SchemeColorSet
}

const schemes: ColorScheme[] = [
  {
    id: 'minimalPro',
    light: {
      primary: '#1E2227',
      secondary: '#6B7077',
      accent: '#3C5A78',
      background: '#F7F5F1',
      surface: '#FFFFFF',
      textPrimary: '#1E2227',
      textSecondary: '#6B7077',
      border: '#E7E3DA'
    },
    dark: {
      primary: '#E8E6E3',
      secondary: '#9BA1A6',
      accent: '#5B7FA1',
      background: '#1A1D21',
      surface: '#242830',
      textPrimary: '#E8E6E3',
      textSecondary: '#9BA1A6',
      border: '#363A42'
    }
  },
  {
    id: 'oceanTech',
    light: {
      primary: '#0284C7',
      secondary: '#0EA5E9',
      accent: '#06B6D4',
      background: '#F0F9FF',
      surface: '#FFFFFF',
      textPrimary: '#0C1E33',
      textSecondary: '#475569',
      border: '#BAE6FD'
    },
    dark: {
      primary: '#38BDF8',
      secondary: '#0EA5E9',
      accent: '#22D3EE',
      background: '#0B1220',
      surface: '#111C30',
      textPrimary: '#E0F2FE',
      textSecondary: '#94A3B8',
      border: '#1E3A5F'
    }
  },
  {
    id: 'vibrantWarmth',
    light: {
      primary: '#EA580C',
      secondary: '#F59E0B',
      accent: '#DC2626',
      background: '#FFF7ED',
      surface: '#FFFFFF',
      textPrimary: '#1F1311',
      textSecondary: '#78350F',
      border: '#FED7AA'
    },
    dark: {
      primary: '#FB923C',
      secondary: '#FBBF24',
      accent: '#F87171',
      background: '#1B0F0A',
      surface: '#2A1810',
      textPrimary: '#FFEDD5',
      textSecondary: '#D6A87A',
      border: '#3F2317'
    }
  },
  {
    id: 'forestNature',
    light: {
      primary: '#16A34A',
      secondary: '#65A30D',
      accent: '#059669',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      textPrimary: '#0F1F0E',
      textSecondary: '#4D7C0F',
      border: '#BBF7D0'
    },
    dark: {
      primary: '#4ADE80',
      secondary: '#A3E635',
      accent: '#34D399',
      background: '#0A1A0F',
      surface: '#102617',
      textPrimary: '#DCFCE7',
      textSecondary: '#86EFAC',
      border: '#1F3D27'
    }
  },
  {
    id: 'purpleDream',
    light: {
      primary: '#9333EA',
      secondary: '#EC4899',
      accent: '#8B5CF6',
      background: '#FDF4FF',
      surface: '#FFFFFF',
      textPrimary: '#1F0A2E',
      textSecondary: '#6B21A8',
      border: '#E9D5FF'
    },
    dark: {
      primary: '#C084FC',
      secondary: '#F472B6',
      accent: '#A78BFA',
      background: '#15082A',
      surface: '#20113C',
      textPrimary: '#F3E8FF',
      textSecondary: '#C4B5FD',
      border: '#312E5F'
    }
  }
]

const platforms: ('mobile' | 'pc')[] = ['mobile', 'pc']
const activePlatform = ref<'mobile' | 'pc'>('mobile')
const paletteRoles: SchemeRole[] = ['primary', 'secondary', 'accent', 'background', 'surface']
const gradientPairs: GradientPair[] = [
  ['primary', 'secondary'],
  ['secondary', 'accent'],
  ['accent', 'background'],
  ['background', 'surface'],
  ['surface', 'primary']
]

const copiedKey = ref<string>('')

const goHome = () => {
  router.push('/')
}

const schemeColors = (scheme: ColorScheme): SchemeColorSet => {
  return theme.value === 'dark' ? scheme.dark : scheme.light
}

const posterStyle = (scheme: ColorScheme) => {
  const colors = schemeColors(scheme)
  return {
    background: `
      radial-gradient(circle at 15% 85%, ${colors.surface}88 0, transparent 34%),
      radial-gradient(circle at 78% 18%, ${colors.accent}AA 0, transparent 42%),
      linear-gradient(145deg, ${colors.primary} 0%, ${colors.secondary} 36%, ${colors.background} 72%, ${colors.accent} 100%)
    `
  }
}

const posterPanelStyle = (scheme: ColorScheme) => {
  const colors = schemeColors(scheme)
  return {
    background: theme.value === 'dark' ? `${colors.surface}F0` : 'rgba(255, 255, 255, 0.92)',
    border: `1px solid ${theme.value === 'dark' ? colors.border : 'rgba(255, 255, 255, 0.66)'}`,
    boxShadow: `0 18px 34px ${colors.primary}26`
  }
}

const posterStripStyle = (scheme: ColorScheme, role: SchemeRole) => {
  const colors = schemeColors(scheme)
  return {
    background: colors[role],
    border: `1px solid ${colors.border}88`
  }
}

const posterHexStyle = (scheme: ColorScheme, role: SchemeRole) => {
  const colors = schemeColors(scheme)
  const mutedRole = role === 'background' || role === 'surface'
  return {
    color: mutedRole ? colors.textSecondary : colors[role]
  }
}

const posterGradientDotStyle = (scheme: ColorScheme, [from, to]: GradientPair) => {
  const colors = schemeColors(scheme)
  return {
    background: `linear-gradient(90deg, ${colors[from]} 0%, ${colors[to]} 100%)`,
    boxShadow: `inset 0 0 0 1px ${colors.border}80`
  }
}

const swatchStyle = (scheme: ColorScheme, role: SchemeRole) => {
  const color = schemeColors(scheme)[role]
  const isLight = ['background', 'surface'].includes(role) && theme.value === 'light'
  return {
    background: color,
    color: isLight ? schemeColors(scheme).textPrimary : '#fff',
    borderColor: schemeColors(scheme).border
  }
}

const descTagStyle = (scheme: ColorScheme) => ({
  background: `${schemeColors(scheme).primary}1A`,
  color: schemeColors(scheme).primary
})

const copyColor = (scheme: ColorScheme, role: SchemeRole, key: string) => {
  const value = schemeColors(scheme)[role]
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(value).catch(() => {})
  }
  copiedKey.value = key
  window.setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = ''
  }, 1200)
}
</script>

<style scoped>
.ui-color-page {
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

/* Tabs */
.tabs-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
}

.tab-btn:hover:not(.active) {
  color: var(--color-text-primary);
  background: rgba(var(--color-border-rgb), 0.4);
}

.tab-btn.active {
  color: #fff;
  background: var(--color-accent);
  box-shadow: 0 1px 3px rgba(var(--color-accent-rgb), 0.3);
}

.tab-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 0.6875rem;
  font-weight: 600;
  border-radius: 999px;
  background: rgba(var(--color-border-rgb), 0.8);
  color: var(--color-text-secondary);
}

.tab-btn.active .tab-count {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

/* Section */
.scheme-section {
  margin-bottom: 2rem;
}

/* Grid */
.schemes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Card */
.scheme-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.875rem;
  overflow: hidden;
  transition: transform 0.2s var(--ease-out),
              box-shadow 0.2s var(--ease-out),
              border-color 0.2s var(--ease-out);
}

.scheme-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

/* Preview area */
.preview-wrap {
  position: relative;
  padding: 1.625rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 368px;
  overflow: hidden;
}

.preview-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 36%, rgba(255, 255, 255, 0.14));
  pointer-events: none;
}

/* ============ Gradient poster preview ============ */
.poster-panel {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 278px;
  padding: 1rem 0.75rem 0.875rem;
  border-radius: 1rem;
  backdrop-filter: blur(6px);
}

.poster-strips {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
}

.poster-swatch-column {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
}

.poster-strip {
  width: 100%;
  min-width: 0;
  aspect-ratio: 1 / 2.92;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.poster-hex {
  width: 100%;
  font-size: 0.5rem;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.poster-gradients {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 0.625rem;
}

.poster-gradient-dot {
  aspect-ratio: 1;
  border-radius: 50%;
}

/* ============ Palette ============ */
.palette {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: var(--color-border);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.swatch {
  position: relative;
  background: transparent;
  border: none;
  padding: 0.625rem 0.25rem 0.75rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: transform 0.15s var(--ease-out);
  font-family: var(--font-sans);
  overflow: hidden;
}

.swatch:hover {
  transform: translateY(-2px);
}

.swatch:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
  z-index: 1;
}

.swatch-hex {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-family: var(--font-sans);
}

.swatch-tag {
  font-size: 0.5625rem;
  font-weight: 500;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.swatch-copied {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  backdrop-filter: blur(4px);
  animation: swatchCopied 0.2s var(--ease-out);
}

@keyframes swatchCopied {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ============ Description ============ */
.card-desc {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.desc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.desc-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

.desc-tag {
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.desc-summary {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.55;
}

.desc-detail {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  flex: 1;
}

.copy-hint {
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
  opacity: 0.7;
  margin-top: 0.25rem;
}

/* ============ Animations ============ */
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

/* ============ Responsive ============ */
@media (max-width: 768px) {
  .page-inner {
    padding: 1.5rem 1rem 3rem;
  }

  .page-title {
    font-size: 1.375rem;
  }

  .schemes-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .preview-wrap {
    padding: 1.375rem 1.25rem;
    min-height: 344px;
  }
}

</style>
