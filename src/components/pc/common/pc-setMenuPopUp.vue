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
				<!-- 手機號碼 -->
				<form-setMenu-phoneBindForm v-if="type === 'phoneBind'" @submit="submitForm" />

				<form-setMenu-passwordForm v-else-if="type === 'password'" @submit="submitForm" />

				<form-setMenu-emailForm v-else-if="type === 'email'" @submit="submitForm" />

				<form-setMenu-favoritePrivacyForm v-else-if="type === 'favoritePrivacy'" @submit="submitForm" />

				<!-- <view v-if="type === 'favorite'" class="switch-list">
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">{{ $t("creator.publicMyFavorites") }}</view>
						<c-checkBox class="switch-btn-container" v-model="formData.publicFavorite" />
					</view>
					<view class="switch-desc">{{ $t("creator.publicMyFavoritesTip") }}</view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">{{ $t("creator.publicMyHeart") }}</view>
						<c-checkBox class="switch-btn-container" v-model="formData.publicLike" />
					</view>
					<view class="switch-desc">{{ $t("creator.publicMyHeartTip") }}</view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">{{ $t("creator.publicMyCategory") }}</view>
						<c-checkBox class="switch-btn-container" v-model="formData.publicCategory" />
					</view>
					<view class="switch-desc">{{ $t("creator.publicMyCategoryTip") }}</view>
				</view>
			</view> -->


				<!-- 消息設定 type === 'message' -->
				<!-- <view v-if="type === 'message'" class="switch-list">
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">{{ $t("creator.postStoryComment") }}</view>
						<c-checkBox class="switch-btn-container" v-model="formData.postNotice" />
					</view>
					<view class="switch-desc"></view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">{{ $t("common.message") }}</view>
						<c-checkBox class="switch-btn-container" v-model="formData.message" />
					</view>
					<view class="switch-desc"></view>
				</view>
				<view class="switch-item">
					<view class="switch-item-content">
						<view class="switch-title">{{ $t("common.allPause") }}</view>
						<c-checkBox class="switch-btn-container" v-model="formData.allPause" />
					</view>
					<view class="switch-desc"></view>
				</view>
			</view>
		</view> -->

				<!-- 發送按鈕 -->
				<!-- <view class="footer" v-if="type === 'favorite' || type === 'message'">
			<view class="btn-container">
				<button type="button" class="btn" @click="submitForm('switch')">{{ $t("common.save2") }}</button>
			</view>
		</view>

		<view class="btn-container" v-else>
			<button type="button" class="btn" @click="submitForm('switch')">{{ $t("common.confirm") }}</button>
		</view> -->
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定編輯頁
import formSetMenuPhoneBindForm from '@/components/form/form-setMenu-phoneBindForm.vue'
import formSetMenuPasswordForm from '@/components/form/form-setMenu-passwordForm.vue'
import formSetMenuEmailForm from '@/components/form/form-setMenu-emailForm.vue'
import formSetMenuFavoritePrivacyForm from '@/components/form/form-setMenu-favoritePrivacyForm.vue'
// import formSetMenuPrivacyForm from '@/components/form/form-setMenu-privacyForm.vue'
// import formSetMenuBlockadeForm from '@/components/form/form-setMenu-blockadeForm.vue'
import { useViewportStore } from '@/stores/useViewportStore'
import { useI18n } from 'vue-i18n'

const { openNotice } = inject('common')
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
// 確認是否有按下 保存的判斷依據
const haveClickConfirm = ref(false)
const close = () => {
	popupRef.value?.close()
}

const title = computed(() => {
	switch (props.type) {
		case 'phoneBind':
			return t('creator.phoneBind')
		case 'password':
			return t('creator.loginPassword')
		case 'email':
			return t('creator.emailBind')
		case 'favoritePrivacy':
			return t('creator.favoriteSetting')
	}
})


const submitForm = (status, err) => {
	// 成功
	if (status) {
		openNotice({
			title: t('common.success'),
			titleIcon: 'icon-common-confirm',
		})
		close()
	}
	// 錯誤
	else {
		openNotice({
			title: t('common.error'),
			content: err,
		})
	}
}
defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
	& {
		z-index: var(--z-index-max) !important;
		overflow: hidden;
	}
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
	margin: 32rpx 0 32rpx;
	width: 100%;
	// padding: 0 64rpx 0;
	overflow: visible;
}

.popup-close-container {
	position: absolute;
	top: 50%;
	right: 64rpx;
	z-index: 10;
	transform: translateY(-50%);

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
.set-menu {
	--footer-height: 180rpx;
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

	.brand {
		font-size: var(--font-size-title-pc-xlarge);
		font-weight: bolder;
	}

	.deco-line {
		width: 100%;
		margin: 0;
		margin-top: 16rpx;
		height: 4px;
	}
}


.content {
	padding-top: 50rpx;
	padding-bottom: var(--footer-height);
}
</style>