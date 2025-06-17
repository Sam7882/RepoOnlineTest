<template>
	<uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
		background-color="#f6f6f6" @change="handlePopupChange">
		<view class="popup-container">
			<!-- 標題與關閉 -->
			<view class="popup-header header">
				<view class="header-title">
					<text class="title">{{ menuTitle }}</text>
					<view class="icon-container popup-close-container">
						<uni-icons class="icons popup-close" type="closeempty" size="24" @click="close" />
					</view>
				</view>
			</view>
			<view class="popup-content">
				<view class="set-menu">
					<!-- 內容 -->
					<view class="content">
						<view class="layout">
							<view class="avatar-container">
								<image class="avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
								</image>
							</view>
							<view class="title-container">
								<text>{{ content }}</text>
							</view>
						</view>
					</view>

					<!-- 按鈕 -->
					<view class="footer">
						<view class="btn-container"
							:class="{ 'btn-waiting': btnStatus === 'waiting', 'btn-already': btnStatus === 'already' }">
							<button class="btn" @click="openMessagePopUp()">{{ btnText }}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>

</template>

<script setup>
// TEMP: 創作者設定-申請創作者彈窗
import { onShow } from '@dcloudio/uni-app';
import { useViewportStore } from '@/stores/useViewportStore'
import { useI18n } from 'vue-i18n'
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)
const { t } = useI18n()
const { openMessage } = inject('common')
const props = defineProps({
	type: {
		type: String,
		default: 'creator'
	}
})
const popupRef = ref()
// 打開
const open = () => {
	popupRef.value?.open()
}
const close = () => {
	popupRef.value?.close()
}
const handlePopupChange = (e) => {
	console.log("🚀 ~ handlePopupChange ~ e:", e)
}
defineExpose({ open, close })
/* 內容 */
const menuTitle = ref(t('creator.becomeCreator'))
const content = ref(t('creator.welcomeToBecomeVerifyCreator'))
const btnStatus = ref('')
const btnText = computed(() => {
	if (btnStatus.value === 'waiting') {
		return t('common.waiting')
	} else if (btnStatus.value === 'already') {
		return t('common.already')
	} else if (btnStatus.value === 'apply') {
		return t('common.apply')
	} else {
		return t('common.join')
	}
})
const type = computed(() => props.type)

const openMessagePopUp = () => {
	openMessage({
		content: t('common.sorryNoPasss'),
		confirmBtnText: 'OK',
		onConfirm: () => {
			console.log('onConfirm')
		}
	})
}

watch(type, () => {
	init()
})

const init = () => {
	switch (type.value) {
		case 'creator':
			menuTitle.value = t('creator.becomeCreator')
			content.value = t('creator.welcomeToBecomeVerifyCreator')
			btnStatus.value = ''
			break
		case 'verifyCreator':
			menuTitle.value = t('creator.becomeVerifyCreator')
			content.value = t('creator.welcomeToBecomeVerifyCreator')
			btnStatus.value = 'apply'
			break
	}
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
	padding: 60rpx;
	border-radius: 60rpx 60rpx 0 0;
	background-color: var(--background-color-light);
	width: fit-content;
	padding-top: 0;


	@media screen and (min-width: 961px) {
		border-radius: 32rpx;
		width: 80vw;
		max-width: 800rpx;
	}
}

.popup-header {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 64rpx 0 48rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 0 64rpx 0;
	overflow: visible;
}

.popup-close-container {
	position: absolute;
	top: 0;
	right: 64rpx;
	z-index: 10;
	transform: translateY(-50%);

	.popup-close {
		font-size: var(--font-size-title-pc-xlarge) !important;
	}
}


.popup-title {
	font-size: var(--font-size-title-pc-large);
}

.popup-content {
	background-color: var(--background-color-light);
	padding-top: 56rpx;
	border-radius: 40rpx;
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
.set-menu {
	--footer-height: 180rpx;
}

.header {
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 2rpx solid var(--text-color-denary);
	margin: 0;
	padding: 36rpx 0;

	.title {
		font-size: var(--font-size-title-pc-xlarge);
	}

	.icon-container {
		top: 50%;

		.icons {
			font-size: var(--font-size-title-pc) !important;
		}
	}
}

.content {
	padding-bottom: 64rpx;
}

.layout {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

// 頭像
.avatar-container {
	position: relative;
	width: 208rpx;
	height: 208rpx;
	border: unset;
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

.title-container {
	margin-top: 48rpx;
	font-size: var(--font-size-title-pc-large);
	text-align: center;
	white-space: pre-line;
	font-weight: 500;
}

.footer {
	position: relative;

	.btn-container {
		padding: 0 40rpx;
		margin-top: 0;

		.btn {
			padding: 24rpx;
			font-size: var(--font-size-title-pc);
		}

		&.btn-waiting,
		&.btn-already {
			.btn {
				border: 2rpx solid var(--primary-color);
				background: var(--text-color-secondary);
				color: var(--primary-color);
			}
		}

	}

	// padding: 0 48rpx;
}
</style>