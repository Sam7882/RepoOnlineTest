<template>
	<view class="preview-page">
		<view class="bg-mask" v-if="isPopup" @click="handleClose"></view>
		<view class="preview-container">
			<uni-icons class="preview-container-close-icon" type="left" size="24" color="var(--text-color-secondary)"
				@click="handleClose" />
			<view class="previewPopup-container" v-if="isPopup">
				<view class="previewPopup-container-item" @click="delMessagePopUp">
					<view class="icon-container">
						<uni-icons class="icon-del" type="icon-common-delete" size="24" custom-prefix="icon"
							color="var(--text-color-primary)" />
					</view>
					<text class="previewPopup-text">{{ $t('common.delete') }}</text>
				</view>
				<view class="previewPopup-container-item" @click="saveDraft">
					<view class="icon-container">
						<uni-icons class="icon-save" type="icon-common-file" size="24" custom-prefix="icon"
							color="var(--text-color-secondary)" />
					</view>
					<text class="previewPopup-text">{{ $t('post.saveDraft') }}</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="preview-container-image">
				<image class="preview-container-image-item" v-if="mediaList.length" :src="mediaList[currentIndex].url"
					mode="widthFix" />
				<!-- 主圖預覽 -->
				<view class="preview-container-footer" v-if="!isSingleImage">
					<scroll-view class="list-scroll" scroll-x>
						<uni-list class="list" :border="false">
							<uni-list-item title="留言" class="list-item" :class="{ active: currentIndex === i }" :border="false"
								v-for="(item, i) in mediaList" :key="item.id">
								<template #body>
									<view class="image-container">
										<image :src="item.src" class="image" mode="aspectFill" @click="currentIndex = i" />
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					</scroll-view>
					<!-- 多圖底部縮圖列 -->
					<!-- <scroll-view v-if="!isSingleImage" class="thumb-strip" scroll-x>
							<view class="scroll-view-item">
								<image v-for="(item, i) in mediaList" :key="item.id" :src="item.src" class="thumb"
									:class="{ active: currentIndex === i }" @click="currentIndex = i" mode="aspectFill" />
							</view>
						</scroll-view> -->
				</view>
			</view>
		</view>

		<!-- 預覽下一步 按鈕 -->
		<view class="preview-container-button btn-container">
			<button type="button" class="btn preview-container-button-item" @click="handleNext">
				{{ $t('post.next') }}
			</button>
		</view>

	</view>
</template>

<script setup>
// TEMP:發布預覽頁
import { onShow } from '@dcloudio/uni-app'
import { usePostData } from '@/stores/usePostData'
import { toPostIndex, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const postDataStore = usePostData()
const { selectedMedia } = storeToRefs(postDataStore)
const mediaList = computed(() => selectedMedia.value)
const isSingleImage = computed(() => mediaList.value.length === 1)

const { openMessage } = inject('common')

const currentIndex = ref(0)

const isPopup = ref(false)
const handleClose = () => {
	isPopup.value = !isPopup.value
}

const handleNext = () => {
	toPostIndex()
	console.log('next')
}

const delMessagePopUp = () => {
	handleClose()

}

const saveDraft = () => {
	openMessage({
		content: t('post.saveDraftTip'),
		confirmBtnText: 'OK',
		onConfirm: () => {
			delMessagePopUp()
		}
	})
}

onShow(() => {
	checkViewportAutoReplace()
})

</script>



<style lang="scss" scoped>
uni-page-body {
	height: 100%;
}

.preview-page {
	background-color: var(--background-color-dark);
	--footer-height: 170rpx;

	position: relative;
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

}

.bg-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100dvw;
	height: 100dvh;
	background-color: var(--background-color-dark-opacity70);

}

// 關閉按鈕
.preview-container {
	position: absolute;
	top: 80rpx;
	left: 80rpx;
	z-index: 10;

	.preview-container-close-icon {
		font-size: var(--font-size-title-pc-xlarge) !important;

		&:hover {
			cursor: pointer;
		}
	}

	.previewPopup-container {
		position: absolute;
		top: 100%;
		left: 100%;
		z-index: 10;
		background-color: var(--background-color-light);
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;

		.previewPopup-container-item {
			display: flex;
			align-items: center;
			padding: 16rpx 48rpx;
			gap: 20rpx;
			border-bottom: 1rpx solid var(--background-color-grayLight2);

			&:hover {
				cursor: pointer;
			}

			.previewPopup-text {
				font-size: var(--font-size-title-pc-small);
				white-space: nowrap;
				line-height: 1;
			}

			&:first-child {
				.previewPopup-text {
					color: var(--favorite-color-secondary);
				}
			}

			&:last-child {
				border-bottom: none;
			}

			.icon-container {
				.icon-del {
					color: var(--favorite-color-secondary) !important;
				}

				.icon-save {
					color: var(--text-color-primary) !important;
				}
			}
		}

	}
}

// 圖片預覽
.content {
	position: relative;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}

.preview-container-image {
	position: relative;
	width: 100%;
	height: auto;
	// TODO: 上傳圖片比例
	aspect-ratio: 9 / 16;

	::v-deep(.preview-container-image-item) {
		uni-image {
			width: 100%;
			height: 100% !important;
			object-fit: cover;
		}

		uni-image>div {
			background-size: cover !important;
			background-position: center;
		}
	}
}

.preview-container-footer {
	position: absolute;
	position: absolute;
	bottom: 12rpx;
	width: 100%;
}

// 多圖底部縮圖列
.thumb-strip {
	// width: 100%;
	padding: 0 20rpx;

	.thumbs {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		gap: 10rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 8rpx;
		opacity: 0.6;
	}

	.thumbs.active {
		border: 2rpx solid #a78bfa;
		opacity: 1;
	}
}

.uni-list {
	display: flex;
	flex-direction: row;
	gap: 32rpx;
	padding-bottom: 16rpx;
	background: unset;

}

::v-deep(.uni-list-item.list-item) {

	// 列表項目
	.uni-list-item__container {
		padding: 0;

		.uni-list-item__header {
			display: none;
		}
	}

}

.list {
	padding-left: 40rpx;
}

.list-item {
	background: transparent !important;
	display: flex !important;
	padding: 0;
	opacity: 0.6;

	&.active {
		opacity: 1;
	}
}

.image-container {
	width: 80rpx;
	height: 80rpx;


	::v-deep(.image) {
		uni-image {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100% !important;
			height: 100% !important;
		}

		// 背景圖
		uni-image>div {
			background-position: center !important;
			background-size: cover !important;
		}

		// 圖片佔位
		uni-image>img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
}

// 預覽下一步 按鈕
.preview-container-button {
	position: absolute;
	bottom: 48rpx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 40rpx;
	// padding-bottom: 52rpx;
	// gap: 16rpx;
	margin-top: auto;

	.preview-container-button-item {
		margin: 0 64rpx;
		flex: 1;
		font-size: var(--font-size-title-pc);
		padding: 24rpx 32rpx;

		&:last-child {
			background-color: var(--primary-color);
			color: var(--text-color-secondary);
		}
	}

	.preview-container-button-item-icon {
		width: 40rpx;
		// height: 40rpx;
	}
}

.messagePopUp {
	::v-deep(.popup-box) {
		.popup-content {
			font-size: var(--font-size-title-pc);
			color: var(--text-color-primary);
		}

		.btn {
			font-size: var(--font-size-title-pc);
		}

	}
}
</style>
