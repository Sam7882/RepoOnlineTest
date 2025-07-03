<template>
	<!-- 創作者HeaderNav -->
	<view class="header-container">
		<view class="header-container-title">
			<view class="header-container-back-button" v-if="!isCreator && openBack" @click="handleBack">
				<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
			</view>
			<text class="header-container-title-text" v-if="!isCreator">{{ 'Jesiicatestid' }}</text>
			<!-- 頭像側邊按鈕 -->
			<view class="item-top-menu-container">
				<template v-if="!isCreator">
					<view class="item-container-item-top-menu">
						<uni-icons v-if="!isSubscribe" class="item-container-item-icon" type="icon-common-notice"
							custom-prefix="icon" size="24" color="var(--text-color-nonary)" @click="handleSubscribe" />
						<uni-icons v-else class="item-container-item-icon" type="icon-common-notice-active" custom-prefix="icon"
							size="24" color="var(--text-color-nonary)" @click="cancelSubscribe" />
					</view>
					<view class="item-container-item-top-menu">
						<uni-icons class="item-container-item-icon" type="icon-common-update" custom-prefix="icon" size="24"
							color="var(--text-color-nonary)" @click="toShare"></uni-icons>
					</view>
					<c-reportPopUp />
				</template>
				<template v-else>
					<view class="item-container-item-top-menu">
						<uni-icons class="item-container-item-icon" type="icon-common-plus" custom-prefix="icon" size="24"
							color="var(--text-color-nonary)"></uni-icons>
					</view>
					<view class="item-container-item-top-menu" @click="handleCreatorSetMenu">
						<uni-icons class="item-container-item-icon" type="bars" size="24"
							color="var(--text-color-nonary)"></uni-icons>
					</view>
				</template>
			</view>
		</view>


		<c-confirmPopUp ref="confirmPopUpRef" />
		<c-sharePopUp ref="sharePopUp"></c-sharePopUp>
	</view>
</template>
<script setup>
// TEMP: 組件-創作者主頁-HeaderNav
import { router, toCreatorSetMenu } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { back } = router;
const handleBack = () => {
	back();
};
const props = defineProps({
	isCreator: {
		type: Boolean,
		default: false
	},
	openBack: {
		type: Boolean,
		default: true
	}
})
const isCreator = computed(() => props.isCreator || false)

// 訂閱
const confirmPopUpRef = ref(null)
const isSubscribe = ref(false)
const handleSubscribe = () => {
	confirmPopUpRef.value.open({
		title: t('creator.openNotification'),
		content: t('creator.notificationTip'),
		confirmBtnText: t('common.openSetting'),
		cancelBtnText: t('common.notYet'),
		onConfirm: () => {
			console.log('確定')
			isSubscribe.value = true
			console.log("🚀 ~ handleSubscribe ~ isSubscribe.value:", isSubscribe.value)
		},
	})
}
const cancelSubscribe = () => {
	confirmPopUpRef.value.open({
		title: t('creator.cancelNotification'),
		content: t('creator.cancelNotificationTip'),
		confirmBtnText: t('common.cancelSetting'),
		cancelBtnText: t('common.notYet'),
		onConfirm: () => {
			console.log('確定')
			isSubscribe.value = false
			console.log("🚀 ~ handleSubscribe ~ isSubscribe.value:", isSubscribe.value)
		},
	})
}

// 分享
const sharePopUp = ref(null)
const toShare = () => {
	console.log("🚀 == 分享 == ")
	sharePopUp.value?.open()
	/* NOTE:暫代 去往該圖文的總攬 */
	// toPlayArticleGallery()
}

// 創作者設定
const handleCreatorSetMenu = () => {
	toCreatorSetMenu()
}

</script>
<style lang="scss" scoped>
// HEADER
.header-container {
	width: 100%;
	position: relative;
	display: flex;
	justify-content: flex-end;
	padding: 24rpx 32rpx;
	gap: 40rpx;

	@media screen and (min-width: 961px) {
		padding: 0rpx 40rpx;
	}

	.header-container-back-button {
		position: absolute;
		left: 32rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.header-container-title-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.header-container-title {
		font-size: var(--font-size-title-pc);
		font-weight: 500;
	}
}

// 頭像側邊按鈕
.item-top-menu-container {
	position: relative;
	display: flex;
	justify-content: flex-end;
	// padding: 24rpx 0;
	// padding: 68rpx 40rpx 32rpx;
	gap: 28rpx;

	@media screen and (min-width: 961px) {
		gap: 64rpx;
	}

	.item-container-item-top-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32rpx;

		&:hover {
			cursor: pointer;
		}

		.item-container-item-icon {
			font-size: var(--font-size-title-pc-xlarge) !important;
			color: var(--text-color-primary) !important;
		}
	}
}
</style>