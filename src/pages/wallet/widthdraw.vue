<template>
	<view class="widthdraw-page">
		<!-- header 導航-->
		<c-headerNav :title="'提領'" :openQa="true" />
		<!-- 內容區塊 -->
		<view class="widthdraw-page-content">
			<view class="withdraw-amount-container">
				<view class="withdraw-amount-container-top">
					<!--標題 -->
					<text class="withdraw-amount-container-top-title">可提領金額</text>

					<!-- 交易紀錄 -->
					<view class="withdraw-amount-container-top-record" @click="handleWithdrawRecord">
						<text class="withdraw-amount-container-top-record-text">交易紀錄</text>
						<uni-icons class="withdraw-icon" type="right" size="20" color="var(--text-color-primary)" />
					</view>
				</view>

				<!-- 可提領金額 -->
				<view class="withdraw-amount">
					<text>$16,888</text>
				</view>

			</view>

			<view class="deco-line"></view>

			<view class="withdraw-item-container">
				<!-- 提領功能項目 -->
				<view class="withdraw-item-container-item" @click="handleWithdrawIn">
					<view class="withdraw-item-container-item-left">
						<uni-icons class="withdraw-item-icon" type="icon-wallet-withdraw-in" custom-prefix="icon" size="20"
							color="var(--text-color-senary)" />
						<text>我的進帳</text>
					</view>
					<view class="withdraw-item-container-item-right">
						<uni-icons class="withdraw-item-icon" type="right" size="20" color="var(--text-color-primary)" />
					</view>
				</view>
			</view>
		</view>

		<!-- 提領按鈕 -->
		<view class="btn-container withdraw-btn-container">
			<button type="button" class="btn" @click="handleWithdraw">提領</button>
		</view>


		<c-messagePopUp ref="alertDialog" />

		<!-- <uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="'info'" :showClose="false" confirmText="OK" title=" " content="欢迎使用 uni-popup!"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup> -->
		<!-- <c-bottomNav /> -->
	</view>
</template>

<script setup>
// TEMP: 信用卡選擇頁
import { onShow } from '@dcloudio/uni-app';
import { toWidthdrawIn, toWidthdrawRecord, toWidthdrawApply } from '@/utils/routers';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const handleWithdrawIn = () => {
	toWidthdrawIn()
}

const handleWithdrawRecord = () => {
	toWidthdrawRecord()
}
const withdrawStatus = ref(false)
const handleWithdraw = () => {
	if (!withdrawStatus.value) {
		openAlertDialog()
	} else {
		toWithdrawApply()
	}
}

const alertDialog = ref(null)

const openAlertDialog = () => {
	alertDialog.value.open({
		content: '您沒有餘額可以提領',
		confirmBtnText: 'OK',
	})
}

const dialogConfirm = () => {
	console.log('点击确认')
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

uni-image {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.widthdraw-page-content {
	padding: 70rpx 40rpx 0;
}

.withdraw-amount-container {
	display: flex;
	flex-direction: column;

	.withdraw-amount-container-top {
		display: flex;
		align-items: center;
		gap: 26rpx;

		.withdraw-amount-container-top-title {
			font-size: 36rpx;
		}

		.withdraw-amount-container-top-record {
			display: flex;
			align-items: center;

			.withdraw-amount-container-top-record-text {
				font-size: 28rpx;
				color: var(--popTxt-color-content);
			}

			.withdraw-icon {
				font-size: 24rpx !important;
				color: var(--popTxt-color-content) !important;
			}
		}
	}

	.withdraw-amount {
		font-size: 64rpx;
		font-weight: 500;
	}
}

.withdraw-btn-container {
	position: absolute;
	bottom: 80rpx;
	left: 50%;
	transform: translateX(-50%);

	.btn {
		min-width: 350rpx;
		padding: 20rpx 40rpx;
		font-size: 32rpx;
		line-height: initial;
	}
}

.deco-line {
	margin: 32rpx 0;
}

.withdraw-item-container {
	display: flex;
	flex-direction: column;

	.withdraw-item-container-item {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.withdraw-item-container-item-left {
			display: flex;
			gap: 14rpx;
			font-size: 36rpx;

			.withdraw-item-icon {
				font-size: 34rpx !important;
				color: var(--favorite-color-secondary) !important;
				transform: translateY(4rpx);
			}
		}

		.withdraw-item-container-item-right {
			.withdraw-item-icon {
				font-size: 28rpx !important;
				color: var(--text-color-primary) !important;
			}
		}

	}
}
</style>
