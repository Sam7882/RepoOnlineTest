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
  checkViewporReplace()
  console.log("視窗大小變化 layout-pcBase:", viewportStore.viewportWidth)
}

/* 監聽視窗大小變化 */
onMounted(() => {
  // 初始化視窗大小
  viewportStore.updateViewport()
  // 使用 uni.onWindowResize 監聽視窗大小變化
  // 監聽視窗大小變化
  uni.onWindowResize(handleResize)
  isAppReady.value = true  // App 初始化完成，允許後續觸發 handleResize
})

onUnmounted(() => {
  // 移除監聽，傳入相同的回調函數
  uni.offWindowResize(handleResize)
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
