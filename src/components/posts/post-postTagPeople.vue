<template>
  <uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
    background-color="var(--text-color-secondary)" @change="handlePopupChange">
    <view class="popup-container">
      <tagPeople ref="tagPeopleRef" class="tag-people-container">
        <template #closeIcon>
          <uni-icons class="tag-page-header-back" type="closeempty" size="16" @click="close" />
        </template>
      </tagPeople>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
// TEMP: 組件-標記人 使用APP 標記人頁面
import tagPeople from '@/pages/post/tagPeople.vue'
import { useI18n } from 'vue-i18n'
import { useViewportStore } from '@/stores/useViewportStore'
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)
const { t } = useI18n()
// TEMP:發布頁-組件-發布設定底部上滑彈窗
const props = defineProps({
  // 如果沒有傳入，之前設定的資料，那他就會將預設值傳出去
  defaultSelected: {
    type: String,
    default: 'publish'
  }
})
const emit = defineEmits(['updata:postSet'])
const popupRef = ref()
const selected = ref(props.defaultSelected ? props.defaultSelected : 'publish')
// 選項
const options = [
  { value: 'publish', label: t('post.public') },
  { value: 'fans', label: t('post.fansUser'), desc: t('post.followingFans') },
  { value: 'subscription', label: t('post.subscriptionUser') }
]
// 打開
const open = () => {
  popupRef.value?.open()
}
// 確認是否有按下 保存的判斷依據
const haveClickConfirm = ref(false)
const close = () => {
  popupRef.value?.close()
}
// radio 選擇
const handleRadioChange = (e: any) => {
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === e.detail.value) {
      selected.value = e.detail.value;
      break;
    }
  }

}

// 按下確認才會回傳
const confirm = () => {
  haveClickConfirm.value = true
  close()
}
// 當popup 打開或關閉時，會觸發
const handlePopupChange = (e: any) => {
  // 如果沒有傳入，之前設定的資料，那他就會將預設值傳出去
  if (e.show) {
    haveClickConfirm.value = false
  }
  // 關閉時 有按下保存
  if (!e.show && haveClickConfirm.value) {
    emit('updata:postSet', selected.value)
    haveClickConfirm.value = false
  }
  // 直接關閉 沒有按下保存，會初始化為 外部傳入的值
  else if (!e.show && !haveClickConfirm.value) {
    selected.value = props.defaultSelected
  }

}


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
  width: fit-content;

  @media screen and (min-width: 961px) {
    width: 80vw;
    max-width: 800rpx;
  }

  @media screen and (min-width: 1920px) {
    width: 80vw;
    max-width: 1000rpx;
  }

  @media screen and (min-width: 2560px) {
    width: 80vw;
    max-width: 1200rpx;
  }
}


.tag-page-header-back {
  position: absolute;
  top: 50%;
  left: 16rpx;
  transform: translateY(-50%);
  color: var(--text-color-primary);

  font-size: var(--font-size-title-pc) !important;

  &:hover {
    cursor: pointer;
  }
}


.tag-people-container {
  ::v-deep(.tag-page) {
    .user-scroll-wrapper {
      max-height: 1000rpx;
    }

    .user-scroll-content {
      padding-right: 24rpx;
    }
  }
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
  font-size: var(--font-size-title-pc-large);
}

.popup-content {
  background-color: var(--background-color-light);
  padding: 40rpx;
  border-radius: 40rpx;
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
