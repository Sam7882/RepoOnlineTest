<template>
	<view class="subscription-setting-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.subscriptionEdit')" :openBack="false">
			<template #left>
				<view class="header-nav-left-position header-nav-icon-container" @click="handleOpenSetting">
					<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
				</view>
			</template>
		</c-headerNav>
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
import { toSubscriptionSetting, checkViewportAutoReplace } from '@/utils/routers';
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
	switchTab('subscriptionSetting')
}

const { switchTab } = inject('center') as any
const handleOpenSetting = () => {
	switchTab('subscriptionSetting')
}

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
	padding-top: 70rpx;
	overflow-y: scroll;
}

.subscription-setting-page-tip-container {
	padding: 0 32rpx 32rpx;
	font-size: var(--font-content-pc-small);
	color: var(--text-color-primary);
}

.wallet-content-container-bottom-record-list-container {
	padding: 0 32rpx;
	font-size: var(--font-content-pc-small);
	gap: 16rpx;
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
				font-size: var(--font-content-pc-large);
				flex: 1;

				.subscription-setting-page-list-item-container-left-amount {
					font-size: var(--font-title-pc);
					color: var(--text-color-primary);
				}

				.subscription-setting-page-list-item-container-left-time {
					font-size: var(--font-content-pc-small);
					line-height: 1;
					color: var(--text-color-septenary);
				}

			}
		}
	}
}

.subscription-setting-page-list-item-container-right-button {
	border-radius: 16rpx;
	font-size: var(--font-content-pc);
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
			font-size: var(--font-content-pc-large);

		}
	}
}

.subscription-setting-page-save-button-container {
	margin: 144rpx 0 48rpx;

	.subscription-setting-page-save-button {
		border-radius: 16rpx;
		font-size: var(--font-content-pc-large);
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
