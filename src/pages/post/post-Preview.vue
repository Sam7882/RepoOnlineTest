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
					<text class="previewPopup-text">刪除</text>
				</view>
				<view class="previewPopup-container-item">
					<view class="icon-container">
						<uni-icons class="icon-save" type="icon-common-file" size="24" custom-prefix="icon"
							color="var(--text-color-secondary)" />
					</view>
					<text class="previewPopup-text">儲存草稿</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="preview-container-image">
				<image class="preview-container-image-item" v-if="mediaList.length" :src="mediaList[currentIndex].src"
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
		<view class="preview-container-button">
			<button type="button" class="preview-container-button-item" @click="handleNext">
				{{ $t('post.next') }}
			</button>
		</view>

		<c-messagePopUp class="messagePopUp" ref="messagePopUpRef" />
	</view>
</template>

<script setup>
// TEMP:發布預覽頁
import { usePostData } from '@/stores/usePostData'
import { toPostIndex } from '@/utils/routers'

const postDataStore = usePostData()
const { selectedMedia } = storeToRefs(postDataStore)
const mediaList = computed(() => selectedMedia.value)
const isSingleImage = computed(() => mediaList.value.length === 1)

const currentIndex = ref(0)

const isPopup = ref(false)
const handleClose = () => {
	isPopup.value = !isPopup.value
}

const handleNext = () => {
	toPostIndex()
	console.log('next')
}

const messagePopUpRef = ref(null)
const delMessagePopUp = () => {
	handleClose()
	messagePopUpRef.value.open({
		content: '草稿已儲存',
		confirmBtnText: 'OK',
		onConfirm: () => {
			messagePopUpRef.value.close()
		}
	})
}
</script>



<style lang="scss" scoped>
uni-page-body {
	height: 100%;
}

page {
	background-color: var(--background-color-dark);
}

.preview-page {
	--footer-height: 170rpx;

	position: relative;
	width: 100dvw;
	height: 100dvh;
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
	position: fixed;
	top: 40rpx;
	left: 28rpx;
	z-index: 10;

	.preview-container-close-icon {
		font-size: 40rpx !important;
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

			.previewPopup-text {
				font-size: 30rpx;
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
	height: 100%;
	// height: calc(100% - var(--footer-height));
	padding-bottom: var(--footer-height);
}

.preview-container-image {
	position: relative;
	width: 100%;
	height: 100%;

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
	bottom: 0;
	left: 0;
	right: 0;
	// height: 15%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 40rpx;
	padding-bottom: 52rpx;
	gap: 16rpx;

	.preview-container-button-item {
		display: flex;
		align-items: center;
		flex: 1;
		line-height: 1.2;
		font-size: 32rpx;
		padding: 24rpx 32rpx;
		border-radius: 16rpx;
		gap: 8rpx;
		justify-content: center;
		background-color: var(--background-color);
		color: var(--text-color-primary);

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
			font-size: 32rpx;
			color: var(--text-color-primary);
		}

		.btn {
			font-size: 30rpx;
		}

	}
}
</style>
