<template>
	<view class="favorites-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.myFavorites')" />
		<!-- 收藏列表 -->
		<view>
			<c-gridPhoto :data="gridPhotoData" @clickMedia="handleClickMedia" />
		</view>
		<!-- 圖片全螢幕 -->
		<play-popImgFullScreen ref="videoPopImgFullScreen" :imgs="imageFullScreenImgs"></play-popImgFullScreen>

	</view>
</template>

<script setup lang="ts">
// TEMP: 我的收藏
import { onShow } from '@dcloudio/uni-app';
import { toPlayIndex, checkViewportAutoReplace } from '@/utils/routers';
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
	if (item.type === 'photos') {
		imageFullScreenImgs.value = gridPhotoData.value.map(item => item.src)
		videoPopImgFullScreen.value?.open()
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
page {
	background-color: var(--background-color);
}

.favorites-page {}
</style>
