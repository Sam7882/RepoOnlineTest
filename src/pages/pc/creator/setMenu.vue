<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<setMenu-page @switchTab="switchTab" :page="currentPage" />
		</template>
		<template #default>
			<component :is="currentPageComponent" v-if="currentPage" />
		</template>
	</layout-pcBase>
</template>
<script setup>
// TEMP: 創作者設定-帳號設定頁面中介頁
import setMenuPage from '@/pages/pc/creator/setMenu-page.vue'
import setMenuAccountPage from '@/pages/pc/creator/setMenu-account-page.vue'
import setMenuPrivacyPage from '@/pages/pc/creator/setMenu-privacy-page.vue'
import setMenuMessagePage from '@/pages/pc/creator/setMenu-message-page.vue'
import { onLoad } from '@dcloudio/uni-app'

// 透過 tab 來進行內容區塊組件的替換
const currentPage = ref('')
const pageComponent = ref({
	'account': markRaw(setMenuAccountPage),
	'privacy': markRaw(setMenuPrivacyPage),
	'message': markRaw(setMenuMessagePage)
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

const switchTab = (tab) => {
	console.log("🚀 ~ switchTab ~ tab:", tab)
	currentPage.value = tab
}

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	currentPage.value = options.tab
})
</script>