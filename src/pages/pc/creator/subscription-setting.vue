<template>
	<layout-pcBase>
		<template #slideSecondNav>
			<center-page :page="'subscriptionSetting'" />
		</template>
		<template #default>
			<subscriptionSetting-page />
		</template>
	</layout-pcBase>
</template>

<script setup lang="ts">
// TEMP: 設定訂閱項目頁
import CenterPage from '@/pages/pc/creator/center-page.vue'
import SubscriptionSettingPage from '@/pages/pc/creator/subscription-setting-page.vue'
</script>