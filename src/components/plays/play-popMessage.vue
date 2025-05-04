<template>
  <uni-popup ref="popupRef" type="bottom" background-color="#f6f6f6">
    <view class="popup-container">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <text class="popup-title">{{ $t('play.comment') }}(88)</text>
        <uni-icons class="popup-close" type="closeempty" size="16" @click="close" />
      </view>
      <view class="popup-content">
        <scroll-view class="popup-comment-list-scroll" scroll-y>
          <uni-list class="popup-comment-list" :border="false">
            <template v-for="item in 3" :key="item">
              <uni-list-item title="留言" class="popup-comment-list-item" :border="false">
                <template #body>
                  <!-- 大頭照 -->
                  <view class="popup-comment-list-item-avatar avatar-image-container">
                    <image class="avatar-image" src="/static/images/template/img-template-01.png" mode="widthFix">
                    </image>
                  </view>
                  <!-- 留言內容 資訊 -->
                  <view class="popup-comment-list-item-content">
                    <!-- 名稱 -->
                    <view class="popup-comment-list-item-content-name">
                      <text class="popup-comment-list-item-content-name-text">評論者名稱</text>
                      <!-- TIP -->
                      <text class="popup-comment-list-item-content-name-tip">{{ $t('common.creator') }}</text>
                      <!-- 時間標示 絕對位置 右上角 -->
                      <view class="popup-comment-list-item-time">
                        <text class="popup-comment-list-item-time-text">
                          1{{ $t('common.hour') }}
                        </text>
                      </view>
                    </view>
                    <!-- ID -->
                    <view class="popup-comment-list-item-content-id">
                      <text class="popup-comment-list-item-content-id-text">@評論者ID</text>
                    </view>
                    <!-- 內文 -->
                    <view class="popup-comment-list-item-content-text">
                      <text class="popup-comment-list-item-content-text-text">文字文字文字字文字文字文字文字文</text>
                    </view>
                    <!-- ICON 操作 留言數 愛心數 -->
                    <view class="popup-comment-list-item-content-icon">
                      <view class="popup-comment-list-item-content-icon-item">
                        <uni-icons class="icon" type="icon-common-chat" custom-prefix="icon" size="16" />
                        <text class="popup-comment-list-item-content-icon-item-text">0</text>
                      </view>
                      <view class="popup-comment-list-item-content-icon-item">
                        <uni-icons class="icon" type="icon-input-upload" custom-prefix="icon" size="16" />
                        <text class="popup-comment-list-item-content-icon-item-text">1</text>
                      </view>
                    </view>
                    <!-- 查看幾則回覆提示 -->
                    <view class="popup-comment-list-item-content-reply">
                      <text>{{ $t('common.viewReply', { num: 0 }) }}</text>
                    </view>
                  </view>

                </template>
              </uni-list-item>
            </template>
          </uni-list>
        </scroll-view>
      </view>
      <!-- 留言輸入欄位 -->
      <view class="popup-comment-container">
        <!-- EMOJI 滑動 -->
        <view class="popup-comment-emoji">
          <scroll-view class="popup-comment-emoji-scroll" scroll-x>
            <text>😀</text>
            <text>😍</text>
            <text>😂</text>
            <text>😲</text>
            <text>😟</text>
            <text>😅</text>
            <text>😂</text>
            <text>😀</text>
            <text>😍</text>
            <text>😂</text>
            <text>😲</text>
            <text>😟</text>
            <text>😅</text>
            <text>😂</text>
            <text>😀</text>
            <text>😍</text>
            <text>😂</text>
            <text>😲</text>
            <text>😂</text>
            <text>😲</text>
            <text>😟</text>
            <text>😅</text>
            <text>😂</text>
            <text>😀</text>
            <text>😍</text>
            <text>😂</text>
            <text>😲</text>
            <text>😂</text>
            <text>😲</text>
            <text>😟</text>
            <text>😅</text>
            <text>😂</text>
            <text>😀</text>
            <text>😍</text>
            <text>😂</text>
            <text>😲</text>
            <text>😟</text>
            <text>😅</text>
            <text>😂</text>
          </scroll-view>
        </view>
        <!-- 留言輸入框 -->
        <view class="popup-comment-input">
          <!-- 頭像 -->
          <view class="popup-comment-input-avatar avatar-image-container">
            <image class="popup-comment-input-avatar-image avatar-image"
              src="/static/images/template/img-template-01.png" mode="widthFix">
            </image>
          </view>
          <!-- 輸入框 -->
          <uni-easyinput type="textarea" class="popup-comment-input-textarea" placeholder="新增評論..." />
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
// TEMP: 影音頁的留言彈跳窗口
const emit = defineEmits(['update:autoDate'])
const popupRef = ref()

const close = () => {
  popupRef.value?.close()
}

const open = () => {
  popupRef.value?.open()
}

defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {

  // 需同時有圓弧，才能有效果
  uni-view[name="content"] {
    border-radius: 32rpx 32rpx 0 0 !important;
    bottom: 136rpx !important; // 底部導航高
    max-height: calc(100% - 68px - 25%);
  }

  .uni-popup__wrapper {
    background-color: var(--background-color-light) !important;
    border-radius: 32rpx 32rpx 0 0 !important;
    height: 100%;
  }
}

