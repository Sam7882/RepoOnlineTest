<template>
	<view class="withdrawIn-page">
		<!-- header 導航-->
		<c-headerNav :title="'交易紀錄'" :openQa="true" />
		<!-- 內容區塊 -->
		<view class="withdrawIn-page-content">
			<view class="withdrawIn-page-content-header">
				<view class="type-select-container">
					<uni-data-select class="type-select" v-model="withdrawTypeSelect.value" :localdata="withdrawTypeSelect.range"
						@change="change" placement="bottom" :clear="false"></uni-data-select>
				</view>
				<view class="type-select-container">
					<uni-data-select class="type-select" v-model="withdrawDateSelect.value" :localdata="withdrawDateSelect.range"
						@change="change" placement="bottom" :clear="false"></uni-data-select>
				</view>
			</view>

			<view class="withdrawIn-page-content-body-list">
				<view class="withdrawIn-page-content-body-list-item" v-for="(item, index) in withdrawData" :key="index"
					@click="handleDetail(item.type)">
					<view class="withdrawIn-page-content-body-list-item-left">
						<view class="withdrawIn-page-content-body-list-item-left-icon withdrawIn" v-if="item.type === 0">
							<uni-icons class="withdrawIn-icon " type="icon-wallet-withdraw-in" custom-prefix="icon"></uni-icons>
						</view>
						<view class="withdrawIn-page-content-body-list-item-left-icon withdrawOut" v-if="item.type === 1">
							<uni-icons class="withdrawIn-icon " type="icon-wallet-withdraw-out" custom-prefix="icon"></uni-icons>
						</view>
						<view class="withdrawIn-page-content-body-list-item-left-icon withdrawOrder" v-if="item.type === 2">
							<uni-icons class="withdrawIn-icon " type="icon-wallet-withdraw-in" custom-prefix="icon"></uni-icons>
						</view>

						<view class="withdrawIn-page-content-body-list-item-left-text">
							<view class="withdrawIn-page-content-body-list-item-left-text-title">{{ item.name }}</view>
							<view class="withdrawIn-page-content-body-list-item-left-text-date">{{ item.date }}</view>
							<view class="withdrawIn-page-content-body-list-item-left-text-status">{{ item.status }}</view>
						</view>
					</view>

					<view class="withdrawIn-page-content-body-list-item-right">
						<view class="withdrawIn-page-content-body-list-item-right-amount" :class="[...withdrawType(item.type)]">
							{{ item.type === 1 ? '-' : '+' }} $ {{ item.amount }}</view>
						<view class="withdrawIn-page-content-body-list-item-right-icon">
							<uni-icons class="withdrawIn-icon" type="right"></uni-icons>
						</view>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script setup>
// TEMP: 提領紀錄頁
import { onShow } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
import { toOrderDetail, toWithdrawDetail } from '@/utils/routers'
const { t } = useI18n();

const withdrawTypeSelect = ref({
	value: 0,
	range: [
		{ value: 0, text: "全部" },
		{ value: 1, text: "可提領" },
		{ value: 2, text: "我的進帳" },
		{ value: 3, text: "即將撥款" },
	],
})
const withdrawDateSelect = ref({
	value: 0,
	range: [
		{ value: 0, text: "全部" },
		{ value: 1, text: "本週" },
		{ value: 2, text: "本月" },
		{ value: 3, text: "近兩月" },
		{ value: 4, text: "半年內" },
	],
})
const change = (e) => {
	console.log("e:", e);
}

const withdrawData = ref([
	{
		type: 0,
		amount: '450',
		date: '2025年4月5日',
		name: 'f4542訂單款項',
		status: '即將撥款',
	},
	{
		type: 1,
		amount: '450',
		date: '2025年4月5日',
		name: '提領',
		status: '已完成',
	},
	{
		type: 2,
		amount: '450',
		date: '2025年4月5日',
		name: 'f4544122訂單款項',
		status: '已完成',
	}
])

const withdrawType = (type) => {
	// type 0/2: 收入，type 1: 支出
	if (type === 0 || type === 2) {
		return ['plus']
	} else if (type === 1) {
		return ['minus']
	}
	return []
}

