<template>
	<view class="wallet-page">
		<!-- header 導航-->
		<c-headerNav :title="'錢包管理'" :openQa="true" />
		<!--內容容器 -->
		<view class="wallet-content-container">
			<view class="wallet-content-container-top">
				<!-- 帳號頭像和錢包總額文字 水平排列 -->
				<view class="wallet-account-container">
					<!-- 帳號頭像 垂直排列 -->
					<view class="wallet-account-info-container">
						<!-- 頭像 -->
						<view class="wallet-account-avatar-container">
							<image class="wallet-account-avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
							</image>
						</view>
						<!-- 名稱與帳號 -->
						<view class="wallet-account-info-name-container">
							<view class="wallet-account-info-name-title-container">
								<text class="wallet-account-info-title">名稱</text>
								<!-- 認證圖標 -->
								<view class="wallet-account-info-prove-container">
									<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
										color="var(--text-color-senary)"></uni-icons>
								</view>
							</view>
							<view class="wallet-account-info-name-account-container">
								<text class="wallet-account-info-account">@888888.88</text>
							</view>
						</view>
					</view>
					<!-- 錢包總額文字 -->
					<view class="wallet-account-total-amount-container">
						<text class="wallet-account-total-amount">{{ $t('wallet.walletTotalAmount') }}</text>
					</view>
				</view>
				<!-- 錢包金額 -->
				<view class="wallet-amount-container">
					<view class="wallet-amount-item">
						<text class="wallet-amount-item-value">$16,888</text>
					</view>
				</view>
				<!-- 顯示數據框 與 按鈕 容器頂部邊線 -->
				<view class="wallet-content-container-bottom">
					<!-- 顯示數據 -->
					<view class="wallet-content-container-bottom-data">
						<!-- 訂閱 -->
						<view class="wallet-content-container-bottom-data-item">
							<text class="wallet-content-container-bottom-data-item-title">{{ $t('common.subscription') }}</text>
							<text class="wallet-content-container-bottom-data-item-value">$1,888</text>
						</view>
						<!-- 關注人數 -->
						<view class="wallet-content-container-bottom-data-item">
							<text class="wallet-content-container-bottom-data-item-title">{{ $t('common.followingNum') }}</text>
							<text class="wallet-content-container-bottom-data-item-value">$1,888</text>
						</view>
					</view>
					<!-- 提領按鈕 -->
					<view class="wallet-content-container-bottom-button-container">
						<button type="button" class="wallet-content-container-bottom-button" @click="handlewithdraw">{{
							$t('wallet.withdrawal') }}</button>
					</view>
				</view>
			</view>
			<!-- 訂閱/購買紀錄 -->
			<view class="wallet-content-container-bottom-record-container">
				<!-- 標題 -->
				<view class="wallet-content-container-bottom-record-title-container">
					<view class="listType-container">
						<template v-for="(item, index) in listTypeData" :key="index">
							<view class="listType-item" @click="changeListType(item.value)"
								:class="{ active: listType === item.value }">
								<text class="listType-text">{{ $t(item.text) }}</text>
							</view>
						</template>
					</view>

					<view class="type-select-container">
						<uni-data-select class="type-select" v-model="localdata.value" :localdata="localdata.range" @change="change"
							placement="top" :clear="false"></uni-data-select>
					</view>
				</view>
				<!-- 紀錄列表 垂直排序 -->
				<uni-list :border="false" class="wallet-content-container-bottom-record-list-container">
					<!-- 紀錄 space-between 左右排列 -->
					<template v-for="(item, index) in 5" :key="index">
						<uni-list-item :border="true" class="wallet-content-container-bottom-record-list-item">
							<template #body>
								<!-- 帳號頭像和錢包總額文字 水平排列 -->
								<view class="wallet-account-container wallet-account-container-record">
									<!-- 帳號頭像 垂直排列 -->
									<view class="wallet-account-info-container">
										<!-- 頭像 -->
										<view class="wallet-account-avatar-container">
											<image class="wallet-account-avatar" src="/static/images/template/img-template-03.png"
												mode="widthFix">
											</image>
										</view>
										<!-- 名稱與帳號 -->
										<view class="wallet-account-info-name-container">
											<view class="wallet-account-info-name-title-container">
												<text class="wallet-account-info-title">名稱</text>
												<!-- 認證圖標 -->
												<view class="wallet-account-info-prove-container">
													<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
														color="var(--text-color-senary)"></uni-icons>
												</view>
											</view>
											<view class="wallet-account-info-name-account-container">
												<text class="wallet-account-info-account">@888888.88</text>
											</view>
										</view>
									</view>
									<!-- 金額與圖標 -->
									<view class="wallet-content-container-bottom-record-list-item-amount-container">
										<!-- 紀錄金額 -->
										<view class="wallet-content-container-bottom-record-list-item-amount-value-container">
											<text class="wallet-content-container-bottom-record-list-item-amount-value">$1,888</text>
										</view>
										<!-- 紀錄圖標 -->
										<view class="wallet-content-container-bottom-record-list-item-amount-icon-container">
											<uni-icons class="wallet-content-container-bottom-record-list-item-amount-icon" type="right"
												size="12" color="var(--text-color-primary)"></uni-icons>
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

<script setup>
// TEMP: 我的錢包
import { onShow } from '@dcloudio/uni-app';
import { router, towithdraw } from '@/utils/routers';

const { back } = router;

