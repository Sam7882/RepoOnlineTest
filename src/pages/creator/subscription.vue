<template>
  <view class="container container-sponsor-confirm">
    <c-headerNav title="訂閱" />
    <!-- 標題與關閉 -->
    <view class="content">
      <!-- 創作者資料區 -->
      <view class="subscription-page-data-container">
        <!-- 頭像 -->
        <view class="subscription-page-avatar-container">
          <image class="subscription-page-avatar" src="/static/images/template/img-template-04.png" mode="widthFix">
          </image>
        </view>
        <!-- 名稱與帳號 垂直排序 -->
        <view class="subscription-page-data-profile-container">
          <!-- 創作者名稱與帳號 -->
          <view
            class="subscription-page-data-profile-container-item subscription-page-data-profile-container-item-self-account">
            <view class="subscription-page-data-profile-container-item-text-name-container">
              <text
                class="subscription-page-data-profile-container-item-text subscription-page-data-profile-container-item-text-name">名稱</text>
              <uni-icons class="icon" type="icon-community-prove" custom-prefix="icon" size="16"
                color="#937CFF"></uni-icons>
            </view>
            <text
              class="subscription-page-data-profile-container-item-text subscription-page-data-profile-container-item-text-account">@88888.888</text>
          </view>
        </view>
      </view>
    </view>
    <!-- line -->
    <view class="deco-line"></view>
    <!-- bottom -->
    <view class="comment-container">

      <view class="row-title bold">
        <text>{{ '訂單內容' }}</text>
      </view>
      <!-- HASH TAG標籤 -->
      <view class="subscription-page-data-profile-container-item subscription-page-data-profile-container-item-tip">
        <text class="subscription-page-data-profile-container-item-text">✔ {{
          $t('subscription.subscriptionTip1') }}</text>
        <text class="subscription-page-data-profile-container-item-text">✔ {{
          $t('subscription.subscriptionTip2') }}</text>
      </view>
      <!-- 解鎖影片TIP -->
      <view class="comment-container-item">
        <text class="comment-container-item-text">{{ $t('play.unlockVideo') }}</text>
        <text class="comment-container-item-text">{{ $t('subscription.subscriptionPlanChoose') }}</text>
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
        <text>{{ 'jesiicatestid' }} {{ '給會員的話' }}</text>
      </view>
      <view class="subscription-content" v-html="subscriptionContent">
      </view>
      <!-- 確認送出按鈕 -->
      <view class="btn-submit-container">
        <button type="button" class="submit-btn " @click="submitForm">{{
          '成為會員' }}</button>
        <!-- 說明中心 -->
        <view class="caption-container">
          <text>訂閱方案即表示你同意</text>
          <text class="caption" @click="openCaption">{{ '《訂閱條款》' }}</text>
          。
        </view>
      </view>
    </view>

    <c-bottomPopUp ref="bottomPopUpRef" />
  </view>
</template>

<script setup>
import { toPay } from '@/utils/routers'


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
    title: '說明中心',
    content: '您可前往管理付款資訊頁面新增付款方式。 如欲了解詳情，請參考如何新增或更新付款方式。 若您想更改 Fance 付款方式，我們提供多種付款選項。'
  })
}
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
  }
}

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
    font-size: 20rpx;
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
    font-size: 20rpx;

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
      font-size: 24rpx;

      // 名稱與帳號
      &.subscription-page-data-profile-container-item-self-account {
        display: flex;
        flex-direction: column;
        align-items: center;

        .subscription-page-data-profile-container-item-text-name-container {
          position: relative;

        }

        .subscription-page-data-profile-container-item-text-name-container {
          font-size: 32rpx;

          .icon {
            position: absolute;
            left: calc(100% + 12rpx);
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-color-senary) !important;
          }
        }

        .subscription-page-data-profile-container-item-text-account {
          font-size: 26rpx;
          color: var(--text-color-quaternary);
          margin-top: -4rpx;
        }
      }

      // 自我介紹
      &.subscription-page-data-profile-container-item-title {
        line-height: 1.1;
        text-align: center;
        font-size: 24rpx;
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
  font-size: 24rpx;
  margin-bottom: 20rpx;

}


// footer
.comment-container {
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
    font-size: 18rpx;
    margin-bottom: 20rpx;

    .comment-container-item-text {
      font-size: 24rpx;

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
    margin-bottom: 20rpx;
  }

  .btn {
    // background-color: #937CFF;
    color: var(--text-color-primary);
    border-radius: 32rpx;
    padding: 16rpx 44rpx;
    font-size: 30rpx;
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

.row-title {
  margin-bottom: 0;
}

.subscription-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--text-color-tertiary);
  color: var(--text-color-quaternary);
  font-size: 28rpx;
  padding: 40rpx 32rpx;
  border-radius: 20rpx;
  white-space: pre-wrap;
}

/* 確認付款按鈕 */
.btn-submit-container {
  margin-top: 80rpx;
  margin-bottom: 50rpx;

  .submit-btn {
    border-radius: 20rpx;
    font-size: 30rpx;
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
  font-size: 24rpx;
  line-height: 1;

  .caption {
    color: var(--link-color);
  }
}
</style>
