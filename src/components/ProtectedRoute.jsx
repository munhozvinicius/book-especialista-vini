// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data?.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) return null; // opcional: retornar um spinner
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
