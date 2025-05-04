<template>
  <view class="lang-selector" @click="popupRef.open()">
    <!-- 國旗默認顯示 -->
    <image :src="currentLang.flag" class="flag" />
    <text class="code">{{ currentLang.label }}</text>
    <!-- ICON 旋轉所以加入CSS-->
    <uni-icons class="icon-triangle" custom-prefix="icon" type="icon-video-play" />
    <!-- 底部彈窗 -->
    <uni-popup ref="popupRef" type="bottom">
      <view class="popup-list">
        <view v-for="lang in langData" :key="lang.code" class="lang-item" @click="switchLang(lang.code)">
          <image :src="lang.flag" class="flag" />
          <text class="label">{{ lang.label }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
// TEMP: 組件-語言選擇器
import { ref, computed } from 'vue';
import { useInitStore } from '@/stores/useInitDataStore';
import langData from '@/i18n/langData'; // 語系資料含有國旗
import { useI18n } from 'vue-i18n';

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

<style lang="scss" scoped>
.lang-selector {
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  padding: 8rpx 16rpx;
  width: auto;
  border-radius: 999rpx;
  border: 1rpx solid #eee;
  // box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
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
