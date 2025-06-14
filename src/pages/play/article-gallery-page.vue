<template>
	<view>
		<view class="header-nav-container">
			<!-- icon 圖標 絕對位置靠左-->
			<view class="header-nav-left-position header-nav-icon-container" @click="handleBack">
				<uni-icons class="header-nav-icon" type="icon-common-return" custom-prefix="icon" size="20"
					color="var(--text-color-primary)"></uni-icons>
			</view>
		</view>
		<!-- 圖片列表 -->
		<view>
			<c-gridPhoto :data="gridPhotoData" @clickMedia="handleClickMedia" />
		</view>
		<!-- 底部導航 -->
		<c-bottomNav bgColor="var(--background-color-dark)" iconColor="var(--text-color-secondary)" />
		<!-- 圖片全螢幕 -->
		<play-popImgFullScreen ref="videoPopImgFullScreen" :imgs="imageFullScreenImgs"></play-popImgFullScreen>
	</view>
</template>

<script setup lang="ts">
// TEMP: 文章圖片列表
import { onShow } from '@dcloudio/uni-app'
import { router, toPlayIndex, checkViewportAutoReplace } from '@/utils/routers';
const { back } = router;
const gridPhotoData = ref([
	{
		src: '/static/images/template/img-template-01.png',
		type: 'photos',
		alt: '圖片1',
	},
	{
		src: '/static/images/template/img-template-02.png',
		type: 'single',
		alt: '圖片2',
	},
	{
		src: '/static/images/template/img-template-03.png',
		type: 'video',
		alt: '圖片3',
	},
	{
		src: '/static/images/template/img-template-04.png',
		type: 'photos',
		alt: '圖片4',
	},
	{
		src: '/static/images/template/img-template-01.png',
		type: 'video',
		alt: '圖片1',
	},
	{
		src: '/static/images/template/img-template-02.png',
		type: 'photos',
		alt: '圖片2',
	},
	{
		src: '/static/images/template/img-template-03.png',
		type: 'video',
		alt: '圖片3',
	},
	{
		src: '/static/images/template/img-template-02.png',
		type: 'video',
		alt: '圖片2',
	},
	{
		src: '/static/images/template/img-template-01.png',
		type: 'photos',
		alt: '圖片1',
	},
	{
		src: '/static/images/template/img-template-04.png',
		type: 'video',
		alt: '圖片4',
	},
]);
const videoPopImgFullScreen = ref()
const imageFullScreenImgs = ref<string[]>([])
// 點擊圖片
const handleClickMedia = (item: { src: string; type: string }) => {
	// 跳轉並傳入參數
	console.log("🚀 == 開啟圖片全螢幕 == ")
	// 圖片全螢幕
	if (item.type === 'photos') {
		imageFullScreenImgs.value = gridPhotoData.value.map(item => item.src)
		videoPopImgFullScreen.value?.open()
	} else {
		// 跳轉影音頁
		toPlayIndex()
	}
}

// 新增處理函數
const handleBack = () => {
	back();
};

onShow(() => {
	checkViewportAutoReplace()
})

</script>

<style lang="scss" scoped>
.header-nav-container {
	position: relative;
	display: flex;
	justify-content: flex-start;
	padding: 24rpx 32rpx;
	border-bottom: 1px solid var(--text-color-octonary);
	background-color: var(--background-color-dark);

	// 圖標容器
	.header-nav-left-position {
		position: relative;
		transform: scaleX(-1);

		.header-nav-icon {
			color: var(--text-color-secondary) !important;
		}
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