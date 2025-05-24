<template>
	<view class="select-source">
		<view class="header">
			<uni-icons type="close" size="24" @click="goBack" />
			<text class="title">最近項目</text>
		</view>

		<view class="tabs" v-if="showTabs">
			<view v-for="tab in tabs" :key="tab" :class="['tab', currentTab === tab ? 'active' : '']"
				@click="currentTab = tab">
				{{ tab }}
			</view>
		</view>

		<scroll-view class="gallery" scroll-y>
			<view class="grid">
				<view v-for="(img, index) in imageList" :key="index" class="thumb" @click="selectImage(img)">
					<image :src="img" mode="aspectFill" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
// TEMP: 客製化的選取資料來源頁(因為APP才有的功能，故不開發)
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mode = route.query.mode || 'default'         // avatar 或 post
const next = route.query.next || '/pages/crop-avatar'
const type = route.query.type || 'image'           // image 或 media

const tabs = type === 'media' ? ['全部', '影片', '照片'] : ['照片']
const showTabs = type === 'media'
const currentTab = ref(tabs[0])
const imageList = ref([])

const goBack = () => uni.navigateBack()

const selectImage = (src) => {
	uni.navigateTo({
		url: `${next}?src=${encodeURIComponent(src)}`
	})
}

onMounted(() => {
	uni.chooseImage({
		count: 20,
		sourceType: ['album'],
		success: (res) => {
			imageList.value = res.tempFilePaths
		},
		fail: () => {
			uni.showToast({ title: '未選取圖片', icon: 'none' })
			uni.navigateBack()
		}
	})
})
</script>

<style scoped lang="scss">
.select-source {
	background: #fff;
	min-height: 100vh;
	padding: 20rpx;
}

.header {
	display: flex;
	align-items: center;
	gap: 20rpx;
	margin-bottom: 20rpx;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
}

.tabs {
	display: flex;
	gap: 32rpx;
	margin: 20rpx 0;
	border-bottom: 2rpx solid #eee;
	padding-bottom: 12rpx;
}

.tab {
	font-size: 28rpx;
	padding-bottom: 8rpx;
	color: #999;
}

.tab.active {
	color: #000;
	border-bottom: 2rpx solid #000;
}

.gallery {
	height: 80vh;
}

.grid {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.thumb {
	width: 31%;
	aspect-ratio: 1/1;
	border-radius: 8rpx;
	overflow: hidden;
}

.thumb image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}
</style>
