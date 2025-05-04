<template>
  <!-- 圖文區 卡片 水平排序，自動換行，一行三格 grid排版-->
  <view class="creator-home-page-content-card-container">
    <template v-for="(item, index) in props.data" :key="index">
      <view class="creator-home-page-content-card-container-item" @click="handleClick(item)">
        <image class="creator-home-page-content-card-container-item-img" :src="item.src" :alt="item.alt"
          mode="widthFix"></image>
        <uni-icons class="creator-home-page-content-card-container-item-icon" custom-prefix="icon" size="30"
          color="var(--text-color-secondary)"
          :type="item.type === 'photos' ? 'icon-common-copy' : item.type === 'video' ? 'icon-common-video' : ''" />
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
// TEMP: 組件-三格圖片 格柵排版
const props = defineProps({
  data: {
    type: Array as PropType<{ src: string; alt: string; type: string }[]>,
    required: true,
  },
});

const emit = defineEmits(['clickMedia'])

const handleClick = (item: { src: string; alt: string; type: string }) => {
  if (item.type === 'photos') {
    emit('clickMedia', item)
    console.log('圖片');
  } else if (item.type === 'video') {
    emit('clickMedia', item)
    console.log('影片');
  } else {
    emit('clickMedia', item)
    console.log('其他');
  }
};
</script>

<style lang="scss" scoped>
/* 卡片區 */
.creator-home-page-content-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // gap: 16rpx;

  .creator-home-page-content-card-container-item {
    position: relative;
    padding: 2rpx;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;

    ::v-deep(.creator-home-page-content-card-container-item-img) {
      uni-image {
        width: 100% !important;
        height: 100% !important;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      // 背景圖
      uni-image>div {
        background-position: center !important;
        background-size: cover !important;
      }

      // 圖片佔位
      uni-image>img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .creator-home-page-content-card-container-item-icon {
      position: absolute;
      bottom: 8rpx;
      left: 16rpx;
      z-index: 1;
      font-size: 24rpx !important;
    }
  }
}
</style>
