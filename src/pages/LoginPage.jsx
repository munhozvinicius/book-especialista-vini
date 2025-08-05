import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [cfg, setCfg] = useState(null)
  const [email, setEmail] = useState('')
  const [pass, setPass]  = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // carrega configuração visual (se existir)
  useEffect(() => {
    let mounted = true
    supabase.from('login_settings').select('*').limit(1).single()
      .then(({ data }) => { if (mounted) setCfg(data || null) })
      .catch(()=>{}) // ignora se tabela não existir
    return () => { mounted = false }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email, password: pass
    })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    // sucesso → vai para a raiz (Dashboard)
    window.location.assign('/')
  }

  // estilos básicos sem tailwind
  const pageStyle = {
    minHeight:'100vh',
    display:'grid',
    placeItems:'center',
    background: cfg?.background_type === 'image'
      ? `url(${cfg.background_value}) center/cover no-repeat`
      : (cfg?.background_value || 'linear-gradient(180deg,#f6f7fb,#ffffff)'),
    fontFamily:'Inter, system-ui, Segoe UI, Roboto, Arial'
  }
  const cardStyle = {
    width:'100%', maxWidth:420, background:'rgba(255,255,255,0.9)',
    border:'1px solid #e5e7eb', borderRadius:16, padding:24,
    boxShadow:'0 10px 20px rgba(0,0,0,0.06)'
  }
  const labelStyle = { fontSize:13, color:'#374151', marginBottom:6, display:'block' }
  const inputStyle = {
    width:'100%', height:40, border:'1px solid #d1d5db', borderRadius:10,
    padding:'0 12px', outline:'none'
  }
  const btnStyle = {
    width:'100%', height:44, border:'none', borderRadius:10, cursor:'pointer',
    background: (cfg?.accent_color || '#6d28d9'), color:'#fff', fontWeight:600
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* topo */}
        <div style={{textAlign:'center', marginBottom:18}}>
          {cfg?.logo_url && (
            <img src={cfg.logo_url} alt="logo"
                 style={{width:64, height:64, borderRadius:'50%', margin:'0 auto 10px',
                         boxShadow:`0 0 0 8px ${(cfg?.accent_color || '#6d28d9')}22`}} />
          )}
          <h1 style={{margin:0, fontSize:22, fontWeight:700}}>
            {cfg?.title || 'Plataforma do Vini'}
          </h1>
          <p style={{margin:'6px 0 0', color:'#6b7280'}}>
            {cfg?.subtitle || 'Central Comercial'}
          </p>
        </div>

        {/* bloco de boas-vindas */}
        <div style={{marginBottom:16}}>
          <h2 style={{margin:'0 0 6px', fontSize:16}}>
            {cfg?.welcome_title || 'Bem‑vindo de volta!'}
          </h2>
          <p style={{margin:0, color:'#6b7280', fontSize:14}}>
            {cfg?.welcome_text || 'Acesse sua conta para continuar.'}
          </p>
        </div>

        {/* formulário */}
        <form onSubmit={onSubmit}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="voce@exemplo.com"
            style={{...inputStyle, marginBottom:12}}
          />

          <label style={labelStyle}>Senha</label>
          <input
            type="password"
            required
            value={pass}
            onChange={e=>setPass(e.target.value)}
            placeholder="••••••••"
            style={{...inputStyle, marginBottom:16}}
          />

          {error && (
            <div role="alert" style={{
              background:'#fef2f2', color:'#991b1b', border:'1px solid #fecaca',
              padding:10, borderRadius:8, marginBottom:12, fontSize:14
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        {/* rodapé opcional */}
        {cfg?.footer_note && (
          <p style={{marginTop:12, textAlign:'center', color:'#9ca3af', fontSize:12}}>
            {cfg.footer_note}
          </p>
        )}
      </div>
    </div>
  )
}
