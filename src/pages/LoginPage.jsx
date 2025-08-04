import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [cfg, setCfg] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('login_settings').select('*').limit(1).single()
      .then(({ data }) => setCfg(data))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email, password: pass
    })
    setLoading(false)
    if (error) setError(error.message)
    else window.location.href = '/'
  }

  if (!cfg) return null

  const bgStyle = cfg.background_type === 'image'
    ? { backgroundImage: `url(${cfg.background_value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: `linear-gradient(180deg, ${cfg.background_value} 0%, #ffffff 100%)` }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={bgStyle}>
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-6">
        {/* Lado de boas-vindas */}
        <section className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow">
          <div className="text-center space-y-3">
            {cfg.logo_url && (
              <img
                src={cfg.logo_url}
                alt="Logo"
                className="mx-auto w-16 h-16 rounded-full ring-4"
                style={{ boxShadow: `0 0 0 8px ${cfg.accent_color}22` }}
              />
            )}
            <h1 className="text-2xl font-bold">{cfg.title}</h1>
            <p className="text-sm text-gray-600">{cfg.subtitle}</p>
          </div>

          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">{cfg.welcome_title}</h2>
            <p className="text-sm text-gray-600">{cfg.welcome_text}</p>
          </div>
        </section>

        {/* Formulário */}
        <section className="bg-white/90 backdrop-blur border rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold">{cfg.form_title}</h3>
          <p className="text-sm text-gray-600 mb-4">{cfg.form_subtitle}</p>

          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                required placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="text-sm">Senha</label>
              <input
                type="password"
                value={pass}
                onChange={e=>setPass(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                required placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

            <button
              disabled={loading}
              className="w-full rounded-lg py-2 font-medium text-white"
              style={{ backgroundColor: cfg.accent_color, opacity: loading ? .7 : 1 }}
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          {cfg.show_forgot && cfg.support_link && (
            <a href={cfg.support_link} className="mt-3 inline-block text-sm text-gray-600 underline">
              Esqueci a senha / Suporte
            </a>
          )}

          {cfg.footer_note && (
            <p className="mt-4 text-center text-xs text-gray-500">{cfg.footer_note}</p>
          )}
        </section>
      </div>
    </div>
  )
}
