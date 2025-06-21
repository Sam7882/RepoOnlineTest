<template>
	<view class="set-menu">
		<c-headerNav :title="$t('creator.notificationSetting')" :openBack="false">
		</c-headerNav>

		<!-- 內容 -->
		<view class="content">
			<form-setMenu-messageForm @submit="formSubmit" />
		</view>
	</view>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定編輯頁
import formSetMenuMessageForm from '@/components/form/form-setMenu-messageForm.vue'
import { onLoad, onShow } from '@dcloudio/uni-app';
import { checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { openNotice } = inject('common')

onShow(() => {
	checkViewportAutoReplace()
})

const formSubmit = () => {
	openNotice({
		title: t('common.success'),
		titleIcon: 'icon-common-confirm',
	})
}
</script>

<style scoped lang="scss">
.set-menu {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);

	// 設定窗口最大寬度
	max-width: var(--setting-page-maxWidth);

	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position {
			left: 0;
		}
	}
}

.content {
	margin-top: 64rpx;
	width: 100%;
	height: 100%;
	padding: 0 50rpx;
	overflow-y: scroll;
}
</style>