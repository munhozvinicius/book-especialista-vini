import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import LoginPage from '@/pages/LoginPage'
import AdminLoginAppearance from '@/pages/admin/AdminLoginAppearance'
import Dashboard from '@/pages/Dashboard'

function ProtectedRoute({ session, children }) {
  if (session === undefined) return null // enquanto checa sessão
  if (!session) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = carregando

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => setSession(sess))
    return () => sub.subscription.unsubscribe()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/aparencia/login" element={<AdminLoginAppearance />} />
      <Route
        path="/"
        element={
          <ProtectedRoute session={session}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
