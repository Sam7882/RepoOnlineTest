<template>
  <uni-popup ref="popupRef" type="center" background-color="#f6f6f6">
    <view class="popup-container popup-container-sponsor-input" v-if="payProcess == 'bill'">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <!-- 打賞贊助 -->
        <text class="popup-title">{{ $t('sponsor.sponsor') }}</text>
        <!-- 關閉按鈕 -->
        <uni-icons class="popup-close" type="closeempty" size="16" @click="close" />
      </view>
      <view class="popup-content">
        <view class="popup-content-item">
          <!-- 打賞金額 -->
          <text class="popup-content-title">{{ $t('sponsor.sponsorAmount') }}</text>
          <!-- 頭像 -->
          <view class="avatar-image-container">
            <image class="avatar-image popup-content-image" src="/static/images/template/img-template-01.png"
              mode="widthFix">
            </image>
          </view>
          <!-- 用戶名稱 -->
          <text class="popup-content-text">用戶名稱</text>
          <!-- 認證 -->
          <uni-icons class="popup-content-icon" type="icon-community-prove" custom-prefix="icon" size="16" />
        </view>
        <!-- 打賞金額 -->
        <view class="popup-content-item popup-content-item-money ">
          <text class="popup-content-item-money-text">$</text>
          <uni-easyinput type="number" class="popup-content-input" placeholder="金額" :clearable="false" />
        </view>
        <!-- 留言輸入欄位 -->
        <view class="popup-content-item">
          <uni-easyinput type="textarea" class="popup-content-textarea" placeholder="輸入訊息..." :clearable="false" />
        </view>
      </view>
      <view class="popup-comment-container">
        <!-- 購買更多 目前沒有故隱藏 -->
        <view class="popup-comment-container-item">
          <text class="popup-comment-container-item-title">{{ $t('payment.buyMore') }}</text>
          <uni-icons class="popup-comment-container-item-icon" type="up" size="16" />
        </view>
        <!-- 確認按鈕 -->
        <button type="button" class="popup-btn popup-confirm" @click="confirmBill">
          {{ $t('common.send') }}
        </button>
      </view>
    </view>
    <view class="popup-container popup-container-sponsor-checkOrder" v-else-if="payProcess == 'payMethod'">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <!-- 確認您的訂單 -->
        <text class="popup-title">{{ $t('payment.confirmOrder') }}</text>
        <uni-icons class="popup-close" type="closeempty" size="16" @click="close" />
      </view>
      <view class="popup-content">
        <!-- 金額 -->
        <view class="popup-content-item">
          <text class="popup-content-title">{{ $t('wallet.amount') }}</text>
          <text class="popup-content-text">$ 1000</text>
        </view>
        <!-- 付款方式 -->
        <view class="popup-content-item popup-content-item-money ">
          <text class="popup-content-item-money-text">
            {{ $t('payment.selectPaymentMethod') }}
          </text>
        </view>
      </view>
      <!-- bottom -->
      <view class="popup-comment-container" @click="confirmPayMethod">
        <!-- 信用卡付款 -->
        <uni-icons class="popup-comment-container-item-icon" type="icon-wallet-creditCard" custom-prefix="icon"
          size="16" />
        <text class="popup-comment-container-item-title">{{ $t('payment.creditCard') }}</text>
      </view>
    </view>
    <view class="popup-container popup-container-sponsor-confirm" v-else-if="payProcess == 'pay'">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <!-- 確認您的訂單 -->
        <text class="popup-title">{{ $t('payment.confirmOrderTitle') }}</text>
        <uni-icons class="popup-close" type="closeempty" size="16" @click="close" />
      </view>
      <view class="popup-content">
        <!-- 金額 -->
        <view class="popup-content-item">
          <text class="popup-content-title">{{ $t('wallet.amount') }}</text>
          <text class="popup-content-text">$ 1000</text>
        </view>
        <!-- 付款方式TIP -->
        <view class="popup-content-item popup-content-item-money ">
          <text class="popup-content-item-money-text">
            {{ $t('payment.confirmOrderTip') }}
          </text>
        </view>
        <!-- 信用卡列表 -->
        <view class="popup-content-item popup-content-item-creditCard-list-container">
          <uni-list class="popup-content-item-creditCard-list" :border="false">
            <template v-for="(item, index) in creditCardList" :key="item.id">
              <uni-list-item class="popup-content-item-creditCard-list-item" :class="{ active: item.selected }"
                :border="false">
                <template #body>
                  <view class="popup-content-item-creditCard-list-item-body" @click="selectCreditCard(item.id)">
                    <uni-icons class="popup-content-item-creditCard-list-item-body-icon" type="icon-wallet-creditCard"
                      custom-prefix="icon" size="16" />
                    <text class="popup-content-item-creditCard-list-item-body-text">
                      {{ item.numberFirst }}
                    </text>
                    <text class="popup-content-item-creditCard-list-item-body-text">
                      XXXX
                    </text>
                    <text class="popup-content-item-creditCard-list-item-body-text">
                      XXXX
                    </text>
                    <text class="popup-content-item-creditCard-list-item-body-text">
                      {{ item.numberEnd }}
                    </text>
                  </view>
                </template>
              </uni-list-item>
            </template>
          </uni-list>
          <!-- 新增信用卡 -->
          <view class="popup-content-item-creditCard-list-item-add">
            <uni-icons class="popup-content-item-creditCard-list-item-add-icon" type="icon-common-plus"
              custom-prefix="icon" size="16" />
          </view>
        </view>
      </view>
      <!-- bottom -->
      <view class="popup-comment-container">
        <!-- 關閉 -->
        <button type="button" class="popup-btn popup-cancle" @click="close">{{ $t('common.close') }} </button>
        <!-- 確認 -->
        <button type="button" class="popup-btn popup-confirm" @click="confirmPay">{{ $t('common.confirm') }} </button>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { toPay } from '@/utils/routers'
