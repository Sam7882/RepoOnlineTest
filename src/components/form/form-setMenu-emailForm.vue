<template>
	<!-- 電子信箱 -->
	<uni-forms class="form" :model="formData" :rules="formRules.email" ref="formRef">
		<uni-forms-item class="form-item" name="email" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.email" class="inputStyle" type="text"
					:placeholder="$t('auth.pleaseEnter', { title: $t('creator.email') })" :trim="true" :clearable="false" />
			</view>
		</uni-forms-item>
		<uni-forms-item class="verifyCode-container" name="verifyCode" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.verifyCode" class="inputStyle" type="text"
					:placeholder="$t('auth.pleaseEnter', { title: $t('auth.verifyCode') })" :trim="true" :clearable="false" />
			</view>
			<view class="btn-container">
				<button type="button" class="btn" @click="verifyCodeSend">{{ verifyStatus ?
					`${verifyTime}${$t("common.second")} ${$t("common.resendCode")}` : $t('common.sendCode')
				}}</button>
			</view>
		</uni-forms-item>

		<!-- 發送按鈕 -->
		<view class="btn-container footer">
			<button type="button" class="btn" @click="formSubmit()">{{ $t("common.confirm") }}</button>
		</view>
	</uni-forms>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定編輯頁
import { onLoad, onShow } from '@dcloudio/uni-app';
import { checkViewportAutoReplace } from '@/utils/routers';
import countryData from '@/assets/country/country.json'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['submit'])

const formData = ref({
	phone: '',
	verifyCode: '',
	password: '',
	confirmPassword: '',
	email: '',
	publicFavorite: false,
	publicLike: false,
	publicCategory: false,
	postNotice: false,
	message: false,
	allPause: false
})

const formRef = ref(null)

const formRules = {
	// phone: {
	// 	phone: [
	// 		{ required: true, message: '請輸入手機號碼', trigger: 'blur' },
	// 		{ pattern: /^[0-9]{6,15}$/, message: '手機號碼格式錯誤', trigger: 'blur' }
	// 	],
	// 	verifyCode: [
	// 		{ required: true, message: '請輸入驗證碼', trigger: 'blur' }
	// 	]
	// },
	// password: {
	// 	password: [
	// 		{ required: true, message: '請輸入新密碼', trigger: 'blur' },
	// 		{ min: 6, message: '密碼至少6位', trigger: 'blur' }
	// 	],
	// 	confirmPassword: [
	// 		{ required: true, message: '請再次輸入新密碼', trigger: 'blur' },
	// 		{
	// 			validator: (rule, value, callback) => {
	// 				if (value !== formData.value.password) {
	// 					callback(new Error('兩次密碼不一致'))
	// 				} else {
	// 					callback()
	// 				}
	// 			},
	// 			trigger: 'blur'
	// 		}
	// 	]
	// },
	// email: {
	// 	email: [
	// 		{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
	// 		{ pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: '信箱格式錯誤', trigger: 'blur' }
	// 	]
	// }
}

const verifyStatus = ref(false)
const verifyTime = ref(60)

const verifyCodeSend = () => {
	verifyStatus.value = true
	verifyTime.value = 60
	const timer = setInterval(() => {
		verifyTime.value--
		if (verifyTime.value <= 0) {
			clearInterval(timer)
			verifyStatus.value = false
		}
	}, 1000)
}

const formSubmit = () => {
	let payload = {}
	formRef.value.validate()
		.then(() => {
			if (type.value === 'email') {
				payload = {
					email: formData.value.email,
					verifyCode: formData.value.verifyCode
				}
			}
			emit('submit', true)
			console.log('送出資料:', payload)
			// 這裡可串接API
		}).catch(err => {
			console.log('驗證失敗:', err)
			emit('submit', false, err)
		})
}
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 180rpx;
}

.content {
	padding-top: 50rpx;
	padding-bottom: var(--footer-height);
}

.btn-container {
	padding: 0 40rpx;

	.btn {
		padding: 24rpx;
		font-size: var(--font-size-title-pc);
	}
}

.form {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	padding: 0 48rpx;

	::v-deep(.uni-forms) {
		.uni-forms-item__label {
			display: none;
		}
	}



	.form-item {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;

		&:last-child {
			margin-bottom: 0;
		}

		.form-input-icon {
			position: absolute;
			left: 16rpx;
			top: 50%;
			z-index: 10;
			transform: translateY(-50%);
			margin-left: 32rpx;
			font-size: 36rpx !important;

			&.email {
				font-size: 28rpx !important;
			}
		}
	}

	.form-item-label {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/* 驗證碼 */
	.verifyCode-container {
		position: relative;

		.btn-container {
			position: absolute;
			top: 50%;
			right: 24rpx;
			transform: translateY(-50%);
			padding: 0;

			.btn {
				border-radius: 10rpx;
				padding: 12rpx 40rpx;
				font-size: var(--font-size-content-pc);
			}
		}
	}
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 20rpx;
			padding: 8rpx 32rpx;
			padding-left: 40rpx;

			&.is-focused {
				// border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}

			.uni-easyinput__content-input {
				padding: 0 !important;
			}

			.uni-input-input {
				font-size: var(--font-size-content-pc);
			}

			.uni-input-placeholder {
				font-size: var(--font-size-content-pc);
			}
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

.footer.btn-container {
	width: 100%;
	padding: 0;
	margin-top: 80rpx;
}
</style>