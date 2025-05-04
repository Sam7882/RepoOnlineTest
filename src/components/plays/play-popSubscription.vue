<template>
  <uni-popup ref="popupRef" type="center" background-color="#f6f6f6">
    <view class="popup-container popup-container-sponsor-confirm">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <!-- 頂部封面區 -->
        <view class="pop-subscription-page-cover">
          <!-- 封面圖片 -->
          <view class="pop-subscription-page-cover-img-container">
            <image class="pop-subscription-page-cover-img" src="/static/images/template/img-template-02.png"
              mode="heightFix">
            </image>
          </view>
        </view>
      </view>
      <view class="popup-content">
        <!-- 創作者資料區 -->
        <view class="pop-subscription-page-data-container">
          <!-- 絕對位置 頭像 -->
          <view class="pop-subscription-page-avatar-container">
            <image class="pop-subscription-page-avatar" src="/static/images/template/img-template-03.png"
              mode="widthFix">
            </image>
          </view>
          <!-- 名稱與帳號 垂直排序 -->
          <view class="pop-subscription-page-data-profile-container">
            <!-- 創作者名稱與帳號 -->
            <view
              class="pop-subscription-page-data-profile-container-item pop-subscription-page-data-profile-container-item-self-account">
              <view class="pop-subscription-page-data-profile-container-item-text-name-container">
                <text
                  class="pop-subscription-page-data-profile-container-item-text pop-subscription-page-data-profile-container-item-text-name">名稱</text>
                <uni-icons class="icon" type="icon-community-prove" custom-prefix="icon" size="16"
                  color="#937CFF"></uni-icons>
              </view>
              <text
                class="pop-subscription-page-data-profile-container-item-text pop-subscription-page-data-profile-container-item-text-account">@88888.888</text>
            </view>
            <!-- 自我介紹 -->
            <view
              class="pop-subscription-page-data-profile-container-item pop-subscription-page-data-profile-container-item-title">
              <text class="pop-subscription-page-data-profile-container-item-text">{{ $t('subscription.subscriptionTip')
              }}</text>
            </view>
            <!-- HASH TAG標籤 -->
            <view
              class="pop-subscription-page-data-profile-container-item pop-subscription-page-data-profile-container-item-tip">
              <text class="pop-subscription-page-data-profile-container-item-text">✔ {{
                $t('subscription.subscriptionTip1') }}</text>
              <text class="pop-subscription-page-data-profile-container-item-text">✔ {{
                $t('subscription.subscriptionTip2') }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- bottom -->
      <view class="popup-comment-container">
        <!-- 解鎖影片TIP -->
        <view class="popup-comment-container-item">
          <text class="popup-comment-container-item-text">{{ $t('play.unlockVideo') }}</text>
          <text class="popup-comment-container-item-text">{{ $t('subscription.subscriptionPlanChoose') }}</text>
        </view>
        <!-- 訂閱方案 -->
        <view class="popup-comment-list-container">
          <button type="button" class="popup-btn" @click="selectSubscription('1')">
            <text class="popup-comment-list-item-button-text">{{ $t('common.subscription') }} 1
              {{ $t('common.month') }}</text>
            <text class="popup-comment-list-item-button-text">$888</text>
          </button>
          <button type="button" class="popup-btn" @click="selectSubscription('3')">
            <text class="popup-comment-list-item-button-text">{{ $t('common.subscription') }} 3
              {{ $t('common.month') }}</text>
            <text class="popup-comment-list-item-button-text">$1888</text>
          </button>
          <button type="button" class="popup-btn" @click="selectSubscription('6')">
            <text class="popup-comment-list-item-button-text">{{ $t('common.subscription') }} 6
              {{ $t('common.month') }}</text>
            <text class="popup-comment-list-item-button-text">$2888</text>
          </button>
          <button type="button" class="popup-btn" @click="selectSubscription('12')">
            <text class="popup-comment-list-item-button-text">{{ $t('common.subscription') }} 12
              {{ $t('common.month') }}</text>
            <text class="popup-comment-list-item-button-text">$3888</text>
          </button>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { toPay } from '@/utils/routers'
const emit = defineEmits(['update:Data'])
const popupRef = ref()


const close = () => {
  popupRef.value?.close()
}

const open = () => {
  popupRef.value?.open()
}

const selectSubscription = (id: string) => {
  console.log('selectSubscription', id)
  toPay()
}

defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {

  // 需同時有圓弧，才能有效果
  uni-view[name="content"] {
    border-radius: 32rpx 32rpx 0 0 !important;
    // bottom: 136rpx !important; // 底部導航高
    // max-height: calc(100% - 68px - 25%);
  }

  .uni-popup__wrapper {
    background-color: var(--background-color-dark) !important;
    border-radius: 32rpx !important;
    // height: 100%;
    width: 65%;
  }
}

.popup-container {
  // padding: 32rpx;
}

// header
.popup-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12rpx;
  position: relative;
  border-radius: 24rpx 24rpx 0 0;
  overflow: hidden;

  .popup-title {
    line-height: 1;
    font-size: 20rpx;
    color: var(--text-color-secondary);
  }

  .popup-close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color-secondary) !important;
  }
}

