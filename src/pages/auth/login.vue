<template>
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
					<uni-easyinput v-model="formData.password" class="inputStyle" type="password"
						:placeholder="$t('auth.password')" :confirmType="$t('auth.login')" :trim="true" :clearable="false" />
					<uni-icons class="form-input-icon" type="icon-common-locked" custom-prefix="icon" size="24" color="#999" />
					<!-- <text v-if="errors.password" class="error-text">{{ errors.password }}</text> -->
				</view>
			</uni-forms-item>

			<!-- 記住我 -->
			<view class="form-item remember">
				<text class="remember-text">{{ $t('auth.remember') }}</text>
				<c-checkBox v-model="loginRemember" />
			</view>

			<!-- 登入按鈕 -->
			<button type="button" class="login-btn" @click="handleLogin">
				{{ $t('auth.login') }}
			</button>
		</uni-forms>

		<!-- 第三方登入 -->
		<view class="social-login">
			<image class="social-icon" src="/static/icons/community/icon-community-facebook.png" />
			<image class="social-icon" src="/static/icons/community/icon-community-facebook.png" />
			<image class="social-icon" src="/static/icons/community/icon-community-facebook.png" />
			<image class="social-icon" src="/static/icons/community/icon-community-facebook.png" />
		</view>

		<!-- 註冊連結 -->
		<view class="register">
			<text>{{ $t('auth.noAccount') }}</text>
			<text class="link" @click="toRegister()">{{ $t('auth.register') }}</text>
		</view>
	</view>
</template>

<script setup>
// TEMP: 登入頁面
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { storage } from '@/utils/storage'
import { toRegister, toPlayIndex } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore

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
			uni.showToast({ title: '驗證成功', icon: 'success' });
			// 跳轉首頁
			toPlayIndex()
			// 這裡可以進行 API 提交
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
	// 檢查初始化
	checkInitData()
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
			font-size: 36rpx !important;
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
	height: 100rpx;
	background-color: #9e80ff;
	color: #fff;
	font-size: 36rpx;
	border-radius: 50rpx;
	margin-top: 20rpx;
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
	margin-top: 80rpx;
	text-align: center;
	font-size: 28rpx;
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
			border-radius: 64rpx;
			padding: 8rpx 32rpx;
			padding-left: 80rpx;

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
