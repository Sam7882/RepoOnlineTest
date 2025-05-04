<template>
	<!-- header 導航-->
	<view class="header-nav-container">
		<!-- icon 圖標 絕對位置靠左-->
		<view class="header-nav-left-position header-nav-icon-container" @click="handleBack">
			<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
		</view>
		<!-- 標題 中央-->
		<view class="header-nav-title-container">
			<text class="header-nav-title">{{ props.title }}</text>
		</view>
		<!-- 右邊 搜尋 絕對位置靠右-->
		<template v-if="openSearch">
			<view class="header-nav-right-position header-search-icon-container" @click="switchSearch">
				<uni-icons class="header-search-icon" type="icon-common-search" custom-prefix="icon" size="20"
					color="var(--text-color-primary)"></uni-icons>
			</view>
		</template>
		<!-- 右邊 設定按鈕gear 絕對位置靠右-->
		<template v-if="openSetting">
			<view class="header-nav-right-position header-gear-icon-container" @click="handleOpenSetting">
				<uni-icons class="header-gear-icon" type="icon-common-gear" custom-prefix="icon" size="20"
					color="var(--text-color-primary)"></uni-icons>
			</view>
		</template>
	</view>
</template>

<script setup lang="ts">
import { router } from '@/utils/routers';
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	openSearch: {
		type: Boolean,
		default: false
	},
	openSetting: {
		type: Boolean,
		default: false
	},
	backUrl: {
		type: String,
		default: ''
	}
})
const emit = defineEmits(['search', 'openSetting'])
const { back, toPage } = router;
const searchStatus = ref(false)
// 新增處理函數
const handleBack = () => {
	if (props.backUrl) {
		toPage(props.backUrl)
	} else {
		back();
	}
};
// 切換搜尋
const switchSearch = () => {
	searchStatus.value = !searchStatus.value
	emit('search', searchStatus.value);
}
// 開啟設定
const handleOpenSetting = () => {
	emit('openSetting', true);
}

</script>

<style lang="scss" scoped>
.header-nav-container {
	position: relative;
	display: flex;
	justify-content: center;
	padding: 32rpx;
	padding-top: 48rpx;
	border-bottom: 1px solid var(--text-color-octonary);

	// 圖標容器
	.header-nav-left-position {
		position: absolute;
		left: 48rpx;
		top: 50%;
		transform: translateY(-50%);
		padding-top: 16rpx;
	}

	// 標題容器
	.header-nav-title-container {
		font-size: 32rpx;
		color: var(--text-color-primary);
	}

	// 圖標容器
	.header-nav-right-position {
		position: absolute;
		right: 48rpx;
		top: 50%;
		transform: translateY(-50%);
		padding-top: 16rpx;
	}
}
</style>
