<template>
  <uni-popup ref="popupRef" type="bottom" borderRadius="60rpx 60rpx 0 0" background-color="#f6f6f6">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <text class="popup-title">{{ title }}</text>
        <uni-icons class="popup-close" type="closeempty" size="24" @click="close" />
      </view>
      <view class="popup-deco-line"></view>
      <view class="popup-content">
        <!-- 社群 -->
        <text class="popup-content-text">{{ content }}</text>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// TEMP:發布頁-組件-發布設定底部上滑彈窗

const title = ref('提示')
const content = ref('內文')

const emit = defineEmits(['updata:postSet'])
const popupRef = ref()

// 打開
const open = (options = {}) => {
  title.value = options.title || '提示'
  content.value = options.content || '內文'
  popupRef.value.open()
}
// 關閉
const close = () => {
  popupRef.value.close()
}


defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
  & {
    z-index: var(--z-index-max) !important;
  }
}

.popup-container {
  padding: 32rpx;
  border-radius: 32rpx 32rpx 0 0;
  background-color: var(--background-color-light);
}

.popup-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24rpx;
  width: 100%;
}

.popup-close {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 28rpx !important;
}

.popup-title {
  font-size: 28rpx;
  color: var(--text-color-primary);
}

.popup-deco-line {
  width: 100%;
  height: 1px;
  background-color: var(--text-color-tertiary);
  margin: 24rpx 0;
}

.popup-content {
  color: var(--text-color-quaternary);
  font-size: 24rpx;
  min-height: 240rpx;
  padding: 12rpx 40rpx;

}
</style>
