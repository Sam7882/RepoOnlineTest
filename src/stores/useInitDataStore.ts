// TEMP: 初始化資料 store
import { defineStore } from 'pinia';
import { router } from '@/utils/routers';
// 初始化資料型別定義
interface InitState {
  // 網站資訊 暫定
  siteInfo: {
    [key: string]: any;
  };
  creatorId: string;
  userInfo: {
    id: string;
    name: string;
    avatar: string;
    token: string;
  };
  settings: {
    theme: 'light' | 'dark';
    language: string;
  };
  systemInfo: {
    platform: string;
    deviceBrand: string;
    deviceModel: string;
  };
}

export const useInitStore = defineStore('init', {
  state: (): InitState => ({
    siteInfo: {
    },
    // 當前創作者ID
    creatorId: '',
    // 登入資訊
    userInfo: {
      id: '',
      name: '',
      avatar: '',
      token: '',
    },
    settings: {
      theme: 'light',
      language: 'zh-TW',
    },
    systemInfo: {
      platform: '',
      deviceBrand: '',
      deviceModel: '',
    },
  }),

  getters: {
    // 根據 creatorId 和 userInfo.id 是否一致自動判斷是否為創作者
    isCreator: (state) => state.creatorId === state.userInfo.id,
  },

  actions: {
    setSiteInfo(siteInfo: Partial<InitState['siteInfo']>) {
      this.siteInfo = { ...this.siteInfo, ...siteInfo };
    },
    setUserInfo(userInfo: Partial<InitState['userInfo']>) {
      this.userInfo = { ...this.userInfo, ...userInfo };
    },

    setSettings(settings: Partial<InitState['settings']>) {
      this.settings = { ...this.settings, ...settings };
    },

    setSystemInfo(systemInfo: Partial<InitState['systemInfo']>) {
      this.systemInfo = { ...this.systemInfo, ...systemInfo };
    },
    // 切換語言
    changeLanguage(locale: string) {
      this.settings.language = locale;
    },
    // 判斷該頁面是否有初始化資料強制跳轉到入口頁
    checkInitData() {
      console.log("🚀 檢查是否已初始化資料 checkInitData")
      if (Object.keys(this.siteInfo).length === 0) {
        router.reLaunchLoading()
      }
    },
    // 重置 store
    resetStore() {
      this.$reset();
    },
    // 設置目前創作者頁觀看 id
    setCreatorId(creatorId: string) {
      console.log("🚀 == 設置目前創作者頁觀看 id == ", creatorId)
      this.creatorId = creatorId;
    }
  },
});