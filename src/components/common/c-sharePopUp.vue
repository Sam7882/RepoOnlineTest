<template>
  <uni-popup ref="popupRef" type="bottom" borderRadius="60rpx 60rpx 0 0" background-color="#f6f6f6">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <text class="popup-title">{{ '分享至' }}</text>
        <uni-icons class="popup-close" type="closeempty" size="24" @click="close" />
      </view>
      <view class="popup-content">
        <!-- 社群 -->
        <view class="popup-content-scroll">
          <scroll-view class="scroll-view" scroll-x>
            <view class="scroll-view-list">
              <!-- 分享圖示 -->
              <view class="scroll-view-item" v-for="(item, index) in commounityList" :key="index">
                <view class="scroll-view-item-icon-container">
                  <!-- <uni-icons class="scroll-view-item-icon" type="weixin" size="24" /> -->
                  <image class="scroll-view-item-icon" :src="item.imgUrl" mode="aspectFit" />
                </view>
                <text class="scroll-view-item-text">{{ item.name }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
        <!-- 裝飾線 -->
        <view class="popup-deco-line"></view>
        <!-- 手動 -->
        <view class="popup-content-scroll">
          <scroll-view class="scroll-view" scroll-x>
            <view class="scroll-view-list">
              <!-- 分享圖示 -->
              <view class="scroll-view-item">
                <view class="scroll-view-item-icon-container">
                  <uni-icons class="scroll-view-item-icon" type="icon-common-copyLink" custom-prefix="icon" size="24" />
                </view>
                <text class="scroll-view-item-text">複製連結</text>
              </view>
              <view class="scroll-view-item">
                <view class="scroll-view-item-icon-container">
                  <uni-icons class="scroll-view-item-icon" type="icon-common-postStory" custom-prefix="icon"
                    size="24" />
                </view>
                <!-- TODO:語系須補-->
                <text class="scroll-view-item-text">新增到限時動態</text>
              </view>
            </view>
          </scroll-view>
        </view>

      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
// TEMP: 分享彈窗
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// TEMP:發布頁-組件-發布設定底部上滑彈窗

const emit = defineEmits(['updata:postSet'])
const popupRef = ref()

// 打開
const open = () => {
  popupRef.value?.open()
}
// 關閉
const close = () => {
  popupRef.value?.close()
}

const commounityList = reactive([
  {
    imgUrl: '/static/icons/community/icon-community-facebook-3.png',
    name: 'Facebook',
  },
  {
    imgUrl: '/static/icons/community/icon-community-messenger.png',
    name: 'Messenger',
  },
  {
    imgUrl: '/static/icons/community/icon-community-twitter-2.png',
    name: 'Twitter',
  },
  {
    imgUrl: '/static/icons/community/icon-community-instagram-2.png',
    name: 'Instagram',
  },
  {
    imgUrl: '/static/icons/community/icon-community-line-2.png',
    name: 'LINE',
  },
])


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
  color: var(--text-color-primary);
}

.popup-content {
  background-color: var(--background-color-light);
  padding: 56rpx 0;
  border-radius: 40rpx;
}

.popup-content-scroll {

  ::v-deep(.uni-scroll-view) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.scroll-view-list {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding-left: 28rpx;
}

.scroll-view-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;

  .scroll-view-item-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128rpx;
    aspect-ratio: 1/1;
    background-color: var(--text-color-tertiary);
    padding: 28rpx;
    border-radius: 50%;
  }

  .scroll-view-item-icon {
    width: 64rpx;
    height: 64rpx;
    // color: var(--text-color-secondary);
  }

  .scroll-view-item-text {
    font-size: 24rpx;
    color: var(--text-color-primary);
  }
}

.popup-deco-line {
  width: 100%;
  height: 1px;
  background-color: var(--text-color-tertiary);
  margin: 24rpx 0;
}
</style>
