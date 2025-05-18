<template>
	<view class="pay-page">
		<c-headerNav :title="$t('wallet.paymentDetails')" />
		<view class="pay-page-content">
			<uni-forms ref="form" :model="formData" :rules="formRules" label-position="top">

				<!-- 卡片詳情 -->
				<view class="pay-page-title creditCard-template-title">
					<text>{{ '卡片詳情' }}</text>
					<view class="creditCard-template">
						<image class="subscription-setting-page-list-item-container-left-img"
							src="/static/icons/wallet/icon-wallet-masterCard.png" mode="heightFix" />
					</view>
				</view>

				<!-- 信用卡資料 -->
				<uni-forms-item class="pay-page-content-item-cardTop" :label="$t('wallet.creditCardData')"
					name="creditCardNumber" label-width="150" required>
					<uni-easyinput type="number" :placeholder="$t('wallet.creditCardNumber')" v-model="formData.cardNumber"
						class="pay-page-content-item-input" :trim="true" :clearable="false" disabled />
				</uni-forms-item>

				<!-- 信用卡銀行 -->
				<uni-forms-item class="pay-page-content-item" :label="'信用卡銀行'" label-width="150" name="creditCardAddress"
					required>
					<view class="pay-page-content-item-input-container">
						<uni-easyinput v-model="formData.creditCardAddress" class="pay-page-content-item-input" :trim="true"
							:clearable="false" disabled />
					</view>
				</uni-forms-item>

				<!-- 設定為預設信用卡 -->
				<uni-forms-item class="pay-page-content-item label-hidden" name="defaultCreditCard">
					<view class="form-item default-credit-card">
						<text>設定為預設信用卡</text>
						<c-checkBox v-model="defaultCreditCard" />
					</view>
				</uni-forms-item>

				<!-- 確認送出按鈕 -->
				<view class="pay-page-content-item">
					<button type="button" class="submit-btn " :class="{ 'is-disabled': submitDisabled }" @click="submitForm">{{
						'移除信用卡' }}</button>
				</view>
			</uni-forms>

		</view>
		<c-confirmPopUp ref="confirmModal" />
	</view>
</template>

<script setup>
// TEMP: 信用卡預設頁
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { useI18n } from 'vue-i18n'
import { toCreditCardSelect } from '@/utils/routers'
const initStore = useInitStore()
const { checkInitData } = initStore
const { t } = useI18n()
/* 表單 */
// <uni-form> ref
const form = ref(null)
// 預設信用卡
const defaultCreditCard = ref(false)
// 付款表單資料
const formData = ref({
	creditCardNumber: null, // 信用卡號碼
	creditCardAddress: null, // 信用卡銀行
	defaultCreditCard: null, // 設定為預設信用卡
})
// 表單規則
const formRules = {
	// creditCardNumber: {
	// 	rules: [
	// 		{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.amount') }) }
	// 	]
	// },
	// creditCardAddress: {
	// 	rules: [
	// 		{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.paymentMethod') }) },
	// 	]
	// },
	// defaultCreditCard: {
	// 	rules: [
	// 		{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.creditCardName') }) }
	// 	]
	// },
};
/* 各項目資料 */

/* 確認付款 */
// 確認付款按鈕 是否禁用
const submitDisabled = ref(true)

/* 付款方式 FN() 選擇 */
// NOTE: 因為uni-ui 組件中的 uni-checkbox 內文無法添加ICON，所以使用原生 radio-group，但 radio-group 的值無法綁定到 formData.value.payMethod，所以需要手動來更新 
// NOTE：onFieldChange　為　uni-forms-item　提供更新驗證值用，版本 1.4.0 後，原本的 setValue 已經棄用，參考 uni-forms 文件

/* 確認付款 */
// 確認付款按鈕 送出資料
const confirmModal = ref(null)
const openConfirmModal = () => {
	confirmModal.value.open({
		title: '刪除信用卡',
		content: '您確定要刪除此信用卡嗎？',
		confirmBtnText: '確定',
		onConfirm: () => {
			toCreditCardSelect()
			console.log('使用者按下確定')
		}
	})
}

const submitForm = () => {
	openConfirmModal()
	// 驗證表單
	// form.value.validate().then(() => {
	// 	console.log('✅ 驗證成功，送出資料:', formData.value);
	// 	// 顯示成功提示
	// 	uni.showToast({ title: '驗證成功', icon: 'success' });
	// 	// 這裡可以進行 API 提交
	// }).catch(err => {
	// 	console.log('❌ 驗證失敗:', err);
	// 	// 顯示錯誤提示
	// 	uni.showToast({ title: '請檢查表單', icon: 'none' });
	// });
}

onShow(() => {

})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-light);
	color: var(--text-color-primary);
}

