<template>
	<view class="select-media-page">
		<view class="header">
			<view class="header-container">
				<view class="icon-container" @click="handleBack">
					<uni-icons class="icon-close" type="closeempty" size="24" color="var(--text-color-primary)" />
				</view>
				<view class="header-title">{{ $t("creator.selectWorks") }}</view>
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
				<button class="btn next-btn" @click="goNext">{{ $t("creator.addWorks") }} ({{ selectedIds.length }})</button>
			</view>
		</view>
	</view>
</template>

<script setup>
// TEMP:分類編輯-選取作品
import { usePostData } from '@/stores/usePostData'
import { toCreatorClassificationEdit, router } from '@/utils/routers'
import { onLoad } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const postDataStore = usePostData()
const { setSelectedMedia } = postDataStore
const { manageMedia, postData } = storeToRefs(postDataStore)
const { back } = router
console.log("🚀 ~ postDataStore:", postDataStore)
console.log("🚀 ~ postDataStore:", manageMedia)
const tabs = [t('common.all'), t('common.video'), t('common.photo')]
const currentTab = ref(t('common.all'))
const selectedIds = ref([])

const renderMediaList = ref([])

// 過濾列表
const filteredList = computed(() => {
	if (currentTab.value === t('common.video')) {
		return renderMediaList.value.filter((m) => m.type === 'video')
	} else if (currentTab.value === t('common.photo')) {
		return renderMediaList.value.filter((m) => m.type === 'image')
	} else {
		return renderMediaList.value
	}
})

// 選取作品
const toggleSelect = (id) => {
	const index = selectedIds.value.indexOf(id)
	if (index >= 0) {
		selectedIds.value.splice(index, 1)
	} else {
		7
		selectedIds.value.push(id)
	}
}
const handleBack = () => {
	back()
}
// 下一步
const goNext = () => {
	const selectedItems = renderMediaList.value.filter((m) => selectedIds.value.includes(m.id))
	setSelectedMedia(selectedItems)
	toCreatorClassificationEdit({
		type: 'new',
	})
}

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	if (options.type === 'manage') {
		renderMediaList.value = manageMedia.value
		console.log("🚀 ~ onLoad ~ renderMediaList.value:", renderMediaList.value)
	}
	else if (options.type === 'new') {
		renderMediaList.value = postData.value
		console.log("🚀 ~ onLoad ~ renderMediaList.value:", renderMediaList.value)
	}
})
</script>

<style scoped lang="scss">
.select-media-page {
	--header-height: 240rpx;
	--footer-height: 250rpx;
}

.select-media-page {
	display: flex;
	flex-direction: column;
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
