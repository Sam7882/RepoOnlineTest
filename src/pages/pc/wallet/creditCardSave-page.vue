<template>
	<view class="pay-page">
		<c-headerNav :title="$t('wallet.creditCard')" :openBack="true" />
		<view class="pay-page-content">
			<!-- 卡片詳情 -->
			<view class="pay-page-title creditCard-template">
				<text class="creditCard-template-title">{{ $t('wallet.cardDetails') }}</text>
				<view class="img-container">
					<image class="img" src="/static/icons/wallet/icon-wallet-masterCard.png" mode="heightFix" />
				</view>
			</view>

			<form-carditCardSaveForm @submit="handleSubmit" />
		</view>
		<c-confirmPopUp ref="confirmModal" />
	</view>
</template>

<script setup>
// TEMP: 信用卡預設頁
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { useI18n } from 'vue-i18n'
import { toCreditCardSelect, checkViewportAutoReplace } from '@/utils/routers'
const initStore = useInitStore()
const { checkInitData } = initStore
const { t } = useI18n()

const emit = defineEmits(['switchTab'])


const handleSubmit = () => {
	emit('switchTab', 'creditCardSelect')
	// toCreditCardSelect()
}

onShow(() => {
	checkViewportAutoReplace()
})

</script>

<style lang="scss" scoped>
.pay-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);

	// 設定窗口最大寬度
	max-width: var(--setting-page-maxWidth);

	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position {
			left: 0;
		}
	}

}

uni-image {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.pay-page-content {
	padding: 40rpx 50rpx;
	width: 100%;
}

.creditCard-template {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 32rpx;

	.creditCard-template-title {
		display: flex;
		gap: 16rpx;
		font-weight: 500;
		color: var(--primary-color);
		font-size: var(--font-size-title-pc);
	}

	.img {
		height: var(--font-size-content-pc);
	}
}
</style>
