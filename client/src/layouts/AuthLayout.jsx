import { Outlet } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function AuthLayout() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Top bar */}
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="font-semibold text-ink tracking-tight">MemSphere</span>
        </div>
        <button
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="h-9 w-9 grid place-items-center rounded-lg border border-line bg-surface text-muted hover:text-ink transition-colors"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>

      {/* Centered card */}
      <div className="flex-1 grid place-items-center px-6 pb-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-muted">
        A final-year project · Personal memory, ranked and recalled.
      </footer>
    </div>
  )
}
