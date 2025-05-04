<template>
	<view class="bottom-nav-spacer">
		<view class="bottom-nav-container" :style="{ 'background': props.bgColor }">
			<!-- 首頁 影音頁-->
			<view class="bottom-nav-item" @click="handleClickToPage('home')">
				<uni-icons class="bottom-nav-item-icon" :style="{ 'color': props.iconColor }" custom-prefix="icon"
					type="icon-common-home"></uni-icons>
			</view>
			<!-- 我的收藏-->
			<view class="bottom-nav-item" @click="handleClickToPage('favorites')">
				<uni-icons class="bottom-nav-item-icon" :style="{ 'color': props.iconColor }" custom-prefix="icon"
					type="icon-menu-wallet"></uni-icons>
			</view>
			<!-- 展開按鈕 -->
			<view class="main-menu-btn-container" @click="handleClickMainMenu">
				<image class="main-menu-btn-img"
					:src="primaryMenu === 'primary' ? '/static/icons/menu/icon-menu-btn-primary.svg' : '/static/icons/menu/icon-menu-btn-secondary.svg'"
					mode="widthFix"></image>
				<!-- 影音頁 顯示圖片內容 -->
				<view class="main-menu-btn-floating-icon-1" :class="{ active: activeMenu }">
					<uni-icons class="main-menu-btn-floating-icon" :class="{ iconColor: props.iconColor }" custom-prefix="icon"
						type="icon-common-photo"></uni-icons>
				</view>
				<!-- 前往發布 -->
				<view class="main-menu-btn-floating-icon-2" :class="{ active: activeMenu }" @click="handleClickToPage('post')">
					<uni-icons class="main-menu-btn-floating-icon" :class="{ iconColor: props.iconColor }" custom-prefix="icon"
						type="icon-common-plus"></uni-icons>
				</view>
				<!-- 影音頁 顯示影片內容 -->
				<view class="main-menu-btn-floating-icon-3" :class="{ active: activeMenu }">
					<uni-icons class="main-menu-btn-floating-icon" :class="{ iconColor: props.iconColor }" custom-prefix="icon"
						type="icon-common-video"></uni-icons>
				</view>
			</view>
			<!-- 訊息頁 當前無設計稿-->
			<view class="bottom-nav-item" @click="handleClickToPage('message')">
				<uni-icons class="bottom-nav-item-icon" :style="{ 'color': props.iconColor }" custom-prefix="icon"
					type="icon-common-email"></uni-icons>
			</view>
			<!-- 個人頁 側邊欄-->
			<view class="bottom-nav-item" @click="openSideNav">
				<uni-icons class="bottom-nav-item-icon" :style="{ 'color': props.iconColor }" custom-prefix="icon"
					type="icon-common-person"></uni-icons>
			</view>
		</view>
		<!-- 側邊欄-->
		<c-sideNav ref="sideNavRef" :bgColor="props.bgColor" />
	</view>
</template>

<script setup>
import { toPlayIndex, toFavorites, toPostIndex, toMessage, toPostPreview } from '@/utils/routers';
const props = defineProps({
	// 被景色
	bgColor: {
		type: String,
		default: 'var(--background-color)',
	},
	// 主選單 啟動懸浮的圖示
	primaryMenu: {
		type: String,
		default: 'primary',
	},
	// 圖示顏色
	iconColor: {
		type: String,
		default: 'var(--text-color-primary)',
	},
});
// 主選單 啟動懸浮的圖示
const activeMenu = ref(false);
const handleClickMainMenu = () => {
	activeMenu.value = !activeMenu.value;
};

// 側邊欄
const sideNavRef = ref(null);
const openSideNav = () => {
	console.log("🚀 == 側邊欄 == ")
	sideNavRef.value?.open()
}

// 點擊按鈕 跳轉頁面
const handleClickToPage = (page) => {
	console.log("🚀 ~ handleClickToPage ~ page:", page)
	switch (page) {
		case 'home':
			toPlayIndex()
			break;
		case 'favorites':
			toFavorites()
			break;
		case 'post':
			toPostPreview()
			break;
		case 'message':
			toMessage()
			break;
	}
};


</script>

<style lang="scss" scoped>
/* 底部導航列 */
.bottom-nav-spacer {
	height: 120rpx;
	margin-top: 32rpx;
}

.bottom-nav-container {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: var(--z-index-bottom-nav);
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 18rpx 32rpx;
	background: var(--background-color);
}

.bottom-nav-item {
	.bottom-nav-item-icon {
		font-size: 54rpx !important;
		color: var(--text-color-secondary);

		&.iconColor {
			color: var(--text-color-primary) !important;
		}
	}
}

/* 中間按鈕 */
.main-menu-btn-container {
	position: relative;
	width: 100rpx;
	height: 100rpx;

	.main-menu-btn-img {
		width: 100%;
		height: 100%;
	}
}

/* 浮動圖示 */
.main-menu-btn-floating-icon-1,
.main-menu-btn-floating-icon-2,
.main-menu-btn-floating-icon-3 {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: -1;
	width: fit-content;
	height: fit-content;
	transform: translate(-50%, -50%);
	transition: all 0.3s ease-in-out;

	.main-menu-btn-floating-icon {
		background: var(--primary-color);
		border-radius: 100%;
		color: var(--text-color-secondary) !important;
		aspect-ratio: 1/1;
		width: 96rpx;
		font-size: 48rpx !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}

}

/* 左上 */
.main-menu-btn-floating-icon-1.active {
	top: -50%;
	left: -50%;
}

/* 中間 */
.main-menu-btn-floating-icon-2.active {
	top: -125%;
	left: 50%;
}

/* 右下 */
.main-menu-btn-floating-icon-3.active {
	top: -50%;
	left: 150%;
}
</style>
