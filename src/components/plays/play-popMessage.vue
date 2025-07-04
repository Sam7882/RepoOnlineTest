<template>
  <uni-popup class="play-popMessage" ref="popupRef" :type="isPc ? 'right' : 'bottom'"
    :borderRadius="isPc ? '0' : '60rpx 60rpx 0 0'" background-color="#f6f6f6" @change="handleChange"
    mask-background-color="rgba(0, 0, 0, 0)">
    <view class="popup-container ">
      <!-- 標題與關閉 -->
      <view class="popup-header">
        <text class="popup-title">{{ $t('common.comment') }}(88)</text>
        <uni-icons class="popup-close" type="closeempty" size="16" @click="close" />
      </view>
      <view class="popup-content">
        <scroll-view class="popup-comment-list-scroll" scroll-y>
          <uni-list class="popup-comment-list" :border="false">
            <template v-for="(item, index) in 20" :key="item">
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
                        <uni-icons class="icon" type="icon-input-like" custom-prefix="icon" size="16" />
                        <text class="popup-comment-list-item-content-icon-item-text">1</text>
                      </view>
                    </view>
                    <!-- 查看幾則回覆提示 -->
                    <view class="popup-comment-list-item-content-reply">
                      <text v-if="index !== 0">{{ $t('common.viewReply', { num: 0 }) }}</text>
                      <!-- 回復的內容樣子 -->
                      <play-replyMessage v-else />
                    </view>
                  </view>

                </template>
              </uni-list-item>
            </template>
          </uni-list>
        </scroll-view>
        <!-- 留言輸入欄位 -->
        <view class="popup-comment-container">
          <!-- EMOJI 滑動 -->
          <view class="popup-comment-emoji">
            <swiper class="popup-comment-emoji-swiper" :indicator-dots="false" :autoplay="false"
              :display-multiple-items="10" :circular="true">
              <swiper-item v-for="(emoji, groupIndex) in emojiGroups" :key="groupIndex">
                <text class="popup-comment-emoji-item" @click="selectEmoji(emoji)">
                  {{ emoji }}
                </text>
              </swiper-item>
            </swiper>

            <!-- <scroll-view class="popup-comment-emoji-scroll" scroll-x>
              
            </scroll-view> -->
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
            <input type="textarea" v-model="replayContent" class="popup-comment-input-textarea" placeholder="新增評論..." />
            <!-- <uni-easyinput type="textarea" v-model="replayContent" class="popup-comment-input-textarea"
              placeholder="新增評論..." /> -->
            <view class="icon-container">
              <uni-icons class="icons" type="icon-common-share" custom-prefix="icon" size="24" @click="sendReplay" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
// TEMP: 組件-留言彈跳窗口
import { getElementInfo } from '@/utils/tools';
import { useViewportStore } from '@/stores/useViewportStore'
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)
const emit = defineEmits(['update:autoDate'])
const popupRef = ref()

const close = () => {
  popupRef.value?.close()
}

const open = () => {
  popupRef.value?.open()
}



defineExpose({ open, close })

const emojiGroups = ref([
  '😀', '😍', '😂', '😲', '😟', '😅', '😎', '😋', '😴', '😭',
  '👍', '👎', '👏', '🙌', '👊', '✌️', '👌', '👈', '👉', '👆', '👇', '👌',
  '❤️', '💛', '💚', '💙', '💜', '💔', '❣️', '💕', '💖', '💗', '💓', '💞',
  '💯', '⭐', '🌟', '✨', '⚡', '💥', '💢', '💫', '💦', '💨',
])

const replayContent = ref('')
const sendReplay = () => {
  if (!replayContent.value) return

  console.log("🚀 ~ replayContent:", replayContent)
}

// 選擇 emoji
const selectEmoji = (emoji: string) => {
  console.log('選擇的 emoji:', emoji)
  // 這裡可以將 emoji 插入到輸入框中
  // 例如：emit('emoji-selected', emoji)
}




// 獲取底部留言輸入欄位高度
const updateContainerHeight = () => {
  console.log("🚀 ~ updateContainerHeight ~ updateContainerHeight")
  // 使用 uni.createSelectorQuery 獲取元素信息
  getElementInfo('.popup-comment-container',
    (info: any) => {
      if (info && info.height) {
        updateCSSVariable(info.height)
        // 設置haveResize為false，阻止窗口未變化時重複執行
        haveResize.value = false
      } else {
        console.log("🚀 ~ updateContainerHeight ~ 元素未找到")
      }
    }, getCurrentInstance())

}
// 將高度設置為 CSS 變數
const updateCSSVariable = (height: number) => {
  const dom = document.querySelector('body')
  if (dom) {
    (dom as any).style.setProperty('--reply-input-container-height', `${height}px`)
  }
}

// 初始化為true，確保第一次開啟時執行
const haveResize = ref(true)

const handleChange = (e: any) => {
  if (e.show) {
    // 延遲執行，確保 DOM 已渲染完成
    if (!haveResize.value) return
    nextTick(() => {
      setTimeout(() => {
        updateContainerHeight()

      }, 100)
    })
  }
}


