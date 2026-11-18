import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Define o base como './' para funcionar com qualquer nome de repositório no GitHub Pages.
// Se quiser usar um domínio customizado, pode deixar base: '/'
export default defineConfig({
  plugins: [react()],
  base: './',
})
