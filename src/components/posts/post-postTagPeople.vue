<template>
  <uni-popup class="post-postTagPeople-popup" ref="popupRef" :type="isPc ? 'center' : 'bottom'"
    :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'" background-color="var(--background-color-light)"
    @change="handlePopupChange">
    <view class="popup-container">

      <!-- 標題與關閉 -->
      <view class="popup-header">
        <view class="header-title">
          <text class="title">{{ $t('post.tagPeople') }}</text>
          <view class="deco-line"></view>
        </view>
        <view class="icon-container popup-close-container">
          <uni-icons class="icons" type="closeempty" size="24" @click="close" />
        </view>
      </view>

      <view class="popup-content">
        <!-- 搜尋欄 -->
        <view class="search-box-container">
          <uni-search-bar class="search-box" v-model="search" :placeholder="$t('post.tagPeopleTip')"
            @input="handleSearchInput">
            <template v-slot:searchIcon>
              <uni-icons slot="searchIcon" class="search-box-search-icon" type="icon-common-search" custom-prefix="icon"
                size="16" />
            </template>
          </uni-search-bar>
        </view>
        <!-- 關注中 -->
        <text class="section-title">{{ $t('creator.following') }}</text>

        <scroll-view scroll-y class="user-scroll-wrapper">
          <view class="user-scroll-content">
            <uni-list :border="false" class="user-list">
              <template v-for="user in filteredUsers" :key="user.id">
                <uni-list-item :clickable="false" :border="false">
                  <template #body>
                    <view class="user-item">
                      <!-- 左側 -->
                      <view class="user-item-left">
                        <image class="user-item-avatar" :src="user.avatar" mode="widthFix" />
                        <view class="user-item-info">
                          <text class="user-item-info-name">{{ user.name }}</text>
                          <text class="user-item-info-account">{{ user.account }}</text>
                        </view>
                      </view>
                      <!-- 選取框 -->
                      <view class="user-item-right">
                        <checkbox class="user-item-right-checkbox" :checked="isSelected(user.id)"
                          @click="toggleUser(user)" />
                        <!-- 因樣式問題 故 使用 image 替代 checkbox -->
                        <view class="user-item-right-checkbox-custom-checked" v-if="isSelected(user.id)">
                          <image class="user-item-right-checkbox-custom-checked-image"
                            src="/static/icons/input/icon-input-checkbox-active.png" mode="widthFix" />
                        </view>
                        <view class="user-item-right-checkbox-custom-checked" v-else>
                          <image class="user-item-right-checkbox-custom-checked-image"
                            src="/static/icons/input/icon-input-checkbox-2.png" mode="widthFix" />
                        </view>
                      </view>
                    </view>
                  </template>
                </uni-list-item>
              </template>
            </uni-list>
          </view>
        </scroll-view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
// TEMP: 組件-標記人 使用APP 標記人頁面
import { onShow } from '@dcloudio/uni-app'
import { usePostData } from '@/stores/usePostData';
import { toPostIndex, checkViewportAutoReplace } from '@/utils/routers';
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
  console.log('我打開了')
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



const postStore = usePostData();
const search = ref('');
// 搜尋文字替換處理
const handleSearchInput = (text: string) => {
  const _text = search.value.trim().replace(/^@+/, ''); // 把開頭多餘的 @ 移除
  const keyword = _text.trim().toLowerCase();
  if (!keyword) return '';
  return keyword;
};
// 用戶
const allUsers = ref([
  { id: '1', name: '小痞', account: 'ohmygodyukai', avatar: '/static/images/template/img-template-01.png' },
  { id: '2', name: '火火', account: 'vcrljzyn2fd', avatar: '/static/images/template/img-template-02.png' },
  { id: '3', name: '小明', account: 'oaweradyukai', avatar: '/static/images/template/img-template-03.png' },
  { id: '4', name: '小華', account: 'waawersas', avatar: '/static/images/template/img-template-04.png' },
  { id: '5', name: '小莉', account: 'awerawe', avatar: '/static/images/template/img-template-01.png' },
  { id: '6', name: '小李', account: 'aweafezsef', avatar: '/static/images/template/img-template-02.png' },
  { id: '7', name: 'FIRE', account: '2344ww', avatar: '/static/images/template/img-template-03.png' },
  { id: '8', name: 'bigMan', account: 'zsfe2', avatar: '/static/images/template/img-template-04.png' },
  { id: '9', name: 'ice man', account: 'wr456er', avatar: '/static/images/template/img-template-04.png' },
  { id: '10', name: 'Iron Man', account: 'etrte47564', avatar: '/static/images/template/img-template-03.png' },
  { id: '11', name: 'Hulk', account: 't5td5dy', avatar: '/static/images/template/img-template-01.png' },
  { id: '12', name: 'Thor', account: 'abwbta', avatar: '/static/images/template/img-template-03.png' },
  { id: '13', name: 'Spider Man', account: 'a2345257s', avatar: '/static/images/template/img-template-01.png' },
  { id: '14', name: 'Batman', account: 's57yses', avatar: '/static/images/template/img-template-02.png' },
  { id: '15', name: 'Superman', account: '2342526', avatar: '/static/images/template/img-template-04.png' },
  { id: '16', name: 'Wonder Woman', account: '464aa46awe', avatar: '/static/images/template/img-template-02.png' },
  { id: '17', name: 'Flash', account: 'aw46aw4a', avatar: '/static/images/template/img-template-03.png' },
  { id: '18', name: 'Aquaman', account: 'w46awd7d57', avatar: '/static/images/template/img-template-02.png' },
  { id: '19', name: 'Cyborg', account: 'drt68ft79', avatar: '/static/images/template/img-template-03.png' },
  { id: '20', name: 'Green Lantern', account: 'gyu80hu9-', avatar: '/static/images/template/img-template-02.png' },
]);

