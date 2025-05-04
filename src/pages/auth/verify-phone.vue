<template>
	<view class="login-page">
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
		<view class="form ">
			<!-- 驗證碼 -->
			<view class="form-item phone-verify-form-item">
				<uni-easyinput v-model="verifyCode1" class="inputStyle" :maxlength="1" :trim="true" :clearable="false" />
				<uni-easyinput v-model="verifyCode2" class="inputStyle" :maxlength="1" :trim="true" :clearable="false" />
				<uni-easyinput v-model="verifyCode3" class="inputStyle" :maxlength="1" :trim="true" :clearable="false" />
				<uni-easyinput v-model="verifyCode4" class="inputStyle" :maxlength="1" :trim="true" :clearable="false" />
			</view>
			<text v-show="errors.verifyCode" class="error-text text-center">{{ errors.verifyCode }}</text>

			<!-- 登入按鈕 -->
			<button type="button" class="verify-btn" @click="handleVerify">
				{{ $t('auth.verify') }}
			</button>
		</view>

		<!-- 註冊連結 -->
		<view class="register">
			<text>{{ $t('auth.verifyCodeTime') }} : {{ formattedTime }}</text>
		</view>
	</view>
</template>

<script setup>
// TEMP: 手機驗證 : 註冊後轉這裡
import { onShow, onUnload } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { useI18n } from 'vue-i18n';
import { toLogin } from '@/utils/routers'
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore

const phone = ref('+886 988-888-888');
const verifyCode1 = ref('');
const verifyCode2 = ref('');
const verifyCode3 = ref('');
const verifyCode4 = ref('');

const errors = ref({});

// 時間倒數
const COUNTDOWN_SECONDS = 60
const countdown = ref(COUNTDOWN_SECONDS)
let timer = null
// 格式化時間
const formattedTime = computed(() => {
	// 除 60 取整數，補0
	const min = String(Math.floor(countdown.value / 60)).padStart(2, '0')
	// 取 60 餘數，補0
	const sec = String(countdown.value % 60).padStart(2, '0')
	return `${min}:${sec}`
})

const handleVerify = () => {
	// 確認驗證碼倒數時間 是否過期
	if (countdown.value <= 0) {
		errors.value.verifyCode = t('auth.verifyCodeTimeError')
		return
	}
	// 確認驗證碼是否正確

	// 驗證碼正確
	// 跳轉登入頁
	toLogin()
};

// 啟動倒數
onShow(() => {
	// 檢查初始化
	checkInitData()
	// 倒數計時器
	timer = setInterval(() => {
		if (countdown.value > 0) {
			countdown.value--
		} else {
			clearInterval(timer)
			timer = null
		}
	}, 1000)
})

// 清除計時器
onUnload(() => {
	if (timer) clearInterval(timer)
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


.lang-selector {
	position: relative;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.phone-verify-form-item {
	display: flex;
	flex-direction: row;
	gap: 8rpx;
}

.uni-easyinput {
	margin-bottom: 20rpx;
}

.remember {
	display: flex;
	align-items: center;
	margin: 20rpx 0;
}

.remember-text {
	flex: 1;
	color: #999;
}

.verify-btn {
	width: 100%;
	height: 100rpx;
	background-color: #9e80ff;
	color: #fff;
	font-size: 36rpx;
	border-radius: 50rpx;
	margin-top: 80rpx;
}

.social-login {
	display: flex;
	justify-content: center;
	margin-top: 40rpx;
	gap: 24rpx;
}

.social-icon {
	width: 80rpx;
	height: 80rpx;
}

.register {
	margin-top: 54rpx;
	text-align: center;
	font-size: 24rpx;
	color: var(--text-color-primary);
}

.link {
	color: var(--link-color);
	margin-left: 10rpx;
}

.phone-verify-Info {
	display: flex;
	justify-content: center;
	margin-bottom: 80rpx;
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 24rpx;
			width: 112rpx;
			aspect-ratio: 1/1;
			text-align: center;
			margin: 0 auto;

			.uni-easyinput__content-input {
				font-size: 48rpx;
			}

			&.is-focused {
				border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}
</style>
