<template>
  <uni-popup ref="popupRef" type="bottom" background-color="#f6f6f6">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <text class="popup-title">{{ $t('post.autoPublishSetting') }}</text>
        <uni-icons class="popup-close" type="closeempty" size="16" @click="close" />
      </view>
      <view class="popup-content">
        <!-- 提示 -->
        <view class="popup-subtitle">{{ $t('post.autoPublishSettingTip') }}</view>

        <!-- 日期選擇區塊 -->
        <view class="example-body">
          <uni-datetime-picker v-model="date" :show="showPicker" @close="showPicker = false" @change="handleChange">
            <view class="date-container" @click="showPicker = true">
              <view class="date-container-item" v-for="(part, index) in dateParts" :key="index">
                <text class="date-label">{{ part.label }}</text>
                <text class="date-value">{{ part.value }}</text>
              </view>
            </view>
          </uni-datetime-picker>
        </view>

        <!-- 顯示選擇結果 -->
        <view class="result-text">
          <text>{{ $t('post.autoPublishOnDate', { date: formattedDate }) }}</text>
        </view>

        <!-- 確認按鈕 -->
        <view class="popup-confirm-container">
          <button class="popup-confirm" @click="confirm">{{ $t('common.confirm') }}</button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
// TEMP: 發布-組件-自動發佈設定
const emit = defineEmits(['update:autoDate'])
const popupRef = ref()
const date = ref('2025-02-25 19:18')
const showPicker = ref(false)

// 日期選擇器計算
const dateParts = computed(() => {
  const [d, t] = date.value.split(' ')
  const [y, m, day] = d.split('-')
  const [h, min] = t.split(':')
  return [
    { label: '年', value: y },
    { label: '月', value: m },
    { label: '日', value: day },
    { label: '時', value: h },
    { label: '分', value: min },
  ]
})

// 日期選擇器格式化
const formattedDate = computed(() => {
  return date.value.replace('-', '/').replace('-', '/').replace(' ', '/')
})

// 確認
const confirm = () => {
  emit('update:autoDate', date.value)
  close()
}

// 關閉
const close = () => {
  popupRef.value?.close()
}

// 開啟
const open = () => {
  popupRef.value?.open()
}

// 日期選擇器變更
const handleChange = (val: any) => {
  date.value = val
  showPicker.value = false
}

defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
  & {
    z-index: var(--z-index-max) !important;
  }

  // 需同時有圓弧，才能有效果
  uni-view[name="content"] {
    border-radius: 32rpx 32rpx 0 0 !important;
  }

  .uni-popup__wrapper {
    background-color: var(--background-color-grayLight) !important;
    border-radius: 32rpx 32rpx 0 0 !important;
  }
}

.popup-container {
  padding: 32rpx;
}

.popup-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24rpx;
  position: relative;
}

.popup-title {
  line-height: 1;
  font-size: 32rpx;
}

.popup-close {
  position: absolute;
  right: 32rpx;
  top: 50%;
  transform: translateY(-50%);
}

.popup-content {
  padding: 32rpx;
  border-radius: 24rpx;
  background: var(--text-color-secondary);
}

.popup-subtitle {
  font-size: 24rpx;
  margin-bottom: 80rpx;
  color: #333;
}

.example-body {
  margin-bottom: 48rpx;
}

.date-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48rpx;
  padding: 16rpx;
  border-radius: 16rpx;
  gap: 16rpx;
}

.date-container-item {
  flex: 1;
  border-bottom: 1px solid var(--text-color-primary);
  padding: 0 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.date-value {
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  text-align: center;
}

.date-label {
  font-size: 20rpx;
  color: #999;
  display: block;
  text-align: center;
}

.result-text {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 48rpx;
}

.popup-confirm-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-confirm {
  background-color: #937CFF;
  color: #fff;
  border-radius: 28rpx;
  padding: 24rpx 96rpx;
  font-size: 28rpx;
  line-height: 1;
}

/* 日期選擇器 */
::v-deep(.uni-calendar-item__weeks-box) {
  .uni-calendar-item__weeks-box .uni-calendar-item--checked {
    background-color: var(--primary-color) !important;
  }
}

::v-deep(.uni-date-btn--ok) {
  .uni-datetime-picker--btn {
    background-color: var(--primary-color) !important;
    border-radius: 24rpx !important;
  }
}
</style>
