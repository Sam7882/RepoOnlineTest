<template>
  <uni-popup ref="popup" type="center">
    <view class="popup-box">
      <view class="popup-title">{{ title }}</view>
      <view class="popup-content">{{ content }}</view>
      <view class="popup-actions">
        <button class="btn confirm-btn" @click="handleConfirm">{{ confirmBtnText }}</button>
        <button class="btn cancel-btn" @click="close">{{ cancelBtnText }}</button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 確認彈窗
import { ref, defineExpose } from 'vue'
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
/* TODO:語系須補 */
const popup = ref(null)
const title = ref('提示')
const content = ref('')
const confirmBtnText = ref('確定')
const cancelBtnText = ref('取消')
let onConfirm = () => { }

function open(options = {}) {
  title.value = options.title || '提示'
  content.value = options.content || ''
  confirmBtnText.value = options.confirmBtnText || '確定'
  cancelBtnText.value = options.cancelBtnText || '取消'
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
  border-radius: 20rpx;
  text-align: center;
  padding: 48rpx 60rpx;
}

.uni-popup {
  z-index: var(--z-index-max);
}

.popup-title {
  font-weight: 500;
  font-size: 34rpx;
  margin-bottom: 20rpx;
  color: var(--popTxt-color-title);
}

.popup-content {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 48rpx;
  color: var(--popTxt-color-content);
}

.popup-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  padding: 32rpx 40rpx;
  border-radius: 16rpx;
  margin: unset;
  font-size: 30rpx;
  line-height: 1;
  width: 100%;
  border: unset;

  &::after {
    display: none;
  }
}

.confirm-btn {
  color: #fff;
  background-color: var(--primary-color);
}

.cancel-btn {
  background-color: unset;
  color: var(--text-color-primary);
}
</style>
