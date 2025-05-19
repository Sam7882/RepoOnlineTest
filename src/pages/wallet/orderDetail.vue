<template>
	<view class="page">
		<c-headerNav :title="'訂單明細'" />
		<view class="tip-container">
			<text>預計 2025年5月30日 15:50 可提領。</text>
		</view>
		<view class="content-container">
			<view class="amount-box">+${{ finalAmount }}</view>

			<view class="deco-line"></view>

			<view class="section">
				<view class="row">
					<text class="label">訂單金額</text>
					<text>${{ orderAmount }}</text>
				</view>
				<view class="row">
					<text class="label">手續費</text>
					<text>-${{ fee }}</text>
				</view>
				<view class="row">
					<text class="label">最終訂單進帳</text>
					<text>${{ finalAmount }}</text>
				</view>
			</view>

			<view class="deco-line"></view>

			<view class="section user-info">
				<view class="avatar-container">
					<image :src="user.avatar" class="avatar" />
				</view>
				<view class="user-meta">
					<view class="name-row">
						<text class="name">{{ user.name }}</text>
						<uni-icons type="icon-community-prove" custom-prefix="icon" size="16" color="var(--text-color-senary)" />
					</view>
					<text class="id">@{{ user.id }}</text>
				</view>
			</view>


			<view class="section order-info">
				<text>{{ description }}</text>
				<text class="amount">${{ orderAmount }}</text>
			</view>

			<view class="deco-line"></view>


			<view class="section">
				<view class="row">
					<text class="label">訂單編號</text>
					<text>{{ orderId }}</text>
				</view>
				<view class="row">
					<text class="label">訂單時間</text>
					<text>{{ orderTime }}</text>
				</view>
				<view class="row">
					<text class="label">付款時間</text>
					<text>{{ payTime }}</text>
				</view>
			</view>

			<view class="bottom btn-container">
				<button type="primary" class="btn primary-btn active" v-if="canWithdraw">提領</button>
				<button type="primary" class="btn primary-btn" @click="handleWithdrawRecord" v-else>返回我的錢包</button>
			</view>

		</view>
	</view>
</template>

<script setup>
// TEMP: 訂單明細頁
import { toWithdrawRecord } from '@/utils/routers'
const orderAmount = 16888
const fee = 250
const finalAmount = orderAmount - fee
const user = {
	avatar: '/static/images/template/img-template-03.png',
	name: '名稱',
	id: '8888888.888'
}
const description = '打賞 熱氣球x1'
const orderId = '12545213752211'
const orderTime = '2025年12月20日 09:50'
const payTime = '2025年12月20日 09:50'
const canWithdraw = true // 控制是否顯示「提領」按鈕

const handleWithdrawRecord = () => {
	toWithdrawRecord()
}
</script>

<style lang="scss" scoped>
.page {
	// padding: 24rpx;
}

.tip-container {
	background-color: #fe7b8266;
	display: flex;
	justify-content: center;
	padding: 0 120rpx;
	padding-top: 28rpx;
	text-align: center;
	font-size: 24rpx;

}

.content-container {
	padding: 0 40rpx 200rpx;
	position: relative;
}

.amount-box {
	text-align: center;
	font-size: 64rpx;
	font-weight: 500;
	padding: 40rpx 0;
	color: var(--favorite-color-secondary);
}

.deco-line {
	margin: 0;
}

.section {
	padding: 46rpx 0;
}

.row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
	color: var(--text-color-primary);
	font-size: 28rpx;
}

.row:last-child {
	margin-bottom: 0;
}

// 頭像
.avatar-container {
	width: 100rpx;
	height: 100rpx;
	border: 6rpx solid var(--primary-color);
	background: var(--primary-color);
	border-radius: 100%;
	overflow: hidden;

	::v-deep(.avatar) {
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

.user-info {
	display: flex;
	align-items: center;
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.user-meta {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20rpx;

	.id {
		color: var(--popTxt-color-content);
		font-size: 24rpx;
	}
}

.order-info {
	display: flex;
	justify-content: space-between;
	padding-bottom: 46rpx;
	font-size: 28rpx;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 10rpx;

	.name {
		font-size: 34rpx;
	}
}

.bottom {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	padding-bottom: 54rpx;
	background-color: #fff;
}

.primary-btn {
	width: fit-content;
	min-width: 350rpx;
	padding: 20rpx 0;
	line-height: 1;
	border-radius: 16rpx;
	font-size: 32rpx;
	background: unset;
	color: var(--primary-color);
	border: 1px solid var(--primary-color);

	&.active {
		background: var(--primary-color);
		color: var(--text-color-secondary);
	}
}
</style>
