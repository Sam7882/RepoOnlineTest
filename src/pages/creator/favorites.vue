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
import { toPlayIndex } from '@/utils/routers';
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
