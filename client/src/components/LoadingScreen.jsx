import Logo from './Logo.jsx'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-canvas">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Logo size={32} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-bounce" />
        </div>
      </div>
    </div>
  )
}
