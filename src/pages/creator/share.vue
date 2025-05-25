<template>
	<view class="share-page">
		<!-- 返回按鈕 -->
		<c-headerNav title="分享" />

		<!-- 大頭貼與名稱 -->
		<view class="profile">
			<image class="avatar" :src="avatar" mode="aspectFill" />
			<text class="name">{{ name }}</text>
			<text class="username">@{{ username }}</text>
		</view>

		<!-- QRCODE -->
		<view class="qrcode">
			<canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
		</view>

		<!-- 按鈕區塊 -->
		<view class="actions">
			<view class="action" @click="copyLink">
				<uni-icons type="link" size="22" color="#fff" />
				<text>複製連結</text>
			</view>
			<view class="divider"></view>
			<view class="action" @click="shareLink">
				<uni-icons type="upload" size="22" color="#fff" />
				<text>分享連結</text>
			</view>
		</view>

		<!-- logo 區塊 -->
		<view class="logo">
			<image src="/static/fance-logo.png" mode="widthFix" />
			<text class="slogan">NO BOUNDARIES - JUST FANCE</text>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import UQRCode from '@uqrcode/js';

const name = ref('我是名字我是名字')
const username = ref('adkdjwee00')
const avatar = ref('https://picsum.photos/100')
const link = ref('https://example.com/u/adkdjwee00')

const goBack = () => uni.navigateBack()

const copyLink = () => {
	uni.setClipboardData({
		data: link.value,
		success: () => {
			uni.showToast({ title: '已複製連結', icon: 'none' })
		}
	})
}

const shareLink = () => {
	uni.share({
		provider: 'weixin',
		type: 0,
		href: link.value,
		title: name.value,
		summary: '點我加入好友',
		success: () => uni.showToast({ title: '分享成功' }),
		fail: () => uni.showToast({ title: '分享失敗', icon: 'none' })
	})
}

onMounted(() => {
	// 获取uQRCode实例
	const qr = new UQRCode();
	// 设置二维码内容
	qr.data = "https://uqrcode.cn/doc";
	// 设置二维码大小，必须与canvas设置的宽高一致
	qr.size = 200;
	// 调用制作二维码方法
	qr.make();
	// 获取canvas上下文
	const canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
	// 设置uQRCode实例的canvas上下文
	qr.canvasContext = canvasContext;
	// 调用绘制方法将二维码图案绘制到canvas上
	qr.drawCanvas();
})
</script>

<style scoped lang="scss">
.share-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: linear-gradient(to bottom, #ffe87c, #f6c448);
	min-height: 100vh;
	padding: 40rpx 20rpx;
}

.header {
	position: absolute;
	left: 20rpx;
	top: 40rpx;
}

.profile {
	margin-top: 100rpx;
	text-align: center;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	margin-bottom: 16rpx;
}

.name {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.username {
	font-size: 26rpx;
	color: #444;
}

.qrcode {
	margin: 32rpx 0;
	background: #fff;
	padding: 20rpx;
	border-radius: 16rpx;
}

.actions {
	display: flex;
	flex-direction: row;
	background: #a389f4;
	border-radius: 16rpx;
	width: 80%;
	margin-top: 40rpx;
	justify-content: space-between;
	align-items: center;
}

.action {
	flex: 1;
	padding: 20rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	font-size: 26rpx;
}

.divider {
	width: 2rpx;
	height: 60rpx;
	background: #ffffff60;
}

.logo {
	margin-top: auto;
	text-align: center;
	padding: 20rpx 0;
}

.logo image {
	width: 100rpx;
	margin-bottom: 8rpx;
}

.slogan {
	font-size: 22rpx;
	color: #888;
}
</style>
