<template>
	<view class="share-page">
		<!-- 返回按鈕 -->
		<c-headerNav title="分享" />

		<!-- 大頭貼與名稱 -->
		<view class="profile">
			<!-- 絕對位置 頭像 -->
			<view class="avatar-container">
				<image class="avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
				</image>
			</view>
			<text class="name">{{ name }}</text>
			<text class="username">@{{ username }}</text>
		</view>

		<!-- QRCODE -->
		<view class="qrcode">
			<canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
		</view>

		<!-- 按鈕區塊 -->
		<view class="actions">
			<view class="btn-container action" @click="copyLink">
				<button type="button" class="btn">
					<view class="icon-container">
						<uni-icons class="btn-icon" type="icon-common-copyLink" custom-prefix="icon" size="22" color="#fff" />
					</view>
					<text>複製連結</text>
				</button>
			</view>
			<view class="divider"></view>
			<view class="btn-container" @click="toShare">
				<button type="button" class="btn">
					<view class="icon-container">
						<uni-icons class="btn-icon" type="icon-common-update" custom-prefix="icon" size="22" color="#fff" />
					</view>
					<text>分享連結</text>
				</button>
			</view>
		</view>

		<!-- logo 區塊 -->
		<view class="logo-container">
			<view class="slogan">
				<image class="logo" src="/static/logo.png" mode="widthFix" />
				<view class="brand-container">
					<text class="brand animate-brand brand-f">F</text>
					<text class="brand animate-brand brand-a">A</text>
					<text class="brand animate-brand brand-n">N</text>
					<text class="brand animate-brand brand-c">C</text>
					<text class="brand animate-brand brand-e">E</text>
				</view>
				<text class="desc">NO BOUNDARIES-JUST FANCE</text>
			</view>
		</view>

		<c-noticePopUp ref="noticePopUpRef"></c-noticePopUp>
		<c-sharePopUp ref="sharePopUp"></c-sharePopUp>
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


const noticePopUpRef = ref(null)
const copyLink = () => {
	uni.setClipboardData({
		data: link.value,
		showToast: false,
		success: () => {
			noticePopUpRef.value.open({
				title: '已複製，趕快分享給好友吧~',
				// setTimeOut: 1500
			})
		}
	})
}

// 分享
const sharePopUp = ref(null)
const toShare = () => {
	console.log("🚀 == 分享 == ")
	sharePopUp.value?.open()
	/* NOTE:暫代 去往該圖文的總攬 */
	// toPlayArticleGallery()
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
	// min-height: 100vh;
	// padding: 40rpx0;
}

.header {
	position: absolute;
	left: 20rpx;
	top: 40rpx;
}

.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 38rpx;
	text-align: center;
}

.name {
	font-size: 38rpx;
	font-weight: 500;
}

.username {
	font-size: 32rpx;
	// color: #444;
	color: var(--text-color-primary);
}

.qrcode {
	margin: 32rpx 0;
	background: #fff;
	padding: 20rpx;
	border-radius: 16rpx;
}

.actions {
	display: flex;
	width: 100%;
	height: fit-content;
	justify-content: center;
	align-items: center;
	background: var(--primary-color);

	.btn-container {
		flex: 1;
	}

	.btn {
		background: unset;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 32rpx;
		padding: 48rpx 0;
		font-size: 32rpx;

		.btn-icon {
			font-size: 50rpx !important;
		}

		&::after {
			display: none;
		}
	}
}

.divider {
	width: 2rpx;
	height: 150rpx;
	background: #ffffff60;
}

.logo-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fff;
	width: 100%;
	padding: 52rpx 0;
}

.logo {
	width: 100rpx;
}

.slogan {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	// width: 150rpx;

	.brand-container {
		display: flex;
		justify-content: center;

		.brand {
			display: block;
			font-size: 32rpx;
			font-weight: bolder;
			color: #222;
			letter-spacing: 2rpx;
			text-transform: uppercase;
			line-height: 1;
			font-weight: 900;


			&.brand-f {
				animation-delay: 0s;
			}

			&.brand-a {
				animation-delay: 0.5s;
			}

			&.brand-n {
				animation-delay: 1s;
			}

			&.brand-c {
				animation-delay: 1.5s;
			}

			&.brand-e {
				animation-delay: 2s;
			}
		}
	}

	.desc {
		font-size: 16rpx;
	}

}


// 頭像
.avatar-container {
	position: relative;
	width: 200rpx;
	height: 200rpx;
	border: 6rpx solid var(--primary-color);
	background: var(--primary-color);
	border-radius: 100%;
	overflow: hidden;


	// transform: translate(-50%, -50%);
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
</style>
