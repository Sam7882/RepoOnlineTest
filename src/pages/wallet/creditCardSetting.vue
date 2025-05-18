<template>
	<view class="pay-page">
		<c-headerNav :title="'信用卡'" />
		<view class="pay-page-content">
			<uni-forms ref="form" :model="formData" :rules="formRules" label-position="top">

				<!-- 卡片詳情 -->
				<view class="pay-page-title creditCard-template-title">
					<text>{{ '卡片詳情' }}</text>
					<view class="creditCard-template">
						<image class="subscription-setting-page-list-item-container-left-img"
							src="/static/icons/wallet/icon-wallet-visa.png" mode="heightFix" />
						<image class="subscription-setting-page-list-item-container-left-img"
							src="/static/icons/wallet/icon-wallet-masterCard.png" mode="heightFix" />
					</view>
				</view>


				<!-- 信用卡資料 -->
				<uni-forms-item class="pay-page-content-item-cardTop" :label="'信用卡號碼'" name="cardNumber" label-width="150"
					required>
					<uni-easyinput type="number" :placeholder="$t('wallet.creditCardNumber')" v-model="formData.cardNumber"
						class="pay-page-content-item-input" :trim="true" :clearable="false" />
				</uni-forms-item>
				<view class="pay-page-content-item-cardbottom">
					<uni-forms-item class="pay-page-content-item-cardLeft" name="cardExpiry" :label="'到期日(MM/YY)'"
						label-width="150">
						<uni-easyinput type="number" :placeholder="$t('wallet.cardExpiry')" v-model="formData.cardExpiry"
							class="pay-page-content-item-input" :trim="true" :clearable="false" />
					</uni-forms-item>
					<uni-forms-item class="pay-page-content-item-cardRight" name="cardCvv" :label="'安全驗證碼'" label-width="150">
						<uni-easyinput type="number" placeholder="cvv" v-model="formData.cardCvv"
							class="pay-page-content-item-input" :trim="true" :clearable="false" />
					</uni-forms-item>
				</view>
				<!-- 持卡人姓名 -->
				<uni-forms-item class="pay-page-content-item" :label="$t('wallet.creditCardName')" label-width="150"
					name="creditCardName" required>
					<view class="pay-page-content-item-input-container">
						<uni-easyinput v-model="formData.creditCardName" class="pay-page-content-item-input" :trim="true"
							:clearable="false" />
					</view>
				</uni-forms-item>

				<view class="pay-page-content-item-line " style="scale: 1.2;"></view>

				<view class="pay-page-title">
					<text>{{ $t('wallet.creditCardAddress') }}</text>
				</view>

				<!-- 帳單地址 -->
				<uni-forms-item class="pay-page-content-item" :label="'信用卡帳單地址'" label-width="150" name="creditCardAddress"
					required>
					<view class="pay-page-content-item-input-container">
						<uni-easyinput v-model="formData.creditCardAddress" class="pay-page-content-item-input" :trim="true"
							:clearable="false" />
					</view>
				</uni-forms-item>
				<!-- 國家 -->
				<uni-forms-item class="pay-page-content-item" :label="$t('common.country')" label-width="150" name="country"
					required>
					<uni-data-select placeholder="請選擇" class="pay-page-content-item-select" v-model="formData.country"
						:localdata="country.range" :clear="false" placement="top"></uni-data-select>
				</uni-forms-item>
				<!-- 郵遞區號 -->
				<uni-forms-item class="pay-page-content-item" :label="$t('common.postalCode')" label-width="150"
					name="postalCode" required>
					<view class="pay-page-content-item-input-container">
						<uni-easyinput type="number" v-model="formData.postalCode" class="pay-page-content-item-input" :trim="true"
							:clearable="false" />
					</view>
				</uni-forms-item>


				<!-- 確認送出按鈕 -->
				<view class="pay-page-content-item">
					<button type="button" class="submit-btn " :class="{ 'is-disabled': submitDisabled }" @click="submitForm">{{
						'儲存信用卡' }}</button>
				</view>
			</uni-forms>

		</view>
	</view>
</template>

