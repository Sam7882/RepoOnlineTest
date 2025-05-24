<template>
	<view class="select-media-page">
		<view class="header">
			<view class="header-container">
				<view class="icon-container">
					<uni-icons class="icon-close" type="closeempty" size="24" color="var(--text-color-primary)" />
				</view>
				<view class="header-title">選取作品</view>
			</view>
			<!-- 分類 tabs -->
			<view class="tabs">
				<view v-for="tab in tabs" :key="tab" :class="['tab', currentTab === tab ? 'active' : '']"
					@click="currentTab = tab">
					{{ tab }}
				</view>
			</view>
		</view>

		<!-- 資料網格 -->
		<view class="grid">
			<post-mediaGridItem v-for="item in filteredList" :key="item.id" :item="item"
				:is-selected="selectedIds.includes(item.id)" @toggle-select="toggleSelect" />
		</view>

		<!-- 下一步按鈕 -->
		<view class="footer">
			<view class="btn-container">
				<button class="btn next-btn" @click="goNext">新增作品({{ selectedIds.length }})</button>
			</view>
		</view>
	</view>
</template>

<script setup>
// TEMP:選取作品
import { usePostData } from '@/stores/usePostData'
import { toCreatorClassificationEdit } from '@/utils/routers'
const postDataStore = usePostData()
const { setSelectedMedia } = postDataStore
const tabs = ['全部', '影片', '照片']
const currentTab = ref('全部')
const selectedIds = ref([])

const mediaList = ref([
	{ id: '1', type: 'image', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
	{ id: '2', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
	{ id: '3', type: 'image', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
	{ id: '4', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
	{ id: '5', type: 'image', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
	{ id: '6', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
	{ id: '7', type: 'image', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
	{ id: '8', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
	{ id: '9', type: 'image', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
	{ id: '10', type: 'image', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
	{ id: '11', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
	{ id: '12', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
	{ id: '13', type: 'image', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
	{ id: '14', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
	{ id: '15', type: 'image', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
	{ id: '16', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
	{ id: '17', type: 'image', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
	{ id: '18', type: 'video', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
	{ id: '19', type: 'image', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
])

// 過濾列表
const filteredList = computed(() => {
	if (currentTab.value === '影片') {
		return mediaList.value.filter((m) => m.type === 'video')
	} else if (currentTab.value === '照片') {
		return mediaList.value.filter((m) => m.type === 'image')
	} else {
		return mediaList.value
	}
})

// 選取作品
const toggleSelect = (id) => {
	const index = selectedIds.value.indexOf(id)
	if (index >= 0) {
		selectedIds.value.splice(index, 1)
	} else {
		selectedIds.value.push(id)
	}
}

// 下一步
const goNext = () => {
	const selectedItems = mediaList.value.filter((m) => selectedIds.value.includes(m.id))
	setSelectedMedia(selectedItems)
	toCreatorClassificationEdit({
		type: 'new',
	})
}
</script>

<style scoped lang="scss">
.select-media-page {
	--header-height: 240rpx;
	--footer-height: 250rpx;
}

.select-media-page {
	display: flex;
	flex-direction: column;
	padding: 20rpx;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: var(--background-color-light);
}

.header-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 48rpx 32rpx;

	.icon-container {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 68rpx;
		height: 68rpx;
		display: flex;
		align-items: center;

		.icon-close {
			font-size: 32rpx !important;
		}
	}
}

.tabs {
	width: 100%;
	display: flex;
	justify-content: space-around;
	margin-bottom: 20rpx;
}

.tab {
	flex: 1;
	text-align: center;
	font-size: 28rpx;
	padding: 18rpx;
	color: #999;
}

.tab.active {
	font-weight: 500;
	color: #000;
	border-bottom: 4rpx solid #000;
}

.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12rpx;
	flex: 1;
	padding-top: var(--header-height);
	padding-bottom: var(--footer-height);
}



.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0%;
	z-index: 1;
	padding: 20rpx;
	height: var(--footer-height);
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--background-color-light);

	.btn-container {
		width: 100%;

		.next-btn {
			color: #fff;
			padding: 22rpx 0;
			border-radius: 20rpx;
			font-size: 30rpx;
		}
	}
}
</style>
