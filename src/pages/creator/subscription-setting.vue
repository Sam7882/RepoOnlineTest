<template>
	<view class="subscription-setting-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.subscriptionSetting')" :openSetting="true" @openSetting="handleOpenSetting" />
		<!-- 內容區塊 -->
		<view class="subscription-setting-page-content-container">
			<!-- 小提示 -->
			<view class="subscription-setting-page-tip-container">
				<text>{{ $t('creator.subscriptionSettingTip') }}</text>
			</view>
			<!-- 訂閱列表 -->
			<uni-list :border="false" class="wallet-content-container-bottom-record-list-container">
				<!-- 紀錄 space-between 左右排列 -->
				<template v-for="(item, index) in openStatusList" :key="index">
					<uni-list-item :border="false" class="wallet-content-container-bottom-record-list-item">
						<template #body>
							<!-- 帳號頭像和錢包總額文字 水平排列 -->
							<view class="subscription-setting-page-list-item-container">
								<view class="subscription-setting-page-list-item-container-left">
									<text class="subscription-setting-page-list-item-container-left-title">{{ item.time }}</text>
									<text class="subscription-setting-page-list-item-container-left-amount">
										{{ item.amount }}
										<text class="subscription-setting-page-list-item-container-left-amount-unit">{{ item.currency
										}}</text>
									</text>
								</view>
								<!-- 該筆啟用切換按鈕 -->
								<view class="subscription-setting-page-list-item-container-right">
									<c-checkBox class="subscription-setting-page-list-item-container-right-checkBox"
										v-model="item.status" />
								</view>
							</view>
						</template>
					</uni-list-item>
				</template>
			</uni-list>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 訂閱項目 設定
import { onShow } from '@dcloudio/uni-app';
import { toSubscriptionEdit } from '@/utils/routers';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const handleOpenSetting = () => {
	toSubscriptionEdit()
}
const openStatus = ref(false)
const openStatusList = ref([
	{
		time: t('common.oneMonth'),
		amount: 399,
		currency: 'TWD',
		status: false
	},
	{
		time: t('common.threeMonth'),
		amount: 1080,
		currency: 'TWD',
		status: false
	},
	{
		time: t('common.sixMonth'),
		amount: 2200,
		currency: 'TWD',
		status: false
	},
	{
		time: t('common.oneYear'),
		amount: 4500,
		currency: 'TWD',
		status: false
	}
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

.subscription-setting-page {
	// padding: 0 100rpx;
}

.subscription-setting-page-tip-container {
	padding: 48rpx 32rpx;
	font-size: 20rpx;
	color: var(--text-color-primary);
}

.wallet-content-container-bottom-record-list-container {
	padding: 0 32rpx;
	font-size: 20rpx;
	gap: 48rpx;

	::v-deep(.uni-list-item) {
		.uni-list-item__container {
			padding: 0;
		}

		.subscription-setting-page-list-item-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;

			.subscription-setting-page-list-item-container-left {
				display: flex;
				min-width: 40%;
				flex: 1;

				.subscription-setting-page-list-item-container-left-title {
					font-size: 28rpx;
					color: var(--text-color-primary);
					min-width: 25%;
					margin-right: 1rem;
				}

				.subscription-setting-page-list-item-container-left-amount-unit {
					font-size: 20rpx;
				}

			}
		}
	}
}

.subscription-setting-page-list-item-container-right-checkBox {}
</style>
