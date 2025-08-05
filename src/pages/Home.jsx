import { supabase } from "../lib/supabase"
import { Button } from "../components/ui/button"

export default function Home() {
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background">
      <div className="p-6 rounded-xl border shadow bg-white/90 backdrop-blur text-center space-y-4">
        <h1 className="text-2xl font-semibold">Você entrou 🎉</h1>
        <p className="text-sm text-gray-500">Coloque aqui sua tela inicial.</p>
        <Button onClick={logout}>Sair</Button>
      </div>
    </div>
  )
}