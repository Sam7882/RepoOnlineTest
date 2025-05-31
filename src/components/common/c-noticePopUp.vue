<template>
  <uni-popup ref="popup" type="center">
    <view class="popup-box">
      <view class="popup-header">
        <view class="popup-title" v-if="title">{{ title }}</view>
        <uni-icons class="close-icon" type="closeempty" size="20" color="var(--popTxt-color-content)" @click="close" />
      </view>
      <view class="popup-content" v-if="content">
        <text>
          {{ content }}
        </text>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-通知彈窗
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const popup = ref(null)
const title = ref(t('common.tip'))
const content = ref('')

function setTimeClsoe(time = 2000) {
  setTimeout(() => {
    close()
  }, time)
}

function open(options = {}) {
  title.value = options.title || ''
  content.value = options.content || ''
  if (options.setTimeOut) {
    setTimeClsoe(options.setTimeOut)
  }
  popup.value.open()
}

function close() {
  popup.value.close()
}

// 讓父層可以透過 ref 操作 open/close
defineExpose({
  open,
  close,
  setTimeClsoe
})
</script>

<style scoped>
.popup-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  background-color: #fff;
  border-radius: 30rpx;
  text-align: center;
  padding: 40rpx 0 50rpx;
}

.popup-header {
  position: relative;
  width: 100%;
}

.close-icon {
  position: absolute;
  right: 38rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40rpx !important;
  color: var(--text-color-primary) !important;
}

.uni-popup {
  z-index: var(--z-index-max);
}

.popup-title {
  font-weight: 500;
  font-size: 32rpx;
  color: var(--popTxt-color-title);
}

.popup-content {
  margin-top: 32rpx;
  font-size: 24rpx;
  color: #666;
  /* margin-bottom: 48rpx; */
  color: var(--popTxt-color-content);
  /* padding: 32rpx 0 50rpx; */
}
</style>
