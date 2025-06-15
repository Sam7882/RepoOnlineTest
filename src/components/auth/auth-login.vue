<template>
	<uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
		background-color="#f6f6f6">
		<view class="popup-container">
			<!-- 標題與關閉 -->
			<view class="popup-header">
				<view class="header-title">
					<text class="title">{{ $t('auth.login') }}</text>
					<text class="brand">Fance</text>
					<view class="underline"></view>
				</view>
				<!-- 語言切換器 -->
				<view class="icon-container popup-close-container">
					<uni-icons class="popup-close" type="closeempty" size="24" @click="close" />
				</view>
			</view>
			<view class="popup-content">
				<form-loginForm @login="handleLogin" />
				<!-- 第三方登入 -->
				<auth-social />
				<!-- 註冊連結 -->
				<view class="register">
					<text>{{ $t('auth.noAccount') }}</text>
					<text class="link" @click="handleRegister">{{ $t('auth.register') }}</text>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
// TEMP: 組件-PC登入彈窗
import { onShow } from '@dcloudio/uni-app';
import { useViewportStore } from '@/stores/useViewportStore'
import { checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)
const { t } = useI18n()
const { openRegister } = inject('auth');
const props = defineProps({
	// 如果沒有傳入，之前設定的資料，那他就會將預設值傳出去
	defaultSelected: {
		type: String,
		default: 'publish'
	}
})
const popupRef = ref()
// 打開
const open = () => {
	popupRef.value?.open()
}
// 確認是否有按下 保存的判斷依據
const haveClickConfirm = ref(false)
const close = () => {
	popupRef.value?.close()
}

const handleLogin = () => {
	console.log("🚀 handleLogin 登入")
	close()
}

const handleRegister = () => {
	close()
	openRegister()
}

onShow(() => {
	checkViewportAutoReplace()
})

defineExpose({ open, close })
</script>

<style scoped lang="scss">
::v-deep(.uni-popup) {
	& {
		z-index: var(--z-index-max) !important;
		overflow: hidden;
	}
}

.popup-container {
	padding: 32rpx;
	border-radius: 60rpx 60rpx 0 0;
	background-color: var(--background-color-light);
	width: fit-content;


	@media screen and (min-width: 961px) {
		border-radius: 32rpx;
		width: 80vw;
		max-width: 800rpx;
	}

	// @media screen and (min-width: 1920px) {
	// 	width: 80vw;
	// 	max-width: 800rpx;
	// }

	// @media screen and (min-width: 2560px) {
	// 	width: 80vw;
	// 	max-width: 900rpx;
	// }
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
	padding: 40rpx;
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


<style lang="scss" scoped>
.header-title {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	.title {
		font-size: var(--font-size-title-pc-xlarge);
		font-weight: bolder;
	}

	.brand {
		font-size: var(--font-size-title-pc-xlarge);
		font-weight: bolder;
	}

	.underline {
		width: 80rpx;
		height: 10rpx;
		// background-color: $primary-color;
		background-color: var(--primary-color);
	}
}

::v-deep(.uni-forms form) {
	.uni-forms-item {
		margin-bottom: 60rpx;
	}

	.remember {
		margin-bottom: 48rpx;
	}
}

.register {
	margin-top: 80rpx;
	text-align: center;
	font-size: var(--font-size-content-pc-small);
	color: var(--text-color-primary);
}

.link {
	color: var(--link-color);
	margin-left: 10rpx;

	&:hover {
		cursor: pointer;
	}
}
</style>
