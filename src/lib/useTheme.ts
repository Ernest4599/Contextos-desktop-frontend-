import { useEffect, useState } from 'react'

export type ThemeOption = 'dark' | 'light' | 'system'

function getSystemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(theme: ThemeOption) {
  const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark())
  document.documentElement.classList.toggle('dark', isDark)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeOption>(
    (localStorage.getItem('contextos_theme') as ThemeOption) || 'light'
  )

  useEffect(() => {
    applyTheme(theme)

    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  const setTheme = (newTheme: ThemeOption) => {
    localStorage.setItem('contextos_theme', newTheme)
    setThemeState(newTheme)
  }

  return { theme, setTheme }
}
