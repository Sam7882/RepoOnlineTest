<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<messageBoxPage @handleMessage="handleMessage" :page="currentId" />
		</template>
		<template #default>
			<MessagePage :id="currentId" v-if="currentId" />
		</template>
	</layout-pcBase>
</template>

<script setup>
// TEMP: PC-訊息盒中介頁
import { onLoad } from '@dcloudio/uni-app'
import MessageBoxPage from '@/pages/pc/creator/messageBox-page.vue'
import MessagePage from '@/pages/pc/creator/message-page.vue'

// 透過 tab 來進行內容區塊組件的替換
const currentId = ref('')

const handleMessage = (id) => {
	console.log("🚀 ~ switchid ~ id:", id)
	currentId.value = id
}

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	currentId.value = options.id
})
</script>
