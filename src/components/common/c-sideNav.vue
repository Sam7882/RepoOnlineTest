<template>
  <uni-popup ref="popupRef" type="right" background-color="var(--background-color-dark)">
    <view class="popup-container popup-container-sponsor-confirm">
      <view class="popup-close-container" @click="close">
        <uni-icons class="popup-close-icon" type="closeempty" size="24" color="var(--text-color-secondary)"></uni-icons>
      </view>
      <!-- 標題與關閉 -->
      <view class="popup-header">

        <!-- 帳號頭像 垂直排列 -->
        <!-- 頭像 -->
        <view class="statistics-account-avatar-container">
          <image class="statistics-account-avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
          </image>
        </view>
        <!-- 名稱與帳號 -->
        <view class="statistics-account-info-name-container">
          <view class="statistics-account-info-name-title-container">
            <text class="statistics-account-info-title">名稱名稱</text>
            <!-- 認證圖標 -->
            <view class="statistics-account-info-prove-container">
              <uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
                color="var(--text-color-senary)"></uni-icons>
            </view>
          </view>
          <view class="statistics-account-info-name-account-container">
            <text class="statistics-account-info-account">@88888888.88</text>
          </view>
        </view>
      </view>
      <view class="popup-content">
        <!-- 個人資料 -->
        <view class="popup-content-item" @click="clickToPage('creatorHome')">
          <uni-icons class="popup-content-icon" type="icon-common-person-circle-filled" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.profile') }}</text>
        </view>
        <!-- 個人數據 -->
        <view class="popup-content-item" @click="clickToPage('statistics')">
          <uni-icons class="popup-content-icon" type="icon-common-analyze" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.statistics') }}</text>
        </view>
        <!-- 錢包管理 -->
        <view class="popup-content-item" @click="clickToPage('wallet')">
          <uni-icons class="popup-content-icon" type="icon-wallet-creditCard-filled" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.wallet') }}</text>
        </view>
        <!-- 我的收藏 -->
        <view class="popup-content-item" @click="clickToPage('favorites')">
          <uni-icons class="popup-content-icon" type="icon-common-Folder-open" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.favorites') }}</text>
        </view>
        <!-- 我的關注 -->
        <view class="popup-content-item" @click="clickToPage('following')">
          <uni-icons class="popup-content-icon" type="icon-common-focus" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.following') }}</text>
        </view>
        <!-- 聯繫客服 -->
        <view class="popup-content-item" @click="clickToPage('service')">
          <uni-icons class="popup-content-icon" type="icon-common-service" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.service') }}</text>
        </view>
        <!-- 登出 -->
        <view class="popup-content-item" @click="clickToPage('logout')">
          <uni-icons class="popup-content-icon" type="icon-common-out" custom-prefix="icon" size="16"
            color="var(--text-color-secondary)"></uni-icons>
          <text class="popup-content-text">{{ $t('menu.logout') }}</text>
        </view>

      </view>
    </view>

    <teleport to='#app'>
      <!-- 聯繫客服 -->
      <c-servicePopUp ref="servicePopUp" />
    </teleport>
    <teleport to='#app'>
      <!-- 聯繫客服 -->
      <c-confirmPopUp ref="confirmPopUp" />
    </teleport>
  </uni-popup>
</template>

<script setup>
// TEMP: 側邊欄
import { toCreatorHome, toStatistics, toWallet, toFavorites, toFollowing, toLogin } from '@/utils/routers'
const emit = defineEmits(['update:Data'])
const popupRef = ref()
const props = defineProps({
  bgColor: {
    type: String,
    default: 'var(--background-color-dark)',
  },
})
// 關閉側邊欄
const close = () => {
  popupRef.value?.close()
}
// 開啟側邊欄
const open = () => {
  popupRef.value?.open()
}

// 對應跳轉
const clickToPage = (page) => {

  switch (page) {
    case 'creatorHome':
      toCreatorHome()
      close()
      break
    case 'statistics':
      toStatistics()
      close()
      break
    case 'wallet':
      toWallet()
      close()
      break
    case 'favorites':
      toFavorites()
      close()
      break
    case 'following':
      toFollowing()
      close()
      break
    case 'service':
      // 目前沒此頁面
      openService()
      break
    case 'logout':
      logout()
      break
  }
}

const servicePopUp = ref(null)

const openService = () => {
  console.log("🚀 ~ openService ~ openService :")
  servicePopUp.value.open()
}

const confirmPopUp = ref(null)
const logout = () => {
  confirmPopUp.value.open({
    title: '登出',
    content: '確認要登出?',
    onConfirm: () => {
      toLogin()
    }
  })

}


defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {

  // 需同時有圓弧，才能有效果
  uni-view[name="content"] {
    // border-radius: 32rpx 32rpx 0 0 !important;
    bottom: 136rpx !important; // 底部導航高
    // max-height: calc(100% - 68px - 25%);
  }

  .uni-popup__wrapper {
    // background-color: var(--background-color-dark) !important;
    // border-radius: 32rpx !important;
    // height: 100%;
  }
}

.popup-container {
  // padding: 32rpx;
  padding: 64rpx;
  display: flex;
  flex-direction: column;
  gap: 64rpx;
}

.popup-close-container {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
  z-index: 10;

  .popup-close-icon {
    font-size: 32rpx !important;
  }

}

// header
.popup-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;

  // 頭像
  .statistics-account-avatar-container {
    width: 112rpx;
    height: 112rpx;
    border: 6rpx solid var(--primary-color);
    border-radius: 100%;
    overflow: hidden;

    ::v-deep(.statistics-account-avatar) {
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

  /* 帳號資訊 */
  .statistics-account-info-name-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: var(--text-color-secondary);

    // 名稱
    .statistics-account-info-name-title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // width: 100%;
      gap: 8rpx;
      font-size: 22rpx;

      .statistics-account-info-title {}

      // 認證圖標
      .icon-community-prove {
        display: none;
        font-size: 22rpx !important;
      }
    }

    .statistics-account-info-name-account-container {
      display: flex;
      height: fit-content;

      .statistics-account-info-account {
        font-size: 20rpx;
        line-height: 1;
      }
    }
  }
}

// body
.popup-content {
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  border-radius: 24rpx;
  color: var(--play-sponsor-color);

  .popup-content-item {
    display: flex;
    gap: 32rpx;
    font-size: 24rpx;
    align-items: center;

    .popup-content-text {
      color: var(--text-color-secondary);
    }

    .popup-content-icon {
      width: 32rpx !important;
      font-size: 32rpx !important;
      color: var(--text-color-secondary) !important;
    }

  }
}
</style>
