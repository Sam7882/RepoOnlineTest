<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<setMenu-page @switchTab="switchTab" :page="currentPage" />
		</template>
		<template #default>
			<component :is="currentPageComponent" v-if="currentPage && currentPage == 'walletManage'" :tab="currentPage"
				:initTab="initTab" />
			<component :is="currentPageComponent" v-else-if="currentPage" />
		</template>
	</layout-pcBase>
</template>
<script setup>
// TEMP: 創作者設定-帳號設定頁面中介頁
import setMenuPage from '@/pages/pc/creator/setMenu-page.vue'
import setMenuAccountPage from '@/pages/pc/creator/setMenu-account-page.vue'
import setMenuPrivacyPage from '@/pages/pc/creator/setMenu-privacy-page.vue'
import setMenuMessagePage from '@/pages/pc/creator/setMenu-message-page.vue'
import walletRouter from '@/pages/pc/wallet/walletRouter.vue'
import helperPage from '@/pages/pc/helper/index-page.vue'
import { onLoad } from '@dcloudio/uni-app'

// 透過 tab 來進行內容區塊組件的替換
const currentPage = ref('')
const pageComponent = ref({
	'account': markRaw(setMenuAccountPage),
	'privacy': markRaw(setMenuPrivacyPage),
	'message': markRaw(setMenuMessagePage),
	'walletManage': markRaw(walletRouter),
	'helper': markRaw(helperPage)
})
const currentPageComponent = computed(() => {
	if (!currentPage.value) {
		return ''
	}
	console.log("🚀 ~ currentPage:", currentPage)
	const current = pageComponent.value[currentPage.value]
	console.log("🚀 ~ currentPageComponent ~ current:", current)
	return current
})

const initTab = ref(false)

const switchTab = (tab) => {
	console.log("🚀 ~ switchTab ~ tab:", tab)
	currentPage.value = tab

	// 如果切換到錢包管理，則初始化頁面到錢包管理
	if (tab == 'walletManage') {
		initTab.value = true
		setTimeout(() => {
			initTab.value = false
		}, 100)
	}
}

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	currentPage.value = options.tab
})

provide('setMenu', {
	switchTab
})
</script>