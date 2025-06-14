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
		<button type="button" class="verify-btn" @click="handleVerify">
			{{ $t('auth.verify') }}
		</button>
	</view>
</template>

<script setup>
// TEMP: 組件-PC手機驗證彈窗表單
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const emit = defineEmits(['verify'])

const verifyCode1 = ref('');
const verifyCode2 = ref('');
const verifyCode3 = ref('');
const verifyCode4 = ref('');

const errors = ref({});



const handleVerify = () => {
	// 確認驗證碼是否正確
	emit('verify')
};


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