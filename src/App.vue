<script setup lang="ts">
import { onLaunch, onShow, onHide, onPageNotFound, onError } from "@dcloudio/uni-app";
import { useViewportStore } from '@/stores/useViewportStore'
import { usePagesStore } from '@/stores/usePagesStore'
import { checkViewporReplace, initFirstVisite, checkUrlInPages, router } from '@/utils/routers'
import { useRoute } from 'vue-router'

const route = useRoute()
// const router = useRouter() 
const viewportStore = useViewportStore()
const pagesStore = usePagesStore()

// App 初始化完成標記
const isAppReady = ref(false)

// 定義回調函數
const handleResize = () => {
  if (!isAppReady.value) return

  viewportStore.updateViewport()
  console.log("視窗大小變化 layout-pcBase:", viewportStore.viewportWidth)
  nextTick(() => {
    const pages = getCurrentPages()
    if (pages && pages.length) {
      checkViewporReplace()
    }
  })
}

/* 監聽路由變化，如果路徑不在 pages.json 中，則跳轉到 入口 頁面 */
watch(route, (newVal) => {
  // 使用 pagesStore 來檢查頁面是否存在並獲取背景色
  const nowBgColor = document.body.style.backgroundColor
  const bgColor = pagesStore.getBackgroundColorByFullPath(newVal.path) || 'var(--background-color-light)'
  if (nowBgColor !== bgColor) {
    if (bgColor && typeof document !== 'undefined') {
      nextTick(() => {
        document.body.style.backgroundColor = bgColor
      })
    }
  }

  // NOTE: 須注意 src\pages\launch\loading-page.vue 的跳轉時間
  let _newVal = newVal.path.replace(/^[^a-zA-Z0-9]+/, '')
  if (!checkUrlInPages(_newVal) && newVal.path !== '/') {
    setTimeout(() => {
      if (!checkUrlInPages(_newVal) && newVal.path !== '/') {
        // window.location.replace('')
        router.reLaunchLoading()
      }
      // TODO: 有可能這個時間需要調整
    }, 1500)
  }
})

/* 監聽視窗大小變化 */
onMounted(() => {
  console.log("App onMounted")

  // 初始化 pages store
  pagesStore.initPagesStore()

  // 初始化視窗大小
  viewportStore.updateViewport()

  // 使用 window.addEventListener 監聽 resize
  window.addEventListener('resize', handleResize)
  isAppReady.value = true
})



onUnmounted(() => {
  console.log("App onUnmounted")
  // 移除 window resize 監聽
  window.removeEventListener('resize', handleResize)
})

onLaunch(() => {
  console.log("App Launch");
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

// 當頁面不存在時，觸發，僅限用於 app.vue
onPageNotFound(() => {
  console.log("App Page Not Found");
  initFirstVisite()
});

onError((error) => {
  console.log("App Error", error);
});
</script>

<style></style>
