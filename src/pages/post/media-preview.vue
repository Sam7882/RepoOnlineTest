<template>
	<view class="media-preview-page">
		<!-- 關閉按鈕 -->
		<view class="media-preview-container">
			<uni-icons class="media-preview-container-close-icon" type="closeempty" size="24"
				color="var(--text-color-secondary)" />
		</view>
		<view class="media-preview-container-image">
			<image class="media-preview-container-image-item" src="/static/images/template/img-template-02.png"
				mode="widthFix" />
		</view>

		<!-- 預覽下一步 按鈕 -->
		<view class="media-preview-container-button">
			<button type="button" class="media-preview-container-button-item" @click="handleClickStory">
				<image class="media-preview-container-button-item-icon" src="/static/icons/input/icon-input-checkbox.png"
					mode="widthFix" />
				{{ $t('post.yourStory') }}
			</button>
			<button type="button" class="media-preview-container-button-item" @click="handleClickNext">
				{{ $t('post.next') }}
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 發布 預覽頁面
import { onShow } from '@dcloudio/uni-app';
import { toPostIndex } from '@/utils/routers';

const handleClickStory = () => {
	console.log('handleClickButton');
}
const handleClickNext = () => {
	toPostIndex();
	console.log('handleClickNext');
}

onShow(() => {
	console.log('onShow');
})
</script>

<style lang="scss" scoped>
uni-page-body {
	height: 100%;
}

page {
	background-color: var(--background-color-dark);
}

.media-preview-page {
	position: relative;
	height: 100%;
}

// 關閉按鈕
.media-preview-container {
	position: fixed;
	top: 64rpx;
	left: 48rpx;
	z-index: 10;

	.media-preview-container-close-icon {
		font-size: 40rpx !important;
	}
}

// 圖片預覽
.media-preview-container-image {
	position: relative;
	height: 85%;

	::v-deep(.media-preview-container-image-item) {
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

// 預覽下一步 按鈕
.media-preview-container-button {
	position: relative;
	height: 15%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 32rpx;
	gap: 16rpx;

	.media-preview-container-button-item {
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

	.media-preview-container-button-item-icon {
		width: 40rpx;
		// height: 40rpx;
	}
}
</style>