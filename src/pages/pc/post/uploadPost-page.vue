<template>
	<view class="upload-post-page pc-content-layout-center-style">
		<view class="content-container" id="dropZone" :class="{ 'dragging': isDragging }" @dragover="onDragOver"
			@dragleave="onDragLeave" @drop="onDrop">
			<view class="title">
				<text>{{ $t('post.createNewPost') }}</text>
			</view>
			<view class="content">
				<view class="content-icon">
					<uni-icons class="icons" type="icon-common-video" custom-prefix="icon" size="24"
						color="var(--text-color-primary)" />
					<uni-icons class="icons" type="icon-common-photo" custom-prefix="icon" size="24"
						color="var(--text-color-primary)" />
				</view>
				<text class="content-text">{{ $t('post.dragPhotoAndVideo') }}</text>
				<view class="btn-container">
					<uni-file-picker ref="filePicker" file-mediatype="all" :limit="MAX_FILE_COUNT" :disable-preview="true"
						:auto-upload="false" mode="grid" :del-icon="false" @select="onPickerChange">
						<button class="btn" type="button">{{ $t('post.selectFile') }}</button>
					</uni-file-picker>

					<!-- <button class="btn" type="
						 button" @click="onUpload">從電腦選擇</button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: PC上傳檔案頁

import { onShow, onLoad } from '@dcloudio/uni-app'
import { toPostIndex, checkViewportAutoReplace } from '@/utils/routers'
import { usePostData } from '@/stores/usePostData';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const postDataStore = usePostData()
const { setSelectedMedia } = postDataStore
const filePicker = ref()

// 拖曳CSS樣式
const isDragging = ref(false)
const onDragOver = () => {
	isDragging.value = true
}

const onDragLeave = () => {
	isDragging.value = false
}

const onDrop = () => {
	isDragging.value = false
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

//  拖曳相關 
const onDropHandler = (event: any) => {
	event.preventDefault()
	const drop = event.dataTransfer
	if (!drop) {
		console.warn('drop 沒有 dataTransfer')
		return
	}

	const items = drop.items
	const fileList = []

	// 多筆資料取出，推入
	for (let i = 0; i < items.length; i++) {
		if (items[i].kind === 'file') {
			const file = items[i].getAsFile()
			if (file) {
				fileList.push(file)
			}
		}
	}

	if (fileList.length === 0) {
		console.warn('drop 沒有檔案')
		return
	}

	console.log('拖曳取得檔案:', fileList)
	handleFiles(fileList)
}

const onDragOverHandler = (event: any) => {
	event.preventDefault()
}

//  uni-file-picker 選擇檔案時觸發 
const onPickerChange = (res: any) => {
	console.log('picker change:', res)

	// uni-file-picker 的檔案格式：
	// res.tempFiles 是 File[] 或 tempFilePaths
	const fileList = (res.tempFiles || []).map((item: any) => item.file || item)
	handleFiles(fileList)
}

//  資料統一處理 
const handleFiles = (files: any) => {
	let validFiles: any = []

	files.forEach((file: any) => {
		const { type, size, name } = file

		const isImage = VALID_IMAGE_TYPES.includes(type)
		const isVideo = VALID_VIDEO_TYPES.includes(type)

		// 限制
		if (!isImage && !isVideo) {
			uni.showToast({
				title: `${t('post.unsupportedFileType')} ${name}`,
				icon: 'none'
			})
			console.warn(`不支援的檔案類型: ${name}`)
			return
		}

		if (isImage && size > MAX_IMAGE_SIZE) {
			console.warn(`${t('post.imageSizeLimit')} ${name}`)
			return
		}

		if (isVideo && size > MAX_VIDEO_SIZE) {
			console.warn(`${t('post.videoSizeLimit')} ${name}`)
			return
		}

		// 定義的格式
		validFiles.push({
			id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			type: isImage ? 'image' : 'video',
			url: URL.createObjectURL(file),
			rawFile: file // 保留原始檔案，發 API 時會用到
		})
	})

	// 數量限制
	if (validFiles.length > MAX_FILE_COUNT) {
		validFiles = validFiles.slice(0, MAX_FILE_COUNT)
		uni.showToast({
			title: t('post.maxFileCount', { num: MAX_FILE_COUNT }),
			icon: 'none'
		})
	}

	// 更新 store
	setSelectedMedia(validFiles)
	console.log('更新 store:', validFiles)

	// 清除 uni-file-picker 選擇的檔案
	filePicker.value?.clearFiles()

	// 跳轉
	if (isSchedulePost.value) {
		toPostIndex({ isSchedulePost: 'true' })
	} else {
		toPostIndex()
	}
}

// 建立拖曳監聽相關事件
onMounted(() => {
	if (document.getElementById('dropZone')) {
		document.getElementById('dropZone')?.addEventListener('drop', onDropHandler)
		document.getElementById('dropZone')?.addEventListener('dragover', onDragOverHandler)
	}
})

// 卸載拖曳監聽相關事件
onBeforeUnmount(() => {
	if (document.getElementById('dropZone')) {
		document.getElementById('dropZone')?.removeEventListener('drop', onDropHandler)
		document.getElementById('dropZone')?.removeEventListener('dragover', onDragOverHandler)
	}
})

onShow(() => {
	// checkViewportAutoReplace()
	// 進入頁面則，清除 uni-file-picker 選擇的檔案
	filePicker.value?.clearFiles()
})

const isSchedulePost = ref<boolean | null>(null)
onLoad((options: any) => {
	console.log(options)
	if (options.isSchedulePost) {
		isSchedulePost.value = options.isSchedulePost === 'true'
	}
})

</script>

<style lang="scss" scoped>
.upload-post-page {
	padding: 32rpx;
	padding-top: 170rpx;
	display: flex;
	justify-content: center;
	width: 100%;

	&.pc-content-layout-center-style {
		max-width: 100%;

		@media screen and (min-width: 1440px) {
			max-width: 80%;
		}

		@media screen and (min-width: 1920px) {
			max-width: 60%;
		}
	}
}

.content-container {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	border-radius: 30rpx;
	background: var(--text-color-tertiary);
	width: 70%;
	max-height: 30%;
	padding: 80rpx 0 124rpx;

	&.dragging {
		border: 2px dashed var(--text-color-primary);
	}

	.title {
		font-size: var(--font-size-title-pc-large);
		color: var(--text-color-primary);
		margin-bottom: 80rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 24rpx;

		.content-icon {
			display: flex;
			gap: 16rpx;

			.icons {
				font-size: var(--font-size-title-pc-xlarge) !important;
				color: var(--text-color-gray3) !important
			}
		}

		.content-text {
			font-size: var(--font-size-title-pc);
			color: var(--text-color-gray3);
		}

		.btn {
			background: var(--primary-color);
			color: var(--text-color-secondary);
			border-radius: 10rpx;
			font-size: var(--font-size-content-pc);
			padding: 20rpx 48rpx;
			margin-top: 16rpx;
		}
	}
}
</style>
