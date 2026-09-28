import { Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './layouts/AppLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx'
import SetupNotice from './components/SetupNotice.jsx'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Memories from './pages/Memories.jsx'
import UploadPage from './pages/Upload.jsx'
import Notes from './pages/Notes.jsx'
import VoiceNotes from './pages/VoiceNotes.jsx'
import SearchPage from './pages/Search.jsx'
import Chat from './pages/Chat.jsx'
import Archive from './pages/Archive.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

import { isSupabaseConfigured } from './lib/supabase.js'

export default function App() {
  if (!isSupabaseConfigured) return <SetupNotice />

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        element={
          <PublicOnlyRoute>
            <AuthLayout />
          </PublicOnlyRoute>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/voice-notes" element={<VoiceNotes />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