const handleDetail = (type) => {
	if (type === 0 || type === 2) {
		toOrderDetail()
	} else if (type === 1) {
		toWithdrawDetail()
	}
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

.withdrawIn-page-content {
	padding: 68rpx 40rpx 0;
}

.withdrawIn-page-content-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 18rpx;

	.withdrawIn-page-content-header-item {
		flex: 1;
		text-align: center;
		line-height: 1;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: var(--primary-color);
		border-bottom: 1px solid var(--primary-color);

		&.active {
			border-radius: 20rpx;
			background: var(--primary-color);
			color: #fff;
			border: none;
		}
	}
}

.deco-line {
	width: 100%;
	margin: 0;
	border-color: var(--text-color-octonary);
}

.withdrawIn-page-content-body {
	margin-top: 58rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.withdrawIn-page-content-body-amount {
		font-size: 64rpx;
		font-weight: 500;
		margin-bottom: 36rpx;
	}

	.withdrawIn-page-content-body-text {
		font-size: 28rpx;
		color: var(--popTxt-color-content);
		margin-bottom: 58rpx;
	}

	.withdrawIn-page-content-body-date {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 14rpx;
		width: 100%;

		.date-item {
			position: relative;
			flex: 1;
		}

		.date-item-icon {
			position: absolute;
			right: 16rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}

/* 日期選擇器 */

::v-deep(.uni-date) {
	.uniui-calendar {
		display: none;
	}

	.uni-date__x-input {
		text-align: center;
		background: var(--text-color-tertiary);
		color: var(--popTxt-color-content);
	}
}

::v-deep(.uni-calendar-item__weeks-box) {
	.uni-calendar-item__weeks-box .uni-calendar-item--checked {
		background-color: var(--primary-color) !important;
	}
}

::v-deep(.uni-date-btn--ok) {
	.uni-datetime-picker--btn {
		background-color: var(--primary-color) !important;
		border-radius: 24rpx !important;
	}
}


.withdrawIn-page-content-body-list {
	display: flex;
	flex-direction: column;

	.withdrawIn-page-content-body-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
		padding-right: 34rpx;
		border-bottom: 1px solid var(--text-color-octonary);

		.withdrawIn-page-content-body-list-item-left {
			display: flex;
			align-items: center;
			gap: 38rpx;

			.withdrawIn-page-content-body-list-item-left-icon {
				border-radius: 50%;
				padding: 18rpx 26rpx;

				.withdrawIn-icon {
					font-size: 34rpx !important;
					color: var(--text-color-secondary) !important;
				}

				&.withdrawIn {
					background: var(--background-color-green);
				}

				&.withdrawOut {
					background: var(--background-color-blue2);
				}

				&.withdrawOrder {
					background: var(--play-sponsor-color-quaternary);
				}
			}

			.withdrawIn-page-content-body-list-item-left-text {
				.withdrawIn-page-content-body-list-item-left-text-title {
					font-size: 28rpx;
				}

				.withdrawIn-page-content-body-list-item-left-text-date {
					font-size: 24rpx;
					color: var(--popTxt-color-conten);
				}

				.withdrawIn-page-content-body-list-item-left-text-status {
					font-size: 16rpx;
					color: var(--popTxt-color-content);
				}
			}
		}

		.withdrawIn-page-content-body-list-item-right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 24rpx;

			.withdrawIn-page-content-body-list-item-right-amount {
				font-size: 30rpx;

				&.plus {
					color: var(--play-sponsor-color-quaternary);
				}

				&.minus {
					color: var(--text-color-primary);
				}
			}

			.withdrawIn-page-content-body-list-item-right-icon {
				translate: 0 -4rpx;

				.withdrawIn-icon {
					font-size: 24rpx !important;
				}
			}
		}
	}
}


.type-select-container {
	min-width: 150rpx;
	max-width: 50%;
	padding: 20rpx 16rpx;

	::v-deep(.uni-select) {
		& {
			border: unset;
			background: var(--primary-color);
			height: auto;
			flex: 1;
			border-radius: 20rpx;
		}

		.uni-select {
			height: auto;
			border: none;
		}

		.uni-select__input-box {
			width: fit-content;
			height: auto;
			justify-content: center;
			gap: 30rpx;
		}

		.uni-select__input-text {
			width: fit-content;
			color: var(--text-color-secondary);
		}

		.uni-icons {
			color: var(--text-color-secondary) !important;
		}

		.uni-select__selector {
			width: 100%;
			color: var(--popTxt-color-content);
			// left: unset;
			// right: 0;

			.uni-popper__arrow_bottom {
				// left: unset;
				// right: 10%;
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
</style>
