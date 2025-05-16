<template>
	<view class="pay-page">
		<c-headerNav :title="$t('wallet.paymentDetails')" />
		<!-- <view class="pay-page-title">
			<text>{{ $t('wallet.paymentDetails') }}</text>
		</view> -->
		<view class="pay-page-content">
			<uni-forms ref="form" :model="formData" :rules="formRules" label-position="top">
				<!-- name => 對應 uni-forms 的 表單參數名稱 , 與 規則名皆須一致 -->
				<uni-forms-item class="pay-page-content-item" label="付款金額" label-width="150" name="payAmount">
					<view class="pay-page-content-item-input-amount-container">
						<text>{{ $t('wallet.singlePayment') }}</text>
						<view class="pay-page-content-item-input-amount">
							<text>{{ formData.payAmount }}</text>
						</view>
					</view>
				</uni-forms-item>

				<!-- 訂單內容 -->
				<view class="pay-page-title">
					<text>{{ '訂單內容' }}</text>
				</view>
				<view class="pay-order-container">
					<view class="pay-page-content-item">
						<view class="pay-page-content-item-order-content">
							<!-- 圓形邊框圖片 -->
							<view class="pay-page-content-item-order-content-img">
								<image src="@/static/images/template/img-template-03.png" mode="widthFix"></image>
							</view>
							<!-- 垂直排序，名稱與帳號 -->
							<view class="pay-page-content-item-order-content-text">
								<text class="pay-page-content-item-order-content-text-name">名稱</text>
								<text class="pay-page-content-item-order-content-text-account">@888888.888</text>
							</view>
						</view>
					</view>
					<view class="pay-page-content-item-line"></view>
					<!-- 優惠馬 摺疊版 -->
					<view class="coupon-wrapper">
						<uni-collapse v-model="activeCollapse">
							<uni-collapse-item title="優惠碼" name="coupon">
								<view class="collapse-content">
									<uni-easyinput v-model="couponCode" :placeholder="$t('wallet.couponCodePlaceholder')"
										class="input-box" />
									<button type="button" class="confirm-btn" @click="applyCoupon">{{ $t('common.confirm') }}</button>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
					<!-- 一行的左右兩側文字 -->
					<view class="pay-page-content-item pay-page-content-item-order-content-spacebetween">
						<text>{{ $t('wallet.currentPayment') }}</text>
						<text class="amount">{{ finalPayment.amount }}</text>
					</view>
					<view class="pay-page-content-item pay-page-content-item-order-content-spacebetween">
						<text>{{ $t('wallet.salesTax') }}</text>
						<text class="amount">{{ finalPayment.tax }}</text>
					</view>
					<view class="pay-page-content-item pay-page-content-item-order-content-spacebetween">
						<text>{{ $t('wallet.totalAmount') }}</text>
						<text class="amount">{{ finalPaymentAmount }}</text>
					</view>
					<view class="tip-container">
						<text class="tip-container-text">*此筆為 自動續訂，今天是 2025 年 5 月 11 日，系統將於 2025 年 5 月 15 日自動扣款完成續訂。</text>
						<text class="tip-container-text">若您不希望自動續訂，可前往「個人帳號 > 訂閱管理」頁面手動取消，避免下期繼續收費。</text>
					</view>
				</view>

				<!-- 信用卡 -->
				<view class="pay-page-title">
					<text>{{ '信用卡' }}</text>
				</view>
				<view class="subscription-setting-page-list-item-container">
					<view class="subscription-setting-page-list-item-container-left">
						<view class="subscription-setting-page-list-item-container-left-img-container">
							<image class="subscription-setting-page-list-item-container-left-img"
								src="/static/icons/wallet/icon-wallet-visa.png" mode="aspectFit" />
						</view>
						<view class="subscription-setting-page-list-item-container-left-name">
							<text class="subscription-setting-page-list-item-container-left-name-text">
								{{ '中華郵政公司' }}
							</text>
							<view class="subscription-setting-page-list-item-container-left-name-default">
								<text class="subscription-setting-page-list-item-container-left-name-default-text">預設</text>
							</view>
						</view>
					</view>
					<!-- 該筆啟用切換按鈕 -->
					<view class="subscription-setting-page-list-item-container-right">
						<view class="subscription-setting-page-list-item-container-right-tick-container">
							<uni-icons class="subscription-setting-page-list-item-container-right-tick-container-tick"
								type="icon-common-tick" custom-prefix="icon" size="12" />
						</view>
						<text class="subscription-setting-page-list-item-container-right-number">
							{{ '*1122' }}
						</text>
					</view>
				</view>

				<view class="pay-page-content-item-line " style="scale: 1.2;"></view>

				<!-- 付款方式 -->
				<!-- <uni-forms-item ref="payMethodItem" class="pay-page-content-item" label="付款方式" label-width="150"
					name="payMethod" required>
					<view class="pay-page-content-item-input-container">
						<radio-group class="pay-page-content-item-radio-group" @change="payMethodChange">
							<label class="pay-page-content-item-radio-label" :class="{ active: payMethods.value === item.value }"
								v-for="(item) in payMethods.range" :key="item.value">
								<radio class="pay-page-content-item-radio" :value="item.value"
									:checked="payMethods.value === item.value">
									<uni-icons custom-prefix="icon" :type="item.icon"></uni-icons>
									{{ item.text }}
								</radio>
							</label>
						</radio-group>
					</view>
				</uni-forms-item> -->

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
				<uni-forms-item class="pay-page-content-item-cardTop" :label="$t('wallet.creditCardData')" name="cardNumber"
					label-width="150" required>
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
						$t('wallet.confirmPayment') }}</button>
				</view>
				<!-- 說明中心 -->
				<view class="pay-page-content-item pay-page-content-gap">
					<text class="caption" @click="openCaption">{{ $t('common.center') }}</text>
					<text>$ TWD</text>
				</view>
			</uni-forms>

		</view>
		<c-bottomPopUp ref="bottomPopUpRef" />
	</view>
