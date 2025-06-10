<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useViewportStore } from '@/stores/useViewportStore'
import { checkViewporReplace } from '@/utils/routers'

const viewportStore = useViewportStore()

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

/* 監聽視窗大小變化 */
onMounted(() => {
  console.log("App onMounted")
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
</script>

<style></style>
