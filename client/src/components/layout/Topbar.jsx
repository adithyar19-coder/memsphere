import { useLocation } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'

const TITLES = {
  '/dashboard': 'Dashboard',
  '/memories': 'Memories',
  '/upload': 'Upload',
  '/notes': 'Notes',
  '/voice-notes': 'Voice Notes',
  '/search': 'Search',
  '/chat': 'AI Chat',
  '/archive': 'Archive',
  '/profile': 'Profile',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  const title = TITLES[pathname] ?? 'MemSphere'

  return (
    <header className="sticky top-0 z-20 h-16 bg-canvas/80 backdrop-blur border-b border-line">
      <div className="h-full flex items-center justify-between px-8">
        <div>
          <h1 className="text-lg font-semibold text-ink tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="h-9 w-9 grid place-items-center rounded-lg border border-line bg-surface text-muted hover:text-ink transition-colors"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  )
}
