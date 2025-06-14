<template>
	<layout-appBase>
		<view class="login-page">
			<!-- 頂部標題 -->
			<view class="header">
				<view class="header-title">
					<text class="title">{{ $t('auth.login') }}</text>
					<text class="brand">Fance</text>
					<view class="underline"></view>
				</view>
				<!-- 語言切換器 -->
				<c-langSelector />
			</view>

			<auth-loginForm @login="handleLogin" />

			<!-- 第三方登入 -->
			<auth-social />

			<!-- 註冊連結 -->
			<view class="register">
				<text>{{ $t('auth.noAccount') }}</text>
				<text class="link" @click="handleRegister">{{ $t('auth.register') }}</text>
			</view>
		</view>
	</layout-appBase>
</template>

<script setup>
// TEMP: 登入頁面
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { toRegister, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore

const common = inject('common')
if (!common) {
	console.warn('common injection not found')
}

const handleLogin = () => {
	console.log("🚀 handleLogin 登入")
}

const handleRegister = () => {
	console.log("🚀 handleRegister 註冊")
	toRegister()
}

onShow(() => {
	checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.login-page {
	padding: 100rpx;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 160rpx;

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


.lang-selector {
	position: relative;
}

.register {
	margin-top: 80rpx;
	text-align: center;
	font-size: 28rpx;
	color: var(--text-color-primary);
}

.link {
	color: var(--link-color);
	margin-left: 10rpx;
}
</style>
