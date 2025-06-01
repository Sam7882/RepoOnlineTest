<template>
	<view class="set-menu">
		<c-headerNav :title="menuTitle">
		</c-headerNav>

		<!-- 內容 -->
		<view class="content">
			<view class="menu-list ">
				<view class="menu-item" @click="handleEdit('beCreator')">
					<text>{{ $t('creator.becomeCreator') }}</text>
					<view class="icon-container">
						<view class="status-container">
							<text>{{ $t('common.notJoin') }}</text>
						</view>
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('verifyCreator')">
					<text>{{ $t('creator.becomeVerifyCreator') }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('data')">
					<text>{{ $t('menu.statistics') }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('schedule')">
					<text>{{ $t('post.schedulePost') }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
// TEMP: 創作者設定-創作者中心設定頁
import { router, toStatistics, toCreatorApply, toSchedulePost } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { back } = router;

const menuTitle = ref(t('common.setting'))

const handleEdit = (index) => {
	console.log("🚀 ~ handleEdit ~ index:", index)
	switch (index) {
		case 'beCreator':
			toCreatorApply({
				type: 'creator'
			})
			break
		case 'verifyCreator':
			toCreatorApply({
				type: 'verifyCreator'
			})
			break
		case 'data':
			toStatistics()
			break
		case 'schedule':
			toSchedulePost()
			break
	}
}
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 300rpx;
}

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-20%);
	padding-top: 16rpx;
}

.content {
	padding-bottom: var(--footer-height);
}

.menu-item {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 46rpx;
	border-bottom: 1rpx solid var(--text-color-denary);
	font-size: 30rpx;

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