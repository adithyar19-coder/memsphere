import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="pl-60">
        <Topbar />
        <main className="px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
