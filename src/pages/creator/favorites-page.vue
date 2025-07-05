<template>
	<view class="favorites-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.myFavorites')" />
		<view class="favorites-page-content">
			<!-- 統計數字 -->
			<view class="statistics-container">
				<view class="statistics-item" :class="{ active: type === 'all' }" @click="switchType('all')">
					<text>{{ $t("common.all") }}</text>
					<text>508</text>
				</view>
				<view class="statistics-item" :class="{ active: type === 'video' }" @click="switchType('video')">
					<text>{{ $t("common.video") }}</text>
					<text>55</text>
				</view>
				<view class="statistics-item" :class="{ active: type === 'photo' }" @click="switchType('photo')">
					<text>{{ $t("common.photo") }}</text>
					<text>453</text>
				</view>
			</view>

			<!-- 收藏列表 -->
			<view class="grid-container">
				<c-gridPhoto :data="gridPhotoData" @clickMedia="handleClickMedia" />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 我的收藏
import { onShow } from '@dcloudio/uni-app';
import { toPlayIndex, checkViewportAutoReplace } from '@/utils/routers';
const { openPopImgFullScreen } = inject('play') as any
const type = ref('all')
const switchType = (val: string) => {
	type.value = val
}

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
const imageFullScreenImgs = ref<string[]>([])
const videoPopImgFullScreen = ref()
const handleClickMedia = (item: any) => {
	// 跳轉並傳入參數
	const obj = {
		fromPages: 'favorites',
		...item
	}
	if (item.type === 'image') {
		imageFullScreenImgs.value = gridPhotoData.value.map(item => item.src)
		openPopImgFullScreen(imageFullScreenImgs.value)
	} else {
		toPlayIndex(obj)
	}
}
onShow(() => {
	checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
.favorites-page {
	background-color: var(--background-color-light);
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
}

.favorites-page-content {
	width: 100%;
	height: 100%;
	overflow-y: hidden;
}

.statistics-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 24rpx 0;
	gap: 80rpx;

	.statistics-item {
		display: flex;
		align-items: center;
		gap: 12rpx;
		font-size: var(--font-size-title-pc);
		color: var(--text-color-gray3);

		&.active {
			color: var(--text-color-primary);
			font-weight: 500;
		}
	}

}

.grid-container {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	padding-bottom: 96rpx;
}
</style>