// 渲染過濾符合搜尋名稱或帳號的用戶
const filteredUsers = computed(() => {
  if (!search.value) return allUsers.value;
  return allUsers.value.filter(user =>
    user.name.toLowerCase().includes(search.value) || user.account.toLowerCase().includes(search.value),
  );
});

// 切換用戶選取狀態
const toggleUser = (user: any) => {
  console.log("🚀 ~ toggleUser ~ user:", user)
  // 檢查用戶是否已存在於已選取用戶列表中
  const hasUser = postStore.taggedUsers.find(u => u.id === user.id);
  if (hasUser) {
    // 如果存在，則從已選取用戶列表中移除
    postStore.setTaggedUsers(postStore.taggedUsers.filter(u => u.id !== user.id));
  } else {
    // 如果不存在，則將用戶添加到已選取用戶列表中
    postStore.setTaggedUsers([...postStore.taggedUsers, user]);
  }
}
// 是否選取
const isSelected = (id: string) => {
  return postStore.taggedUsers.some(u => u.id === id);
}

// 返回發佈頁
const goBack = () => {
  toPostIndex();
}

onShow(() => {
  checkViewportAutoReplace()
})
</script>

<style scoped lang="scss">
.post-postTagPeople-popup {
  z-index: var(--z-index-max) !important;
  overflow: hidden;
}

.popup-container {
  padding: 32rpx;
  border-radius: 60rpx 60rpx 0 0;
  background-color: var(--background-color-light);
  width: fit-content;
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
  overflow: visible;
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
.tag-page-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  margin-bottom: 32rpx;

  .tag-page-header-back {
    position: absolute;
    top: 50%;
    left: 16rpx;
    transform: translateY(-50%);
    color: var(--text-color-primary);

    &:hover {
      cursor: pointer;
    }
  }

  .tag-page-header-title {
    font-size: var(--font-size-title-pc);
    font-weight: bold;
  }
}

.search-box-container {
  margin-bottom: 24rpx;

  .search-box {
    padding: 0;

    // background-color: #f5f5f5;
    // border-radius: 10rpx;
    .search-box-search-icon {
      color: var(--text-color-primary) !important;
    }
  }
}

.section-title {
  font-size: var(--font-size-content-pc);
  font-weight: bold;
  color: var(--input-border-color);
  margin: 16rpx 0;
}

.user-scroll-wrapper {
  height: 80vh;
}

.user-scroll-content {
  // padding: 24rpx;

  ::v-deep(.uni-list) {
    .uni-list-item__container {
      padding: 8rpx 0;
    }
  }
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24rpx;
  padding: 16rpx 0;
  flex: 1;

  &:hover {
    cursor: default;
  }

  .user-item-left {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }

  // 大頭照
  .user-item-avatar {
    width: 96rpx;
    height: 96rpx !important;
    border-radius: 50%;

  }

  ::v-deep(.user-item-avatar) {

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

  .user-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    .user-item-info-name {
      font-size: var(--font-size-title-pc);
      font-weight: 500;
    }

    .user-item-info-account {
      font-size: var(--font-size-content-pc-small);
      color: #888;
    }
  }

  .user-item-info {
    flex: 1;

    .user-item-info-name {
      font-size: var(--font-size-title-pc);
      font-weight: 500;
    }

    .user-item-info-account {
      font-size: var(--font-size-content-pc-small);
      color: #999;
    }
  }
}

.user-item-right {
  position: relative;

  &:hover {
    cursor: pointer;
  }

  .user-item-right-checkbox {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;

    &:hover {
      cursor: pointer;
    }
  }
}

.user-item-right-checkbox-custom-checked {
  z-index: 0;
  position: relative;

  .user-item-right-checkbox-custom-checked-image {
    width: 50rpx;
    height: 50rpx !important;
  }

  ::v-deep(.user-item-right-checkbox-custom-checked-image) {

    // width: 24rpx;
    // height: 24rpx;
  }
}
</style>