<script setup>
// TEMP: 信用卡新增設置頁
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
// 付款表單資料
const formData = ref({
	creditCardName: null,
	cardNumber: null,
	cardExpiry: null,
	cardCvv: null,
	creditCardAddress: null,
	country: null,
	postalCode: null,
})
// 表單規則
const formRules = {
	creditCardName: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.creditCardName') }) }
		]
	},
	cardNumber: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.creditCardData') }) },
		]
	},
	cardExpiry: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.timeError') }) },
			{ pattern: /^[0-9]{2}\/[0-9]{2}$/, errorMessage: t('wallet.timeError') },
		]
	},
	cardCvv: {
		rules: [
			{
				required: true, errorMessage: { required: true, errorMessage: t('auth.pleaseEnter', { title: 'cvv' }) },
			},
			{ pattern: /^[0-9]{3}$/, errorMessage: t('auth.checkAright') },

		]
	},
	creditCardAddress: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.creditCardAddress') }) }
		]
	},
	country: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('common.country') }) },
		]
	},
	postalCode: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('common.postalCode') }) }
		]
	}
};
/* 各項目資料 */
// 國家 下拉選單
const country = ref({
	value: '0',
	range: [{ "value": '0', "text": "台灣" }, { "value": '1', "text": "美國" }, { "value": '2', "text": "中國" }, { "value": '3', "text": "日本" }, { "value": '4', "text": "韓國" }, { "value": '5', "text": "其他" }]
});

/* 確認付款 */
// 確認付款按鈕 是否禁用
const submitDisabled = ref(true)

/* 確認付款 */
// 確認付款按鈕 送出資料
const submitForm = () => {
	// 驗證表單
	form.value.validate().then(() => {
		console.log('✅ 驗證成功，送出資料:', formData.value);
		// 顯示成功提示
		uni.showToast({ title: '驗證成功', icon: 'success' });
		toCreditCardSelect()
		// 這裡可以進行 API 提交
	}).catch(err => {
		console.log('❌ 驗證失敗:', err);
		// 顯示錯誤提示
		uni.showToast({ title: '請檢查表單', icon: 'none' });
	});
}


onShow(() => {
	// 檢查初始化
	// checkInitData()
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

.pay-order-container {
	padding: 40rpx 0;
	background: var(--text-color-tertiary);
	border-radius: 20rpx;
	margin-bottom: 40rpx;

	.pay-page-content-item,
	.coupon-wrapper {
		padding: 0 52rpx;
		margin-bottom: 16rpx;
	}

	::v-deep(.uni-collapse-item__title) {
		.uni-collapse-item__title-arrow {
			margin: 0;
		}
	}

	.pay-page-content-item-line {
		border-color: var(--text-color-secondary);
		margin: 40rpx 0;
	}

	.amount {
		font-weight: bold;
	}

	.tip-container {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
		padding: 0 52rpx;
	}

	.tip-container-text {
		font-size: 20rpx;
		color: var(--text-color-quaternary);
		line-height: 1.2;
	}
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

.label-hidden {
	::v-deep(.uni-forms-item) {
		.no-label {
			display: none;
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

// 錯誤提示文字位置
.forms-item-errorTop {
	::v-deep(.uni-forms-item__content) {
		.uni-forms-item__content>uni-input:first-child {
			display: none;
		}

		.uni-forms-item__error {
			top: -50% !important;
			left: unset !important;
			right: 0 !important;
			transform: translateY(100%);

			&.msg--active {
				transform: translateY(0);
			}
		}
	}
}

.pay-page-content-item-cardbottom {
	display: flex;
	margin-bottom: 40rpx;
	gap: 28rpx;

	::v-deep(.uni-forms-item) {
		.uni-forms-item__label {
			color: var(--text-color-primary);
		}
	}

}

.pay-page-content-item-cardLeft,
.pay-page-content-item-cardRight {
	margin-bottom: 0;
	flex: 1;

	::v-deep(.uni-easyinput) {
		.is-input-border {
			height: 90rpx;
			color: var(--text-color-primary);
		}
	}


}


/* 國家 下拉選單*/
.pay-page-content-item-select {
	::v-deep(.uni-stat-box) {
		.uni-select {
			height: 90rpx !important;
			border: none !important;
			background: var(--text-color-tertiary) !important;
			border-radius: 24rpx;
			padding: 8rpx 32rpx;
			color: var(--text-color-primary);

			.uni-select__input-text {
				color: var(--text-color-primary);

				&.uni-select__input-placeholder {
					color: var(--text-color-quaternary);
				}
			}
		}

		// 下拉選單
		.uni-select__selector {
			background-color: var(--text-color-tertiary);
			border-color: var(--text-color-primary);
			border: none;

			.uni-popper__arrow_bottom {
				border-bottom-color: var(--text-color-primary) !important;

				&::after {
					border-bottom-color: var(--text-color-primary) !important;
				}
			}

			// 選單分隔線
			.uni-scroll-view-content>.uni-select__selector-item {

				// border-bottom: 1px solid var(--text-color-primary);
				&:hover {
					background-color: var(--primary-color) !important;
					color: var(--text-color-secondary) !important;
				}
			}

			.uni-scroll-view-content>.uni-select__selector-item:last-child {
				border: 0 !important;
			}
		}
	}
}


.pay-page-content-item-order-content-spacebetween {
	display: flex;
	justify-content: space-between;
	align-items: center;
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
