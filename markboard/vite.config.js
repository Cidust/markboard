import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define:{
    'process.env':{
      NODE_ENV:'development'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/common.less";',
      }
    }
  }
})
