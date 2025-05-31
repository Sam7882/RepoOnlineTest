<template>
	<view class="select-source">
		<view class="header">
			<uni-icons type="close" size="24" @click="goBack" />
			<text class="title">{{ $t('common.recentlyObject') }}</text>
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
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const mode = ref('default')         // avatar 或 post
const next = ref('/pages/crop-avatar')
const type = ref('image')           // image 或 media

const tabs = ref([t('common.photo')])
const showTabs = ref(false)
const currentTab = ref(t('common.photo'))
const imageList = ref([])

onLoad((options) => {
	mode.value = options.mode || 'default'
	next.value = options.next || '/pages/crop-avatar'
	type.value = options.type || 'image'

	if (type.value === 'media') {
		tabs.value = [t('common.all'), t('common.video'), t('common.photo')]
		showTabs.value = true
		currentTab.value = t('common.all')
	} else {
		tabs.value = [t('common.photo')]
		showTabs.value = false
		currentTab.value = t('common.photo')
	}

	uni.chooseImage({
		count: 20,
		sourceType: ['album'],
		success: (res) => {
			imageList.value = res.tempFilePaths
		},
		fail: () => {
			uni.showToast({ title: t('common.noSelectedPhoto'), icon: 'none' })
			uni.navigateBack()
		}
	})
})

const goBack = () => uni.navigateBack()

const selectImage = (src) => {
	uni.navigateTo({
		url: `${next.value}?src=${encodeURIComponent(src)}`
	})
}
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
