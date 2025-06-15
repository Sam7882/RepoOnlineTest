<template>
  <uni-popup ref="popup" type="center">
    <view class="popup-box">
      <view class="popup-title">{{ $t('menu.service') }}</view>
      <view class="popup-content">
        <text class="popup-content-text">{{ $t('service.pleaseEnter') }}</text>
        <uni-easyinput v-model="subject" type="textarea" :placeholder="$t('service.theme')" :inputBorder="false" />
        <uni-easyinput v-model="description" type="textarea" :placeholder="$t('service.problemDescription')"
          :inputBorder="false" />
      </view>
      <view class="popup-actions">
        <button class="btn confirm-btn" @click="handleConfirm">{{ confirmBtnText }}</button>
        <button class="btn cancel-btn" @click="close">{{ cancelBtnText }}</button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-聯繫客服彈窗
import { ref, defineExpose } from 'vue'
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const popup = ref(null)
const confirmBtnText = ref(t('common.confirm'))
const cancelBtnText = ref(t('common.cancel'))
const subject = ref('')
const description = ref('')
function open() {
  popup.value.open()
}

function close() {
  popup.value.close()
}

function handleConfirm() {
  console.log("🚀 確認", subject.value, description.value)
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

  @media screen and (min-width: 768px) {
    max-width: 500rpx;
  }

  @media screen and (min-width: 961px) {
    max-width: 700rpx;
  }

  @media screen and (min-width: 1920px) {
    max-width: 900rpx;
  }

  @media screen and (min-width: 2560px) {
    max-width: 1100rpx;
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

  .uni-easyinput {
    margin: 20rpx 0;

    ::v-deep(.uni-easyinput__content) {
      .is-textarea {
        background: var(--text-color-tertiary) !important;
        border-radius: 10rpx;
      }

      .uni-easyinput__content-textarea {
        margin: 0;
        padding: 20rpx;
      }

      .uni-textarea-placeholder {
        color: var(--text-color-primary);
      }
    }

  }

  /* ::v-deep(.uni-easyinput__content) {

    .is-textarea {}
  } */
}

.popup-content-text {
  display: flex;
  justify-content: center;
  font-size: var(--font-size-content-pc-small);
  color: var(--text-color-quaternary);


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
  font-size: var(--font-size-content-pc);
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
