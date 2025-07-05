<template>
  <uni-popup ref="popupRef" type="center">
    <view class="fullscreen-popup">
      <!-- 圖片 -->
      <swiper class="fullscreen-swiper" :current="currentIndex" circular @change="onChange" @transition="hideSlipIcon">
        <swiper-item v-for="(img, i) in images" :key="i">
          <image :src="img" mode="aspectFit" class="fullscreen-img" />
        </swiper-item>
      </swiper>
      <!-- 關閉按鈕 -->
      <view class="close-btn" @click="popupRef?.close()">✕</view>
      <!-- 滑動圖片ICON提示 -->
      <view class="fullscreen-swiper-icon">
        <uni-icons class="fullscreen-swiper-icon-item" v-show="isSlipIcon" type="icon-video-slip" custom-prefix="icon"
          size="24" color="#fff"></uni-icons>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-圖片POP偽裝全螢幕
const props = defineProps({
  imgs: {
    type: Array,
    default: () => [],
  },

})

// 彈窗
const popupRef = ref(null);
// 圖片
const images = ref([]);
// 當前圖片索引
const currentIndex = ref(0);
// 是否顯示滑動圖片ICON提示
const isSlipIcon = ref(true);

// 開啟
const open = (imgs, index = 0) => {
  images.value = imgs;
  currentIndex.value = index;
  isSlipIcon.value = true;
  popupRef.value?.open();
};

const close = () => {
  popupRef.value?.close();
}
// 圖片變更
const onChange = (e) => {
  currentIndex.value = e.detail.current;
};

// 隱藏滑動圖片
const hideSlipIcon = () => {
  console.log("🚀 ~ 隱藏滑動圖片")
  isSlipIcon.value = false;
}
defineExpose({ open, close });
</script>

<style scoped lang="scss">
.uni-popup.center {
  z-index: 100;
}

::v-deep(.uni-popup) {
  & {
    z-index: var(--z-index-max) !important;
  }
}

.fullscreen-popup {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: relative;
}

.fullscreen-swiper {
  width: 100%;
  height: 100%;
}

.fullscreen-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.fullscreen-swiper-icon {
  position: absolute;
  bottom: 100rpx !important;
  left: 50% !important;
  transform: translateX(-50%);
  z-index: 999;
  animation: slide 1s linear infinite alternate;

  .fullscreen-swiper-icon-item {
    color: var(--text-color-secondary) !important;
    font-size: 128rpx !important;
  }
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.close-btn {
  position: absolute;
  top: 40rpx;
  right: 30rpx;
  color: #fff;
  font-size: 36rpx;
  z-index: 999;

  cursor: pointer;
}
</style>
