import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Files,
  Upload,
  StickyNote,
  Mic,
  Search,
  MessagesSquare,
  Archive,
  UserCircle2,
  LogOut,
} from 'lucide-react'
import Logo from '../Logo.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/memories', label: 'Memories', icon: Files },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/notes', label: 'Notes', icon: StickyNote },
  { to: '/voice-notes', label: 'Voice Notes', icon: Mic },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/chat', label: 'AI Chat', icon: MessagesSquare },
  { to: '/archive', label: 'Archive', icon: Archive },
]

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const displayName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Signed in'

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-surface border-r border-line flex flex-col">
      {/* Brand */}
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-line">
        <Logo size={26} />
        <span className="font-semibold text-ink tracking-tight">MemSphere</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-brand/10 text-brand font-medium'
                  : 'text-muted hover:text-ink hover:bg-canvas',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-brand" />
                )}
                <Icon size={18} strokeWidth={2} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="border-t border-line p-3 space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            [
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              isActive
                ? 'bg-brand/10 text-brand font-medium'
                : 'text-muted hover:text-ink hover:bg-canvas',
            ].join(' ')
          }
        >
          <UserCircle2 size={18} />
          <div className="flex-1 min-w-0">
            <div className="truncate text-ink text-sm">{displayName}</div>
            <div className="truncate text-xs text-muted">{user?.email}</div>
          </div>
        </NavLink>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-danger hover:bg-canvas transition-colors"
        >
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