const emit = defineEmits(['update:Data'])
const popupRef = ref()

const creditCardList = ref([
  {
    id: 'asdfa2342a',
    name: '信用卡1',
    icon: 'icon-wallet-creditCard',
    numberFirst: '1234',
    numberEnd: '1234',
    selected: false
  },
  {
    id: 'awer23r23',
    name: '信用卡2',
    icon: 'icon-wallet-creditCard',
    numberFirst: '1234',
    numberEnd: '1234',
    selected: false
  },
])

const selectCreditCard = (id: string) => {
  creditCardList.value.forEach(item => {
    item.selected = item.id == id
  })
}

const close = () => {
  popupRef.value?.close()
  payProcess.value = 'bill'
}

const open = () => {
  popupRef.value?.open()
  payProcess.value = 'bill'
}
const payProcess = ref('bill')
const confirmBill = () => {
  payProcess.value = 'payMethod'
}
const confirmPayMethod = () => {
  payProcess.value = 'pay'
}
const confirmPay = () => {
  popupRef.value?.close()
  payProcess.value = 'bill'
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
  padding: 32rpx;
}

// header
.popup-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12rpx;
  position: relative;

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

// footer
.popup-comment-container {
  margin-top: 28rpx;
  padding-left: 16rpx;
  display: flex;
  // justify-content: space-between;
  justify-content: flex-end;
  // gap: 16rpx;

  .popup-comment-container-item {
    // display: flex;
    display: none;
    color: var(--play-sponsor-color);
    font-size: 20rpx;
    line-height: 1;

    .popup-comment-container-item-icon {
      // padding-top: 4rpx;
      transform: translateY(4rpx);
      font-size: 20rpx !important;
      color: var(--play-sponsor-color) !important;
    }

  }

  .popup-btn {
    background-color: #937CFF;
    color: #fff;
    border-radius: 8rpx;
    padding: 8rpx 16rpx;
    font-size: 20rpx;
    line-height: 1;
    margin: unset;
  }
}

.popup-container.popup-container-sponsor-checkOrder {
  display: flex;
  flex-direction: column;
  // gap: 16rpx;

  .popup-content {
    margin-top: 16rpx;
    gap: 16rpx;

    .popup-content-item {
      justify-content: space-between;
      color: var(--text-color-secondary);
    }

    .popup-content-item.popup-content-item-money {

      border: 0;

      .popup-content-item-money-text {
        margin: 0;
        color: var(--text-color-secondary);
      }
    }
  }

  .popup-comment-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 8rpx;

    .popup-comment-container-item-icon {
      font-size: 96rpx !important;
      color: var(--text-color-secondary) !important;
    }

    .popup-comment-container-item-title {
      font-size: 18rpx;
      line-height: 1;
      transform: translateY(-12rpx);
      color: var(--text-color-senary);
    }
  }
}

.popup-container.popup-container-sponsor-confirm {
  display: flex;
  flex-direction: column;
  // gap: 16rpx;

  .popup-content {
    margin-top: 16rpx;
    gap: 16rpx;

    ::v-deep(.uni-list) {
      .uni-list {
        background: transparent !important;
        gap: 12rpx;
      }

      .uni-list-item {
        background: transparent !important;
        border-radius: 16rpx;

        &.active {
          border: 1px solid var(--text-color-secondary);
        }

        .uni-list-item__container {
          padding: 8rpx 28rpx;
        }

        .popup-content-item-creditCard-list-item-body {
          display: flex;
          align-items: center;
          gap: 16rpx;
          font-size: 20rpx;
        }
      }
    }

    .popup-content-item {
      justify-content: space-between;
      color: var(--text-color-secondary);
    }

    .popup-content-item.popup-content-item-money {

      border: 0;

      .popup-content-item-money-text {
        margin: 0;
        color: var(--text-color-secondary);
      }
    }

    .popup-content-item-creditCard-list-item-add {
      height: 100%;

      .popup-content-item-creditCard-list-item-add-icon {
        border: 1px solid var(--text-color-secondary);
        border-radius: 50%;
        padding: 4rpx 8rpx;
        scale: 0.8;
        font-size: 16rpx !important;
        color: var(--text-color-secondary) !important;
      }


    }
  }

  .popup-comment-container {
    justify-content: flex-end;
    align-items: center;
    margin-top: 32rpx;
    gap: 24rpx;
    padding: unset;

    .popup-cancle {
      background: var(--text-color-quaternary);
    }
  }
}
</style>
