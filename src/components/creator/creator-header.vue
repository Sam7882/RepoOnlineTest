<template>
	<!-- 創作者HeaderNav -->
	<view class="creator-home-page-data-header-container">
		<view class="creator-home-page-data-header-container-title">
			<view class="creator-home-page-data-header-container-back-button" v-if="!isCreator" @click="handleBack">
				<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
			</view>
			<text class="creator-home-page-data-header-container-title-text" @click="switchIsCreator" v-if="!isCreator">{{
				'Jesiicatestid' }}</text>
			<!-- 頭像側邊按鈕 -->
			<view class="creator-home-page-data-item-top-menu-container">
				<template v-if="!isCreator">
					<view class="creator-home-page-data-item-container-item-top-menu">
						<uni-icons class="creator-home-page-data-item-container-item-icon" type="icon-common-notice"
							custom-prefix="icon" size="24" color="var(--text-color-nonary)"></uni-icons>
					</view>
					<view class="creator-home-page-data-item-container-item-top-menu">
						<uni-icons class="creator-home-page-data-item-container-item-icon" type="icon-common-update"
							custom-prefix="icon" size="24" color="var(--text-color-nonary)"></uni-icons>
					</view>
					<c-reportPopUp />
				</template>
				<template v-else>
					<view class="creator-home-page-data-item-container-item-top-menu">
						<uni-icons class="creator-home-page-data-item-container-item-icon" type="icon-common-plus"
							custom-prefix="icon" size="24" color="var(--text-color-nonary)"></uni-icons>
					</view>
					<view class="creator-home-page-data-item-container-item-top-menu">
						<uni-icons class="creator-home-page-data-item-container-item-icon" type="bars" size="24"
							color="var(--text-color-nonary)"></uni-icons>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>
<script setup>
import { router } from '@/utils/routers';
const { back, toPage } = router;
const handleBack = () => {
	back();
};
const props = defineProps({
	isCreator: {
		type: Boolean,
		default: false
	}
})
const isCreator = ref(props.isCreator || false)
const switchIsCreator = () => {
	isCreator.value = !isCreator.value
}
</script>
<style lang="scss" scoped>
// HEADER
.creator-home-page-data-header-container {
	position: relative;
	display: flex;
	justify-content: flex-end;
	// padding: 24rpx 0;
	margin: 68rpx 40rpx 32rpx;
	gap: 40rpx;

	.creator-home-page-data-header-container-back-button {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.creator-home-page-data-header-container-title-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.creator-home-page-data-header-container-title {
		font-size: 32rpx;
		font-weight: 500;
	}
}

// 頭像側邊按鈕
.creator-home-page-data-item-top-menu-container {
	position: relative;
	display: flex;
	justify-content: flex-end;
	// padding: 24rpx 0;
	// padding: 68rpx 40rpx 32rpx;
	gap: 28rpx;

	.creator-home-page-data-item-container-item-top-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32rpx;

		.creator-home-page-data-item-container-item-icon {
			font-size: 36rpx !important;
			color: var(--text-color-primary) !important;
		}
	}
}
</style>