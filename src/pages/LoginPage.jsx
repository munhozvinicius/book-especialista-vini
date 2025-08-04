import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [cfg, setCfg] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // carrega as configurações da tabela login_settings (1 linha)
  useEffect(() => {
    supabase
      .from('login_settings')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }) => setCfg(data || {
        title: 'Plataforma do Vini',
        subtitle: 'Central Comercial',
        welcome_title: 'Bem‑vindo de volta!',
        welcome_text: 'Acesse sua conta para continuar.',
        form_title: 'Fazer Login',
        form_subtitle: 'Digite suas credenciais para entrar.',
        accent_color: '#6D28D9',
        logo_url: '',
        background_type: 'color',
        background_value: '#F8F7FC',
        show_forgot: false,
        support_link: '',
        footer_note: ''
      }))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass
    })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    // sucesso → manda pra home (ajuste se quiser outra rota)
    window.location.href = '/'
  }

  // “splash” enxuto enquanto carrega config
  if (!cfg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F5F3FF]">
        <div className="animate-pulse text-sm text-gray-500">Carregando…</div>
      </div>
    )
  }

  // plano de fundo dinâmico (cor ou imagem)
  const bgStyle =
    cfg.background_type === 'image'
      ? {
          backgroundImage: `url(${cfg.background_value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      : { background: `linear-gradient(180deg, ${cfg.background_value} 0%, #ffffff 100%)` }

  const accent = cfg.accent_color || '#6D28D9'

  return (
    <div className="min-h-screen" style={bgStyle}>
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Cabeçalho / Identidade */}
        <header className="text-center space-y-3 mb-8">
          {cfg.logo_url ? (
            <img
              src={cfg.logo_url}
              alt="Logo"
              className="mx-auto h-16 w-16 rounded-full ring-8"
              style={{ boxShadow: `0 0 0 8px ${accent}22` }}
            />
          ) : null}

          <h1 className="text-3xl font-bold tracking-tight">{cfg.title}</h1>
          <p className="text-gray-500">{cfg.subtitle}</p>
        </header>

        {/* Grade com 2 cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card de boas-vindas */}
          <section className="rounded-2xl border bg-white/90 backdrop-blur p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{cfg.welcome_title}</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {cfg.welcome_text}
            </p>

            {cfg.support_link ? (
              <a
                href={cfg.support_link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-medium underline"
                style={{ color: accent }}
              >
                Precisa de ajuda?
              </a>
            ) : null}
          </section>

          {/* Card do formulário */}
          <section className="rounded-2xl border bg-white/90 backdrop-blur p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{cfg.form_title}</h3>
            <p className="mb-4 text-sm text-gray-600">{cfg.form_subtitle}</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
                  style={{ borderColor: '#e5e7eb', boxShadow: `0 0 0 0 rgba(0,0,0,0)`, }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}33`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Senha</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
                  style={{ borderColor: '#e5e7eb', boxShadow: `0 0 0 0 rgba(0,0,0,0)` }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}33`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>

              {cfg.show_forgot ? (
                <div className="text-right">
                  <a
                    href="#"
                    className="text-xs font-medium underline"
                    style={{ color: accent }}
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Recuperação de senha requer SMTP configurado no Supabase (Auth → Email).')
                    }}
                  >
                    Esqueci a senha
                  </a>
                </div>
              ) : null}

              {error ? (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg py-2.5 font-medium text-white transition"
                style={{
                  backgroundColor: accent,
                  opacity: loading ? 0.75 : 1
                }}
              >
                {loading ? 'Entrando…' : 'Entrar'}
              </button>
            </form>
          </section>
        </div>

        {cfg.footer_note ? (
          <p className="mt-6 text-center text-xs text-gray-500">{cfg.footer_note}</p>
        ) : null}
      </div>
    </div>
  )
}
