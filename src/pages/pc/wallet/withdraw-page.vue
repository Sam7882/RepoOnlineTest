<template>
	<view class="withdraw-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('wallet.withdrawal')" :openQa="true">
			<template #left>
				<view class="header-nav-left-position header-nav-icon-container" @click="handleBack">
					<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
				</view>
			</template>
			<template #Qa>
				<uni-icons class="icons header-gear-icon" type="icon-common-qa" custom-prefix="icon" size="20"
					color="var(--text-color-primary)" @click="handleOpenQa"></uni-icons>
			</template>
		</c-headerNav>
		<!-- 內容區塊 -->
		<view class="withdraw-page-content">
			<view class="withdraw-amount-container">
				<view class="withdraw-amount-container-top">
					<!--標題 -->
					<text class="withdraw-amount-container-top-title">{{ $t("wallet.withdrawableAmount") }}</text>

					<!-- 交易紀錄 -->
					<view class="withdraw-amount-container-top-record" @click="handleWithdrawRecord">
						<text class="withdraw-amount-container-top-record-text">{{ $t("wallet.transactionRecord") }}</text>
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
						<text>{{ $t("wallet.myIncome") }}</text>
					</view>
					<view class="withdraw-item-container-item-right">
						<uni-icons class="withdraw-item-icon" type="right" size="20" color="var(--text-color-primary)" />
					</view>
				</view>
			</view>
		</view>

		<!-- 提領按鈕 -->
		<view class="btn-container withdraw-btn-container">
			<button type="button" class="btn" @click="handleWithdraw">{{ $t("wallet.withdraw") }}</button>
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
// TEMP: 提款頁
import { onShow } from '@dcloudio/uni-app';
import { towithdrawIn, toWithdrawRecord, toWithdrawApply, checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emit = defineEmits(['switchTab'])

const { openMessage } = inject('common')
const { switchTab } = inject('setMenu')

const handleBack = () => {
	emit('switchTab', 'index')
}

const handleOpenQa = () => {
	switchTab('helper')
}
const handleWithdrawIn = () => {
	emit('switchTab', 'withdrawIn')
	// towithdrawIn()
}

const handleWithdrawRecord = () => {
	emit('switchTab', 'withdrawRecord')
	// toWithdrawRecord()
}
const withdrawStatus = ref(true)
const handleWithdraw = () => {
	if (!withdrawStatus.value) {
		openAlertDialog()
	} else {
		emit('switchTab', 'withdrawApply')
		// toWithdrawApply()
	}
}

const alertDialog = ref(null)

const openAlertDialog = () => {
	openMessage({
		content: t('wallet.noBalanceToWithdraw'),
		confirmBtnText: 'OK',
	})
}

const dialogConfirm = () => {
	console.log('点击确认')
}

onShow(() => {
	checkViewportAutoReplace()
})

</script>

<style lang="scss" scoped>
.withdraw-page {
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

.icons {
	&:hover {
		cursor: pointer;
	}
}

uni-image {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.withdraw-page-content {
	width: 100%;
	padding: 0 50rpx;
	padding-top: 70rpx;
	// overflow-y: scroll;
}

.withdraw-amount-container {
	display: flex;
	flex-direction: column;

	.withdraw-amount-container-top {
		display: flex;
		align-items: center;
		gap: 26rpx;

		.withdraw-amount-container-top-title {
			font-size: var(--font-size-title-pc);
		}

		.withdraw-amount-container-top-record {
			display: flex;
			align-items: center;

			&:hover {
				cursor: pointer;
			}

			.withdraw-amount-container-top-record-text {
				font-size: var(--font-size-title-pc-small);
				color: var(--popTxt-color-content);
			}

			.withdraw-icon {
				font-size: var(--font-size-content-pc) !important;
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
	margin-top: 120rpx;
	position: relative;
	width: 90%;
	// bottom: 80rpx;
	// left: 50%;
	// transform: translateX(-50%);

	.btn {
		min-width: 350rpx;
		padding: 20rpx 40rpx;
		font-size: var(--font-size-title-pc);
		line-height: initial;
	}
}

.deco-line {
	margin: 32rpx 0;
}

.withdraw-item-container {
	display: flex;
	flex-direction: column;
	margin-top: 80rpx;
	gap: 80rpx;

	.withdraw-item-container-item {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&:hover {
			cursor: pointer;
		}

		.withdraw-item-container-item-left {
			display: flex;
			gap: 14rpx;
			font-size: var(--font-size-title-pc-large);

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
