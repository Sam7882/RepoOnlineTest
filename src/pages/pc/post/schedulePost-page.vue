<template>
	<view class="page-container">
		<!-- 導覽欄 -->
		<c-headerNav :title="'排定發布'" :openBack="false">
		</c-headerNav>

		<view class="content">
			<!-- 上傳按鈕 -->
			<view class="btn-container">
				<button class="btn " @click="onUpload">{{ $t('post.upload') }}</button>
			</view>

			<!-- 草稿標題 -->
			<view class="section-title">
				<text>{{ $t('post.draft') }}</text>
			</view>

			<!-- 草稿清單 -->
			<view class="draft-list">
				<view v-for="(item, index) in drafts" :key="index" class="draft-card">
					<view class="img-container">
						<image :src="item.cover" class="draft-img" mode="aspectFill" />
						<view class="icon-container">
							<uni-icons class="icon-copy" type="icon-common-copy" custom-prefix="icon" size="20"
								color="var(--text-color-secondary)" />
						</view>
					</view>
					<view class="content-container">
						<view class="draft-meta">
							<text class="draft-date">{{ item.date }}</text>
							<text class="draft-time">{{ item.time }}</text>
						</view>
						<uni-icons type="more-filled" size="20" class="more-icon" @click="openCaption" />
					</view>
				</view>
			</view>

		</view>
	</view>
</template>
<script setup>
// TEMP: 發布頁-排定發布
import { onLoad, onShow } from '@dcloudio/uni-app'
import { toPostUpload, checkViewportAutoReplace } from '@/utils/routers'
import { usePostData } from '@/stores/usePostData'
import { useI18n } from 'vue-i18n'
const { openConfirm } = inject('common')
const { t } = useI18n()
const postDataStore = usePostData()
const { setSelectedMedia } = postDataStore
const drafts = ref([
	{
		cover: '/static/images/template/img-template-01.png',
		date: '20250515',
		time: '07:00',
	},
	{
		cover: '/static/images/template/img-template-02.png',
		date: '20250515',
		time: '07:00',
	},
])

const goBack = () => {
	uni.navigateBack()
}

// 最大檔案數量
const MAX_FILE_COUNT = 10
// 圖片大小限制
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
// 影片大小限制
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB

// 圖片類型
const VALID_IMAGE_TYPES = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp'
]
// 影片類型
const VALID_VIDEO_TYPES = [
	'video/mp4',
	'video/quicktime',
	'video/x-msvideo',
	'video/webm',
	'video/x-matroska'
]

const onUpload = () => {
	// 因設計稿是前往上傳頁，故原上功能註解
	toPostUpload({ isSchedulePost: 'true' })
	// NOTE: 以下是跳到預覽頁面
	// uni.chooseImage({
	// 	count: MAX_FILE_COUNT,
	// 	sourceType: ['album'],
	// 	success: (res) => {
	// 		const fileList = res.tempFiles.map((file) => {
	// 			const { type, size, name } = file
	// 			const isImage = VALID_IMAGE_TYPES.includes(type)
	// 			const isVideo = VALID_VIDEO_TYPES.includes(type)

	// 			// 限制檢查
	// 			if (!isImage && !isVideo) {
	// 				uni.showToast({
	// 					title: `${t('post.unsupportedFileType')} ${name}`,
	// 					icon: 'none'
	// 				})
	// 				return null
	// 			}

	// 			if (isImage && size > MAX_IMAGE_SIZE) {
	// 				uni.showToast({
	// 					title: `${t('post.imageSizeLimit')} ${name}`,
	// 					icon: 'none'
	// 				})
	// 				return null
	// 			}

	// 			if (isVideo && size > MAX_VIDEO_SIZE) {
	// 				uni.showToast({
	// 					title: `${t('post.videoSizeLimit')} ${name}`,
	// 					icon: 'none'
	// 				})
	// 				return null
	// 			}

	// 			return {
	// 				id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
	// 				type: isImage ? 'image' : 'video',
	// 				url: URL.createObjectURL(file),
	// 				rawFile: file // 保留原始檔案，發 API 時會用到
	// 			}
	// 		}).filter(Boolean) // 過濾掉不符合條件的檔案

	// 		// 數量限制
	// 		if (fileList.length > MAX_FILE_COUNT) {
	// 			fileList.splice(MAX_FILE_COUNT)
	// 			uni.showToast({
	// 				title: t('post.maxFileCount', { num: MAX_FILE_COUNT }),
	// 				icon: 'none'
	// 			})
	// 		}

	// 		setSelectedMedia(fileList)
	// 		toPostPreview()
	// 	},
	// 	fail: (err) => {
	// 		uni.showToast({ title: t('common.selectFailed'), icon: 'none' })
	// 	}
	// })
}

