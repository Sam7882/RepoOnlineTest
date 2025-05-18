<template>
	<view class="subscription-setting-page">
		<!-- header 導航-->
		<c-headerNav :title="'信用卡'" />
		<!-- 內容區塊 -->
		<view class="subscription-setting-page-content-container">
			<!-- 訂閱列表 -->
			<uni-list :border="false" class="wallet-content-container-bottom-record-list-container">
				<!-- 紀錄 space-between 左右排列 -->
				<template v-for="(item, index) in creditCardList" :key="index">
					<uni-list-item :border="false" class="wallet-content-container-bottom-record-list-item"
						:class="{ active: item.status }">
						<template #body>
							<!-- 水平排列 -->
							<view class="subscription-setting-page-list-item-container" @click="handleOpenSave">
								<view class="subscription-setting-page-list-item-container-left">
									<view class="subscription-setting-page-list-item-container-left-img-container">
										<image class="subscription-setting-page-list-item-container-left-img" :src="item.imgUrl"
											mode="aspectFit" />
									</view>
									<view class="subscription-setting-page-list-item-container-left-name">
										<text class="subscription-setting-page-list-item-container-left-name-text">
											{{ item.bankName }}
										</text>
										<view v-if="item.default" class="subscription-setting-page-list-item-container-left-name-default">
											<text class="subscription-setting-page-list-item-container-left-name-default-text">預設</text>
										</view>
									</view>
								</view>
								<!-- 該筆啟用切換按鈕 -->
								<view class="subscription-setting-page-list-item-container-right">
									<text class="subscription-setting-page-list-item-container-right-number">
										{{ item.number }}
									</text>
								</view>
							</view>
						</template>
					</uni-list-item>
				</template>
				<uni-list-item :border="false" class="wallet-content-container-bottom-record-list-item add-card-item">
					<template #body>
						<!-- 水平排列 -->
						<view class="subscription-setting-page-list-item-container" @click="handleOpenSetting">
							<view class="subscription-setting-page-list-item-container-left">
								<view class="subscription-setting-page-list-item-container-left-img-container">
									<uni-icons class="icon-plus" type="plusempty" size="12" />
								</view>
								<view class="subscription-setting-page-list-item-container-left-name">
									<text class="subscription-setting-page-list-item-container-left-name-text">
										增加新卡片
									</text>
								</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>

		<c-bottomNav />
	</view>
</template>

<script setup lang="ts">
// TEMP: 訂閱項目 設定
import { onShow } from '@dcloudio/uni-app';
import { toCreditCardSetting, toCreditCardSave } from '@/utils/routers';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const handleOpenSetting = () => {
	console.log('handleOpenSetting')
	toCreditCardSetting()
}

const handleOpenSave = () => {
	toCreditCardSave()
}

const openStatus = ref(false)
const creditCardList = ref([
	{
		imgUrl: '/static/icons/wallet/icon-wallet-visa.png',
		bankName: '中華郵政公司',
		number: '*1122',
		status: true,
		default: true
	},
	{
		imgUrl: '/static/icons/wallet/icon-wallet-masterCard.png',
		bankName: '台灣新光商業銀行',
		number: '*1122',
		status: false,
		default: false
	},
])
onShow(() => {
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

uni-image {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.subscription-setting-page {
	// padding: 0 100rpx;
}

.subscription-setting-page-tip-container {
	padding: 48rpx 32rpx;
	font-size: 20rpx;
	color: var(--text-color-primary);
}

.wallet-content-container-bottom-record-list-container {
	font-size: 20rpx;

	::v-deep(.uni-list-item) {
		.uni-list-item__container {
			padding: 0;
		}

		.wallet-content-container-bottom-record-list-item {
			border-bottom: 1px solid var(--background-color-grayLight2);
		}

		.subscription-setting-page-list-item-container {
			padding: 32rpx 40rpx 64rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;

			.subscription-setting-page-list-item-container-left {
				display: flex;
				align-items: center;
				gap: 32rpx;
				min-width: 40%;
				flex: 1;

				.subscription-setting-page-list-item-container-left-img-container {
					width: 56rpx;
					height: 56rpx;
					// margin-right: 16rpx;
				}

				.subscription-setting-page-list-item-container-left-name {
					position: relative;
					display: flex;
					flex-direction: column;
				}

				.subscription-setting-page-list-item-container-left-name-text {
					font-size: 32rpx;
					color: var(--text-color-primary);
				}

				.subscription-setting-page-list-item-container-left-name-default {
					position: absolute;
					top: calc(100% + 4rpx);
					left: 0;
					display: flex;
					justify-content: center;
					padding: 4rpx 30rpx;
					border-radius: 100rpx;
					background-color: var(--text-color-denary);
					width: fit-content;
				}

				.subscription-setting-page-list-item-container-left-name-default-text {
					font-size: 20rpx;
					line-height: 1;
				}

			}

			.subscription-setting-page-list-item-container-right {
				display: flex;
				align-items: center;
				gap: 16rpx;

				.subscription-setting-page-list-item-container-right-number {
					font-size: 32rpx;
					font-weight: 400;
					color: var(--text-color-primary);
				}

				.subscription-setting-page-list-item-container-right-tick-container {
					display: flex;
					opacity: 0;
				}

				.subscription-setting-page-list-item-container-right-tick-container-tick {
					font-size: 20rpx !important;
					color: var(--primary-color);
				}
			}
		}

		.wallet-content-container-bottom-record-list-item.active {
			.subscription-setting-page-list-item-container-right-tick-container {
				opacity: 1;
			}
		}
	}
}

.wallet-content-container-bottom-record-list-container .wallet-content-container-bottom-record-list-item.add-card-item {
	background: var(--text-color-tertiary) !important;

	.icon-plus {
		color: var(--text-color-quaternary) !important;
	}

	.subscription-setting-page-list-item-container .subscription-setting-page-list-item-container-left .subscription-setting-page-list-item-container-left-name-text {
		color: var(--text-color-quaternary);
	}
}
</style>
