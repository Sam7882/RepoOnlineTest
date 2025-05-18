<template>
	<view class="search-page bg-dark">
		<view class="searchInput-container">
			<view class="icon-container" @click="handleBack">
				<uni-icons class="icon-style header-nav-icon" type="left" size="16"
					color="var(--text-color-secondary)"></uni-icons>
			</view>
			<uni-easyinput v-model="search" class="inputStyle" prefixIcon="search" :trim="true" :clearable="false" />
		</view>

		<!-- 關注推薦 -->
		<view class="recommend-container">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<text class="recommend-top-text-tip">{{ '瀏覽主題' }}</text>
				</view>
			</view>
			<!-- 瀏覽主題 -->
			<view class="theme-container">
				<view class="theme-list-container">
					<view class="theme-list-item" :style="{ 'background': item.themeColor }" v-for="(item, index) in themeList"
						:key="index">
						<view class="theme-list-item-info">
							<text class="theme-list-item-info-name">{{ item.title }}</text>
						</view>
						<view class="icon-container theme-list-item-icon-container">
							<uni-icons class="icon-style theme-list-item-icon" custom-prefix="icon" type="icon-common-theme"
								size="12"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="recommend-list-container">

			</view>
		</view>

		<!-- 底部導航列 -->
		<c-bottomNav :bgColor="'var(--background-color-dark)'" :iconColor="'var(--text-color-secondary)'" />
	</view>
</template>

<script setup lang="ts">
// TEMP: 搜尋主題頁
import { useI18n } from 'vue-i18n';
import { router } from '@/utils/routers';
const { back } = router;
const { t } = useI18n();

/* 滾動分類 */
const search = ref('')

/* 瀏覽主題 */
const themeList = [
	{ title: '娛樂歡笑', iconUrl: 'https://picsum.photos/32', themeColor: '#6e45ff' },
	{ title: '音樂創作', iconUrl: 'https://picsum.photos/32', themeColor: '#ff0000' },
	{ title: '西斯男女', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #ff0000, #0000ff)' },
	{ title: '手機遊戲', iconUrl: 'https://picsum.photos/32', themeColor: '#6e45ff' },
	{ title: '單機遊戲', iconUrl: 'https://picsum.photos/32', themeColor: '#24ffc1' },
	{ title: '小說創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #24ffc1, #6e45ff)' },
	{ title: '漫畫創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #e2e205, #e2e205)' },
	{ title: '同人創作', iconUrl: 'https://picsum.photos/32', themeColor: '#ff24fb' },
];


const handleBack = () => {
	back()
}

// 點擊用戶
const handleUserClick = (item: any) => {
	console.log("🚀 ~ 點擊用戶:", item)
}
</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-dark);
}

.search-page {
	padding: 0 32rpx;
	padding-top: 64rpx;
}

.searchInput-container {
	display: flex;
	gap: 20rpx;

	.icon-style {
		font-size: 32rpx !important;
	}
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-quinary) !important;
			border-radius: 10rpx;
			padding: 4rpx 32rpx;

			&.is-focused {
				border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}

		.uni-input-placeholder {
			color: var(--text-color-quaternary) !important;
			font-size: 28rpx;
		}

		.uni-easyinput__content-input {
			color: var(--text-color-secondary) !important;
			font-size: 28rpx;
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

.more-icon {
	margin-left: auto;
	color: var(--text-color-quaternary) !important;
	font-size: 32rpx !important;
}

/* 關注推薦 */
.recommend-container {
	margin-top: 48rpx;

	uni-image {
		width: 360rpx;
		height: 360rpx;
		border-radius: 32rpx;
	}

	.recommend-content-image-container {
		position: relative;
		display: inline-flex;
		width: 100%;
	}

	.recommend-content-image-cover {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 20%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 10%, transparent 100%);

		.recommend-content-image-cover-icon {
			margin-top: 24rpx;
			margin-right: 32rpx;
			font-size: 32rpx !important;
			color: var(--text-color-secondary) !important;
		}
	}

	.recommend-content-container {
		margin-top: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;

		.recommend-content-name,
		.recommend-content-text {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}

		.recommend-content-name {
			font-size: 32rpx;
			max-height: 1.5em;
			color: var(--text-color-secondary);
			-webkit-line-clamp: 1;
			line-clamp: 1;
			white-space: nowrap;
		}

		.recommend-content-text {
			font-size: 28rpx;
			color: var(--text-color-quaternary);
			max-height: 4.5em;
			/* 1.5 x 3行 */
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			white-space: normal;
		}
	}

}

// 標題
.recommend-top {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 26rpx;

	// 左側
	.recommend-top-text {
		display: flex;
		color: var(--text-color-secondary);
		gap: 22rpx;
		align-items: flex-end;

		.recommend-top-text-tip {
			color: var(--text-color-secondary);
			font-size: 40rpx;
		}

		.recommend-top-text-title-container {
			display: flex;
			align-items: center;
			gap: 4rpx;
		}

		.recommend-top-text-title {
			display: flex;
			align-items: center;
			gap: 4rpx;
			font-size: 48rpx;
		}

		.recommend-top-text-icon {
			padding-top: 8rpx;
			color: var(--text-color-quaternary) !important;
			font-size: 32rpx !important;
		}


	}
}

/* 瀏覽主題 */
.theme-list-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;

	.theme-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 44rpx 0;
		border-radius: 20rpx;
		position: relative;

		&:hover {
			filter: brightness(1.1);
		}

		.theme-list-item-avatar {
			width: 48rpx;
			height: 48rpx;
		}

		.theme-list-item-info {
			display: flex;
			flex-direction: column;

			.theme-list-item-info-name,
			.theme-list-item-info-desc {
				white-space: nowrap;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				line-clamp: 1;
			}

			.theme-list-item-info-name {
				color: #fff;
				font-size: 32rpx;
				max-height: 1.5em;
				color: var(--text-color-primary);
			}
		}

		.theme-list-item-icon-container {
			position: absolute;
			right: 14rpx;
			top: 10rpx;

			.theme-list-item-icon {
				font-size: 24rpx !important;
				color: var(--text-color-secondary) !important;
				opacity: 0.5;
			}
		}
	}

}

.btn-container {
	.btn {
		border-radius: 100rpx;
	}
}
</style>
