import React from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo ao sistema!</h1>
      <p>Aqui vai o conteúdo da sua aplicação.</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}