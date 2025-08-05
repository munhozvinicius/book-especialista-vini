// src/pages/LoginPage.jsx
// Página de login simples com redirecionamento para /dashboard após sucesso.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    navigate('/dashboard', { replace: true });
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f6f7fb'}}>
      <form onSubmit={onSubmit} style={{width:360,background:'#fff',padding:24,borderRadius:12,boxShadow:'0 10px 30px rgba(0,0,0,.06)'}}>
        <h1 style={{fontSize:20,marginBottom:12}}>Entrar</h1>
        <label style={{fontSize:12,opacity:.8}}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
          placeholder="voce@empresa.com"
          style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:8,margin:'6px 0 12px'}}
        />
        <label style={{fontSize:12,opacity:.8}}>Senha</label>
        <input
          type="password"
          value={pass}
          onChange={e=>setPass(e.target.value)}
          required
          placeholder="••••••••"
          style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:8,margin:'6px 0 16px'}}
        />
        {err && <div style={{color:'#c00',fontSize:12,marginBottom:12}}>{err}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'#6d28d9',color:'#fff',fontWeight:600,opacity:loading?.7:1}}
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
