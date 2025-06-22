<template>
  <layout-pcBase>
    <template #slideSecondNav>
      <center-page @switchTab="switchTab" :page="currentPage" />
    </template>
    <template #default>
      <subscription-manage-page />
    </template>

  </layout-pcBase>
</template>

<script setup>
// TEMP: 訂閱方案頁面
import CenterPage from '@/pages/pc/creator/center-page.vue'
import SubscriptionManagePage from '@/pages/pc/creator/subscription-manage-page.vue'
</script>