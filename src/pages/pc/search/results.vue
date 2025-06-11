<template>
	<layout-pcBase v-slot="{ search }">
		<view class="search-page bg-dark">
			<view class="type-container">
				<view class="type-item" :class="{ active: type == 'video' }" @click="switchType('video')">
					<text class="type-item-text">{{ $t('common.video') }}</text>
				</view>
				<view class="type-item" :class="{ active: type == 'photo' }" @click="switchType('photo')">
					<text class="type-item-text">{{ $t('common.photo') }}</text>
				</view>
				<view class="type-item" :class="{ active: type == 'user' }" @click="switchType('user')">
					<text class="type-item-text">{{ $t('common.user') }}</text>
				</view>
			</view>

			<view class="search-result-container-1" v-if="type !== 'user'">
				<!-- 橫向可滾動的分類 -->
				<template v-for="(item, key) in renderSearchResult" :key="key">
					<!-- 創作縮圖 -->
					<view class="item-container">
						<view class="result-image-container">
							<image class="result-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
							</image>
							<view class="result-image-cover">
								<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
							</view>
							<view class="icon-container result-type-icon">
								<uni-icons v-if="item.type === 'video'" class="icons" type="icon-stander-play2" custom-prefix="icon"
									size="24" color="var(--text-color-primary)" />
								<uni-icons v-if="item.type === 'photo'" class="icons" type="icon-common-copy" custom-prefix="icon"
									size="24" color="var(--text-color-primary)" />
							</view>
						</view>
						<!-- 推薦內容訊息 -->
						<view class="content-container">
							<!-- 創作者名 -->
							<view class="content-name">
								{{ item.userName }}
							</view>
							<!-- 推薦內容文字 -->
							<view class="content-text">
								{{ item.description }}
							</view>
						</view>
					</view>
				</template>
			</view>


			<view class="search-result-container-2" v-if="type === 'user'">
				<template v-for="(item, index) in renderUserResult" :key="index">
					<!-- 帳號頭像 垂直排列 -->
					<view class="wallet-account-info-container">
						<!-- 頭像 -->
						<view class="wallet-account-avatar-container">
							<image class="wallet-account-avatar" :src="item.avatar" mode="widthFix">
							</image>
						</view>
						<!-- 名稱與帳號 -->
						<view class="wallet-account-info-name-container">
							<view class="wallet-account-info-name-title-container">
								<text class="wallet-account-info-title">{{ item.name }}</text>
								<!-- 認證圖標 -->
								<view class="wallet-account-info-prove-container">
									<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
										color="var(--text-color-senary)"></uni-icons>
								</view>
							</view>
							<view class="wallet-account-info-name-account-container">
								<text class="wallet-account-info-account">{{ item.account }}</text>
							</view>
						</view>
					</view>
				</template>
			</view>
		</view>
	</layout-pcBase>
</template>

<script setup lang="ts">
// TEMP: PC搜尋結果頁

import { onShow, onResize } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n';
import { toSearchVideo, toSearchTheme } from '@/utils/routers';
const { t } = useI18n();

/* 新FANCE創作者 */
const searchList = ref([
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@we8.88'
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88'
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'b',
		account: '@88qwe8.88'
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'c',
		account: '@8e8.88'
	},
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'd',
		account: '@88e8.88'
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'qwerqwer',
		account: '@88qwe8.88'
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a23ra',
		account: '@88q8.88'
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'awer',
		account: '@8e8.88'
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88we8.88'
	},
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'sdsssd',
		account: '@88qwe8.88'
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'wewqrhyxdrtyrdqwds',
		account: '@88qwe8.88'
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88'
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88'
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'video',
		avatar: '/static/images/template/img-template-03.png',
		name: 'dssd',
		account: '@88qwe8.88'
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
		type: 'photo',
		avatar: '/static/images/template/img-template-03.png',
		name: 'wewe',
		account: '@88qwe8.88'
	},
])

const type = ref('video')

const switchType = (val: string) => {
	type.value = val
}

const renderSearchResult = computed(() => {
	return searchList.value.filter(item => item.type === type.value)
})