</template>

<script setup>
// TEMP: 付款詳情頁
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { useI18n } from 'vue-i18n'
const initStore = useInitStore()
const { checkInitData } = initStore
const { t } = useI18n()
/* 表單 */
// <uni-form> ref
const form = ref(null)
// 付款表單資料
const formData = ref({
	payAmount: '418.95', // 付款金額預設
	payMethod: '0', // 付款方式預設
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
	payAmount: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.amount') }) }
		]
	},
	payMethod: {
		rules: [
			{ required: true, errorMessage: t('auth.pleaseEnter', { title: t('wallet.paymentMethod') }) },
		]
	},
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
// 付款方式 ref
const payMethodItem = ref(null)
// 單筆付款 只會顯示一筆，為該訂單的付款金額
const payAmount = ref({
	value: '0',
	range: [{ "value": '0', "text": "399.00" }]
})
// 付款方式 僅信用卡與ATM兩種 radio-group
const payMethods = ref({
	value: '0',
	range: [{ "value": '0', "text": "信用卡", icon: 'icon-wallet-creditCard' }, { "value": '1', "text": "ATM" }]
});
// 國家 下拉選單
const country = ref({
	value: '0',
	range: [{ "value": '0', "text": "台灣" }, { "value": '1', "text": "美國" }, { "value": '2', "text": "中國" }, { "value": '3', "text": "日本" }, { "value": '4', "text": "韓國" }, { "value": '5', "text": "其他" }]
});
/* 付款詳情 */
/* 優惠碼 */
// 控制摺疊狀態，一般為陣列 [] / ["coupon"] ，手風琴效果則為 String
const activeCollapse = ref([]);
// 優惠碼輸入欄位
const couponCode = ref(''); // 優惠碼
const couponAmount = ref(0); // 優惠碼金額
/* 付款最終金資訊 */
const finalPayment = ref({
	amount: 399,
	tax: 19.95,
	total: 418.95
})
const finalPaymentAmount = computed(() => {
	return finalPayment.value.amount + finalPayment.value.tax - couponAmount.value
})


/* 確認付款 */
// 確認付款按鈕 是否禁用
const submitDisabled = ref(true)

/* 付款方式 FN() 選擇 */
// NOTE: 因為uni-ui 組件中的 uni-checkbox 內文無法添加ICON，所以使用原生 radio-group，但 radio-group 的值無法綁定到 formData.value.payMethod，所以需要手動來更新 
// NOTE：onFieldChange　為　uni-forms-item　提供更新驗證值用，版本 1.4.0 後，原本的 setValue 已經棄用，參考 uni-forms 文件
const payMethodChange = (e) => {
	// e => {detail: {value: '0'}}
	payMethods.value.value = e.detail.value
	formData.value.payMethod = payMethods.value.value
	// 取該 uni-forms-item 的 ref onFieldChange 更新表單驗證值
	payMethodItem.value.onFieldChange(payMethods.value.value)
}