.popup-container {
  padding-top: 32rpx;
}

.popup-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12rpx;
  position: relative;

  .popup-title {
    line-height: 1;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--text-color-primary);
  }

  .popup-close {
    position: absolute;
    right: 32rpx;
    top: 50%;
    transform: translateY(-50%);
  }
}

.popup-comment-list-scroll {
  max-height: 570rpx;
}

// 評論區
.popup-content {
  border-radius: 24rpx;
  background: var(--text-color-secondary);
  color: var(--text-color-primary);

  .uni-list {
    gap: 32rpx;
    padding-bottom: 16rpx;

  }

  ::v-deep(.uni-list-item popup-comment-list-item) {

    // 列表項目
    .uni-list-item__container {
      position: relative;
      display: flex;
      padding: 0;
      gap: 16rpx;
      padding: 0 32rpx;


      .uni-list-item__header {
        display: none;
      }
    }

    // 留言內容資訊
    .popup-comment-list-item-content {
      display: flex;
      flex-direction: column;
      gap: 4rpx;
      flex: 1;

      // gap: 8rpx;
      // 名稱
      .popup-comment-list-item-content-name {
        position: relative;
        display: flex;
        align-items: flex-end;
        gap: 20rpx;

        .popup-comment-list-item-content-name-text {
          font-size: 28rpx;
          font-weight: 500;
        }

        // 創作者
        .popup-comment-list-item-content-name-tip {
          font-size: 22rpx;
          color: var(--primary-color);
        }

        .popup-comment-list-item-time {
          display: flex;
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 22rpx;
          color: var(--input-border-color);
        }
      }

      // ID
      .popup-comment-list-item-content-id {
        display: flex;
        font-size: 22rpx;
        line-height: 1;
        color: var(--input-border-color);
      }

      // 內文
      .popup-comment-list-item-content-text-text {
        margin-top: 4rpx;
        display: flex;
        line-height: 1.5;
        white-space: break-spaces;
        font-size: 24rpx;
        color: var(--text-color-primary);
      }

      .popup-comment-list-item-content-icon {
        display: flex;
        gap: 64rpx;
        margin-top: 8rpx;


        .popup-comment-list-item-content-icon-item {
          display: flex;
          align-items: center;
          gap: 12rpx;

          .icon {
            color: var(--input-border-color) !important;
            font-size: 28rpx !important;
          }

          .popup-comment-list-item-content-icon-item-text {
            font-size: 24rpx;
            line-height: 1;
          }
        }
      }

      .popup-comment-list-item-content-reply {
        margin-top: 8rpx;
        display: flex;
        line-height: 1.5;
        font-size: 24rpx;
        color: var(--primary-color);
      }

    }


  }
}

// 大頭照
// 頭像
.avatar-image-container {
  width: 80rpx;
  height: 80rpx;
  // border: ;
  background: var(--primary-color);
  border-radius: 100%;
  overflow: hidden;

  ::v-deep(.avatar-image) {
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

// 留言區
.popup-comment-container {
  border-top: 1px solid var(--text-color-octonary);
  padding: 8rpx 32rpx;
  padding-bottom: 36rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;

  .popup-comment-emoji-scroll {
    ::v-deep(.uni-scroll-view) {
      .uni-scroll-view-content {
        display: flex;
        white-space: nowrap;
        gap: 32rpx;
        font-size: 48rpx;
      }
    }
  }

  .popup-comment-input {
    display: flex;
    gap: 24rpx;
    align-items: center;

    .popup-comment-input-avatar {
      width: 64rpx;
      height: 64rpx;
    }

    .popup-comment-input-textarea {
      height: 64rpx;
      flex: 1;

      ::v-deep(.uni-easyinput) {

        .uni-easyinput__content {
          height: 100%;
          border: 0;
          border-radius: 32rpx;
          background: var(--text-color-denary) !important;

          .uni-easyinput__content-textarea {
            height: 100%;
            min-height: 100%;
            padding-top: 12rpx;

          }
        }

      }
    }
  }
}


.popup-subtitle {
  font-size: 24rpx;
  margin-bottom: 80rpx;
  color: #333;
}

.example-body {
  margin-bottom: 48rpx;
}

.date-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48rpx;
  padding: 16rpx;
  border-radius: 16rpx;
  gap: 16rpx;
}

.date-container-item {
  flex: 1;
  border-bottom: 1px solid var(--text-color-primary);
  padding: 0 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.date-value {
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  text-align: center;
}

.date-label {
  font-size: 20rpx;
  color: #999;
  display: block;
  text-align: center;
}

.result-text {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 48rpx;
}

.popup-confirm-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-confirm {
  background-color: #937CFF;
  color: #fff;
  border-radius: 28rpx;
  padding: 24rpx 96rpx;
  font-size: 28rpx;
  line-height: 1;
}

/* 日期選擇器 */
::v-deep(.uni-calendar-item__weeks-box) {
  .uni-calendar-item__weeks-box .uni-calendar-item--checked {
    background-color: var(--primary-color) !important;
  }
}

::v-deep(.uni-date-btn--ok) {
  .uni-datetime-picker--btn {
    background-color: var(--primary-color) !important;
    border-radius: 24rpx !important;
  }
}
</style>
