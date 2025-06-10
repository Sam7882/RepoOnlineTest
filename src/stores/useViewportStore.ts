// 發佈資料 store
import { defineStore } from 'pinia';

interface ViewportState {
  viewportWidth: number;
  isPc: boolean;
  isMobile: boolean;
}

export const useViewportStore = defineStore('viewport', {
  state: () => ({
    viewportWidth: 0,
    isPc: false,
    isMobile: false,
  }),

  actions: {
    updateViewport() {
      const viewportWidth = uni.getSystemInfoSync().windowWidth
      this.viewportWidth = viewportWidth
      if (viewportWidth > 768) {
        this.isPc = true
        this.isMobile = false
      } else {
        this.isPc = false
        this.isMobile = true
      }
    }
  }
})
