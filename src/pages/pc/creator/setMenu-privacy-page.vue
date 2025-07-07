<template>
	<view class="set-menu">
		<c-headerNav :title="$t('creator.accountBind')" :openBack="false">
		</c-headerNav>

		<!-- 內容 -->
		<view class="content">
			<view class="menu-list ">
				<view class="menu-item" @click="openBlockadeEditPoPUp">
					<text>{{ $t("creator.blocked") }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('favoritePrivacy')">
					<text>{{ $t("creator.myFavorites") }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
			</view>
		</view>
	</view>

	<pc-blockadeEditPopUp ref="blockadeEditPoPUpRef" />
	<pc-setMenuPopUp ref="setMenuPopUpRef" :type="popUpType" />

</template>

<script setup>
// TEMP: 創作者設定-帳號設定 - 隱私設定頁
import { onShow } from '@dcloudio/uni-app'
import { router, toCreatorSetMenuEdit, toCreatorBlockadeEdit, checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { back } = router;
const blockadeEditPoPUpRef = ref()

const openBlockadeEditPoPUp = () => {
	blockadeEditPoPUpRef.value.open()
}

const popUpType = ref('favoritePrivacy')
const setMenuPopUpRef = ref()
const handleEdit = (type) => {
	switch (type) {
		case 'favoritePrivacy':
			popUpType.value = 'favoritePrivacy'
			break
	}
	setMenuPopUpRef.value.open()
}

onShow(() => {
	checkViewportAutoReplace()
})



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

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-20%);
	padding-top: 16rpx;
}

.content {
	width: 100%;
	height: 100%;
	padding: 0 50rpx;
	overflow-y: scroll;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 46rpx;
	border-bottom: 1rpx solid var(--text-color-denary);
	font-size: var(--font-size-title-pc-small);

	&:hover {
		cursor: pointer;
	}

	.icon-container {
		.icon-right {
			margin-left: 16rpx;
			font-size: var(--font-size-content-pc-large) !important;
			color: var(--text-color-gray3) !important;
		}
	}
}

// 底部按鈕
.footer-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 40rpx 60rpx;
	display: flex;
	flex-direction: column;
	gap: 30rpx;
	background: var(--background-color-light);

	.delete-account {
		font-size: var(--font-size-content-pc-large);
		color: var(--tertiary-color);
	}

	.btn {
		padding: 24rpx 0;
		font-size: var(--font-size-title-pc-small);
	}
}
</style>