export type Theme = 'light' | 'dark'

export function getTheme(): Theme {
  return (localStorage.getItem('app3_theme') as Theme) ?? 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('app3_theme', theme)
}
