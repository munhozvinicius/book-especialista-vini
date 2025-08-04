import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminLoginAppearance from './pages/admin/AdminLoginAppearance.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/aparencia/login" element={<AdminLoginAppearance />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
