<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<center-page @switchTab="switchTab" :page="currentPage" />
		</template>
		<template #default>
			<component :is="currentPageComponent" v-if="currentPage" />
		</template>
	</layout-pcBase>
</template>

<script setup>
// TEMP: 創作者設定-創作者中心設定頁中介頁
import CenterPage from '@/pages/pc/creator/center-page.vue'
import StatisticsPage from '@/pages/pc/creator/statistics-page.vue'
import SchedulePostPage from '@/pages/pc/post/schedulePost-page.vue'
import SubscriptionManagePage from '@/pages/pc/creator/subscription-manage-page.vue'
import { onLoad } from '@dcloudio/uni-app'

// 透過 tab 來進行內容區塊組件的替換
const currentPage = ref('')
const pageComponent = ref({
	'statistics': markRaw(StatisticsPage),
	'schedulePost': markRaw(SchedulePostPage),
	'subscriptionManage': markRaw(SubscriptionManagePage),
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