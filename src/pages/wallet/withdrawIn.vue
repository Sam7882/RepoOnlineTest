<template>
	<view class="withdrawIn-page">
		<!-- header 導航-->
		<c-headerNav :title="'我的進帳'" :openQa="true" />
		<!-- 內容區塊 -->
		<view class="withdrawIn-page-content">
			<view class="withdrawIn-page-content-header">
				<view class="withdrawIn-page-content-header-item" :class="{ 'active': typeStatus === 0 }"
					@click="typeSwitch(0)">
					<text>即將撥款</text>
				</view>
				<view class="withdrawIn-page-content-header-item" :class="{ 'active': typeStatus === 1 }"
					@click="typeSwitch(1)">
					<text>已提領</text>
				</view>
			</view>

			<view class="withdrawIn-page-content-body">
				<view class="withdrawIn-page-content-body-amount">
					<text>$1800</text>
				</view>

				<view class="withdrawIn-page-content-body-text" v-if="typeStatus === 1">
					<text>撥款金額(2025年5月12日 - 2025年5月20日)</text>
				</view>

				<view class="deco-line"></view>

				<view class="withdrawIn-page-content-body-date" v-if="typeStatus === 1">
					<view class="date-item">
						<uni-datetime-picker type="date" :clear-icon="false" v-model="startDate" :border="false"
							@change="setDate('start', $event)" />
						<view class="date-item-icon">
							<uni-icons type="down" size="16" color="var(--popTxt-color-content)"></uni-icons>
						</view>
					</view>
					<view class="date-item">
						<uni-datetime-picker type="date" :clear-icon="false" v-model="endDate" :border="false"
							@change="setDate('end', $event)" />
						<view class="date-item-icon">
							<uni-icons type="down" size="16" color="var(--popTxt-color-content)"></uni-icons>
						</view>
					</view>
				</view>
			</view>

			<view class="withdrawIn-page-content-body-list">
				<view class="withdrawIn-page-content-body-list-item" v-for="(item, index) in 4" :key="index">
					<view class="withdrawIn-page-content-body-list-item-left">
						<view class="withdrawIn-page-content-body-list-item-left-icon withdrawIn" v-if="typeStatus === 0">
							<uni-icons class="withdrawIn-icon " type="icon-wallet-withdraw-in" custom-prefix="icon"></uni-icons>
						</view>
						<view class="withdrawIn-page-content-body-list-item-left-icon withdrawOut" v-if="typeStatus === 1">
							<uni-icons class="withdrawIn-icon " type="icon-wallet-withdraw-out" custom-prefix="icon"></uni-icons>
						</view>

						<view class="withdrawIn-page-content-body-list-item-left-text">
							<view class="withdrawIn-page-content-body-list-item-left-text-title">提領</view>
							<view class="withdrawIn-page-content-body-list-item-left-text-date">2025年４月５日</view>
							<view class="withdrawIn-page-content-body-list-item-left-text-status">已完成</view>
						</view>
					</view>

					<view class="withdrawIn-page-content-body-list-item-right">
						<view class="withdrawIn-page-content-body-list-item-right-amount">-$450</view>
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
// TEMP: 我的進帳頁
import { onShow } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const typeStatus = ref(1)
const typeSwitch = (status) => {
	typeStatus.value = status
}

const startDate = ref('')
const endDate = ref('')
const setDate = (type, event) => {
	console.log("🚀 ~ setDate ~ type, event:", type, event)
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
</style>
