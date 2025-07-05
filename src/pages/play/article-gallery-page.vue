<template>
	<view class="article-gallery-page">
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
	</view>
</template>

<script setup lang="ts">
// TEMP: 文章圖片列表
import { onShow } from '@dcloudio/uni-app'
import { router, toPlayIndex, checkViewportAutoReplace } from '@/utils/routers';
const { back } = router;
const { openPlayPopImgFullScreen } = inject('play') as any

const gridPhotoData = ref([
	{ id: '1', type: 'image', dataNum: 2, num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
	{ id: '2', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
	{ id: '3', type: 'image', dataNum: 4, num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
	{ id: '4', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
	{ id: '5', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
	{ id: '6', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
	{ id: '7', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
	{ id: '8', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
	{ id: '9', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
	{ id: '10', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
	{ id: '11', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
	{ id: '12', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
	{ id: '13', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
	{ id: '14', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
	{ id: '15', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
	{ id: '16', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
	{ id: '17', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
	{ id: '18', type: 'video', dataNum: 1, num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
	{ id: '19', type: 'image', dataNum: 1, num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
]);
const videoPopImgFullScreen = ref()
const imageFullScreenImgs = ref<string[]>([])
// 點擊圖片
const handleClickMedia = (item: { src: string; type: string }) => {
	// 跳轉並傳入參數
	console.log("🚀 == 開啟圖片全螢幕 == ")
	// 圖片全螢幕
	if (item.type === 'image') {
		imageFullScreenImgs.value = gridPhotoData.value
			.filter(item => item.type === 'image' && item.src)
			.map(item => item.src as string)
		openPlayPopImgFullScreen(imageFullScreenImgs.value)
	} else {
		// 跳轉影音頁
		// TODO: 跳轉影音頁，傳送對應的影片資料，進行接受播放
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
.article-gallery-page {
	background-color: var(--background-color-light);
}

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