<template>
	<layout-appBase>
		<view class="register-page">
			<!-- 頂部標題 -->
			<view class="header">
				<view class="header-title">
					<text class="title">{{ $t('auth.register') }}</text>
					<text class="brand">Fance</text>
					<view class="underline"></view>
				</view>
			</view>

			<auth-registerForm @register="handleRegister" />

		</view>
	</layout-appBase>
</template>

<script setup>
// TEMP: 註冊頁面
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { toPhoneVerify, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const initStore = useInitStore()
const { checkInitData } = initStore

const handleRegister = () => {
	console.log("🚀 handleRegister 註冊")
	toPhoneVerify()
};

onShow(() => {
	// checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
.register-page {
	background-color: var(--background-color);
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
