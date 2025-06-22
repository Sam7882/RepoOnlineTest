<template>
  <view class="container container-sponsor-confirm">
    <c-headerNav :title="$t('common.subscription')" />
    <!-- bottom -->
    <view class="comment-container">

      <view class="row-title bold">
        <text>{{ $t('subscription.subscriptionTip3') }}</text>
      </view>
      <!-- HASH TAG標籤 -->
      <view class="subscription-page-data-profile-container-item subscription-page-data-profile-container-item-tip">
        <text class="subscription-page-data-profile-container-item-text">✔ {{
          t('subscription.subscriptionTip4') }}</text>
        <text class="subscription-page-data-profile-container-item-text">✔ {{
          t('subscription.subscriptionTip5') }}</text>
        <text class="subscription-page-data-profile-container-item-text">✔ {{
          t('subscription.subscriptionTip6') }}</text>
      </view>
      <!-- 解鎖影片TIP -->
      <view class="comment-container-item">
        <text class="comment-container-item-text">{{ $t('subscription.subscriptionTip7') }}</text>
        <text class="comment-container-item-text">{{ $t('subscription.subscriptionTip8') }}</text>
      </view>
      <!-- 訂閱方案 -->
      <view class="comment-list-container">
        <button type="button" class="btn" @click="selectSubscription('1')">
          <text class="comment-list-item-button-text">{{ $t('common.subscription') }} 1
            {{ $t('common.month') }}</text>
          <text class="comment-list-item-button-text">$888</text>
        </button>
        <button type="button" class="btn" @click="selectSubscription('3')">
          <text class="comment-list-item-button-text">{{ $t('common.subscription') }} 3
            {{ $t('common.month') }}</text>
          <text class="comment-list-item-button-text">$1888</text>
        </button>
        <button type="button" class="btn" @click="selectSubscription('6')">
          <text class="comment-list-item-button-text">{{ $t('common.subscription') }} 6
            {{ $t('common.month') }}</text>
          <text class="comment-list-item-button-text">$2888</text>
        </button>
        <button type="button" class="btn" @click="selectSubscription('12')">
          <text class="comment-list-item-button-text">{{ $t('common.subscription') }} 12
            {{ $t('common.month') }}</text>
          <text class="comment-list-item-button-text">$3888</text>
        </button>
      </view>

      <view class="row-title bold-50">
        <text>{{ $t('subscription.toMemberMessage') }}</text>
      </view>
      <view class="subscription-content" v-html="subscriptionContent">
      </view>

      <view class="switch-container bold-50">
        <text class="switch-title">{{ $t('subscription.subscriptionCase') }}</text>
        <c-checkBox class="switch-btn-container" v-model="isOpen" />
      </view>
      <!-- 確認送出按鈕 -->
      <view class="btn-submit-container">
        <button type="button" class="submit-btn " @click="submitForm">{{
          $t('common.save2') }}</button>
      </view>
    </view>
  </view>
</template>

<script setup>
// TEMP: 訂閱方案頁面

import { onShow } from '@dcloudio/uni-app'
import { toPay, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isOpen = ref(false)

const selectSubscription = (id) => {
  console.log('selectSubscription', id)
  toPay()
}

const subscriptionContent = ref(`HI 大家好~</br>期待你成為我的會員,</br>加入就可以參加我每個月舉辦的粉絲見面會喔~</br>加入就假字個月舉辦的粉絲見面會喔~</br>假字假字假字假字假字每個月喔！！`)

/* 確認付款 */
// 確認付款按鈕 送出資料
const submitForm = () => {
  toPay()
}

const bottomPopUpRef = ref(null)
const openCaption = () => {
  bottomPopUpRef.value.open({
    title: t('common.subscriptionAgreement'),
    content: t('common.subscriptionAgreementTip2', { title: 'Fance' })
  })
}

onShow(() => {
  checkViewportAutoReplace()
})
</script>

<style scoped lang="scss">
.container {
  // padding: 32rpx;
}

// header
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12rpx;
  position: relative;
  border-radius: 24rpx 24rpx 0 0;
  overflow: hidden;

  .title {
    line-height: 1;
    font-size: var(--font-size-content-pc-small);
    color: var(--text-color-secondary);
  }

  .close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color-secondary) !important;
  }
}

