<template>
	<view class="set-menu">
		<view class="header">
			<view class="header-title">
				<text>{{ $t('common.setting') }}</text>
			</view>
		</view>

		<!-- 內容 -->
		<view class="content">
			<!-- 第一層選單 -->
			<view class="menu-list ">
				<view class="menu-item" :class="{ 'active': currentPage === 'account' }" @click="handlePage('account')">
					<text>{{ $t("creator.accountManagement") }}</text>
					<view class="icon-container">
					</view>
				</view>
				<view class="menu-item" :class="{ 'active': currentPage === 'privacy' }" @click="handlePage('privacy')">
					<text>{{ $t("creator.privacySetting") }}</text>
					<view class="icon-container">
					</view>
				</view>
				<view class="menu-item" :class="{ 'active': currentPage === 'message' }" @click="handlePage('message')">
					<text>{{ $t("creator.messageSetting") }}</text>
					<view class="icon-container">
					</view>
				</view>
				<view class="menu-item" :class="{ 'active': currentPage === 'walletManage' }"
					@click="handlePage('walletManage')">
					<text>{{ $t("menu.wallet") }}</text>
					<view class="icon-container">
					</view>
				</view>
				<view class="menu-item" :class="{ 'active': currentPage === 'helper' }" @click="handlePage('helper')">
					<text>{{ $t("menu.helper") }}</text>
					<view class="icon-container">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定頁面

import { onShow } from '@dcloudio/uni-app'
import { checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
	page: {
		type: String,
		default: 'center'
	}
})
const emit = defineEmits(['switchTab'])
const currentPage = computed(() => props.page)

const handlePage = (index) => {
	console.log("🚀 ~ handlePage ~ index:", index)
	switch (index) {
		case 'account':
			emit('switchTab', 'account')
			break
		case 'privacy':
			emit('switchTab', 'privacy')
			break
		case 'message':
			emit('switchTab', 'message')
			break
		case 'walletManage':
			emit('switchTab', 'walletManage')
			break
		case 'helper':
			emit('switchTab', 'helper')
			break
	}
}

onShow(() => {
	checkViewportAutoReplace()
})
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 300rpx;
	position: relative;
	background: var(--background-color);
	padding: 70rpx 75rpx;
	box-shadow: 2rpx 0 8rpx rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	border-right: 4rpx solid var(--text-color-denary);
	overflow-y: scroll;
	padding-left: 96rpx;
	padding-right: 120rpx;
	padding-top: 88rpx;

	@media screen and (min-width: 961px) and (max-width: 1280px) {
		padding-left: 72rpx;
		padding-right: 64rpx;
		padding-top: 80rpx;
	}
}

.header {
	margin-bottom: 80rpx;
}

.header-title {
	font-weight: bold;
	color: var(--text-color-primary);
	font-size: var(--font-size-title-pc-xlarge);
}


.content {
	padding-bottom: var(--footer-height);
}

.menu-list {
	display: flex;
	flex-direction: column;
	gap: 64rpx;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	font-size: var(--font-size-title-pc);
	color: var(--text-color-primary);

	&.active {
		color: var(--primary-color);
	}

	&:hover {
		cursor: pointer;
	}

	.icon-container {
		.icon-right {
			font-size: var(--font-size-content-pc-large) !important;
			color: var(--text-color-gray3) !important;
		}
	}
}

.status-container {
	font-size: 28rpx;
	color: var(--text-color-gray3);
	margin-right: 24rpx;
}
</style>