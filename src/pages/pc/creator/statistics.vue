<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<center-page :page="'statistics'" />
		</template>
		<template #default>
			<statistics-page />
		</template>
	</layout-pcBase>
</template>

<script setup>
// TEMP: 個人數據中介頁
import CenterPage from '@/pages/pc/creator/center-page.vue'
import StatisticsPage from '@/pages/pc/creator/statistics-page.vue'
</script>