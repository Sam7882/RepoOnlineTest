<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<center-page :page="'schedulePost'" />
		</template>
		<template #default>
			<schedulePost-page />
		</template>
	</layout-pcBase>
</template>
<script setup>
// TEMP: 發布頁-排定發布
import CenterPage from '@/pages/pc/creator/center-page.vue'
import SchedulePostPage from '@/pages/pc/post/schedulePost-page.vue'
</script>