<template>
  <uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
    background-color="#f6f6f6" @change="emitChange">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <slot name="header" :close="close">
          <text class="popup-title">{{ title }}</text>
          <uni-icons class="popup-close" type="closeempty" size="24" @click="close" />
        </slot>
      </view>
      <view class="popup-deco-line"></view>
      <view class="popup-content">
        <slot name="content" :close="close">
          <text class="popup-content-text">{{ content }}</text>
        </slot>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-底部上滑彈窗
import { useViewportStore } from '@/stores/useViewportStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)
const title = ref(t('common.tip'))
const content = ref(t('common.content'))

const emit = defineEmits(['updata:postSet', 'open', 'close'])
const popupRef = ref()
let onConfirm = () => { }
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

// 回傳是否開啟
const emitChange = (e) => {
  if (e.show) {
    emit('close')
  } else {
    emit('open')
  }
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
  border-radius: 60rpx 60rpx 0 0;
  background-color: var(--background-color-light);
  width: fit-content;
  width: 100%;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    padding: 24rpx;
  }


  @media screen and (min-width: 961px) {
    border-radius: 32rpx;
    width: 80vw;
    max-width: 800rpx;
  }
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
  font-size: var(--font-size-title-pc-small) !important;
}

.popup-title {
  font-size: var(--font-size-title-pc);
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
  font-size: var(--font-size-title-pc-small);
  min-height: 240rpx;
  padding: 12rpx 40rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    min-height: 150rpx;
  }

}
</style>
