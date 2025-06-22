<template>
	<view class="messsageBox-page">
		<!-- header 導航-->
		<view class="header">
			<view class="header-title">
				<text>{{ $t('common.message') }}</text>
			</view>
		</view>
		<!--內容容器 -->
		<view class="content-container">
			<view class="content-container-bottom-record-container">
				<uni-list :border="false" class="content-container-bottom-record-list-container">
					<template v-for="(item, index) in followingList" :key="index">
						<uni-list-item :border="false" class="content-container-bottom-record-list-item">
							<template #body>
								<view class="account-container account-container-record" @click="handleMessage(item)">
									<view class="account-info-container">
										<!-- 頭像 -->
										<view class="account-avatar-container">
											<image class="account-avatar" :src="item.avatar" mode="widthFix">
											</image>
										</view>
										<!-- 名稱與帳號 -->
										<view class="account-info-name-container">
											<view class="account-info-name-title-container">

												<view class="account-info-name-title-container-left">
													<text class="account-info-title">{{ item.name }}</text>
												</view>

												<!-- 靠右按鈕 -->
												<view class="date-container">
													<!-- 關注按鈕 -->
													<text class="date">
														{{ item.date }}
													</text>
												</view>
											</view>

											<view class="message-container">
												<text class="message">{{ item.message }}</text>
											</view>
										</view>
									</view>

								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 訊息箱
import { onShow } from '@dcloudio/uni-app';
import { toMessage, checkViewportAutoReplace } from '@/utils/routers';
const followingList = ref([
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		id: '@88qwe8.88',
		message: '你好啊 哈哈哈 溫馨提醒 最多是時我六個字...'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-04.png',
		name: 'a1',
		id: '@881238.88',
		message: '我今天是是'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-01.png',
		name: 'a2',
		id: '@aaaew8.88',
		message: '我今天是是'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-02.png',
		name: 'd',
		id: '@853588.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-02.png',
		name: 'd',
		id: '@853588.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-02.png',
		name: 'd',
		id: '@853588.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-03.png',
		name: 'e',
		id: '@aabb88.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-03.png',
		name: 'f',
		id: '@bbcc88.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-04.png',
		name: 'g',
		id: '@abcs88.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-03.png',
		name: 'h',
		id: '@ccdd88.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
	{
		date: '2026-10-25',
		avatar: '/static/images/template/img-template-03.png',
		name: 'i',
		id: '@ef8f8e.88',
		message: 'qweqweiqienqi2jeiq2e'
	},
])

const emit = defineEmits(['handleMessage'])

const handleMessage = (item: any) => {
	console.log("🚀 ~ handleMessage ~ item:", item)
	emit('handleMessage', item.id)
}

onShow(() => {
	checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
.messsageBox-page {
	--footer-height: 300rpx;
	position: relative;
	background: var(--background-color);
	padding: 70rpx 36rpx;
	box-shadow: 2rpx 0 8rpx rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	border-right: 4rpx solid var(--text-color-denary);
	overflow-y: scroll;
	padding-top: 88rpx;

	@media screen and (min-width: 961px) and (max-width: 1280px) {
		padding-top: 80rpx;
		max-width: 600rpx;
	}
}

.header {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 24rpx;
}

.header-title {
	color: var(--text-color-primary);
	font-size: var(--font-size-title-pc);
}

.content-container {
	padding: 0 44rpx;
	padding-top: 20rpx;

	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 20rpx 0;

			@media screen and (min-width: 768px) and (max-width: 960px) {
				padding: 10rpx 0;
			}
		}
	}
}

/* 帳號頭像和錢包總額文字 */
.account-container {
	// padding: 8rpx;
	padding-top: 56rpx;
	margin-bottom: 32rpx;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* 帳號頭像 */
	.account-info-container {
		display: flex;
		flex: 1;
		gap: 24rpx;

		// 頭像
		.account-avatar-container {
			width: 90rpx;
			height: 90rpx;
			border: unset;
			border-radius: 100%;
			overflow: hidden;

			@media screen and (min-width: 768px) and (max-width: 960px) {
				width: 64rpx;
				height: 64rpx;
			}

			::v-deep(.account-avatar) {
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
		.account-info-name-container {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;

			// 名稱
			.account-info-name-title-container {
				display: flex;
				justify-content: space-between;

				.account-info-name-title-container-left {
					display: flex;
				}

				.account-info-title {
					font-size: var(--font-size-title-pc);
					color: var(--text-color-primary);
				}
			}

			.message-container {
				display: flex;
				height: fit-content;

				.message {
					font-size: var(--font-size-content-pc-small);
					color: var(--text-color-gray3);
					line-height: 1;
				}
			}
		}
	}

}


.content-container-bottom-record-container {
	.account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 0;
	}
}

.date {
	line-height: 1;
	font-size: var(--font-size-content-pc-small);
	color: var(--text-color-gray3);
}
</style>
