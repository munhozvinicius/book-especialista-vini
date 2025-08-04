import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminLoginAppearance() {
  const [cfg, setCfg] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let mounted = true
    supabase.from('login_settings').select('*').limit(1).single()
      .then(({ data }) => { if (mounted) setCfg(data) })
    return () => { mounted = false }
  }, [])

  async function save() {
    if (!cfg) return
    setSaving(true)
    const { error } = await supabase.from('login_settings').update({
      title: cfg.title,
      subtitle: cfg.subtitle,
      welcome_title: cfg.welcome_title,
      welcome_text: cfg.welcome_text,
      form_title: cfg.form_title,
      form_subtitle: cfg.form_subtitle,
      accent_color: cfg.accent_color,
      logo_url: cfg.logo_url,
      background_type: cfg.background_type,
      background_value: cfg.background_value,
      show_forgot: cfg.show_forgot,
      support_link: cfg.support_link,
      footer_note: cfg.footer_note
    }).eq('id', cfg.id)
    setSaving(false)
    if (error) alert(error.message)
    else alert('Salvo!')
  }

  if (!cfg) return <div style={{padding:24}}>Carregando…</div>

  const row = { display:'grid', gap:6, marginBottom:12 }

  return (
    <div style={{maxWidth:720, margin:'24px auto', padding:'0 16px', fontFamily:'Inter, system-ui, Arial'}}>
      <h2 style={{margin:'0 0 16px'}}>Aparência do Login</h2>

      <div style={{...row}}>
        <label>Título</label>
        <input value={cfg.title||''} onChange={e=>setCfg({...cfg, title:e.target.value})}/>
      </div>

      <div style={{...row}}>
        <label>Subtítulo</label>
        <input value={cfg.subtitle||''} onChange={e=>setCfg({...cfg, subtitle:e.target.value})}/>
      </div>

      <div style={{...row}}>
        <label>Título de boas‑vindas</label>
        <input value={cfg.welcome_title||''} onChange={e=>setCfg({...cfg, welcome_title:e.target.value})}/>
      </div>

      <div style={{...row}}>
        <label>Texto de boas‑vindas</label>
        <textarea rows={3} value={cfg.welcome_text||''} onChange={e=>setCfg({...cfg, welcome_text:e.target.value})}/>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div style={row}>
          <label>Cor destaque (hex)</label>
          <input value={cfg.accent_color||''} onChange={e=>setCfg({...cfg, accent_color:e.target.value})}/>
        </div>
        <div style={row}>
          <label>Tipo de fundo</label>
          <select value={cfg.background_type||'color'} onChange={e=>setCfg({...cfg, background_type:e.target.value})}>
            <option value="color">Cor</option>
            <option value="image">Imagem</option>
          </select>
        </div>
      </div>

      <div style={row}>
        <label>Valor do fundo (hex ou URL)</label>
        <input value={cfg.background_value||''} onChange={e=>setCfg({...cfg, background_value:e.target.value})}/>
      </div>

      <div style={row}>
        <label>Logo (URL PNG)</label>
        <input value={cfg.logo_url||''} onChange={e=>setCfg({...cfg, logo_url:e.target.value})}/>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
        <input type="checkbox" checked={!!cfg.show_forgot} onChange={e=>setCfg({...cfg, show_forgot:e.target.checked})}/>
        <span>Mostrar “Esqueci a senha”</span>
      </div>

      <div style={row}>
        <label>Link de suporte</label>
        <input value={cfg.support_link||''} onChange={e=>setCfg({...cfg, support_link:e.target.value})}/>
      </div>

      <div style={row}>
        <label>Rodapé</label>
        <input value={cfg.footer_note||''} onChange={e=>setCfg({...cfg, footer_note:e.target.value})}/>
      </div>

      <button onClick={save} disabled={saving} style={{
        padding:'10px 16px', border:'none', borderRadius:8, color:'#fff',
        background: (cfg.accent_color || '#6d28d9'), cursor:'pointer'
      }}>
        {saving ? 'Salvando…' : 'Salvar'}
      </button>
    </div>
  )
}
