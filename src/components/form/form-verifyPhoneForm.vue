<template>
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
		<view class="btn-container">
			<button type="button" class="btn verify-btn" @click="handleVerify">
				{{ $t('auth.verify') }}
			</button>
		</view>

		<!-- 倒數秒數 -->
		<view class="register" v-if="countdown > 0">
			<text>{{ $t('auth.verifyCodeTime') }} : {{ formattedTime }}</text>
		</view>
		<view class="register" v-else>
			<text @click="handleResendCode">{{ $t('common.resendCode') }}</text>
		</view>
	</view>
</template>

<script setup>
// TEMP: 組件-PC手機驗證彈窗表單
import { onShow, onUnload } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const emit = defineEmits(['verify'])

const verifyCode1 = ref('');
const verifyCode2 = ref('');
const verifyCode3 = ref('');
const verifyCode4 = ref('');

const errors = ref({});


// 時間倒數
const COUNTDOWN_SECONDS = 10
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


const initCountdown = () => {
	if (timer) clearInterval(timer)
	timer = null
	countdown.value = COUNTDOWN_SECONDS
}

const handleVerify = () => {
	// 確認驗證碼倒數時間 是否過期
	if (countdown.value <= 0) {
		errors.value.verifyCode = t('auth.verifyCodeTimeError')
		return
	}
	console.log("🚀 handleVerify ~ handleVerify :")

	// 確認驗證碼是否正確
	emit('verify')
};

const handleResendCode = () => {
	initCountdown()
	timer = setInterval(() => {
		if (countdown.value > 0) {
			countdown.value--
		}
	}, 1000)
}

// 啟動倒數
onShow(() => {
	// 倒數計時器
	initCountdown()
	timer = setInterval(() => {
		if (countdown.value > 0) {
			countdown.value--
		}
	}, 1000)
})

// 清除計時器
onUnload(() => {
	initCountdown()
})
</script>

<style lang="scss" scoped>
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

.verify-btn {
	background-color: #9e80ff;
	color: #fff;
	font-size: var(--font-size-title-pc);
	border-radius: 50rpx;
	margin-top: 80rpx;
}

.register {
	margin-top: 54rpx;
	text-align: center;
	font-size: var(--font-size-content-pc);
	color: var(--text-color-primary);
}

.link {
	color: var(--link-color);
	margin-left: 10rpx;
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

			.uni-easyinput__placeholder-class,
			.uni-input-input {
				font-size: var(--font-size-title-pc-xlarge);
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