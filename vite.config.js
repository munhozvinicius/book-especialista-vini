import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // força o Vite a pré-bundlar o pacote do Supabase, evitando o erro de resolução
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },
  ssr: {
    noExternal: ['@supabase/supabase-js']
  }
})
