<template>
	<view class="subscription-setting-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.subscriptionSetting')" :openBack="false">
			<template #left>
				<view class="header-nav-left-position header-nav-icon-container" @click="handleOpenManage">
					<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
				</view>
			</template>
			<template #right>
				<uni-icons class="icons header-gear-icon" type="icon-common-gear" custom-prefix="icon" size="20"
					color="var(--text-color-primary)" @click="handleOpenEdit"></uni-icons>
			</template>
		</c-headerNav>
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
// TEMP: 設定訂閱項目頁
import { onShow } from '@dcloudio/uni-app';
import { toSubscriptionEdit, checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { switchTab } = inject('center') as any
const handleOpenManage = () => {
	switchTab('subscriptionManage')
}
const handleOpenEdit = () => {
	switchTab('subscriptionEdit')
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
	checkViewportAutoReplace()
})

</script>

<style lang="scss" scoped>
.subscription-setting-page {
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


	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position {
			left: 0;
		}
	}

	// padding: 0 100rpx;
}

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-50%);

	&:hover {
		cursor: pointer;
	}
}

.subscription-setting-page-content-container {
	width: 100%;
	height: 100%;
	padding: 0 50rpx;
	padding-top: 36rpx;
	overflow-y: scroll;
}

.subscription-setting-page-tip-container {
	padding: 48rpx 32rpx;
	font-size: var(--font-content-pc-small);
	color: var(--text-color-primary);
}

.wallet-content-container-bottom-record-list-container {
	padding: 0 32rpx;
	font-size: var(--font-content-pc-small);
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
					font-size: var(--font-content-pc-large);
					color: var(--text-color-primary);
					min-width: 25%;
					margin-right: 1rem;
				}

				.subscription-setting-page-list-item-container-left-amount-unit {
					font-size: var(--font-content-pc-small);
				}

			}
		}
	}
}

.subscription-setting-page-list-item-container-right-checkBox {}
</style>
