<template>
	<view class="set-menu">
		<!-- 內容 -->
		<view class="header">
			<view class="header-title">
				<text>{{ $t('creator.creatorCenter') }}</text>
			</view>
		</view>
		<view class="content">
			<view class="menu-list ">
				<view class="menu-item" @click="handleEdit('beCreator')">
					<text>{{ $t('creator.becomeCreator') }}</text>
					<view class="icon-container">
						<view class="status-container">
							<text>{{ $t('common.notJoin') }}</text>
						</view>
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('verifyCreator')">
					<text>{{ $t('creator.becomeVerifyCreator') }}</text>
					<view class="icon-container">
					</view>
				</view>
				<view class="menu-item" :class="{ 'active': currentPage === 'statistics' }" @click="handleEdit('data')">
					<text>{{ $t('menu.statistics') }}</text>
					<view class="icon-container">
					</view>
				</view>
				<view class="menu-item" :class="{ 'active': currentPage === 'schedulePost' }"
					@click="handleEdit('schedulePost')">
					<text>{{ $t('post.schedulePost') }}</text>
					<view class="icon-container">
					</view>
				</view>
			</view>
		</view>
	</view>

	<pc-applyCreator ref="applyCreatorRef" :type="applyType" />
</template>

<script setup>
// TEMP: PC創作者設定-創作者中心設定頁(成為創作者&認證創作者)
import { onShow } from '@dcloudio/uni-app';
import { toStatistics, toSchedulePost, checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
	page: {
		type: String,
		default: 'center'
	}
})
const currentPage = computed(() => props.page)
const applyCreatorRef = ref()
const applyType = ref('creator')
const openApplyCreator = (type) => {
	applyCreatorRef.value.open()
	applyType.value = type
}

const handleEdit = (index) => {
	console.log("🚀 ~ handleEdit ~ index:", index)
	switch (index) {
		case 'beCreator':
			openApplyCreator('creator')
			break
		case 'verifyCreator':
			openApplyCreator('verifyCreator')
			break
		case 'data':
			toStatistics()
			break
		case 'schedulePost':
			toSchedulePost()
			break
	}
}

const handleCreator = () => {

}

onShow(() => {
	checkViewportAutoReplace()
})
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 300rpx;
	position: relative;
	background: var(--background-color);
	padding: 2.1875rem 2.34375rem;
	box-shadow: 0.0625rem 0 0.25rem rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	border-right: 0.125rem solid var(--text-color-denary);
	overflow-y: scroll;
	padding-left: 96rpx;
	padding-right: 64rpx;
	padding-top: 88rpx;

	@media screen and (min-width: 961px) and (max-width: 1280px) {
		padding-left: 72rpx;
		padding-right: 36rpx;
		padding-top: 80rpx;
	}
}

.header {
	margin-bottom: 80rpx;
}

.header-title {
	font-weight: bold;
	color: var(--text-color-primary);
	font-size: var(--font-size-title-pc-xlarge);
}

.content {
	padding-bottom: var(--footer-height);
}

.menu-list {
	display: flex;
	flex-direction: column;
	gap: 64rpx;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	font-size: var(--font-size-title-pc);
	color: var(--text-color-primary);

	&.active {
		color: var(--primary-color);
	}

	&:hover {
		cursor: pointer;
	}

	.icon-container {
		.icon-right {
			font-size: 28rpx !important;
			color: var(--text-color-gray3) !important;
		}
	}
}

.status-container {
	font-size: 28rpx;
	color: var(--text-color-gray3);
	margin-right: 24rpx;
}
</style>