<template>
	<view class="bottom-nav-spacer" :style="{ 'height': navHeight }">
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
// TEMP: 組件-底部導航列
import { getElementInfo } from '@/utils/tools';
import { toPlayIndex, toFavorites, toPostIndex, toMessageBox, toPostPreview } from '@/utils/routers';
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

// 底部導航容器高度
const containerHeight = ref(136) // 預設高度 136rpx

// 計算底部導航間距高度
const navHeight = computed(() => {
	return `${containerHeight.value}px`
})

// 獲取底部導航容器高度
const updateContainerHeight = () => {
	getElementInfo('.bottom-nav-container', (info) => {
		if (info && info.height) {
			containerHeight.value = info.height
			// 將高度寫入到 CSS 變數
			updateCSSVariable(info.height)
		}
	})
}

// 更新 CSS 變數
const updateCSSVariable = (height) => {
	// 獲取 .bottom-nav-spacer 元素
	const spacerElement = document.querySelector('.bottom-nav-spacer')
	if (spacerElement) {
		spacerElement.style.setProperty('--bottom-nav-spacer-height', `${height}px`)
	}
}

// 組件掛載後獲取高度
onMounted(() => {
	// 延遲執行確保 DOM 已渲染
	nextTick(() => {
		updateContainerHeight()
	})

	// 監聽視窗大小變化
	uni.onWindowResize(updateContainerHeight)
})

// 組件卸載時移除監聽
onUnmounted(() => {
	uni.offWindowResize(updateContainerHeight)
})

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
			toMessageBox()
			break;
	}
};


</script>

<style lang="scss" scoped>
/* 底部導航列 */
.bottom-nav-spacer {
	display: flex;
	// --bottom-nav-spacer-height: 136rpx;
	// height: calc(var(--bottom-nav-spacer-height) + var(--iphone-homeBar-height));
	// padding-top: 32rpx;

	// @media screen and (min-width: 768px) and (max-width: 960px) {
	// --bottom-nav-spacer-height: 100rpx;
	// }
	// padding-bottom: calc(var(--iphone-homeBar-height) - 17rpx);
}

.bottom-nav-container {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: var(--z-index-bottom-nav);
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 18rpx 40rpx;
	background: var(--background-color);
	padding-bottom: calc(var(--iphone-homeBar-height) / 1.5);

	@media screen and (min-width: 768px) and (max-width: 960px) {
		padding-bottom: calc(var(--iphone-homeBar-height) / 1.5);
	}
}

.bottom-nav-item {
	.bottom-nav-item-icon {
		font-size: 48rpx !important;
		color: var(--text-color-secondary);

		@media screen and (min-width: 768px) and (max-width: 960px) {
			font-size: 40rpx !important;
		}


		&.iconColor {
			color: var(--text-color-primary) !important;
		}
	}
}

/* 中間按鈕 */
.main-menu-btn-container {
	position: relative;
	width: 90rpx;
	height: 90rpx;

	@media screen and (min-width: 768px) and (max-width: 960px) {
		width: 72rpx;
		height: 72rpx;
	}

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
		width: 80rpx;
		font-size: 40rpx !important;
		display: flex;
		justify-content: center;
		align-items: center;

		@media screen and (min-width: 768px) and (max-width: 960px) {
			width: 72rpx;
			font-size: 36rpx !important;
		}
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
