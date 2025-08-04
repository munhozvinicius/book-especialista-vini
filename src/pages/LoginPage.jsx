import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [cfg, setCfg] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('login_settings')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }) => setCfg(data))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    setLoading(false)
    if (error) setError(error.message)
    else window.location.href = '/'
  }

  if (!cfg) return null

  const bgStyle =
    cfg.background_type === 'image'
      ? { backgroundImage: `url(${cfg.background_value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : { background: `linear-gradient(180deg, ${cfg.background_value} 0%, #ffffff 100%)` }

  return (
    <div className="min-h-screen" style={bgStyle}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <header className="text-center space-y-2 mb-8">
          {cfg.logo_url && (
            <img
              src={cfg.logo_url}
              alt="Logo"
              className="mx-auto w-20 h-20 rounded-full ring-8"
              style={{ boxShadow: `0 0 0 8px ${cfg.accent_color}22` }}
            />
          )}
          <h1 className="text-3xl font-bold">{cfg.title}</h1>
          <p className="text-muted-foreground">{cfg.subtitle}</p>
        </header>

        <div className="grid gap-6">
          <section className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold">{cfg.welcome_title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{cfg.welcome_text}</p>
          </section>

          <section className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold">{cfg.form_title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{cfg.form_subtitle}</p>

            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="text-sm">Senha</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm" role="alert">
                  {error}
                </p>
              )}
              <button
                disabled={loading}
                className="w-full rounded-lg py-2 font-medium text-white"
                style={{ backgroundColor: cfg.accent_color, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Entrando…' : 'Entrar'}
              </button>

              {cfg.show_forgot && cfg.support_link && (
                <div className="text-right">
                  <a href={cfg.support_link} className="text-sm underline" target="_blank" rel="noreferrer">
                    Esqueci a senha / suporte
                  </a>
                </div>
              )}
            </form>
          </section>

          {cfg.footer_note && (
            <p className="text-center text-xs text-muted-foreground">{cfg.footer_note}</p>
          )}
        </div>
      </div>
    </div>
  )
}
