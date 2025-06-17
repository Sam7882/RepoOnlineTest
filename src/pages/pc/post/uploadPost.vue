<template>
	<layout-pcBase>
		<template #slideSecondNav v-if="isSchedulePost">
			<center-page :page="'schedulePost'" />
		</template>
		<uploadPost-page />
	</layout-pcBase>
</template>

<script setup lang="ts">
// TEMP: PC上傳檔案中介頁
import { onLoad } from '@dcloudio/uni-app'
import CenterPage from '@/pages/pc/creator/center-page.vue'
import UploadPostPage from '@/pages/pc/post/uploadPost-page.vue'

const isSchedulePost = ref<boolean | null>(null)
onLoad((options: any) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	if (options.isSchedulePost) {
		isSchedulePost.value = options.isSchedulePost === 'true'
	}
})
</script>