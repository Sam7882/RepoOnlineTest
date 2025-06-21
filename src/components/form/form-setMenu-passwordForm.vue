<template>
	<!-- 登入密碼 -->
	<uni-forms class="form form-password" :model="formData" :rules="formRules.password" ref="formRef">
		<uni-forms-item class="form-item" name="password" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.password" class="inputStyle" type="password"
					:placeholder="$t('auth.pleaseEnter', { title: $t('auth.password') })" :trim="true" :clearable="false" />
			</view>
		</uni-forms-item>
		<uni-forms-item class="form-item" name="confirmPassword" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.confirmPassword" class="inputStyle" type="password"
					:placeholder="$t('auth.confirmPassword')" :trim="true" :clearable="false" />
			</view>
			<view class="form-item-tip">
				<text>{{ $t("auth.rules.password.pattern") }}</text>
			</view>
		</uni-forms-item>

		<!-- 發送按鈕 -->
		<view class="btn-container footer">
			<button type="button" class="btn" @click="formSubmit('switch')">{{ $t("common.confirm") }}</button>
		</view>
	</uni-forms>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定編輯頁
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['submit'])

const formData = ref({
	password: '',
	confirmPassword: '',
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

const formSubmit = () => {
	let payload = {}
	formRef.value.validate()
		.then(() => {
			if (type.value === 'password') {
				payload = {
					password: formData.value.password,
					confirmPassword: formData.value.confirmPassword
				}
			}
			console.log('送出資料:', payload)
			emit('submit', true)
			// 這裡可串接API
		}).catch(err => {
			console.log('驗證失敗:', err)
			emit('submit', false, err)
		})
}

onMounted(() => {

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
	}

	.form-item-label {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.form-item-tip {
		margin: 22rpx 0 22rpx 8rpx;
		font-size: var(--font-size-content-pc);
		color: var(--text-color-gray3);
	}
}

.form-password {
	::v-deep(uni-form) {
		.uni-forms-item:last-child {
			margin-bottom: 0;
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