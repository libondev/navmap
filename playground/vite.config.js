import replace from '@rollup/plugin-replace'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '../',
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
})
