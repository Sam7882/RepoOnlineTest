import { createSSRApp } from "vue";
import App from "./App.vue";
// 狀態管理
import { createPinia } from 'pinia';
// i18n 國際化
import { createI18n } from 'vue-i18n';
import messages from '@/i18n'; // 導入上面匯出的 messages

// Tailwind CSS
import '@/assets/styles/tailwind/tailwind.css';
// Global CSS
import '@/assets/styles/global.scss';

const i18n = createI18n({
  legacy: false,         // ✅ 關閉 legacy 模式
  globalInjection: true, // ✅ 讓 $t() 能用於 Options API
  locale: 'zh_TW',
  fallbackLocale: 'en-US',
  messages,
  availableLocales: Object.keys(messages),
});

export function createApp() {
  const app = createSSRApp(App);
  // 安裝狀態管理
  const pinia = createPinia();
  app.use(pinia);
  // 安裝 i18n
  app.use(i18n);

  return {
    app,
  };
}