// body
.content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  border-radius: 24rpx;
  color: var(--play-sponsor-color);

  .content-item {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: var(--font-size-content-pc-small);

    .content-text {
      color: var(--text-color-secondary);
    }

    .content-icon {
      font-size: 22rpx !important;
      color: var(--text-color-senary) !important;
    }

    &.content-item-money {
      display: flex;
      border-radius: 12rpx;
      border: 1px solid var(--play-sponsor-color);
      color: var(--text-color-secondary);

      // padding: 0 8rpx;
      .content-item-money-text {
        margin-left: 16rpx;
        color: var(--play-sponsor-color);
      }

      ::v-deep(.content-input) {

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

    ::v-deep(.content-input) {

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

.subscription-page-data-profile-container-item-text {
  color: var(--text-color-primary);
}

.subscription-page-data-container {
  position: relative;
  padding: 12rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 頭像
  .subscription-page-avatar-container {
    position: relative;
    width: 120rpx;
    height: 120rpx;
    // border: rpx solid var(--primary-color);
    background: var(--primary-color);
    border-radius: 100%;
    overflow: hidden;


    // transform: translate(-50%, -50%);
    ::v-deep(.subscription-page-avatar) {
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
  .subscription-page-data-profile-container {
    display: flex;
    flex-direction: column;
    color: var(--text-color-secondary);
    font-weight: normal;

    .subscription-page-data-profile-container-item {
      font-size: var(--font-size-content-pc);

      // 名稱與帳號
      &.subscription-page-data-profile-container-item-self-account {
        display: flex;
        flex-direction: column;
        align-items: center;

        .subscription-page-data-profile-container-item-text-name-container {
          position: relative;

        }

        .subscription-page-data-profile-container-item-text-name-container {
          font-size: var(--font-size-title-pc-large);

          .icon {
            position: absolute;
            left: calc(100% + 12rpx);
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-color-senary) !important;
          }
        }

        .subscription-page-data-profile-container-item-text-account {
          font-size: var(--font-size-content-pc);
          color: var(--text-color-quaternary);
          margin-top: -4rpx;
        }
      }

      // 自我介紹
      &.subscription-page-data-profile-container-item-title {
        line-height: 1.1;
        text-align: center;
        font-size: var(--font-size-content-pc);
        margin-bottom: 12rpx;
      }


    }
  }
}

.subscription-page-data-profile-container-item-tip {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12rpx;
  font-size: var(--font-size-content-pc);
  margin-bottom: 20rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    margin-bottom: 16rpx;
  }

}


// footer
.comment-container {
  margin-top: 32rpx;
  padding: 0 40rpx;
  padding-bottom: 32rpx;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  color: var(--text-color-secondary);
  gap: 20rpx;

  .comment-container-item {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    line-height: 1;
    font-size: var(--font-size-content-pc-small);
    margin-top: 64rpx;
    margin-bottom: 20rpx;

    @media screen and (min-width: 768px) and (max-width: 960px) {
      margin-top: 0rpx;
      gap: 16rpx;
    }

    .comment-container-item-text {
      font-size: var(--font-size-content-pc);

      &:first-child {
        color: var(--text-color-primary);
      }

      &:last-child {
        color: var(--text-color-quaternary) !important;
      }
    }
  }

  .comment-list-container {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-bottom: 48rpx;

    @media screen and (min-width: 768px) and (max-width: 960px) {
      gap: 24rpx;
      margin-bottom: 24rpx;
    }
  }

  .btn {
    // background-color: #937CFF;
    color: var(--text-color-primary);
    border-radius: 32rpx;
    padding: 16rpx 44rpx;
    font-size: var(--font-size-content-pc-large);
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

.switch-container {
  display: flex;
  justify-content: space-between;
  color: var(--text-color-primary);
  margin-top: 80rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    margin-top: 56rpx;
  }
}

.row-title {
  font-size: var(--font-size-title-pc);
  margin-bottom: 0;
}

.subscription-content {
  display: flex;
  flex-direction: column;
  background: var(--text-color-tertiary);
  color: var(--text-color-quaternary);
  font-size: var(--font-size-content-pc-large);
  padding: 40rpx 32rpx;
  border-radius: 20rpx;
  white-space: pre-wrap;
}

/* 確認付款按鈕 */
.btn-submit-container {
  margin-top: 32rpx;
  // margin-bottom: 50rpx;

  .submit-btn {
    border-radius: 20rpx;
    font-size: var(--font-size-title-pc-small);
    padding: 24rpx 0;
    line-height: 1;
    background-color: var(--primary-color);
    color: var(--text-color-secondary);

    &.is-disabled {
      background-color: var(--primary-color);
      color: var(--text-color-secondary);
    }
  }
}


/* 間距 */
.caption-container {
  margin-top: 20rpx;
  color: var(--popTxt-color-content);
  font-size: var(--font-size-content-pc);
  line-height: 1;

  .caption {
    color: var(--link-color);
  }
}

.switch-title {
  font-size: var(--font-size-title-pc-large);
  font-weight: 500;
  color: var(--text-color-primary);
}

.switch-btn-container {
  width: fit-content;
  height: fit-content;

  ::v-deep(.switch) {
    .switch {
      width: fit-content;
      height: fit-content;
      padding: 20rpx 36rpx;

      @media screen and (min-width: 768px) and (max-width: 960px) {
        padding: 16rpx 32rpx;
      }

      .switch-dot {
        width: 30rpx;
        height: 30rpx;
        top: 50%;
        translate: 0 -50%;

        @media screen and (min-width: 768px) and (max-width: 960px) {
          width: 24rpx;
          height: 24rpx;
        }
      }

      &.switch-checked {
        .switch-dot {
          left: calc(100% - 30rpx - 6rpx) !important;
        }
      }
    }
  }
}
</style>