const renderUserResult = computed(() => {
	return searchList.value
})

onShow(() => {
	// 
})
</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-dark);
}

.search-page {
	padding-top: 48rpx;
}

.type-container {
	display: flex;
	margin-bottom: 48rpx;

	.type-item {
		padding: 8rpx 48rpx;

		.type-item-text {
			font-size: var(--font-size-title-pc);
			color: var(--text-color-primary);
			font-weight: 500;
		}

		&.active {
			border-bottom: 4rpx solid var(--primary-color);

			.type-item-text {
				color: var(--primary-color);
			}
		}
	}
}

.search-result-container-1 {
	display: flex;
	flex-wrap: wrap;

	.item-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
		transition: all 0.3s ease;
		height: fit-content;
		flex: 0 0 calc((100% / 4)); // 中等螢幕一行4個

		@media screen and (min-width: 1280px) {
			flex: 0 0 calc((100% / 5)); // 中等螢幕一行5個
		}

		@media screen and (min-width: 1920px) {
			flex: 0 0 calc((100% / 7)); // 小螢幕一行6個
		}

		@media screen and (min-width: 2560px) {
			flex: 0 0 calc((100% / 10)); // 小螢幕一行6個
		}
	}

	.result-image-container {
		position: relative;
		display: inline-flex;
		border-radius: 20rpx;
		overflow: hidden;
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;

		uni-image {
			width: 100%;
			height: 100%;
		}
	}

	.result-image-cover {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 20%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 10%, transparent 100%);

		::v-deep(.icon-item-container) {
			.icon-item {
				margin-top: 12rpx;
				margin-right: 24rpx;
				font-size: 40rpx !important;
				color: var(--text-color-secondary) !important;

				@media screen and (min-width: 1280px) {
					margin-top: 16rpx;
					margin-right: 32rpx;
					font-size: 48rpx !important;
				}
			}
		}
	}

	.result-type-icon {
		position: absolute;
		bottom: 10rpx;
		left: 10rpx;
		z-index: 10;

		.icons {
			color: var(--text-color-secondary) !important;
			font-size: 32rpx !important;
		}

	}

	.content-container {
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;

		.content-name,
		.content-text {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}

		.content-name {
			font-size: var(--font-size-title-pc);
			max-height: 1.5em;
			color: var(--text-color-primary);
			-webkit-line-clamp: 1;
			line-clamp: 1;
			white-space: nowrap;
		}

		.content-text {
			font-size: var(--font-size-content-pc);
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

.search-result-container-2 {
	display: flex;
	flex-direction: column;
	gap: 50rpx;

	/* 帳號頭像 */
	.wallet-account-info-container {
		display: flex;
		gap: 24rpx;

		// 頭像
		.wallet-account-avatar-container {
			width: 100rpx;
			height: 100rpx;
			border: 6rpx solid var(--primary-color);
			background: var(--primary-color);
			border-radius: 100%;
			overflow: hidden;

			@media screen and (min-width: 1280px) {
				width: 120rpx;
				height: 120rpx;
			}

			@media screen and (min-width: 1920px) {
				width: 150rpx;
				height: 150rpx;
			}

			::v-deep(.wallet-account-avatar) {
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

		/* 帳號資訊 */
		.wallet-account-info-name-container {
			display: flex;
			flex-direction: column;
			justify-content: center;

			// 名稱
			.wallet-account-info-name-title-container {
				display: flex;
				justify-content: space-between;

				.wallet-account-info-title {
					font-size: var(--font-size-title-pc);
					color: var(--text-color-primary);
				}

				.wallet-account-info-prove-container {
					margin-left: 12rpx;
				}

				// 認證圖標
				.icon-community-prove {
					font-size: 28rpx !important;

					@media screen and (min-width: 1280px) {
						font-size: 32rpx !important;
					}

					@media screen and (min-width: 1920px) {
						font-size: 36rpx !important;
					}
				}
			}

			.wallet-account-info-name-account-container {
				display: flex;
				height: fit-content;

				.wallet-account-info-account {
					font-size: var(--font-size-content-pc);
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}
}
</style>
