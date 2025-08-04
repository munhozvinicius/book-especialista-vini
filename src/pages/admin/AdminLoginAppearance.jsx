import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminLoginAppearance() {
  const [cfg, setCfg] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase
      .from('login_settings')
      .select('*')
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (!error) setCfg(data)
      })
  }, [])

  const save = async () => {
    if (!cfg?.id) return
    setSaving(true)
    const { error } = await supabase
      .from('login_settings')
      .update({
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
      })
      .eq('id', cfg.id)

    setSaving(false)
    if (error) alert(error.message)
    else alert('Salvo!')
  }

  if (!cfg) return null

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Aparência do Login</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm">Título</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.title || ''}
            onChange={(e) => setCfg({ ...cfg, title: e.target.value })}
          />

          <label className="text-sm">Subtítulo</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.subtitle || ''}
            onChange={(e) => setCfg({ ...cfg, subtitle: e.target.value })}
          />

          <label className="text-sm">Título de boas-vindas</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.welcome_title || ''}
            onChange={(e) => setCfg({ ...cfg, welcome_title: e.target.value })}
          />

          <label className="text-sm">Texto de boas-vindas</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            rows={4}
            value={cfg.welcome_text || ''}
            onChange={(e) => setCfg({ ...cfg, welcome_text: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Cor destaque (hex)</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={cfg.accent_color || ''}
                onChange={(e) => setCfg({ ...cfg, accent_color: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm">Tipo de fundo</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={cfg.background_type || 'color'}
                onChange={(e) => setCfg({ ...cfg, background_type: e.target.value })}
              >
                <option value="color">Cor</option>
                <option value="image">Imagem</option>
              </select>
            </div>
          </div>

          <label className="text-sm">Valor do fundo (hex ou URL)</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.background_value || ''}
            onChange={(e) => setCfg({ ...cfg, background_value: e.target.value })}
          />

          <label className="text-sm">Logo (URL PNG)</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.logo_url || ''}
            onChange={(e) => setCfg({ ...cfg, logo_url: e.target.value })}
          />

          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={!!cfg.show_forgot}
              onChange={(e) => setCfg({ ...cfg, show_forgot: e.target.checked })}
            />
            <span className="text-sm">Mostrar "Esqueci a senha"</span>
          </label>

          <label className="text-sm mt-3">Link de suporte</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.support_link || ''}
            onChange={(e) => setCfg({ ...cfg, support_link: e.target.value })}
          />

          <label className="text-sm mt-3">Rodapé</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={cfg.footer_note || ''}
            onChange={(e) => setCfg({ ...cfg, footer_note: e.target.value })}
          />

          <button
            onClick={save}
            disabled={saving}
            className="mt-4 px-4 py-2 rounded text-white"
            style={{ background: cfg.accent_color || '#6d28d9', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Salvando…' : 'Salvar'}
          </button>
        </div>

        {/* Preview simples (opcional) */}
        <div className="border rounded-2xl p-4 bg-white/70 backdrop-blur">
          <div className="text-center space-y-2">
            {cfg.logo_url && <img src={cfg.logo_url} className="mx-auto w-16 h-16 rounded-full" alt="logo preview" />}
            <h3 className="font-semibold">{cfg.title || 'Plataforma do Vini'}</h3>
            <p className="text-sm text-gray-500">{cfg.subtitle || 'Central Comercial'}</p>
          </div>
          <div className="mt-4 p-3 rounded-xl border">
            <div className="font-medium">{cfg.welcome_title || 'Bem-vindo de volta!'}</div>
            <div className="text-sm text-gray-500">{cfg.welcome_text || 'Acesse sua conta para continuar.'}</div>
          </div>
          <div className="mt-3 p-3 rounded-xl border">
            <div className="font-medium">{cfg.form_title || 'Fazer Login'}</div>
            <div className="text-sm text-gray-500">{cfg.form_subtitle || 'Digite suas credenciais…'}</div>
            <div className="mt-2 grid gap-2">
              <div className="h-9 rounded border" />
              <div className="h-9 rounded border" />
              <div className="h-9 rounded" style={{ background: cfg.accent_color || '#6d28d9' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
