<template>
  <uni-popup ref="popup" type="center">
    <view class="popup-box">
      <view class="popup-title">{{ title }}</view>
      <view class="popup-content">{{ content }}</view>
      <view class="popup-actions">
        <view class="btn-container">
          <button class="btn confirm-btn" @click="handleConfirm">{{ confirmBtnText }}</button>
        </view>
        <view class="btn-container">
          <button class="btn cancel-btn" @click="close">{{ cancelBtnText }}</button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-確認彈窗
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const popup = ref(null)
const title = ref(t('common.tip'))
const content = ref('')
const confirmBtnText = ref(t('common.confirm'))
const cancelBtnText = ref(t('common.cancel'))
let onConfirm = () => { }

function open(options = {}) {
  title.value = options.title || t('common.tip')
  content.value = options.content || ''
  confirmBtnText.value = options.confirmBtnText || t('common.confirm')
  cancelBtnText.value = options.cancelBtnText || t('common.cancel')
  onConfirm = options.onConfirm || (() => { })
  popup.value.open()
}

function close() {
  popup.value.close()
}

function handleConfirm() {
  onConfirm()
  close()
}

// 讓父層可以透過 ref 操作 open/close
defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>
.popup-box {
  width: 80vw;
  background-color: #fff;
  border-radius: 20rpx;
  text-align: center;
  padding: 48rpx 60rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    max-width: 500rpx;
    padding: 32rpx 40rpx;
  }

  @media screen and (min-width: 961px) {
    max-width: 600rpx;
  }

  @media screen and (min-width: 1920px) {
    max-width: 800rpx;
  }

  @media screen and (min-width: 2560px) {
    max-width: 1000rpx;
  }
}

.uni-popup {
  z-index: var(--z-index-max);
}

.popup-title {
  font-weight: 500;
  font-size: var(--font-size-title-pc);
  margin-bottom: 20rpx;
  color: var(--popTxt-color-title);
}

.popup-content {
  font-size: var(--font-size-content-pc);
  color: #666;
  margin-bottom: 48rpx;
  color: var(--popTxt-color-content);
}

.popup-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-container {
  width: 100%;
}
</style>
