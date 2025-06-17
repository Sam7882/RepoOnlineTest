<template>
	<layout-pcBase>
		<template #slideSecondNav v-if="isSchedulePost">
			<center-page :page="'schedulePost'" />
		</template>
		<index-page />
	</layout-pcBase>
</template>

<script setup lang="ts">
// TEMP: PC發佈頁中介頁
import { onLoad } from '@dcloudio/uni-app'
import CenterPage from '@/pages/pc/creator/center-page.vue'
import IndexPage from '@/pages/pc/post/index-page.vue'

const isSchedulePost = ref(false)
onLoad((options: any) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	if (options.isSchedulePost) {
		isSchedulePost.value = options.isSchedulePost === 'true'
	}
})
</script>