const setHaveResize = () => {
  haveResize.value = true
}
// 組件掛載後獲取高度
onMounted(() => {
  // 監聽視窗大小變化，有變化則設置haveResize為true
  uni.onWindowResize(setHaveResize)
})

// 組件卸載時移除監聽
onUnmounted(() => {
  uni.offWindowResize(setHaveResize)
})
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
  & {
    z-index: var(--z-index-max) !important;
  }
}

.popup-container {
  padding: 32rpx;
  border-radius: 60rpx 60rpx 0 0;
  background-color: var(--background-color-light);
  width: 100%;
  height: 100%;
  overflow: visible;



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

.popup-container {
  padding-top: 32rpx;
}

.popup-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16rpx;
  position: relative;

  @media screen and (min-width: 961px) {
    margin-bottom: 32rpx;
  }

  .popup-title {
    line-height: 1;
    font-size: var(--font-size-content-pc-large);
    font-weight: 500;
    color: var(--text-color-primary);
  }

  .popup-close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.popup-comment-list-scroll {
  max-height: 570rpx;

  @media screen and (min-width: 768px) and (max-width: 960px) {
    max-height: 50dvh;
  }

  @media screen and (min-width: 961px) {
    max-height: calc(95dvh - var(--reply-input-container-height));
  }
}

// 評論區
.popup-content {
  border-radius: 24rpx;
  background: var(--text-color-secondary);
  color: var(--text-color-primary);

  .uni-list {
    gap: 32rpx;
    padding-bottom: 16rpx;

    @media screen and (min-width: 768px) and (max-width: 960px) {
      gap: 16rpx;
    }

  }

  ::v-deep(.uni-list-item popup-comment-list-item) {

    // 列表項目
    .uni-list-item__container {
      position: relative;
      display: flex;
      padding: 0;
      gap: 16rpx;

      .uni-list-item__header {
        display: none;
      }
    }
  }

  // 留言內容資訊
  .popup-comment-list-item-content {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
    flex: 1;
    padding-right: 12rpx;

    // gap: 8rpx;
    // 名稱
    .popup-comment-list-item-content-name {
      position: relative;
      display: flex;
      align-items: flex-end;
      gap: 12rpx;

      .popup-comment-list-item-content-name-text {
        font-size: var(--font-size-content-pc-large);
        font-weight: 500;
      }

      // 創作者
      .popup-comment-list-item-content-name-tip {
        font-size: var(--font-size-content-pc-small);
        color: var(--primary-color);
      }

      .popup-comment-list-item-time {
        display: flex;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: var(--font-size-content-pc-small);
        color: var(--input-border-color);
      }
    }

    // ID
    .popup-comment-list-item-content-id {
      display: flex;
      font-size: var(--font-size-content-pc-small);
      line-height: 1;
      color: var(--input-border-color);
    }

    // 內文
    .popup-comment-list-item-content-text-text {
      margin-top: 4rpx;
      display: flex;
      line-height: 1.5;
      white-space: break-spaces;
      font-size: var(--font-size-content-pc);
      color: var(--text-color-primary);
    }

    .popup-comment-list-item-content-icon {
      display: flex;
      gap: 48rpx;
      margin-top: 8rpx;


      .popup-comment-list-item-content-icon-item {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .icon {
          color: var(--input-border-color) !important;
          font-size: var(--font-size-content-pc-large) !important;
        }

        .popup-comment-list-item-content-icon-item-text {
          font-size: var(--font-size-content-pc);
          line-height: 1;
        }
      }
    }

    .popup-comment-list-item-content-reply {
      margin-top: 8rpx;
      display: flex;
      line-height: 1.5;
      font-size: var(--font-size-content-pc-small);
      color: var(--primary-color);
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
  padding: 8rpx 0;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding-bottom: var(--iphone-homeBar-height);

  @media screen and (min-width: 768px) and (max-width: 960px) {
    padding: 8rpx 0;
  }

  .popup-comment-emoji-swiper {
    height: calc(var(--font-size-title-pc-xlarge)*1.7);

    .popup-comment-emoji-item {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: calc(var(--font-size-title-pc-xlarge)*1.2);
    }
  }

  .popup-comment-input {
    position: relative;
    display: flex;
    gap: 24rpx;
    align-items: center;

    .popup-comment-input-avatar {
      width: 64rpx;
      height: 64rpx;
    }

    .popup-comment-input-textarea {
      background: var(--text-color-denary);
      padding: 12rpx 32rpx;
      border-radius: 100rpx;
      height: 64rpx;
      flex: 1;
      padding-right: calc(64rpx + 16rpx);
    }

    .icon-container {
      position: absolute;
      right: 16rpx;
      top: 50%;
      width: 48rpx;
      height: 48rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-50%);
      background: var(--text-color-secondary);
      border-radius: 100rpx;
      padding: 8rpx;

      &>.icons {
        color: var(--text-color-gray3) !important;
        font-size: 28rpx !important;
      }
    }
  }
}
</style>
