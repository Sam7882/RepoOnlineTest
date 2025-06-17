<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<center-page :page="'schedulePost'" />
		</template>
		<template #default>
			<post-Preview-page />
		</template>
	</layout-pcBase>
</template>
<script setup>
// TEMP:發布預覽頁中介頁
import CenterPage from '@/pages/pc/creator/center-page.vue'
import PostPreviewPage from '@/pages/pc/post/post-Preview-page.vue'
</script>