<template>
  <uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
    background-color="#f6f6f6">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <view class="header-title">
          <text class="title">{{ title }}</text>
          <view class="deco-line"></view>
        </view>
        <view class="icon-container popup-close-container">
          <uni-icons class="icons" type="closeempty" size="24" @click="close" />
        </view>
      </view>

      <view class="popup-content">
        <!-- 標題與關閉 -->
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
        <!-- line -->
        <view class="deco-line"></view>
        <!-- bottom -->
        <view class="comment-container">

          <view class="row-title bold">
            <text>{{ $t('common.orderContent') }}</text>
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
            <text>{{ 'jesiicatestid' }}{{ $t('common.forMember') }}</text>
          </view>
          <view class="subscription-content" v-html="subscriptionContent">
          </view>
          <!-- 確認送出按鈕 -->
          <view class="btn-submit-container">
            <button type="button" class="submit-btn " @click="submitForm">{{
              $t('creator.beMember') }}</button>
            <!-- 說明中心 -->
            <view class="caption-container">
              <text>{{ $t('common.subscriptionAgreementTip') }}</text>
              <text class="caption" @click="openCaption">《{{ $t('common.subscriptionAgreement') }}》</text>
              。
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
// TEMP: 組件-訂閱方案彈窗
import { onShow } from '@dcloudio/uni-app'
import { useViewportStore } from '@/stores/useViewportStore'
import { toPay, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const emit = defineEmits(['update:Data'])
const { openBottomPopUp } = inject('common')
const props = defineProps({
  type: {
    type: String,
    default: 'phoneBind'
  }
})

const { t } = useI18n()
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)

const popupRef = ref()
// 打開
const open = () => {
  popupRef.value?.open()
}

const close = () => {
  popupRef.value?.close()
}

const title = computed(() => {
  return t('common.subscription')
})

defineExpose({ open, close })



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

const openCaption = () => {
  openBottomPopUp({
    title: t('common.subscriptionAgreement'),
    content: t('common.subscriptionAgreementTip2', { title: 'Fance' })
  })
}

onShow(() => {
  checkViewportAutoReplace()
})
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
  & {
    z-index: var(--z-index-max) !important;
    // overflow: hidden;
  }
}

.popup-container {
  padding: 32rpx;
  border-radius: 60rpx 60rpx 0 0;
  background-color: var(--background-color-light);
  width: fit-content;
  overflow: visible;
  max-height: 80dvh;
  display: flex;
  flex-direction: column;


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
  overflow-y: auto;
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
<style scoped lang="scss">
// TEMP: 訂閱方案頁面
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
    font-size: var(--font-size-title-pc);
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
    font-size: var(--font-size-content-pc);

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
            font-size: var(--font-size-content-pc) !important;
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
          font-size: var(--font-size-content-pc) !important;
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
          font-size: var(--font-size-content-pc) !important;
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
  font-size: var(--font-size-content-pc-large);
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
          font-size: var(--font-size-title-pc);

          .icon {
            position: absolute;
            left: calc(100% + 12rpx);
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-color-senary) !important;
          }
        }

        .subscription-page-data-profile-container-item-text-account {
          font-size: var(--font-size-title-pc-small);
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
    font-size: var(--font-size-content-pc);
    margin-bottom: 20rpx;

    .comment-container-item-text {
      font-size: var(--font-size-title-pc);

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
    font-size: var(--font-size-title-pc);
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
  font-size: var(--font-size-title-pc-xlarge);
  margin-bottom: 0;
}

.subscription-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--text-color-tertiary);
  color: var(--text-color-quaternary);
  font-size: var(--font-size-content-pc-large);
  padding: 40rpx 32rpx;
  border-radius: 20rpx;
  white-space: pre-wrap;
}

/* 確認付款按鈕 */
.btn-submit-container {
  margin-top: 80rpx;
  margin-bottom: 50rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }

  .submit-btn {
    border-radius: 20rpx;
    font-size: var(--font-size-title-pc);
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
</style>