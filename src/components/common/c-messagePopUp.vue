<template>
  <uni-popup ref="popup" type="center">
    <view class="popup-box">
      <view class="popup-title" v-if="title">{{ title }}</view>
      <view class="popup-content" v-if="content">{{ content }}</view>
      <view class="deco-line"></view>
      <view class="popup-actions" v-if="confirmBtnText || cancelBtnText">
        <button class="btn confirm-btn" v-if="confirmBtnText" @click="handleConfirm">{{ confirmBtnText }}</button>
        <button class="btn cancel-btn" v-if="cancelBtnText" @click="close">{{ cancelBtnText }}</button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-訊息OK彈窗
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
  title.value = options.title || ''
  content.value = options.content || ''
  confirmBtnText.value = options.confirmBtnText || ''
  cancelBtnText.value = options.cancelBtnText || ''
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

<style scoped>
.popup-box {
  width: 80vw;
  background-color: #fff;
  border-radius: 30rpx;
  text-align: center;

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
  font-size: var(--font-size-title-pc-large);
  margin-bottom: 20rpx;
  color: var(--popTxt-color-title);
}

.popup-content {
  font-size: var(--font-size-content-pc);
  color: #666;
  /* margin-bottom: 48rpx; */
  color: var(--popTxt-color-content);
  padding: 50rpx 0;
}

.popup-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.deco-line {
  margin: 0;
}

.btn {
  padding: 50rpx 0;
  border-radius: 16rpx;
  margin: unset;
  font-size: var(--font-size-title-pc);
  line-height: 1;
  width: 100%;
  border: unset;

  &::after {
    display: none;
  }
}

.confirm-btn {
  color: var(--primary-color);
  background-color: transparent;
}

.cancel-btn {
  background-color: unset;
  color: var(--primary-color);
}
</style>
