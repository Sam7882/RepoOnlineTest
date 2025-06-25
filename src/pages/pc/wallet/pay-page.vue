<template>
	<view class="pay-page">
		<c-headerNav :title="$t('wallet.paymentDetails')">
			<template #left>
				<view class="header-nav-left-position header-nav-icon-container" @click="handleBack">
					<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
				</view>
			</template>
		</c-headerNav>
		<view class="pay-page-content">
			<form-payForm @submit="handleSubmit" />
		</view>
	</view>
</template>

<script setup>
// TEMP: 付款詳情頁
import { onShow } from '@dcloudio/uni-app';
import { useInitStore } from '@/stores/useInitDataStore'
import { useI18n } from 'vue-i18n'
import { checkViewportAutoReplace } from '@/utils/routers'
const initStore = useInitStore()
const { checkInitData } = initStore
const { t } = useI18n()

const emit = defineEmits(['switchTab'])

const { openNotice } = inject('common')
/* 確認付款 */
// 確認付款按鈕 送出資料

const handleBack = () => {
	emit('switchTab', 'orderDetail')
}

const handleSubmit = () => {
	openNotice({
		title: t('common.verifySuccess')
	})
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

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-50%);

	&:hover {
		cursor: pointer;
	}
}


uni-image {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.pay-page-content {
	width: 100%;
	height: 100%;
	padding: 0 50rpx;
	overflow-x: hidden;
	overflow-y: auto;
	padding-top: 48rpx;
}
</style>
