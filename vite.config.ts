import replace from '@rollup/plugin-replace'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  return {
    build: {
      minify: true,
      outDir: './dist',
      target: 'modules',
      cssMinify: true,
      lib: {
        entry: [
          './src/core/index.ts',
          'src/plugins/headings.ts'
        ],
        formats: ['es', 'cjs'],
        minimize: true,
        fileName: '[name]'
      },
      rollupUserOptions: {
        external: [],
        output: {
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      }
    },
    plugins: [
      mode === 'production' && dts({
        staticImport: true,
        entryRoot: './src',
        outputDir: './dist'
      }),
      replace({
        preventAssignment: true,
        __DEV__: mode === 'development'
      })
    ]
  }
})
