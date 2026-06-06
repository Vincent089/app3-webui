import { NavLink } from 'react-router-dom'
import { Network, Globe, ShieldAlert, Server, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'VLANs', path: '/vlans', Icon: Network },
  { label: 'VRFs', path: '/vrfs', Icon: Globe },
  { label: 'VLAN Restrictions', path: '/vlanrestrictions', Icon: ShieldAlert },
  { label: 'Cores', path: '/cores', Icon: Server },
  { label: 'ASNs', path: '/asns', Icon: Hash },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-base font-semibold tracking-tight">App3</span>
      </div>
      <nav className="flex flex-col gap-0.5 p-2">
        {NAV_ITEMS.map(({ label, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
