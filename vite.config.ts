import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4010,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@use': path.resolve(__dirname, './src/composables'),
      '@store': path.resolve(__dirname, './src/store')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ['@use "@/assets/scss/_colors.scss" as *;', '@use "@/assets/scss/_mixins.scss" as *;'].join(
          '\n'
        )
      }
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  },
})
