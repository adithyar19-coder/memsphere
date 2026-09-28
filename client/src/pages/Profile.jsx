import { useState } from 'react'
import { Moon, Sun, Trash2, Monitor, Save, KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs.jsx'
import { Modal } from '../components/ui/Modal.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { cn } from '../utils/cn.js'

export default function Profile() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState(user?.user_metadata?.full_name || '')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <p className="text-sm text-muted">Your account</p>
        <h2 className="mt-0.5 text-2xl font-semibold text-ink tracking-tight">Profile</h2>
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="danger">Danger zone</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="card p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-brand/10 text-brand grid place-items-center text-lg font-semibold">
                {(name || user?.email || '?').slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="text-base font-medium text-ink">{name || 'Add your name'}</div>
                <div className="text-sm text-muted">{user?.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
              <div>
                <label className="label">Full name</label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input opacity-70" value={user?.email || ''} disabled />
                <p className="mt-1 text-xs text-muted">
                  Email is managed by your Supabase account.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
              <button
                className="btn-secondary"
                onClick={() =>
                  toast.info('Password reset', { description: 'This lands in M6 — sends a reset link via Supabase.' })
                }
              >
                <KeyRound size={14} /> Change password
              </button>
              <button
                className="btn-primary"
                onClick={() => toast.success('Profile updated (mock)')}
              >
                <Save size={14} /> Save changes
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-ink">Theme</h3>
            <p className="text-xs text-muted mt-0.5">
              Choose how MemSphere looks on this device.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: 'light', label: 'Light', icon: Sun },
                { k: 'dark', label: 'Dark', icon: Moon },
                { k: 'system', label: 'System', icon: Monitor },
              ].map(({ k, label, icon: Icon }) => (
                <button
                  key={k}
                  onClick={() => {
                    if (k === 'system') {
                      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                      setTheme(prefersDark ? 'dark' : 'light')
                    } else {
                      setTheme(k)
                    }
                  }}
                  className={cn(
                    'group border rounded-lg p-4 text-center transition-colors',
                    (k === theme || (k === 'system' && false))
                      ? 'border-brand bg-brand/5'
                      : 'border-line hover:border-brand/40 hover:bg-canvas/50',
                  )}
                >
                  <div className="mx-auto h-9 w-9 grid place-items-center rounded-lg bg-canvas text-ink group-hover:text-brand transition-colors">
                    <Icon size={17} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-ink">{label}</div>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="danger">
          <div className="card p-6 border-danger/20">
            <h3 className="text-sm font-semibold text-danger">Delete account</h3>
            <p className="text-sm text-muted mt-1">
              Permanently deletes your account, all your memories, and all your files from storage.
              This cannot be undone.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="btn bg-danger text-white hover:brightness-110"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 size={14} /> Delete my account
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Modal
        open={confirmDelete}
        onOpenChange={(v) => { setConfirmDelete(v); if (!v) setConfirmText('') }}
        title="Delete your account?"
        description="This will permanently remove your account and all data. There's no undo."
        footer={
          <>
            <button className="btn-secondary" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
            <button
              disabled={confirmText !== 'DELETE'}
              onClick={() => {
                setConfirmDelete(false)
                toast.error('Account deletion is disabled in this preview')
                signOut()
              }}
              className="btn bg-danger text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={14} /> Delete permanently
            </button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Type <span className="text-ink font-semibold">DELETE</span> to confirm.
        </p>
        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="input mt-3"
          placeholder="DELETE"
        />
      </Modal>
    </div>
  )
}
