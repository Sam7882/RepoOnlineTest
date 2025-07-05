<template>
	<!-- 表單區塊 -->
	<uni-forms ref="form" class="forms" :model="formData" :rules="formRules" label-position="top">
		<!-- 信用卡資料 -->
		<uni-forms-item class="forms-item-cardTop" :label="$t('wallet.creditCardData')" name="creditCardNumber"
			label-width="150" required>
			<uni-easyinput type="number" :placeholder="$t('wallet.creditCardNumber')" v-model="formData.creditCardNumber"
				class="forms-item-input input-style" :trim="true" :clearable="false" disabled />
		</uni-forms-item>

		<!-- 信用卡銀行 -->
		<uni-forms-item class="forms-item" :label="$t('wallet.creditCardBank')" label-width="150" name="creditCardAddress"
			required>
			<view class="forms-item-input-container">
				<uni-easyinput v-model="formData.creditCardAddress" class="forms-item-input input-style" :trim="true"
					:clearable="false" disabled />
			</view>
		</uni-forms-item>

		<!-- 設定為預設信用卡 -->
		<uni-forms-item class="forms-item label-hidden" name="defaultCreditCard">
			<view class="form-item default-credit-card">
				<text>{{ $t('wallet.setAsDefaultCreditCard') }}</text>
				<c-checkBox v-model="formData.defaultCreditCard" />
			</view>
		</uni-forms-item>

		<!-- 確認送出按鈕 -->
		<view class="forms-item btn-container">
			<button type="button" class="submit-btn btn" :class="{ 'is-disabled': submitDisabled }" @click="submitForm">{{
				$t('wallet.removeCreditCard') }}</button>
		</view>
	</uni-forms>
</template>
<script setup>
// TEMP: 信用卡預設頁
import { onShow } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['submit'])
const { openConfirm } = inject('common')
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
const submitDisabled = ref(false)

/* 付款方式 FN() 選擇 */
// NOTE: 因為uni-ui 組件中的 uni-checkbox 內文無法添加ICON，所以使用原生 radio-group，但 radio-group 的值無法綁定到 formData.value.payMethod，所以需要手動來更新 
// NOTE：onFieldChange　為　uni-forms-item　提供更新驗證值用，版本 1.4.0 後，原本的 setValue 已經棄用，參考 uni-forms 文件

/* 確認付款 */
// 確認付款按鈕 送出資料
const openConfirmModal = () => {
	openConfirm({
		title: t('wallet.deleteCreditCard'),
		content: t('wallet.deleteCreditCardTip'),
		confirmBtnText: t('common.confirm'),
		onConfirm: () => {
			emit('submit')
		}
	})
}

const submitForm = () => {
	if (submitDisabled.value) return
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
.forms {
	width: 100%;
}

.forms-item {
	margin-bottom: 32rpx;

	::v-deep(.uni-forms-item) {
		.uni-forms-item__label {
			color: var(--text-color-primary);
			font-size: var(--font-size-title-pc);
		}

	}
}

.default-credit-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: var(--font-size-title-pc);
}

.label-hidden {
	::v-deep(.uni-forms-item) {
		.no-label {
			display: none;
		}
	}
}

/* INPUT 輸入欄位標準樣式 */
.input-style {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none !important;
			background: var(--text-color-tertiary) !important;
			border-radius: 10rpx;
			padding: 8rpx 32rpx;
			color: var(--text-color-primary);

			@media screen and (min-width: 961px) {
				padding: 4rpx 32rpx;
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

/* 信用卡資料樣式組合 */
.forms-item-cardTop {
	margin-bottom: 40rpx;

	::v-deep(.uni-forms-item) {
		.uni-forms-item__label {
			color: var(--text-color-primary);
			font-size: var(--font-size-title-pc);
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
	margin-top: 80rpx;
	padding: 24rpx 0;
}
</style>