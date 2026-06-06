import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title: string
  search: string
  onSearch: (value: string) => void
}

export function Header({ title, search, onSearch }: HeaderProps) {
  return (
    <div className="flex h-14 items-center justify-between border-b bg-card px-4">
      <h1 className="text-base font-semibold">{title}</h1>
      <div className="relative w-72">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  )
}
