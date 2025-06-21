<template>
	<uni-forms class="form form-phone" :model="formData" :rules="formRules" ref="formRef">
		<uni-forms-item class="form-item" style="position: relative; z-index: calc(var(--z-index-max) + 1) !important;;"
			name="phone" required>
			<view class="phone-input-row">
				<uni-data-select class="country-select" v-model="selectedCountry" :localdata="countryList" :clear="false"
					:placeholder="$t('auth.countryCode')" />
				<uni-easyinput class="inputStyle phone-input" v-model="formData.phone"
					:placeholder="$t('auth.pleaseEnter', { title: $t('auth.phone') })" :trim="true" :clearable="false"
					type="number" />
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
import countryData from '@/assets/country/country.json'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['submit'])
const countryList = ref([])
const selectedCountry = ref('TW')
/* 表單 */
// <uni-form> ref
const formRef = ref(null)
const formData = ref({
	phone: '',
	verifyCode: '',
})
// 表單規則
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

// 國家代碼
const selectedCountryCode = computed(() => {
	return countryData.id_to_countrycode[selectedCountry.value] || ''
})

// 表單送出
const formSubmit = () => {
	let payload = {}
	formRef.value.validate()
		.then(() => {
			payload = {
				phone: selectedCountryCode.value + formData.value.phone,
				verifyCode: formData.value.verifyCode
			}
			console.log('送出資料:', payload)
			emit('submit', true)
			// 這裡可串接API
		}).catch(err => {
			console.log('驗證失敗:', err)
			emit('submit', false, err)
		})
}

// 驗證碼倒數
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

onMounted(() => {
	// 國家列表
	const countryObj = countryData.id_to_countrycode
	countryList.value = Object.entries(countryObj)
		.filter(([key]) => key !== '0')
		.map(([key, label]) => ({
			value: key,
			text: label
		}))
})
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
	overflow: visible;

	::v-deep(.uni-forms) {
		.uni-forms-item__label {
			display: none;
		}

		.uni-forms-item {
			overflow: visible;
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

	/* 手機號碼 */
	.phone-input-row {
		display: flex;
		flex-direction: row;

		.country-select {
			width: fit-content;
			flex: unset;

			::v-deep(.uni-stat-box) {
				.uni-stat-box {
					height: 100%;
				}

				.uni-scroll-view-content {
					max-height: 200rpx;
				}

				.uni-select {
					border: none;
					background: var(--text-color-tertiary);
					border-radius: 20rpx 0 0 20rpx;
					height: 100%;
					width: fit-content;
					padding-left: 40rpx;
					max-height: 100rpx;

					.uni-select__input-box {
						padding: 20rpx 12rpx 20rpx;
						height: fit-content;
						width: fit-content;
						gap: 30rpx;

					}

					.uni-select__input-text {
						font-size: var(--font-size-title-pc-small);
						line-height: 1;
					}
				}
			}
		}

		.phone-input {
			flex: 1;

			::v-deep(.is-input-border) {
				.is-input-border {
					border-radius: 0 20rpx 20rpx 0;
					padding: 20rpx 0;
				}

				.uni-easyinput__content-input {
					height: fit-content;
					line-height: 1;
					font-size: var(--font-size-title-pc-small);
				}
			}
		}
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
				border-radius: 20rpx;
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