/* 優惠碼 */
function applyCoupon() {
	// 如果沒有輸入優惠碼，則顯示錯誤提示
	if (!couponCode.value) {
		uni.showToast({ title: '請輸入優惠碼', icon: 'none' });
		return;
	}
	// 提交訊息
	uni.showToast({ title: `已套用：${couponCode.value}`, icon: 'success' });
	// 計算最終金資訊
	couponAmount.value = 100
}


/* 確認付款 */
// 確認付款按鈕 送出資料
const submitForm = () => {
	// 驗證表單
	form.value.validate().then(() => {
		console.log('✅ 驗證成功，送出資料:', formData.value);
		// 顯示成功提示
		uni.showToast({ title: '驗證成功', icon: 'success' });
		// 這裡可以進行 API 提交
	}).catch(err => {
		console.log('❌ 驗證失敗:', err);
		// 顯示錯誤提示
		uni.showToast({ title: '請檢查表單', icon: 'none' });
	});
}

const bottomPopUpRef = ref(null)
const openCaption = () => {
	bottomPopUpRef.value.open({
		title: '說明中心',
		content: '您可前往管理付款資訊頁面新增付款方式。 如欲了解詳情，請參考如何新增或更新付款方式。 若您想更改 Fance 付款方式，我們提供多種付款選項。'
	})
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

/* 優惠碼 */
.coupon-wrapper {
	background-color: transparent;
	color: #fff;

	.uni-collapse {
		background-color: transparent;

		::v-deep(.uni-collapse-item__title-wrap) {
			.uni-collapse-item__title-box {
				background: transparent;
				color: var(--text-color-primary);
				padding: 0;

				.uni-collapse-item__title-text {
					font-size: 32rpx;
				}
			}
		}
	}

	::v-deep(.uni-collapse-item) {
		.uni-collapse-item__title.uni-collapse-item-border {
			border: 0 !important;
		}

		.uni-collapse-item__wrap {
			background-color: transparent;

			.uni-collapse-item__wrap-content.uni-collapse-item--border {
				border: 0 !important;
			}
		}

		.collapse-content {
			display: flex;
			align-items: center;
			gap: 16rpx;

			.input-box {
				flex: 1;
				background-color: transparent;
				color: var(--text-color-primary) !important;

				.is-input-border {
					background: var(--background-color-light) !important;
					// border-color: var(--input-border-color) !important;

					&.is-focused {
						border-color: var(--primary-color) !important;

						.content-clear-icon {
							color: var(--primary-color) !important;
						}
					}
				}
			}
		}
	}

	.confirm-btn {
		background-color: var(--primary-color);
		color: var(--text-color-secondary);
		border-radius: 8rpx;
		padding: 2rpx 20rpx;
		font-size: 28rpx;
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

/* 付款金額 */
.pay-page-content-item-input-amount-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 56rpx 52rpx;
	font-size: 28rpx;
	// border: 1rpx solid var(--input-border-color);
	background: var(--text-color-tertiary);
	border-radius: 24rpx;
}

.pay-page-content-item-input-amount {
	font-weight: bold;
}

/* 單選框樣式 */
.pay-page-content-item-radio-group {
	display: flex;
	justify-content: space-between;
	gap: 16rpx;
}

// 單選框標籤
.pay-page-content-item-radio-label {
	padding: 16rpx 32rpx;
	border: 1px solid var(--input-border-color);
	border-radius: 24rpx;
	flex: 1;
	display: flex;
	justify-content: center;
	font-size: 32rpx;

	&.active {
		border-color: var(--text-color-primary);
	}

	::v-deep(.uni-radio-wrapper) {
		.uni-radio-input {
			display: none;
		}

		.icon {
			padding-top: 8rpx;
			margin-right: 16rpx;
			color: var(--text-color-primary) !important;
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

/* 訂單內容 */
.pay-page-content-item-order-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 24rpx;

	// 圖片
	.pay-page-content-item-order-content-img {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
		border: 6rpx solid var(--primary-color);
		overflow: hidden;

		uni-image {
			width: 100%;
			height: 100% !important;
		}

		::v-deep(uni-image) {
			img {
				object-fit: contain;
			}
		}
	}

	// 名稱與帳號
	.pay-page-content-item-order-content-text {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.pay-page-content-item-order-content-text-name {
			font-size: 32rpx;
			color: var(--text-color-primary);
		}

		.pay-page-content-item-order-content-text-account {
			font-size: 24rpx;
			color: var(--text-color-quaternary);
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

.caption {
	color: var(--primary-color);
}

/* 間距 */
.pay-page-content-gap {
	display: flex;
	font-size: 24rpx;
	gap: 26rpx;
}
</style>
