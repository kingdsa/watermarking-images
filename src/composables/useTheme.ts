import { ref, onMounted } from 'vue'

const theme = ref<'light' | 'dark'>((localStorage.getItem('theme') as 'light' | 'dark') || 'light')

export function useTheme() {
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
  })

  return {
    theme,
    setTheme,
    toggleTheme
  }
}
