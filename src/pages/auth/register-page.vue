<template>
	<layout-appBase>
		<view class="register-page">
			<!-- 頂部標題 -->
			<view class="header">
				<view class="header-title">
					<text class="title">{{ $t('auth.register') }}</text>
					<text class="brand">Fance</text>
					<view class="underline"></view>
				</view>
			</view>

			<form-registerForm @register="handleRegister" />

			<view class="login">
				<text class="link" @click="handleLogin">已註冊，進行登入</text>
			</view>

		</view>
	</layout-appBase>
</template>

<script setup>
// TEMP: 註冊頁面
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { toPhoneVerify, toLogin, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore

const handleRegister = () => {
	console.log("🚀 handleRegister 註冊")
	toPhoneVerify()
};

const handleLogin = () => {
	toLogin()
}

onShow(() => {
	// checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
.register-page {
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
	margin-bottom: 72rpx;

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

.login {
	margin-top: 16rpx;
	text-align: right;
	font-size: var(--font-size-content-pc-large);
}

.link {
	color: var(--link-color);
	margin-left: 10rpx;
}
</style>
