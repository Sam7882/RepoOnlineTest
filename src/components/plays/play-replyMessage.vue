<template>
	<uni-list class="popup-comment-list" :border="false">
		<template v-for="item in 3" :key="item">
			<uni-list-item title="留言" class="popup-comment-list-item" :border="false">
				<template #body>
					<!-- 大頭照 -->
					<view class="popup-comment-list-item-avatar avatar-image-container">
						<image class="avatar-image" src="/static/images/template/img-template-01.png" mode="widthFix">
						</image>
					</view>
					<!-- 留言內容 資訊 -->
					<view class="popup-comment-list-item-content">
						<!-- 名稱 -->
						<view class="popup-comment-list-item-content-name">
							<text class="popup-comment-list-item-content-name-text">評論者名稱</text>
							<!-- TIP -->
							<text class="popup-comment-list-item-content-name-tip">{{ $t('common.creator') }}</text>
							<!-- 時間標示 絕對位置 右上角 -->
							<view class="popup-comment-list-item-time">
								<text class="popup-comment-list-item-time-text">
									1{{ $t('common.hour') }}
								</text>
							</view>
						</view>
						<!-- ID -->
						<view class="popup-comment-list-item-content-id">
							<text class="popup-comment-list-item-content-id-text">@評論者ID</text>
						</view>
						<!-- 內文 -->
						<view class="popup-comment-list-item-content-text">
							<text class="popup-comment-list-item-content-text-text">文字文字文字字文字文字文字文字文</text>
						</view>
						<!-- ICON 操作 留言數 愛心數 -->
						<view class="popup-comment-list-item-content-icon">
							<view class="popup-comment-list-item-content-icon-item">
								<uni-icons class="icon" type="icon-common-chat" custom-prefix="icon" size="16" />
								<text class="popup-comment-list-item-content-icon-item-text">0</text>
							</view>
							<view class="popup-comment-list-item-content-icon-item">
								<uni-icons class="icon" type="icon-input-like" custom-prefix="icon" size="16" />
								<text class="popup-comment-list-item-content-icon-item-text">1</text>
							</view>
						</view>
					</view>
				</template>
			</uni-list-item>
		</template>
	</uni-list>
</template>

<script>

</script>
<style scoped lang="scss">
// 評論區
.popup-comment-list {
	margin-top: 12rpx;
	float: 1;
	border-radius: 24rpx;
	background: var(--text-color-secondary);
	color: var(--text-color-primary);

	.uni-list {
		width: 100%;
		gap: 32rpx;
		padding-bottom: 16rpx;

		@media screen and (min-width: 768px) and (max-width: 960px) {
			gap: 16rpx;
		}

	}

	::v-deep(.uni-list-item popup-comment-list-item) {

		// 列表項目
		.uni-list-item__container {
			position: relative;
			display: flex;
			padding: 0;
			gap: 16rpx;

			// padding: 0 32rpx;
			.uni-list-item__header {
				display: none;
			}
		}
	}

	// 留言內容資訊
	.popup-comment-list-item-content {
		display: flex;
		flex-direction: column;
		gap: 4rpx;
		flex: 1;

		// gap: 8rpx;
		// 名稱
		.popup-comment-list-item-content-name {
			position: relative;
			display: flex;
			align-items: flex-end;
			gap: 12rpx;

			.popup-comment-list-item-content-name-text {
				font-size: var(--font-size-content-pc-small);
				font-weight: 500;
			}

			// 創作者
			.popup-comment-list-item-content-name-tip {
				font-size: var(--font-size-content-pc-xsmall);
				color: var(--primary-color);
			}

			.popup-comment-list-item-time {
				display: flex;
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: var(--font-size-content-pc-small);
				color: var(--input-border-color);
			}
		}

		// ID
		.popup-comment-list-item-content-id {
			display: flex;
			font-size: var(--font-size-content-pc-xsmall);
			line-height: 1;
			color: var(--input-border-color);
		}

		// 內文
		.popup-comment-list-item-content-text-text {
			margin-top: 4rpx;
			display: flex;
			line-height: 1.5;
			white-space: break-spaces;
			font-size: var(--font-size-content-pc-small);
			color: var(--text-color-primary);
		}

		.popup-comment-list-item-content-icon {
			display: flex;
			gap: 48rpx;
			margin-top: 8rpx;


			.popup-comment-list-item-content-icon-item {
				display: flex;
				align-items: center;
				gap: 12rpx;

				.icon {
					color: var(--input-border-color) !important;
					font-size: var(--font-size-content-pc) !important;
				}

				.popup-comment-list-item-content-icon-item-text {
					font-size: var(--font-size-content-pc);
					line-height: 1;
				}
			}
		}

		.popup-comment-list-item-content-reply {
			margin-top: 8rpx;
			display: flex;
			line-height: 1.5;
			font-size: var(--font-size-content-pc);
			color: var(--primary-color);
		}

	}
}

// 大頭照
// 頭像
.avatar-image-container {
	width: 48rpx;
	height: 48rpx;
	// border: ;
	background: var(--primary-color);
	border-radius: 100%;
	overflow: hidden;

	::v-deep(.avatar-image) {
		uni-image {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 110% !important;
			height: 110% !important;
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
</style>