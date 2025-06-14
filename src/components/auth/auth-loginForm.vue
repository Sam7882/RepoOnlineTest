<template>
	<!-- 表單區塊 -->
	<uni-forms ref="form" :model="formData" :rules="formRules" class="form">
		<uni-forms-item name="phone" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.phone" class="inputStyle" :placeholder="$t('auth.phone')" :trim="true"
					:clearable="false" />
				<uni-icons class="form-input-icon" type="icon-input-phone" custom-prefix="icon" size="24" color="#999" />
				<!-- <text v-if="errors.phone" class="error-text">{{ errors.phone }}</text> -->
			</view>
		</uni-forms-item>

		<uni-forms-item name="password" required>
			<view class="form-item">
				<uni-easyinput v-model="formData.password" class="inputStyle" type="password" :placeholder="$t('auth.password')"
					:confirmType="$t('auth.login')" :trim="true" :clearable="false" />
				<uni-icons class="form-input-icon" type="icon-common-locked" custom-prefix="icon" size="24" color="#999" />
				<!-- <text v-if="errors.password" class="error-text">{{ errors.password }}</text> -->
			</view>
		</uni-forms-item>

		<!-- 記住我 -->
		<view class="form-item remember">
			<text class="remember-text">{{ $t('auth.remember') }}</text>
			<c-checkBox class="switch-btn-container" v-model="loginRemember" />
		</view>

		<!-- 登入按鈕 -->
		<button type="button" class="login-btn" @click="handleLogin">
			{{ $t('auth.login') }}
		</button>
	</uni-forms>
</template>
<script setup>
// TEMP: 組件-PC登入彈窗表單
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { storage } from '@/utils/storage'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const initStore = useInitStore()
const { setUserInfo } = initStore
const { openNotice } = inject('common');

const emit = defineEmits(['login'])

// 記住我狀態
const loginRemember = ref(false);
const checkLoginRemember = () => {
	const storageLoginRemember = storage.get('loginRemember')
	if (storageLoginRemember) {
		loginRemember.value = storageLoginRemember
	}
}

const form = ref()
const formData = ref({
	phone: null,
	password: null,
	remember: false
})

const errors = reactive({
	phone: '',
	password: ''
})

const formRules = {
	phone: {
		rules: [
			{
				required: true,
				errorMessage: t('auth.pleaseEnter', { title: t('auth.phone') })
			},
			{
				pattern: /^[0-9]{10}$/,
				errorMessage: t('auth.rules.phone.pattern')
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: t('auth.pleaseEnter', { title: t('auth.password') })
			},
			{
				pattern: /^[a-zA-Z0-9]{6,20}$/,
				errorMessage: t('auth.rules.password.pattern')
			}
		]
	}
}

const handleLogin = () => {
	form.value.validate()
		.then(() => {
			console.log('✅ 驗證成功，送出資料:', formData.value);
			// 顯示成功提示
			openNotice({
				title: '登入成功',
				setTimeOut: false
			})
			// 這裡可以進行 API 提交
			/* NOTE: 測試用ID假資料 */
			setUserInfo({
				id: 'test001',
				name: 'test001',
				avatar: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
				token: 'test001'
			})
			emit('login')
		}).catch(err => {
			console.log('❌ 驗證失敗:', err);
			// 顯示錯誤提示 請檢查是否輸入正確
			uni.showToast({ title: t('auth.checkAright'), icon: 'none' });
			Object.keys(errors).forEach(key => {
				err.forEach(e => {
					if (e.key === key) {
						errors[key] = e.errorMessage || ''
					}
				})
			})
			console.log("🚀 ~ Object.keys ~ errors:", errors)
		});
}
onShow(() => {
	// 檢查記住我狀態
	checkLoginRemember()
})

// Storage 寫入 記住我狀態
watch(loginRemember, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		storage.set('loginRemember', loginRemember.value)
	}
})
</script>
<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	gap: 24rpx;

	::v-deep(.uni-forms) {
		.uni-forms-item__label {
			display: none;
		}

		.uni-forms-item__error {
			margin-left: 40rpx;
		}
	}

	.form-item {
		position: relative;

		.form-input-icon {
			position: absolute;
			left: 16rpx;
			top: 50%;
			z-index: 10;
			transform: translateY(-50%);
			margin-left: 32rpx;
			font-size: var(--font-size-title-pc-large) !important;
		}
	}

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

.login-btn {
	width: 100%;
	padding: 32rpx 0;
	line-height: 1;
	background-color: #9e80ff;
	color: #fff;
	font-size: var(--font-size-title-pc);
	border-radius: 50rpx;
	margin-top: 20rpx;
}

.switch-btn-container {
	width: fit-content;
	height: fit-content;

	&:hover {
		cursor: pointer;
	}

	::v-deep(.switch) {
		.switch {
			width: fit-content;
			height: fit-content;
			padding: 20rpx 36rpx;

			.switch-dot {
				width: 30rpx;
				height: 30rpx;
				top: 50%;
				translate: 0 -50%;
			}

			&.switch-checked {
				.switch-dot {
					left: calc(100% - 30rpx - 6rpx) !important;
				}
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
			border-radius: 64rpx;
			padding: 8rpx 32rpx;
			padding-left: 80rpx;

			&.is-focused {
				border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}

			.uni-easyinput__content-input {
				font-size: var(--font-size-content-pc-small) !important;

				.uni-input-placeholder {
					font-size: var(--font-size-content-pc-small) !important;

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