// body
.popup-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  border-radius: 24rpx;
  color: var(--play-sponsor-color);

  .popup-content-item {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 20rpx;

    .popup-content-text {
      color: var(--text-color-secondary);
    }

    .popup-content-icon {
      font-size: 22rpx !important;
      color: var(--text-color-senary) !important;
    }

    &.popup-content-item-money {
      display: flex;
      border-radius: 12rpx;
      border: 1px solid var(--play-sponsor-color);
      color: var(--text-color-secondary);

      // padding: 0 8rpx;
      .popup-content-item-money-text {
        margin-left: 16rpx;
        color: var(--play-sponsor-color);
      }

      ::v-deep(.popup-content-input) {

        .is-input-border {
          // border-radius: 12rpx;
          // border-color: var(--play-sponsor-color) !important;
          border: none !important;
          color: var(--text-color-secondary) !important;
          background: transparent !important;
          // padding: 8rpx 0rpx;


          .uni-easyinput__content-input,
          .uni-easyinput__placeholder-class {
            font-size: 20rpx !important;
          }

          .uni-easyinput__content-input {
            // padding: 0 16rpx !important;
            display: flex;
            align-items: center;
            height: fit-content;
            padding: 8rpx 0 !important;
          }

          .uni-input-wrapper {
            height: fit-content;
          }
        }
      }
    }

    ::v-deep(.popup-content-input) {

      .is-input-border {
        border-radius: 12rpx;
        border-color: var(--play-sponsor-color) !important;
        color: var(--text-color-secondary) !important;
        background: transparent !important;
        // padding: 8rpx 0rpx;


        .uni-easyinput__content-input,
        .uni-easyinput__placeholder-class {
          font-size: 20rpx !important;
        }

        .uni-easyinput__content-input {
          // padding: 0 16rpx !important;
          display: flex;
          align-items: center;
          height: fit-content;
          padding: 8rpx 0;
        }

        .uni-input-wrapper {
          height: fit-content;
        }

        .uni-easyinput__content-textarea {
          height: 80rpx;
          min-height: 80rpx;
          font-size: 20rpx !important;
        }
      }
    }

  }
}

// 大頭照
// 頭像
.avatar-image-container {
  width: 24rpx;
  height: 24rpx;
  // border: ;
  background: var(--primary-color);
  border-radius: 100%;
  overflow: hidden;

  ::v-deep(.avatar-image) {
    uni-image {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100% !important;
      height: 100% !important;
      display: flex;
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
}

// 封面圖片
.pop-subscription-page-cover {
  position: relative;
  width: 100%;
  height: 150rpx;

  // 封面圖
  .pop-subscription-page-cover-img-container {
    width: 100%;
    height: 100%;

    ::v-deep(.pop-subscription-page-cover-img) {
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

    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
  }
}

.pop-subscription-page-data-container {
  position: relative;
  padding: 12rpx 32rpx;


  // 頭像
  .pop-subscription-page-avatar-container {
    position: absolute;
    top: -7%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 120rpx;
    height: 120rpx;
    // border: rpx solid var(--primary-color);
    background: var(--primary-color);
    border-radius: 100%;
    overflow: hidden;


    // transform: translate(-50%, -50%);
    ::v-deep(.pop-subscription-page-avatar) {
      uni-image {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 110% !important;
        height: 110% !important;
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
  }

  // 自我介紹
  .pop-subscription-page-data-profile-container {
    display: flex;
    flex-direction: column;
    // align-items: center;
    margin-bottom: 16rpx;
    color: var(--text-color-secondary);
    font-weight: normal;
    // gap: 4rpx;

    .pop-subscription-page-data-profile-container-item {
      font-size: 24rpx;

      // 名稱與帳號
      &.pop-subscription-page-data-profile-container-item-self-account {
        padding-top: 40rpx;
        margin-bottom: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        .pop-subscription-page-data-profile-container-item-text-name-container {
          position: relative;
        }

        .pop-subscription-page-data-profile-container-item-text-name-container {
          font-size: 28rpx;

          .icon {
            position: absolute;
            left: calc(100% + 12rpx);
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-color-senary) !important;
          }
        }

        .pop-subscription-page-data-profile-container-item-text-account {
          font-size: 18rpx;
          color: var(--text-color-quaternary);
          margin-top: -4rpx;
        }
      }

      // 自我介紹
      &.pop-subscription-page-data-profile-container-item-title {
        line-height: 1.1;
        text-align: center;
        font-size: 24rpx;
        margin-bottom: 12rpx;
      }


      &.pop-subscription-page-data-profile-container-item-tip {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
        font-size: 18rpx;
        padding-bottom: 24rpx;
        border-bottom: 1px solid var(--input-border-color);
      }

    }
  }
}

// footer
.popup-comment-container {
  padding: 0 32rpx;
  padding-bottom: 32rpx;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  color: var(--text-color-secondary);
  gap: 32rpx;

  .popup-comment-container-item {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    line-height: 1;
    font-size: 18rpx;

    .popup-comment-container-item-text {
      &:first-child {
        color: var(--text-color-secondary);
      }

      &:last-child {
        color: var(--text-color-quaternary) !important;
      }
    }
  }

  .popup-comment-list-container {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }

  .popup-btn {
    // background-color: #937CFF;
    color: var(--text-color-primary);
    border-radius: 32rpx;
    padding: 12rpx 24rpx;
    font-size: 24rpx;
    line-height: 1;
    margin: unset;
    display: flex;
    justify-content: space-between;

    &:nth-child(1) {
      background-color: var(--play-sponsor-color-primary);
    }

    &:nth-child(2) {
      background-color: var(--play-sponsor-color-secondary);
    }

    &:nth-child(3) {
      background-color: var(--play-sponsor-color-tertiary);
    }

    &:nth-child(4) {
      background-color: var(--play-sponsor-color-quaternary);
    }

  }
}
</style>
