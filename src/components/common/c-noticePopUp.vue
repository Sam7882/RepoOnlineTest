<template>
  <uni-popup ref="popup" type="center">
    <view class="popup-box">
      <view class="popup-header">
        <view class="popup-title" v-if="title">
          <template v-if="titleIcon">
            <uni-icons class="icon-info" :type="titleIcon" custom-prefix="icon" size="24"
              color="var(--primary-color)" />
          </template>
          {{ title }}
        </view>
      </view>
      <uni-icons class="close-icon" type="closeempty" size="20" color="var(--popTxt-color-content)" @click="close" />
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
const titleIcon = ref('')

function setTimeClsoe(time = 1500) {
  if (!time) {
    return
  }
  setTimeout(() => {
    close()
  }, time)
}

function open(options = {}) {
  titleIcon.value = options.titleIcon || ''
  title.value = options.title || ''
  content.value = options.content || ''
  setTimeClsoe(options.setTimeOut)
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  background-color: #fff;
  border-radius: 30rpx;
  text-align: center;
  padding: 40rpx 0 50rpx;

  @media screen and (min-width: 768px) {
    max-width: 500rpx;
  }

  @media screen and (min-width: 961px) {
    max-width: 600rpx;
  }
}

.popup-header {
  position: relative;
  width: 100%;
  padding: 0 48px;
}

.close-icon {
  position: absolute;
  right: 16rpx;
  top: 60rpx;
  transform: translateY(-50%);
  font-size: var(--font-size-title-pc) !important;
  color: var(--text-color-primary) !important;

  @media screen and (min-width: 961px) {
    right: 32rpx;
    top: 64rpx;
  }

  &:hover {
    cursor: pointer;
  }
}

.uni-popup {
  z-index: var(--z-index-max);
}

.popup-title {
  font-size: var(--font-size-content-pc);
  color: var(--popTxt-color-title);
}

.popup-content {
  margin-top: 32rpx;
  font-size: var(--font-size-content-pc-small);
  color: #666;
  /* margin-bottom: 48rpx; */
  color: var(--popTxt-color-content);
  /* padding: 32rpx 0 50rpx; */
  padding: 0 48px;
}
</style>
