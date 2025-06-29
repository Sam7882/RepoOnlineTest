<template>
	<uni-popup ref="popupRef" :type="'center'" :borderRadius="'32rpx'" background-color="#f6f6f6" @change="onChange">
		<view class="popup-container">

			<!-- 標題與關閉 -->
			<view class="popup-header">
				<view class="header-title">
					<text class="title">{{ $t('common.share') }}</text>
					<!-- <view class="deco-line"></view> -->
				</view>
				<view class="icon-container popup-close-container">
					<uni-icons class="icons" type="closeempty" size="24" @click="close" />
				</view>
			</view>

			<view class="popup-content">

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
					<canvas id="qrcode" canvas-id="qrcode"></canvas>
				</view>

				<!-- 按鈕區塊 -->
				<view class="actions">
					<view class="btn-container action" @click="copyLink">
						<button type="button" class="btn">
							<view class="icon-container">
								<uni-icons class="btn-icon" type="icon-common-copyLink" custom-prefix="icon" size="22" color="#fff" />
							</view>
							<text>{{ $t('common.copyLink') }}</text>
						</button>
					</view>
					<view class="divider"></view>
					<view class="btn-container" @click="toShare">
						<button type="button" class="btn">
							<view class="icon-container">
								<uni-icons class="btn-icon" type="icon-common-update" custom-prefix="icon" size="22" color="#fff" />
							</view>
							<text>{{ $t('common.shareLink') }}</text>
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
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
// TEMP: PC-組件-創作者分享頁面 彈窗
import { onShow, onLoad } from '@dcloudio/uni-app'
import { checkViewportAutoReplace } from '@/utils/routers'
import { useViewportStore } from '@/stores/useViewportStore'
import UQRCode from '@uqrcode/js';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const { openNotice, openSharePopUp } = inject('common')
const props = defineProps({
	type: {
		type: String,
		default: 'phoneBind'
	}
})

const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)

const popupRef = ref()
// 打開
const open = () => {
	popupRef.value?.open()
}

const close = () => {
	popupRef.value?.close()
}

const title = computed(() => {
	return t('creator.blockadeList')
})

defineExpose({ open, close })


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
			openNotice({
				title: t('common.copySuccessTip'),
				// setTimeOut: 1500
			})
		}
	})
}

// 分享
const toShare = () => {
	console.log("🚀 == 分享 == ")
	openSharePopUp()
	/* NOTE:暫代 去往該圖文的總攬 */
	// toPlayArticleGallery()
}

const onChange = (e) => {
	console.log("🚀 == 分享 == ", e)
	if (e.show) {
		console.log("🚀 == 分享 ==1 ")
		initShare()
	}
}

const initShare = () => {
	// 使用 nextTick 確保 DOM 已渲染
	nextTick(() => {
		setTimeout(() => {
			try {
				// 获取uQRCode实例
				const qr = new UQRCode();
				// 设置二维码内容
				qr.data = link.value; // 使用實際的分享連結
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = 150;
				// 调用制作二维码方法
				qr.make();

				// 获取canvas上下文 - 修正 this 參數
				const canvasContext = uni.createCanvasContext('qrcode', getCurrentInstance());

				// 設置uQRCode實例的canvas上下文
				qr.canvasContext = canvasContext;

				// 調用繪製方法將二維碼圖案繪製到canvas上
				qr.drawCanvas();

				console.log('QR Code 繪製完成');
			} catch (error) {
				console.error('QR Code 繪製失敗:', error);
			}
		}, 100); // 延遲 100ms 確保 canvas 已準備好
	});
}

</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
	& {
		z-index: var(--z-index-max) !important;
		overflow: hidden;
	}
}

.popup-container {
	padding: 32rpx 0;
	border-radius: 60rpx 60rpx 0 0;
	background-color: var(--background-color-light);
	width: fit-content;
	overflow: visible;


	@media screen and (min-width: 961px) {
		border-radius: 32rpx;
		width: 80vw;
		max-width: 800rpx;
	}

	@media screen and (min-width: 1920px) {
		max-width: 1000rpx;
	}

	@media screen and (min-width: 2560px) {
		max-width: 1200rpx;
	}
}

.popup-header {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: visible;
}

.header-title {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.title {
		opacity: 0;
		font-size: var(--font-size-title-pc-xlarge);
	}

	.deco-line {
		width: 100%;
		margin: 0;
		margin-top: 16rpx;
		height: 4px;
	}
}

.popup-close-container {
	position: absolute;
	top: 50%;
	right: 64rpx;
	z-index: 10;
	transform: translateY(-70%);

	.popup-close {
		font-size: var(--font-size-title-pc-xlarge) !important;
	}
}


.popup-title {
	font-size: var(--font-size-title-pc-large);
}

.popup-content {
	background-color: var(--background-color-light);
	padding: 40rpx 0;
	border-radius: 40rpx;
	overflow: visible;
}

.popup-subtitle {
	font-size: var(--font-size-content-pc-small);
	margin-bottom: 16rpx;
	color: var(--text-color-primary);
}

.popup-options {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
	margin-bottom: 64rpx;
}

.popup-option {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.popup-option-main {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}


.popup-option-title {
	font-size: var(--font-size-title-pc);
	color: var(--text-color-primary);
}

.popup-option-desc {
	font-size: var(--font-size-content-pc-small);
	color: var(--text-color-quaternary);
}

.popup-option-radio-container {
	position: relative;

	.popup-option-radio {
		opacity: 0;
	}
}

.popup-option-custom-checked {
	z-index: 10;
	position: absolute;
	right: 4px;
	top: 2px;

	.popup-option-custom-checked-image {
		width: 34rpx;
		height: 34rpx !important;
	}

	::v-deep(.popup-option-custom-checked-image) {

		// width: 24rpx;
		// height: 24rpx;
	}
}

.popup-confirm-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.popup-confirm {
	display: inline-block;
	background-color: var(--primary-color);
	color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 96rpx;
	font-size: var(--font-size-content-pc);
	line-height: 1;
}
</style>
<style scoped lang="scss">
.share-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	// background: linear-gradient(to bottom, #ffe87c, #f6c448);
	// min-height: 100vh;
	// padding: 40rpx0;
}

.header {
	position: absolute;
	left: 20rpx;
	top: 40rpx;
}

.header-title {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.title {
		font-size: var(--font-size-title-pc-xlarge);
	}

	.brand {
		font-size: var(--font-size-title-pc-xlarge);
		font-weight: bolder;
	}

	.deco-line {
		width: 100%;
		margin: 0;
		margin-top: 16rpx;
		height: 4px;
	}
}


.content {
	padding-top: 50rpx;
	padding-bottom: var(--footer-height);
}

.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 32rpx;
	text-align: center;
}

.name {
	font-size: var(--font-size-title-pc-xlarge);
	font-weight: 500;
}

.username {
	font-size: var(--font-size-title-pc);
	// color: #444;
	color: var(--text-color-primary);
}

.qrcode {
	margin: 32rpx 0;
	background: #fff;
	padding: 20rpx;
	border-radius: 16rpx;
	display: flex;
	justify-content: center;
	align-items: center;

	&>canvas {
		width: 150px;
		height: 150px;
	}
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
		font-size: var(--font-size-title-pc);

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
			font-size: var(--font-size-title-pc);
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
		font-size: var(--font-size-content-pc-small);
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