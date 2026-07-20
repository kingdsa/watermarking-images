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
            <div class="preview-wrap" :style="previewStyle(scheme)">
              <!-- Mobile preview -->
              <div v-if="activePlatform === 'mobile'" class="phone-mock" :style="mockWrapStyle(scheme)">
                <div class="phone-notch" :style="{ background: schemeColors(scheme).primary }"></div>
                <div class="phone-screen" :style="screenStyle(scheme)">
                  <div class="phone-statusbar" :style="statusbarStyle(scheme)">
                    <span class="phone-time">9:41</span>
                    <span class="phone-dots">
                      <i></i><i></i><i></i>
                    </span>
                  </div>
                  <div class="phone-header" :style="headerStyle(scheme)">
                    <span class="phone-title">{{ t(`uiColor.schemes.${scheme.id}.name`) }}</span>
                    <span class="phone-avatar" :style="{ background: schemeColors(scheme).accent }"></span>
                  </div>
                  <div class="phone-card" :style="cardStyle(scheme, 0)">
                    <span class="phone-card-label" :style="{ color: schemeColors(scheme).textSecondary }">Balance</span>
                    <span class="phone-card-value" :style="{ color: schemeColors(scheme).textPrimary }">¥ 8,420</span>
                    <span class="phone-card-tag" :style="tagStyle(scheme, schemeColors(scheme).primary)">+12.4%</span>
                  </div>
                  <div class="phone-list">
                    <div v-for="n in 3" :key="n" class="phone-list-row" :style="listRowStyle(scheme, n - 1)">
                      <span class="row-dot" :style="{ background: [schemeColors(scheme).primary, schemeColors(scheme).secondary, schemeColors(scheme).accent][n - 1] }"></span>
                      <span class="row-bar" :style="rowBarStyle(scheme)"></span>
                      <span class="row-bar short" :style="rowBarStyle(scheme, 0.6)"></span>
                    </div>
                  </div>
                  <div class="phone-fab" :style="fabStyle(scheme)">
                    <Icon :icon="plusIcon" :width="18" :height="18" />
                  </div>
                </div>
              </div>

              <!-- PC preview -->
              <div v-else class="browser-mock" :style="mockWrapStyle(scheme)">
                <div class="browser-bar" :style="browserBarStyle(scheme)">
                  <span class="browser-dot" :style="{ background: '#FF5F57' }"></span>
                  <span class="browser-dot" :style="{ background: '#FEBC2E' }"></span>
                  <span class="browser-dot" :style="{ background: '#28C840' }"></span>
                  <span class="browser-url" :style="urlBarStyle(scheme)">app.{{ scheme.id }}.com</span>
                </div>
                <div class="browser-body" :style="screenStyle(scheme)">
                  <aside class="browser-sidebar" :style="sidebarStyle(scheme)">
                    <span class="sb-logo" :style="{ background: schemeColors(scheme).primary }"></span>
                    <span v-for="n in 4" :key="n" class="sb-item" :style="sbItemStyle(scheme, n - 1)"></span>
                  </aside>
                  <main class="browser-main">
                    <header class="browser-header" :style="headerStyle(scheme)">
                      <span class="browser-title" :style="{ color: schemeColors(scheme).textPrimary }">{{ t(`uiColor.schemes.${scheme.id}.name`) }}</span>
                      <span class="browser-search" :style="searchStyle(scheme)"></span>
                      <span class="browser-avatar" :style="{ background: schemeColors(scheme).accent }"></span>
                    </header>
                    <div class="browser-stats">
                      <div v-for="n in 3" :key="n" class="stat-card" :style="cardStyle(scheme, n - 1)">
                        <span class="stat-label" :style="{ color: schemeColors(scheme).textSecondary }">Metric {{ n }}</span>
                        <span class="stat-value" :style="{ color: schemeColors(scheme).textPrimary }">{{ ['24.8K', '92.1%', '1,284'][n - 1] }}</span>
                        <span class="stat-bar" :style="statBarStyle(scheme, n - 1)"></span>
                      </div>
                    </div>
                    <div class="browser-chart" :style="chartStyle(scheme)">
                      <div
                        v-for="(h, i) in [40, 65, 35, 80, 55, 90, 48]"
                        :key="i"
                        class="chart-bar"
                        :style="chartBarStyle(scheme, h, i)"
                      ></div>
                    </div>
                  </main>
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
                <span class="desc-tag" :style="descTagStyle(scheme)">{{ activePlatform === 'mobile' ? 'Mobile' : 'Desktop' }}</span>
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
import plusIcon from '@iconify-icons/lucide/plus'
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

const copiedKey = ref<string>('')

const goHome = () => {
  router.push('/')
}

const schemeColors = (scheme: ColorScheme): SchemeColorSet => {
  return theme.value === 'dark' ? scheme.dark : scheme.light
}

const previewStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).background
})

const mockWrapStyle = (scheme: ColorScheme) => ({
  '--mc-primary': schemeColors(scheme).primary,
  '--mc-secondary': schemeColors(scheme).secondary,
  '--mc-accent': schemeColors(scheme).accent,
  '--mc-bg': schemeColors(scheme).background,
  '--mc-surface': schemeColors(scheme).surface,
  '--mc-text': schemeColors(scheme).textPrimary,
  '--mc-text-2': schemeColors(scheme).textSecondary,
  '--mc-border': schemeColors(scheme).border
})

const screenStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).background
})

const statusbarStyle = (scheme: ColorScheme) => ({
  color: schemeColors(scheme).textSecondary,
  background: schemeColors(scheme).surface,
  borderBottom: `1px solid ${schemeColors(scheme).border}`
})

const headerStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).surface,
  borderBottom: `1px solid ${schemeColors(scheme).border}`
})

const cardStyle = (scheme: ColorScheme, index: number) => ({
  background: schemeColors(scheme).surface,
  border: `1px solid ${schemeColors(scheme).border}`,
  boxShadow: index === 0 ? `0 6px 16px ${schemeColors(scheme).primary}22` : 'none'
})

const tagStyle = (_scheme: ColorScheme, color: string) => ({
  background: `${color}1A`,
  color
})

const listRowStyle = (scheme: ColorScheme, index: number) => ({
  background: index % 2 === 0 ? schemeColors(scheme).surface : 'transparent',
  borderBottom: `1px solid ${schemeColors(scheme).border}`
})

const rowBarStyle = (scheme: ColorScheme, opacity = 1) => ({
  background: schemeColors(scheme).textSecondary,
  opacity: opacity * (theme.value === 'dark' ? 0.6 : 1)
})

const fabStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).primary,
  boxShadow: `0 6px 14px ${schemeColors(scheme).primary}55`
})

const browserBarStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).surface,
  borderBottom: `1px solid ${schemeColors(scheme).border}`
})

const urlBarStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).background,
  color: schemeColors(scheme).textSecondary,
  border: `1px solid ${schemeColors(scheme).border}`
})

const sidebarStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).surface,
  borderRight: `1px solid ${schemeColors(scheme).border}`
})

const sbItemStyle = (scheme: ColorScheme, index: number) => ({
  background: index === 0 ? schemeColors(scheme).primary : schemeColors(scheme).border,
  opacity: index === 0 ? 1 : 0.7
})

const searchStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).background,
  border: `1px solid ${schemeColors(scheme).border}`
})

const statBarStyle = (scheme: ColorScheme, index: number) => ({
  background: [
    schemeColors(scheme).primary,
    schemeColors(scheme).secondary,
    schemeColors(scheme).accent
  ][index]
})

const chartStyle = (scheme: ColorScheme) => ({
  background: schemeColors(scheme).surface,
  border: `1px solid ${schemeColors(scheme).border}`
})

const chartBarStyle = (scheme: ColorScheme, height: number, index: number) => ({
  height: `${height}%`,
  background: index % 2 === 0 ? schemeColors(scheme).primary : schemeColors(scheme).accent,
  opacity: 0.85
})

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
  padding: 1.5rem 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  overflow: hidden;
}

.preview-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.06), transparent 60%);
  pointer-events: none;
}

/* ============ Mobile mockup ============ */
.phone-mock {
  position: relative;
  width: 168px;
  height: 320px;
  border-radius: 28px;
  background: #0F1115;
  padding: 8px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.12);
}

.phone-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 14px;
  border-radius: 0 0 12px 12px;
  z-index: 2;
  opacity: 0.85;
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.phone-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px 4px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.phone-dots {
  display: inline-flex;
  gap: 2px;
}

.phone-dots i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.phone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px 10px;
}

.phone-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--mc-text);
}

.phone-avatar {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.phone-card {
  margin: 0 10px 10px;
  padding: 10px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.phone-card-label {
  font-size: 8px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.phone-card-value {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.phone-card-tag {
  align-self: flex-start;
  font-size: 8px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
}

.phone-list {
  flex: 1;
  margin: 0 10px;
  border-radius: 12px;
  overflow: hidden;
}

.phone-list-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
}

.row-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.row-bar {
  flex: 1;
  height: 4px;
  border-radius: 2px;
}

.row-bar.short {
  flex: 0 0 28px;
}

.phone-fab {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* ============ PC / Browser mockup ============ */
.browser-mock {
  width: 100%;
  max-width: 380px;
  border-radius: 10px;
  overflow: hidden;
  background: #0F1115;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.12);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
}

.browser-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.browser-url {
  flex: 1;
  margin-left: 8px;
  padding: 3px 10px;
  font-size: 9px;
  font-weight: 500;
  border-radius: 999px;
  text-align: center;
}

.browser-body {
  display: flex;
  height: 220px;
}

.browser-sidebar {
  width: 44px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.sb-logo {
  width: 20px;
  height: 20px;
  border-radius: 6px;
}

.sb-item {
  width: 20px;
  height: 20px;
  border-radius: 6px;
}

.browser-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}

.browser-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
}

.browser-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.browser-search {
  flex: 1;
  height: 14px;
  border-radius: 4px;
}

.browser-avatar {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.browser-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.stat-card {
  padding: 6px 8px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-label {
  font-size: 7px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-value {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.stat-bar {
  height: 3px;
  border-radius: 2px;
  margin-top: 2px;
  opacity: 0.85;
}

.browser-chart {
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.chart-bar {
  flex: 1;
  border-radius: 3px 3px 0 0;
  min-height: 4px;
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
    padding: 1.25rem 1rem 1rem;
    min-height: 240px;
  }
}

@media (max-width: 480px) {
  .phone-mock {
    width: 150px;
    height: 290px;
  }

  .browser-body {
    height: 180px;
  }
}
</style>
