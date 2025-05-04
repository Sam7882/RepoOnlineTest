import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/RepoOnlineTest/' : '/',
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,     // ✅ 要啟用 legacy API，才能支援 Option API
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'pinia'],
      dts: 'src/types/auto-imports.d.ts'
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'pinia': '/node_modules/pinia/dist/pinia.mjs',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/styles/scss/_variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
}));
