import replace from '@rollup/plugin-replace'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  root: mode === 'development' ? '../' : './',
  base: '/navmap/',
  server: {
    fs: {
      allow: ['..']
    },
  },
  plugins: [
    replace({
      preventAssignment: true,
      __DEV__: true
    })
  ]
}))
