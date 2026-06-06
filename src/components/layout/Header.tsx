import { useState } from 'react'
import { Search, Sun, Moon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTheme, applyTheme, type Theme } from '@/lib/theme'

interface HeaderProps {
  title: string
  search: string
  onSearch: (value: string) => void
}

export function Header({ title, search, onSearch }: HeaderProps) {
  const [theme, setTheme] = useState<Theme>(getTheme)

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    applyTheme(next)
    setTheme(next)
  }

  return (
    <div className="flex h-14 items-center justify-between border-b bg-card px-4">
      <h1 className="text-base font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
