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
					<text class="recommend-top-text-tip">{{ '瀏覽' }}</text>
					<text class="recommend-top-text-title">
						{{ '搞笑風趣' }}
					</text>
				</view>
				<view class="btn-container">
					<button type="button" class="btn" @click="handleAllThemeClick">{{
						'探索所有主題' }}</button>
				</view>
			</view>
			<view class="recommend-list-container">
				<!-- 橫向可滾動的分類 -->
				<uni-list class="recommend-list" :border="false">
					<template v-for="(user, key) in recommendList" :key="key">
						<uni-list-item :border="false" clickable @click="handleUserClick(user)" direction="column">
							<!-- 創作縮圖 -->
							<template #header>
								<view class="recommend-content-image-container">
									<image class="recommend-content-image" src="/static/logo.png" mode="widthFix" :lazy-load="true">
									</image>

									<view class="recommend-content-image-cover">
										<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
										<!-- <uni-icons class="recommend-content-image-cover-icon" type="more-filled" size="30"></uni-icons> -->
									</view>
								</view>
							</template>
							<!-- 推薦內容訊息 -->
							<template #body>
								<view class="recommend-content-container">
									<!-- 創作者名 -->
									<view class="recommend-content-name">
										{{ user.userName }}
									</view>
									<!-- 推薦內容文字 -->
									<view class="recommend-content-text">
										{{ user.description }}
									</view>
								</view>
							</template>

						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</view>

		<!-- 底部導航列 -->
		<c-bottomNav :bgColor="'var(--background-color-dark)'" :iconColor="'var(--text-color-secondary)'" />
	</view>
</template>

<script setup lang="ts">
// TEMP: 搜尋影片頁
import { useI18n } from 'vue-i18n';
import { toSearchTheme } from '@/utils/routers';
import { router } from '@/utils/routers';
const { back } = router;
const { t } = useI18n();
/* 滾動分類 */
const search = ref('')

/* 關注推薦創作者 */
const recommendList = ref([
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
])

const handleBack = () => {
	back()
}


// 點擊用戶
const handleUserClick = (item: any) => {
	console.log("🚀 ~ 點擊用戶:", item)
}

const handleAllThemeClick = () => {
	toSearchTheme()
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

	// list
	.uni-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 22rpx;
		background-color: transparent;
		align-items: flex-start;
		padding: 0 38rpx;

		&::-webkit-scrollbar {
			display: none;
		}

		.uni-list-item {
			width: 100%;
			background-color: transparent !important;
			overflow: hidden;
			flex-shrink: 0;

			::v-deep(.uni-list-item__container) {
				.uni-list-item__container {
					flex: none;
					white-space: nowrap;
					padding: 0;
					align-items: center;
					width: 100%;


					.searchTag-item {
						white-space: nowrap;
						font-size: 28rpx;
						color: var(--text-color-quaternary);
					}
				}
			}

			&.active {
				background-color: var(--text-color-secondary) !important;

				.searchTag-item {
					color: var(--text-color-primary) !important;
					font-weight: bold;
				}
			}
		}
	}

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
	margin-bottom: 50rpx;

	// 左側
	.recommend-top-text {
		display: flex;
		color: var(--text-color-secondary);
		gap: 22rpx;
		align-items: flex-end;

		.recommend-top-text-tip {
			color: var(--text-color-quaternary);
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

.btn-container {
	.btn {
		border-radius: 100rpx;
	}
}
</style>