// 模擬轉跳裁切頁面
const toCropAvatar = ({ src }) => {
	uni.navigateTo({
		url: `/pages/cropAvatar/cropAvatar?src=${src}`,
	})
}


const openCaption = () => {
	openConfirm({
		title: t('post.deleteDraft'),
		confirmBtnText: t('common.delete'),
		cancelBtnText: t('common.cancel'),
		onConfirm: () => {
			console.log('deleteDraft')
		}
	})
}
const closeCaption = () => {
	bottomPopUpRef.value.close()
}

const deleteDraft = () => {
	console.log('deleteDraft')
}

onShow(() => {
	checkViewportAutoReplace()
})

</script>
<style lang="scss" scoped>
.page-container {
	// // padding: 20rpx;
	// background-color: #fff;
	// min-height: 100vh;

	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);

	// 設定窗口最大寬度
	max-width: var(--setting-page-maxWidth);


	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position {
			left: 0;
		}
	}
}

.content {
	width: 100%;
	height: 100%;
	padding: 0 50rpx;
	overflow-y: scroll;
	padding-top: 42rpx;
}

.btn-container {
	// padding: 0 40rpx;
	margin-top: 0;

	.btn {
		padding: 24rpx;
		font-size: var(--font-size-title-pc);
	}

	&.btn-waiting,
	&.btn-already {
		.btn {
			border: 2rpx solid var(--primary-color);
			background: var(--text-color-secondary);
			color: var(--primary-color);
		}
	}

}

.section-title {
	font-size: var(--font-size-title-pc);
	margin: 48rpx 0 32rpx;
}


.draft-list {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.draft-card {
	width: 100%;
	border: 1rpx solid var(--text-color-octonary);
	border-radius: 12rpx;
	overflow: hidden;
	position: relative;
}

.img-container {
	display: flex;
	position: relative;
}

.draft-img {
	width: 100%;
	height: 200rpx;
	object-fit: cover;
}

.icon-container {
	position: absolute;
	bottom: 16rpx;
	left: 24rpx;

	.icon-copy {
		font-size: var(--font-size-content-pc-large) !important;
		color: var(--text-color-secondary) !important
	}
}

.content-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8rpx 24rpx;
}

.draft-meta {
	display: flex;
	flex-direction: column;
	font-size: var(--font-size-content-pc);
}

.more-icon {
	position: absolute;
	bottom: 10rpx;
	right: 10rpx;
}

/* 子元件-關注 */
.bottom-pop-up {
	::v-deep(.popup-container) {
		.popup-content {
			padding: 0;
			min-height: unset;
		}

		.popup-container {
			padding: 70rpx 54rpx;
		}

		.popup-header {
			margin-bottom: 0;

			.popup-title {
				font-size: var(--font-size-title-pc);
				font-weight: 500;
			}

			&~.popup-deco-line {
				display: none;
			}
		}
	}

	.bottom-content {
		display: flex;
		flex-direction: column;
		gap: 24rpx;

		.btn {
			font-size: var(--font-size-title-pc);
			padding: 24rpx 0;
		}

		.btn-cancel {
			background-color: transparent;
			color: var(--text-color-primary);

			&::after {
				display: none;
			}
		}
	}
}
</style>
