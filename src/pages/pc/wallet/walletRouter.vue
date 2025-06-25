<template>
	<component :is="currentPageComponent" v-if="currentPage" @switchTab="switchTab" />
</template>

<script setup>
// TEMP: PC 錢包管理 路由頁
import indexPage from '@/pages/pc/wallet/index-page.vue'
import creditCardSavePage from '@/pages/pc/wallet/creditCardSave-page.vue'
import creditCardSelectPage from '@/pages/pc/wallet/creditCardSelect-page.vue'
import creditCardSettingPage from '@/pages/pc/wallet/creditCardSetting-page.vue'
import orderDetailPage from '@/pages/pc/wallet/orderDetail-page.vue'
import payPage from '@/pages/pc/wallet/pay-page.vue'
import withdrawPage from '@/pages/pc/wallet/withdraw-page.vue'
import withdrawApplyPage from '@/pages/pc/wallet/withdrawApply-page.vue'
import withdrawDetailPage from '@/pages/pc/wallet/withdrawDetail-page.vue'
import withdrawInPage from '@/pages/pc/wallet/withdrawIn-page.vue'
import withdrawRecordPage from '@/pages/pc/wallet/withdrawRecord-page.vue'



import { onLoad } from '@dcloudio/uni-app'

const props = defineProps({
	tab: {
		type: String,
		default: 'index'
	},
	// 初始化頁面到錢包管理
	initTab: {
		type: Boolean,
		default: false
	}
})

const initTab = computed(() => {
	return props.initTab
})

// 透過 tab 來進行內容區塊組件的替換
const currentPage = ref('')
const pageComponent = ref({
	// 錢包管理
	'index': markRaw(indexPage),
	// 信用卡管理
	'creditCardSave': markRaw(creditCardSavePage),
	// 信用卡選擇
	'creditCardSelect': markRaw(creditCardSelectPage),
	// 信用卡設定
	'creditCardSetting': markRaw(creditCardSettingPage),
	// 訂單明細
	'orderDetail': markRaw(orderDetailPage),
	// 付款詳情
	'pay': markRaw(payPage),
	// 提款
	'withdraw': markRaw(withdrawPage),
	// 提款申請
	'withdrawApply': markRaw(withdrawApplyPage),
	// 提款明細
	'withdrawDetail': markRaw(withdrawDetailPage),
	// 我的進帳
	'withdrawIn': markRaw(withdrawInPage),
	// 提款紀錄
	'withdrawRecord': markRaw(withdrawRecordPage)
})

const currentPageComponent = computed(() => {
	if (!currentPage.value) {
		return pageComponent.value['walletManage']
	}
	const current = pageComponent.value[currentPage.value]
	return current
})

const switchTab = (tab) => {
	console.log("🚀 ~ switchTab ~ tab:", tab)
	currentPage.value = tab
}

// 初始化頁面到錢包管理
watch(() => initTab.value, () => {
	console.log("🚀 ~ watch ~ initTab:", initTab.value)
	if (initTab.value) {
		currentPage.value = 'index'
	}
}, { immediate: true })

onLoad((options) => {
	// 頁面載入時，根據query參數來決定頁面組件
	currentPage.value = initTab.value ? 'index' : options.withdrawTab || 'index'
})
</script>