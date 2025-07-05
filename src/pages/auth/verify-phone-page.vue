<template>
	<view class="verify-page">
		<!-- 頂部標題 -->
		<view class="header">
			<view class="header-title">
				<text class="title">{{ $t('auth.phoneVerify') }}</text>
				<text class="brand">Fance</text>
				<view class="underline"></view>
			</view>
		</view>
		<!-- 驗證碼說明 -->
		<view class="phone-verify-Info">
			<text class="input-tip">{{ $t('auth.pleaseEnterVerifyCode', { phone: phone }) }}</text>
		</view>

		<form-verifyPhoneForm @verify="handleVerify" />

	</view>
</template>

<script setup>
// TEMP: 手機驗證 : 註冊後轉這裡
import { onShow, onUnload } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { useI18n } from 'vue-i18n';
import { toLogin, checkViewportAutoReplace } from '@/utils/routers'
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore


const { openNotice } = inject('common');


const phone = ref('+886 988-888-888');

const handleVerify = () => {

	console.log("🚀 handleVerify ~ handleVerify :")
	openNotice({
		title: t('auth.registerVerifySuccess'),
		titleIcon: 'icon-common-confirm',
		setTimeOut: false
	})
	// 確認驗證碼是否正確
	// 驗證碼正確
	// 跳轉登入頁
	// setTimeout(() => {
	// 	toLogin()
	// }, 1500)
};

// 啟動倒數
onShow(() => {
	checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})


</script>

<style lang="scss" scoped>
.verify-page {
	background-color: var(--background-color-light);
	padding: 100rpx;

	@media screen and (min-width: 768px) and (max-width: 960px) {
		padding: 25rpx 100rpx;
	}
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 96rpx;

	.header-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		.title {
			font-size: 48rpx;
			font-weight: bolder;
		}

		.brand {
			font-size: 54rpx;
			font-weight: bolder;
		}

		.underline {
			width: 80rpx;
			height: 10rpx;
			// background-color: $primary-color;
			background-color: var(--primary-color);
		}
	}

}

.phone-verify-Info {
	display: flex;
	justify-content: center;
	margin-bottom: 80rpx;
}
</style>