const localdata = ref({
	value: 0,
	range: [
		{ value: 0, text: "全部" },
		{ value: 1, text: "訂閱" },
		{ value: 2, text: "打賞" },
		{ value: 3, text: "今日" },
		{ value: 4, text: "本週" },
		{ value: 5, text: "本月" },
		{ value: 6, text: "今年" },
	],
})
const listTypeData = ref([
	{ value: 'subscription', text: "common.subscription" },
	{ value: 'recommend', text: "common.recommend" },
])
const listType = ref('subscription')

const changeListType = (value) => {
	listType.value = value;
}

const change = (e) => {
	console.log("e:", e);
}

const handlewithdraw = () => {
	towithdraw()
}
onShow(() => {
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.wallet-page {
	// padding: 0 100rpx;
}

.header-nav-container {
	position: relative;
	display: flex;
	justify-content: center;
	padding: 32rpx;
	padding-top: 48rpx;
	border-bottom: 1px solid var(--text-color-octonary);

	// 圖標容器
	.header-nav-icon-container {
		position: absolute;
		left: 48rpx;
		top: 50%;
		transform: translateY(-50%);
		padding-top: 16rpx;
	}

	// 標題容器
	.header-nav-title-container {
		font-size: 32rpx;
		color: var(--text-color-primary);
	}
}

.wallet-content-container {
	padding: 0 40rpx;
}

/* 錢包頁面 頂部容器 */
.wallet-content-container-top {
	padding: 0 64rpx;
	margin-bottom: 118rpx;

	// 錢包金額
	.wallet-amount-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 46rpx;

		// padding: 0 64rpx;
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			border-bottom: 2rpx solid var(--text-color-octonary);
		}

		.wallet-amount-item {
			font-size: 64rpx;
			font-weight: 500;
			color: var(--text-color-primary);
		}
	}
}

/* 帳號頭像和錢包總額文字 */
.wallet-account-container {
	// padding: 8rpx;
	padding-top: 56rpx;
	margin-bottom: 32rpx;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

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
					font-size: 34rpx;
					color: var(--text-color-primary);
				}

				// 認證圖標
				.icon-community-prove {
					font-size: 28rpx !important;
				}
			}

			.wallet-account-info-name-account-container {
				display: flex;
				height: fit-content;

				.wallet-account-info-account {
					font-size: 24rpx;
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}

	.wallet-account-total-amount-container {
		margin-right: 32rpx;
		font-size: 30rpx;
		color: var(--text-color-primary);
		transform: translateY(-10rpx);
	}

}

/* 錢包頁面 底部容器 */
.wallet-content-container-bottom {
	margin-top: 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 42rpx;

	/* 訂閱/關注人數 */
	.wallet-content-container-bottom-data {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 32rpx;
		width: 100%;

		.wallet-content-container-bottom-data-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			border-radius: 16rpx;
			background-color: var(--background-color-orange);
			color: var(--text-color-secondary);
			font-weight: normal;
			padding: 28rpx 64rpx;

			&:last-child {
				background-color: var(--background-color-blue);

			}

			.wallet-content-container-bottom-data-item-title {
				font-size: 24rpx;
			}

			.wallet-content-container-bottom-data-item-value {
				font-size: 44rpx;
				font-weight: 500;
			}
		}
	}

	/* 提領按鈕 */
	.wallet-content-container-bottom-button-container {
		width: 50%;

		.wallet-content-container-bottom-button {
			font-size: 24rpx;
			line-height: 1;
			padding: 24rpx 64rpx;
			border-radius: 16rpx;
			background-color: var(--primary-color);
			color: var(--text-color-secondary);
		}

	}
}

/* 訂閱/購買紀錄 */
.wallet-content-container-bottom-record-container {
	.wallet-account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 16rpx 0;
	}

	.wallet-content-container-bottom-record-title-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: var(--text-color-primary);
	}

	.wallet-content-container-bottom-record-list-item-amount-container {
		display: flex;
		align-items: center;
		gap: 48rpx;

		.wallet-content-container-bottom-record-list-item-amount-icon {
			font-size: 24rpx !important;
			// padding-bottom: 4rpx;
		}

		.wallet-content-container-bottom-record-list-item-amount-value {
			font-size: 32rpx;
		}
	}
}

.listType-container {
	display: flex;
	gap: 26rpx;

	.listType-item {
		position: relative;
		padding: 4rpx 0;

		.listType-text {
			font-size: 28rpx;
			color: var(--text-color-quaternary);
		}

		&.active {
			border-bottom: 2px solid var(--primary-color);

			.listType-text {
				color: var(--text-color-primary);
			}

		}
	}

}

.type-select-container {
	min-width: 150rpx;
	max-width: 50%;
	padding: 8rpx 16rpx;

	::v-deep(.uni-select) {
		& {
			border: unset;
			background: var(--primary-color);
			border-radius: 24rpx;
			height: auto;
		}

		.uni-select {
			height: auto;
			border: none;
		}

		.uni-select__input-box {
			width: fit-content;
			height: auto;
		}

		.uni-select__input-text {
			color: var(--text-color-secondary);
		}

		.uni-icons {
			color: var(--text-color-secondary) !important;
		}

		.uni-select__selector {
			width: fit-content;
			color: var(--popTxt-color-content);
			left: unset;
			right: 0;

			.uni-popper__arrow_bottom {
				left: unset;
				right: 10%;
			}

			.uni-select__selector-item {
				padding: 0 46rpx;

				uni-text {
					white-space: nowrap;
				}
			}
		}
	}
}

.wallet-content-container-bottom-record-list-item {
	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 34rpx 0;
		}
	}
}
</style>
