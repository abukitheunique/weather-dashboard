import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/owm': {
          target: 'https://api.openweathermap.org',
          changeOrigin: true,
          rewrite: (p) => {
            const u = new URL(p, 'http://localhost')
            const path = u.searchParams.get('path')
            u.searchParams.delete('path')
            u.searchParams.set('appid', env.OWM_KEY)
            return `${path}?${u.searchParams.toString()}`
          },
        },
      },
    },
  }
})
