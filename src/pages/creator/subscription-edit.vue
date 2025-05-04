<template>
	<view class="wallet-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.subscriptionEdit')" backUrl="/pages/creator/subscription-setting" />
		<!-- 內容區塊 -->
		<view class="subscription-setting-page-content-container">
			<!-- 小提示 -->
			<view class="subscription-setting-page-tip-container">
				<text>{{ $t('creator.subscriptionTip') }}</text>
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
									<view class="subscription-setting-page-list-item-container-left-container ">
										$
										<template v-if="!item.status">
											<text class="subscription-setting-page-list-item-container-left-amount">{{ item.amount }}</text>
										</template>
										<template v-else>
											<uni-easyinput v-model="item.amount" class="inputStyle" type="number" :placeholder="'請編輯'"
												:trim="true" :clearable="false" />
										</template>
									</view>
									<text class="subscription-setting-page-list-item-container-left-time">{{ item.time }}</text>
								</view>
								<!-- 該筆 編輯/保存 切換按鈕 -->
								<view class="subscription-setting-page-list-item-container-right">
									<button type="button" class="subscription-setting-page-list-item-container-right-button"
										@click="switchEdit(item)">
										<text>{{ item.status ? $t('common.confirm') : $t('common.edit') }}</text>
									</button>
								</view>
							</view>
						</template>
					</uni-list-item>
				</template>
			</uni-list>
		</view>

		<!-- 保存按鈕 -->
		<view class="subscription-setting-page-save-button-container">
			<button type="button" class="subscription-setting-page-save-button" @click="save">
				<text>{{ $t('common.save') }}</text>
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 訂閱項目 編輯
import { onShow } from '@dcloudio/uni-app';
import { toSubscriptionSetting } from '@/utils/routers';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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

const switchEdit = (item: any) => {
	item.status = !item.status
}
const save = () => {
	console.log('save')
	toSubscriptionSetting()
}
onShow(() => {
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-grayLight);
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
	background: transparent;

	::v-deep(.uni-list-item) {
		.uni-list-item {
			background-color: var(--background-color);
			border-radius: 32rpx;
			padding: 16rpx;
		}

		.subscription-setting-page-list-item-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;

			.subscription-setting-page-list-item-container-left {
				display: flex;
				flex-direction: column;
				min-width: 40%;
				font-size: 40rpx;
				flex: 1;

				.subscription-setting-page-list-item-container-left-amount {
					font-size: 40rpx;
					color: var(--text-color-primary);
				}

				.subscription-setting-page-list-item-container-left-time {
					font-size: 20rpx;
					line-height: 1;
					color: var(--text-color-septenary);
				}

			}
		}
	}
}

.subscription-setting-page-list-item-container-right-button {
	border-radius: 16rpx;
	font-size: 24rpx;
	line-height: 1;
	padding: 20rpx 48rpx;
	background-color: var(--primary-color);
	color: var(--text-color-secondary);

	&::after {
		display: none;
	}
}

.subscription-setting-page-list-item-container-left-container {
	display: flex;
	gap: 4rpx;
}

.subscription-setting-page-list-item-container-left-edit {
	display: flex;
	flex-direction: row !important;
	align-items: center;
	gap: 16rpx;

}

.inputStyle {
	color: var(--text-color-primary);
	width: 60%;
	flex: unset;

	::v-deep(.uni-easyinput inputStyle) {
		.uni-easyinput__content-input {
			font-size: 40rpx;

		}
	}
}

.subscription-setting-page-save-button-container {
	margin: 144rpx 0 48rpx;

	.subscription-setting-page-save-button {
		border-radius: 16rpx;
		font-size: 28rpx;
		line-height: 1;
		padding: 24rpx 112rpx;
		background-color: var(--primary-color);
		color: var(--text-color-secondary);
		width: fit-content;

		&::after {
			display: none;
		}
	}
}
</style>
