import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      /*
       * Might be used when the file target is not in the same dir
       * or when it's in the root of the same @dir
       * Otherwise use common relatives paths instead
       */
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@db': fileURLToPath(new URL('./src/db', import.meta.url)),
    },
  },
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(
        browserslist(
          'last 2 Chrome versions, last 2 Firefox versions, last 2 Edge versions, last 2 Safari versions, last 2 iOS versions, last 2 Samsung versions, last 2 FirefoxAndroid versions',
        ),
      ),
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
})
