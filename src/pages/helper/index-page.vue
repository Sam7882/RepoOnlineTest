<template>
  <view class="container container-sponsor-confirm">
    <c-headerNav title="幫助中心" />
    <view class="helper-container">
      <view class="helper-search">
        <uni-easyinput v-model="search" class="inputStyle" placeholder="搜尋" prefixIcon="search" :trim="true"
          :clearable="false" />

      </view>
      <view class="helper-collapse-container">
        <uni-collapse>
          <template v-for="(item, index) in helpList" :key="index">
            <uni-collapse-item class="helper-collapse-item" :title="item.title" :show-animation="true"
              title-border="none">
              <view class="content">
                <text class="text" v-html="item.content"></text>
              </view>
            </uni-collapse-item>
          </template>
        </uni-collapse>
      </view>
    </view>
  </view>
</template>

<script setup>
// TEMP: 幫助中心

import { onShow } from '@dcloudio/uni-app'
import { checkViewportAutoReplace } from '@/utils/routers'

const search = ref('')

const helpList = [
  {
    title: '使用动画',
    content: '1.成立訂單付款滿5天，可至錢包提領。</br>2.成立訂單付款滿5天，可至錢包提領。</br>3.成立訂單付款滿5天，可至錢包提領。</br>4.成立訂單付款滿5天，可至錢包提領。</br>'
  },
  {
    title: '成立訂單',
    content: '1.成立訂單付款滿5天，可至錢包提領。</br>2.成立訂單付款滿5天，可至錢包提領。</br>3.成立訂單付款滿5天，可至錢包提領。</br>4.成立訂單付款滿5天，可至錢包提領。</br>'
  },
  {
    title: '帳戶安全',
    content: '1.成立訂單付款滿5天，可至錢包提領。</br>2.成立訂單付款滿5天，可至錢包提領。</br>3.成立訂單付款滿5天，可至錢包提領。</br>4.成立訂單付款滿5天，可至錢包提領。</br>'
  },
  {
    title: '如何設定',
    content: '1.成立訂單付款滿5天，可至錢包提領。</br>2.成立訂單付款滿5天，可至錢包提領。</br>3.成立訂單付款滿5天，可至錢包提領。</br>4.成立訂單付款滿5天，可至錢包提領。</br>'
  },
]

onShow(() => {
  checkViewportAutoReplace()
})

</script>

<style scoped lang="scss">
.helper-container {
  padding: 32rpx 40rpx 0;

}

.helper-search {
  margin-bottom: 8rpx;
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
  ::v-deep(.uni-easyinput__content) {
    margin-bottom: 0rpx;

    &.is-input-border {
      border: none;
      background: var(--text-color-tertiary) !important;
      border-radius: 10rpx;
      padding: 4rpx 32rpx;

      &.is-focused {
        border: 1px solid var(--primary-color) !important;

        .uniui-eye-filled {
          color: var(--primary-color) !important;
        }
      }
    }

    .uni-input-placeholder {
      color: var(--text-color-quaternary) !important;
      font-size: var(--font-size-content-pc-large);
    }

    .uni-easyinput__content-input {
      color: var(--text-color-secondary) !important;
      font-size: var(--font-size-content-pc-large);
    }
  }

  &.errorStyle ::v-deep(.uni-easyinput__content) {
    &.is-input-border {
      border: 1px solid var(--text-color-error) !important;
    }
  }
}

.helper-collapse-container {
  margin-top: 32rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    margin-top: 16rpx;
  }
}

.helper-collapse-item {
  border-bottom: 1px solid var(--text-color-octonary);
  padding: 32rpx 0 16rpx;


  @media screen and (min-width: 768px) and (max-width: 960px) {
    padding: 24rpx 0 8rpx;
  }

  .content {
    line-height: 1.5;
    margin-bottom: 14rpx;

    @media screen and (min-width: 768px) and (max-width: 960px) {
      margin-bottom: 8rpx;
    }

    .text {
      font-size: var(--font-size-content-pc);
      color: var(--text-color-quaternary);
    }
  }

  ::v-deep(.uni-collapse-item__title) {
    .uni-collapse-item__title {
      margin-bottom: 16rpx;

      &:hover {
        cursor: pointer;
      }
    }

    .uni-collapse-item__title-box {
      padding: unset;
      height: fit-content;
    }

    .uni-collapse-item__title-text {
      line-height: 1;
      font-size: var(--font-size-title-pc);
    }

    .uni-collapse-item__title-wrap {
      flex: 0;
    }
  }

}
</style>
