<template>
	<view class="login-page">
		<!-- 頂部標題 -->
		<view class="header">
			<view class="header-title">
				<text class="title">{{ $t('auth.register') }}</text>
				<text class="brand">Fance</text>
				<view class="underline"></view>
			</view>
		</view>

		<!-- 表單區塊 -->
		<uni-forms ref="formRef" :model="formData" :rules="formRules" class="form">
			<!-- 姓名 -->
			<uni-forms-item name="name" required>
				<view class="form-item">
					<uni-easyinput v-model="formData.name" class="inputStyle" :placeholder="$t('auth.name')" :trim="true"
						:clearable="false" />
					<uni-icons class="form-input-icon" type="icon-common-person-circle" custom-prefix="icon" size="24"
						color="#999" />
				</view>
			</uni-forms-item>

			<!-- 手機號碼 -->
			<uni-forms-item name="phone" required>
				<view class="form-item">
					<uni-easyinput v-model="formData.phone" class="inputStyle" :placeholder="$t('auth.phone')" :trim="true"
						:clearable="false" />
					<uni-icons class="form-input-icon" type="icon-input-phone" custom-prefix="icon" size="24" color="#999" />
				</view>
			</uni-forms-item>

			<!-- 性別 -->
			<uni-forms-item name="gender" required>
				<view class="form-item">
					<view class="form-item-label" @click="handleGender"></view>
					<uni-easyinput v-model="formData.genderText" class="inputStyle" :placeholder="$t('auth.gender')" :trim="true"
						:clearable="false" />
					<uni-icons class="form-input-icon" type="icon-input-gender" custom-prefix="icon" size="24" color="#999" />
					<uni-popup ref="genderPopup" type="bottom" background-color="#fff">
						<view class="popup-content">
							<view class="popup-option" @click="selectGender(0)">{{ $t('auth.male') }}</view>
							<view class="popup-option" @click="selectGender(1)">{{ $t('auth.female') }}</view>
						</view>
					</uni-popup>
				</view>
			</uni-forms-item>

			<!-- 生日 -->
			<uni-forms-item name="birthday" required>
				<view class="form-item">
					<uni-datetime-picker v-model="formData.birthday" class="dateStyle" type="date" :clear-icon="false"
						:placeholder="$t('auth.birthday')" />
					<uni-icons class="form-input-icon" type="icon-input-date" custom-prefix="icon" size="24" color="#999" />
				</view>
			</uni-forms-item>

			<!-- 信箱 -->
			<uni-forms-item name="email" required>
				<view class="form-item">
					<uni-easyinput v-model="formData.email" class="inputStyle" :placeholder="$t('auth.email')" :trim="true"
						:clearable="false" />
					<uni-icons class="form-input-icon email" type="icon-menu-email" custom-prefix="icon" size="24" color="#999" />
				</view>
			</uni-forms-item>

			<!-- 密碼 -->
			<uni-forms-item name="password" required>
				<view class="form-item">
					<uni-easyinput v-model="formData.password" class="inputStyle" type="password"
						:placeholder="$t('auth.password')" :trim="true" :clearable="false" />
					<uni-icons class="form-input-icon" type="icon-common-locked" custom-prefix="icon" size="24" color="#999" />
					<!-- <text class="input-tip">{{ $t('auth.passwordValid') }}</text> -->
				</view>
			</uni-forms-item>

			<!-- 確認密碼 -->
			<uni-forms-item name="confirmPassword" required>
				<view class="form-item">
					<uni-easyinput v-model="formData.confirmPassword" class="inputStyle" type="password"
						:placeholder="$t('auth.confirmPassword')" :trim="true" :clearable="false" />
					<uni-icons class="form-input-icon" type="icon-common-locked" custom-prefix="icon" size="24" color="#999" />
					<!-- <text class="input-tip">{{ $t('auth.passwordValid') }}</text> -->
				</view>
			</uni-forms-item>

			<!-- 註冊按鈕 -->
			<button type="button" class="register-btn" @click="handleRegister">
				{{ $t('auth.register') }}
			</button>
		</uni-forms>
	</view>
</template>

<script setup>
// TEMP: 註冊頁面
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { toPhoneVerify } from '@/utils/routers'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore

const gender = ref('');

// 性別彈窗
const genderPopup = ref(null);
// 性別顯示用
const genderText = ref('');
// 性別彈窗開啟和關閉
const handleGender = () => {
	genderPopup.value.open();
}
const closeGenderPopup = () => {
	genderPopup.value.close();
}
// 性別選擇
const selectGender = (value) => {
	gender.value = value;
	genderText.value = gender.value === 0 ? t('auth.male') : t('auth.female');
	formData.genderText = genderText.value;
	closeGenderPopup();
}

const formRef = ref();

const formData = reactive({
	name: null,
	phone: null,
	gender: null,
	genderText: null,
	birthday: null,
	email: null,
	password: null,
	confirmPassword: null
});

const formRules = {
	name: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.name') }) }
		]
	},
	phone: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.phone') }) },
			{ pattern: /^[0-9]{10}$/, errorMessage: t('auth.rules.phone.pattern') }
		]
	},
	gender: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.gender') }) }
		]
	},
	birthday: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.birthday') }) }
		]
	},
	email: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.email') }) },
			{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorMessage: t('auth.rules.email.pattern') }
		]
	},
	password: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.password') }) },
			{ pattern: /^[a-zA-Z0-9]{6,20}$/, errorMessage: t('auth.rules.password.pattern') }
		]
	},
	confirmPassword: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('auth.confirmPassword') }) },
			{
				validator: (rule, value, callback) => {
					if (value !== formData.password) {
						callback(t('auth.confirmPasswordError'));
					} else {
						callback();
					}
				}
			}
		]
	}
};
const handleRegister = () => {
	formRef.value.validate().then((res) => {
		console.log('✅ 驗證成功，送出資料:', res);
		toPhoneVerify()
		// 成功邏輯
	}).catch((err) => {
		console.log('❌ 驗證失敗:', err);
		// 驗證失敗
	});
};

onShow(() => {
	// 檢查初始化
	checkInitData()
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
	}

	.form-item {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;

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

.register-btn {
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

// 日期 輸入欄位
.dateStyle {
	::v-deep(.uni-date-editor) {
		margin-bottom: 0rpx;

		.uni-date-x--border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 64rpx;
			padding: 8rpx 32rpx;
		}

		.uni-date-x {
			background: transparent;
			color: var(--text-color-quaternary);
		}

		.uni-date-x .icon-calendar {
			visibility: hidden;
			color: var(--text-color-tertiary);
		}

		.uni-date__x-input {
			font-size: 22rpx;
			padding-left: 24rpx;
		}
	}

	&.errorStyle ::v-deep(.uni-date-editor) {
		.uni-date-x--border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

// 性別彈出層
.popup-content {
	padding: 20rpx;
}

.popup-option {
	padding: 20rpx;
	text-align: center;
	font-size: 32rpx;
	border-bottom: 1px solid #eee;
}

.popup-option.cancel {
	color: #999;
}

/* 日期選擇器具 */
::v-deep(.uni-calendar-item__weeks-box) {
	.uni-calendar-item__weeks-box .uni-calendar-item--checked {
		background-color: var(--primary-color) !important;
	}
}

::v-deep(.uni-date-btn--ok) {
	.uni-datetime-picker--btn {
		background-color: var(--primary-color) !important;
		border-radius: 24rpx !important;
	}
}
</style>
