import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useSession();

  if (loading) return <p>Carregando...</p>;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