.pay-page {
	padding: 32rpx;
}

/* 行分隔線 */
.pay-page-content-item-line {
	// height: 1px;
	// background-color: var(--input-border-color);
	border-bottom: 1px solid var(--background-color-grayLight2);
	margin: 48rpx 0;
}

// 標題
.pay-page-title {
	font-size: 32rpx;
	margin-bottom: 32rpx;
	color: var(--primary-color);
}

uni-image {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.creditCard-template-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.creditCard-template {
	display: flex;
	gap: 16rpx;

	.subscription-setting-page-list-item-container-left-img {
		height: 16rpx;
	}
}

.subscription-setting-page-list-item-container {
	padding: 32rpx 40rpx 32rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;

	.subscription-setting-page-list-item-container-left {
		display: flex;
		align-items: center;
		gap: 32rpx;
		min-width: 40%;
		flex: 1;

		.subscription-setting-page-list-item-container-left-img-container {
			width: 56rpx;
			height: 56rpx;
			// margin-right: 16rpx;
		}

		.subscription-setting-page-list-item-container-left-name {
			position: relative;
			display: flex;
			flex-direction: column;
		}

		.subscription-setting-page-list-item-container-left-name-text {
			font-size: 32rpx;
			color: var(--text-color-primary);
		}

		.subscription-setting-page-list-item-container-left-name-default {
			position: absolute;
			top: calc(100% + 4rpx);
			left: 0;
			display: flex;
			justify-content: center;
			padding: 4rpx 30rpx;
			border-radius: 100rpx;
			background-color: var(--text-color-denary);
			width: fit-content;
		}

		.subscription-setting-page-list-item-container-left-name-default-text {
			font-size: 20rpx;
			line-height: 1;
		}

	}

	.subscription-setting-page-list-item-container-right {
		display: flex;
		align-items: center;
		gap: 8rpx;

		.subscription-setting-page-list-item-container-right-number {
			font-size: 32rpx;
			font-weight: 400;
			color: var(--text-color-primary);
		}

		.subscription-setting-page-list-item-container-right-tick-container {
			display: flex;
			opacity: 1;
			background: var(--primary-color);
			border-radius: 50%;
			padding: 6rpx;
		}

		.subscription-setting-page-list-item-container-right-tick-container-tick {
			font-size: 10rpx !important;
			color: var(--text-color-secondary) !important;
		}
	}
}

.pay-page-content {
	margin-bottom: 40rpx;

	.pay-page-content-item {
		margin-bottom: 32rpx;

		::v-deep(.uni-forms-item) {
			.uni-forms-item__label {
				color: var(--text-color-primary);
				font-size: 30rpx;
			}

		}
	}

}

.default-credit-card {
	display: flex;
	align-items: center;
	justify-content: space-between;

	::v-deep(.switch-wrapper) {
		.switch {
			height: 44rpx;
			width: 90rpx;
		}

		.switch-dot {
			width: 34rpx;
			height: 34rpx;
			// left: calc(100% - 38rpx) !important;
		}

		.switch-checked {
			background-color: #FFD939;

			.switch-dot {
				left: calc(100% - 38rpx) !important;
			}
		}
	}
}

.label-hidden {
	::v-deep(.uni-forms-item) {
		.no-label {
			display: none;
		}
	}
}

/* CheckBox 樣式 */
.pay-page-content-item-input {
	::v-deep(.uni-data-checklist) {
		.checklist-box {
			border: 1px solid var(--input-border-color) !important;
			margin: 0 !important;
			padding: 16rpx 48rpx !important;
			background: transparent !important;
			border-radius: 20rpx !important;

			&.is--tag.is-checked {
				border-color: var(--text-color-primary) !important;
			}
		}
	}
}

/* INPUT 輸入欄位 */
.pay-page-content-item-input {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none !important;
			background: var(--text-color-tertiary) !important;
			border-radius: 20rpx;
			padding: 8rpx 32rpx;
			color: var(--text-color-primary);

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

/* 信用卡資料樣式組合 */
.pay-page-content-item-cardTop {
	margin-bottom: 40rpx;

	::v-deep(.uni-forms-item) {
		.uni-forms-item__label {
			color: var(--text-color-primary);
			font-size: 32rpx;
		}
	}

	::v-deep(.uni-easyinput) {
		.is-input-border {
			border: none !important;
			// border-radius: 12px 12px 0 0;
		}
	}
}

/* 確認付款按鈕 */
.submit-btn {
	border-radius: 20rpx;
	margin-top: 80rpx;
	font-size: 30rpx;
	padding: 24rpx 0;
	line-height: 1;

	&.is-disabled {
		background-color: var(--primary-color);
		color: var(--text-color-secondary);
	}
}
</style>
