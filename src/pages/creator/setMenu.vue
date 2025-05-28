<template>
	<view class="set-menu">
		<c-headerNav :title="menuTitle">
			<template #left>
				<view class="header-nav-left-position header-nav-icon-container" @click="prevMenu">
					<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
				</view>
			</template>
		</c-headerNav>

		<!-- 內容 -->
		<view class="content">
			<!-- 第一層選單 -->
			<view class="menu-list " v-if="menuIndex === '1'">
				<view class="menu-item" @click="nextMenu('1-1')">
					<text>帳號管理</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="nextMenu('1-2')">
					<text>隱私設定</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('message')">
					<text>消息設定</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
			</view>
			<!-- 第二層選單 - 帳號管理 -->
			<view class="menu-list " v-if="menuIndex === '1-1'">
				<view class="menu-item" @click="handleEdit('phone')">
					<text>手機號碼</text>
					<view class="icon-container">
						<text>+886*******115</text>
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('password')">
					<text>登入密碼</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('email')">
					<text>電子信箱</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
			</view>
			<!-- 第二層選單 - 隱私設定 -->
			<view class="menu-list " v-if="menuIndex === '1-2'">
				<view class="menu-item" @click="handleEdit('blockade')">
					<text>已封鎖</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
				<view class="menu-item" @click="handleEdit('favorite')">
					<text>我的收藏</text>
					<view class="icon-container">
						<uni-icons class="icon-right" type="right" size="16" color="#999" />
					</view>
				</view>
			</view>
		</view>

		<!-- 底部按鈕 -->
		<view class="footer-container">
			<view class="delete-account" v-if="menuIndex === '1-1'">
				<text>刪除帳號</text>
			</view>
			<view class="btn-container">
				<button type="button" class="btn">
					切換帳號
				</button>
			</view>
			<view class="btn-container">
				<button type="button" class="btn">
					登出
				</button>
			</view>
		</view>

	</view>
</template>

<script setup>
// TEMP: 創作者設定-選單頁面
import { router, toCreatorSetMenuEdit, toCreatorBlockadeEdit } from '@/utils/routers';
const { back } = router;

const menuTitle = ref('設定')
const menuIndex = ref('1')
const nextMenu = (index) => {
	menuIndex.value = index
	switch (index) {
		case '1-1':
			menuTitle.value = '帳號管理'
			break
		case '1-2':
			menuTitle.value = '隱私設定'
	}
}
const prevMenu = () => {
	console.log("🚀 ~ prevMenu ~ prevMenu:", prevMenu)
	if (menuIndex.value === '1') {
		back()
		return
	}
	menuIndex.value = '1'
	menuTitle.value = '設定'
}
const handleEdit = (index) => {
	console.log("🚀 ~ handleEdit ~ index:", index)
	switch (index) {
		case 'phone':
			toCreatorSetMenuEdit({
				type: 'phone'
			})
			break
		case 'password':
			toCreatorSetMenuEdit({
				type: 'password'
			})
			break
		case 'email':
			toCreatorSetMenuEdit({
				type: 'email'
			})
			break
		case 'blockade':
			toCreatorBlockadeEdit()
			break
		case 'favorite':
			toCreatorSetMenuEdit({
				type: 'favorite'
			})
			break
		case 'message':
			toCreatorSetMenuEdit({
				type: 'message'
			})
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
		font-size: 28rpx;
		color: var(--tertiary-color);
	}

	.btn {
		padding: 24rpx 0;
		font-size: 30rpx;
	}
}
</style>