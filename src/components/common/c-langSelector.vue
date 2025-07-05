<template>
  <view class="lang-selector" @click="popupRef.open()">
    <!-- 國旗默認顯示 -->
    <view class="lang-selector-container">
      <image :src="currentLang.flag" class="flag" />
      <text class="code">{{ currentLang.label }}</text>
      <!-- ICON 旋轉所以加入CSS-->
      <uni-icons class="icon-triangle" custom-prefix="icon" type="icon-video-play" />
    </view>
    <!-- 底部彈窗 -->
    <uni-popup ref="popupRef" :type="type">
      <view class="popup-list">
        <view v-for="lang in langData" :key="lang.code" class="lang-item" :class="{ 'active': lang.code === locale }"
          @click="switchLang(lang.code)">
          <image :src="lang.flag" class="flag" />
          <text class="label">{{ lang.label }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
// TEMP: 組件-語言選擇器
import { useInitStore } from '@/stores/useInitDataStore';
import langData from '@/i18n/langData'; // 語系資料含有國旗
import { useI18n } from 'vue-i18n';

const props = defineProps({
  type: {
    type: String,
    default: 'bottom'
  }
})

const { locale } = useI18n();
const store = useInitStore();
const { settings } = storeToRefs(store);
const { changeLanguage } = store;
const popupRef = ref();

// 計算目前選擇語系，默認為語系資料第一筆
const currentLang = computed(() => {
  return langData.find((l) => l.code === settings.value.language) || langData[0];
});

// 切換語系
function switchLang(code: string) {
  popupRef.value.close();
  changeLanguage(code);
  locale.value = code;
}
</script>
<style scoped lang="scss">
::v-deep(.uni-popup) {
  & {
    z-index: var(--z-index-max) !important;
    overflow: hidden;
  }
}

.popup-container {
  padding: 32rpx;
  border-radius: 60rpx 60rpx 0 0;
  background-color: var(--background-color-light);
  width: fit-content;
  overflow: visible;


  @media screen and (min-width: 961px) {
    border-radius: 32rpx;
    width: 80vw;
    max-width: 800rpx;
  }

  @media screen and (min-width: 1920px) {
    max-width: 1000rpx;
  }

  @media screen and (min-width: 2560px) {
    max-width: 1200rpx;
  }
}

.popup-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: visible;
}

.header-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: var(--font-size-title-pc-xlarge);
  }

  .deco-line {
    width: 100%;
    margin: 0;
    margin-top: 16rpx;
    height: 4px;
  }
}

.popup-close-container {
  position: absolute;
  top: 50%;
  right: 64rpx;
  z-index: 10;
  transform: translateY(-70%);

  .popup-close {
    font-size: var(--font-size-title-pc-xlarge) !important;
  }
}


.popup-title {
  font-size: var(--font-size-title-pc-large);
}

.popup-content {
  background-color: var(--background-color-light);
  padding: 40rpx;
  border-radius: 40rpx;
  overflow: visible;
}

.popup-subtitle {
  font-size: var(--font-size-content-pc-small);
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
  font-size: var(--font-size-title-pc);
  color: var(--text-color-primary);
}

.popup-option-desc {
  font-size: var(--font-size-content-pc-small);
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
    width: 34rpx;
    height: 34rpx !important;
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
  padding: 20rpx 96rpx;
  font-size: var(--font-size-content-pc);
  line-height: 1;
}
</style>


<style lang="scss" scoped>
.lang-selector {
  display: inline-flex;
  align-items: center;
}

.lang-selector-container {
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  padding: 8rpx 16rpx;
  width: auto;
  border-radius: 999rpx;
  border: 1rpx solid #eee;
}

.icon-triangle {
  margin: 0 12rpx;
  font-size: 12rpx !important;
  rotate: 90deg;
}

.flag {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  margin-right: 8rpx;
}

.code {
  font-weight: bold;
  margin-right: 4rpx;
}

.popup-list {
  background-color: #fff;
  padding: 20rpx;
}

.lang-item {
  display: flex;
  align-items: center;
  padding: 16rpx;
  border-bottom: 1rpx solid #eee;
}

.label {
  margin-left: 12rpx;
  font-size: 28rpx;
}
</style>
