import replace from '@rollup/plugin-replace'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(() => {
  return {
    build: {
      minify: true,
      outDir: './dist',
      target: 'modules',
      cssMinify: true,
      lib: {
        entry: {
          index: './src/index.ts',
          'plugins/contents': './src/plugins/contents.ts'
        },
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
      dts({
        staticImport: true,
        entryRoot: './src',
        outputDir: './dist'
      }),
      replace({
        preventAssignment: true,
        __DEV__: false
      })
    ]
  }
})
