<template>
	<view class="set-menu">
		<c-headerNav :title="$t('creator.accountBind')" :openBack="false">
		</c-headerNav>

		<!-- 內容 -->
		<view class="content">
			<view class="menu-list ">
				<view class="menu-item" @click="handleEdit('phoneBind')">
					<text>{{ $t("creator.phoneNumber") }}</text>
					<view class="icon-container">
						<text>+886*******115</text>
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('password')">
					<text>{{ $t("creator.loginPassword") }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('email')">
					<text>{{ $t("creator.email") }}</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
			</view>
			<!-- 底部按鈕 -->
			<view class="footer-container">
				<view class="delete-account" @click="handleDeleteAccount">
					<text>{{ $t("creator.deleteAccount") }}</text>
				</view>
			</view>
		</view>



	</view>

	<pc-setMenuPopUp ref="setMenuPopUpRef" :type="popUpType" />
</template>

<script setup>
// TEMP: 創作者設定-帳號設定 - 帳號綁定頁
import pcSetMenuPopUp from '@/components/pc/common/pc-setMenuPopUp.vue'
import { onShow } from '@dcloudio/uni-app'
import { checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { openConfirm } = inject('common')

const popUpType = ref('phoneBind')

const setMenuPopUpRef = ref(null)

const handleEdit = (type) => {
	switch (type) {
		case 'phoneBind':
			popUpType.value = 'phoneBind'
			break
		case 'password':
			popUpType.value = 'password'
			break
		case 'email':
			popUpType.value = 'email'
			break
	}
	setMenuPopUpRef.value.open()
}

const handleDeleteAccount = () => {
	openConfirm({
		title: t('creator.deleteAccount'),
		content: t('creator.deleteAccountTip'),
		confirmBtnText: t('common.confirmDelete'),
		cancelBtnText: t('common.notYet'),
		confirmBtnStyle: {
			background: 'var(--favorite-color-secondary)'
		},
		confirm: () => {
			console.log('刪除帳號')
		}
	})
}

// 啟動渲染時，觸發
onShow(() => {
	checkViewportAutoReplace()
})
</script>

<style scoped lang="scss">
.set-menu {
	position: relative;
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
	position: absolute;
	// margin-top: auto;
	bottom: 0;
	left: 50rpx;
	// transform: translateX(-50%);
	padding: 20rpx 40rpx 60rpx;
	display: flex;
	flex-direction: column;
	gap: 30rpx;
	background: var(--background-color-light);

	&:hover {
		cursor: pointer;
	}

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