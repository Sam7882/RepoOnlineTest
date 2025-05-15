<template>
  <uni-popup ref="popupRef" type="bottom" borderRadius="60rpx 60rpx 0 0" background-color="#f6f6f6"
    @change="handlePopupChange">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <text class="popup-title">{{ $t('post.publishSetting') }}</text>
        <uni-icons class="popup-close" type="closeempty" size="24" @click="close" />
      </view>
      <view class="popup-content">
        <!-- 提示 -->
        <view class="popup-subtitle">{{ $t('post.publishWhoCanSee') }}</view>

        <!-- 選項列表 -->
        <radio-group class="popup-options" @change="handleRadioChange">
          <label class="popup-option" v-for="(item, index) in options" :key="index">
            <view class="popup-option-main">
              <text class="popup-option-title">{{ item.label }}</text>
              <text class="popup-option-desc" v-if="item.desc">{{ item.desc }}</text>
            </view>
            <view class="popup-option-radio-container">
              <!-- opacity 0 radio 不顯示 -->
              <radio class="popup-option-radio" :value="item.value" color="#937CFF"
                :checked="selected === item.value" />
              <!-- radio 無法替換勾選圖標樣式，故使用自定義圖標覆蓋 -->
              <view class="popup-option-custom-checked" v-if="selected === item.value">
                <image class="popup-option-custom-checked-image"
                  src="/static/icons/input/icon-input-checkbox-active.png" mode="widthFix" />
              </view>
              <view class="popup-option-custom-checked" v-else>
                <image class="popup-option-custom-checked-image" src="/static/icons/input/icon-input-checkbox-2.png"
                  mode="widthFix" />
              </view>
            </view>
          </label>
        </radio-group>

        <!-- 確認按鈕 -->
        <view class="popup-confirm-container">
          <button class="popup-confirm" @click="confirm">{{ $t('common.confirm') }}</button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// TEMP:發布頁-組件-發布設定底部上滑彈窗
const props = defineProps({
  // 如果沒有傳入，之前設定的資料，那他就會將預設值傳出去
  defaultSelected: {
    type: String,
    default: 'publish'
  }
})
const emit = defineEmits(['updata:postSet'])
const popupRef = ref()
const selected = ref(props.defaultSelected ? props.defaultSelected : 'publish')
// 選項
const options = [
  { value: 'publish', label: t('post.public') },
  { value: 'fans', label: t('post.fansUser'), desc: t('post.followingFans') },
  { value: 'subscription', label: t('post.subscriptionUser') }
]
// 打開
const open = () => {
  popupRef.value?.open()
}
// 確認是否有按下 保存的判斷依據
const haveClickConfirm = ref(false)
const close = () => {
  popupRef.value?.close()
}
// radio 選擇
const handleRadioChange = (e: any) => {
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === e.detail.value) {
      selected.value = e.detail.value;
      break;
    }
  }

}

// 按下確認才會回傳
const confirm = () => {
  haveClickConfirm.value = true
  close()
}
// 當popup 打開或關閉時，會觸發
const handlePopupChange = (e: any) => {
  // 如果沒有傳入，之前設定的資料，那他就會將預設值傳出去
  if (e.show) {
    haveClickConfirm.value = false
  }
  // 關閉時 有按下保存
  if (!e.show && haveClickConfirm.value) {
    emit('updata:postSet', selected.value)
    haveClickConfirm.value = false
  }
  // 直接關閉 沒有按下保存，會初始化為 外部傳入的值
  else if (!e.show && !haveClickConfirm.value) {
    selected.value = props.defaultSelected
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
  border-radius: 32rpx 32rpx 0 0;
  background-color: var(background-color-grayLight2)
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
  top: 25%;
  transform: translateY(-50%);
}

.popup-title {
  font-size: 32rpx;
}

.popup-content {
  background-color: var(--background-color-light);
  padding: 40rpx;
  border-radius: 40rpx;
}

.popup-subtitle {
  font-size: 24rpx;
  margin-bottom: 16rpx;
  color: var(--text-color-primary);
}

.popup-options {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 64rpx;
}

.popup-option {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-option-main {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}


.popup-option-title {
  font-size: 32rpx;
  color: var(--text-color-primary);
}

.popup-option-desc {
  font-size: 24rpx;
  color: var(--text-color-quaternary);
}

.popup-option-radio-container {
  position: relative;

  .popup-option-radio {
    opacity: 0;
  }
}

.popup-option-custom-checked {
  z-index: 10;
  position: absolute;
  right: 4px;
  top: 2px;

  .popup-option-custom-checked-image {
    width: 50rpx;
    height: 50rpx !important;
  }

  ::v-deep(.popup-option-custom-checked-image) {

    // width: 24rpx;
    // height: 24rpx;
  }
}

.popup-confirm-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-confirm {
  display: inline-block;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 20rpx;
  padding: 24rpx 96rpx;
  font-size: 28rpx;
  line-height: 1;
}
</style>
