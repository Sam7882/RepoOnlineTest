<template>
	<view class="pc-layout">
		<!-- 左側多欄位導覽區 -->
		<pc-SlideNav />

		<!-- 右側主畫面 -->
		<view class="main-area">
			<!-- 頂部導航列 -->
			<pc-HeaderNav class="header-area" />
			<!-- 內容區域 -->
			<view class="content-area">
				<slot />
			</view>
		</view>

		<!-- 懸浮按鈕 -->
		<view class="icon-container floating-button" @click="contentScrollTop">
			<uni-icons class="icons" type="up" size="24" color="var(--text-color-primary)" />
		</view>

		<!-- 聯繫客服 -->
		<c-servicePopUp ref="servicePopUp" />
		<auth-login ref="loginPopUp" />
		<auth-register ref="registerPopUp" />
		<auth-verifyPhone ref="verifyPhonePopUp" />
		<c-messagePopUp ref="messagePopUp" />
		<c-noticePopUp ref="noticePopUp" />
		<c-confirmPopUp ref="confirmPopUp" />

	</view>
</template>

<script setup>
// TEMP: PC-基礎版面
/* 
	layout-pcBase 版面 提供方法給子層使用
		auth :
			1. openLogin, closeLogin : 登入
			2. openRegister, closeRegister : 註冊
			3. openVerifyPhone, closeVerifyPhone : 驗證手機
		common :
			1. openService : 聯繫客服
			2. openMessage : 訊息
			3. openNotice : 通知
*/
// content 滑動頂部
const contentScrollTop = () => {
	const content = document.querySelector('.content-area');
	if (content) {
		content.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}


// 聯繫客服
const servicePopUp = ref(null)
const openService = () => {
	console.log("🚀 ~ openService ~ openService :")
	servicePopUp.value.open()
}

// 登入

const loginPopUp = ref(null)
const openLogin = () => {
	console.log("🚀 ~ openLogin ~ openLogin :")
	loginPopUp.value.open()
}
const closeLogin = () => {
	console.log("🚀 ~ closeLogin ~ closeLogin :")
	loginPopUp.value.close()
}

// 註冊
const registerPopUp = ref(null)
const openRegister = () => {
	console.log("🚀 ~ openRegister ~ openRegister :")
	registerPopUp.value.open()
}
const closeRegister = () => {
	console.log("🚀 ~ closeRegister ~ closeRegister :")
	registerPopUp.value.close()
}

// 驗證手機
const verifyPhonePopUp = ref(null)
const openVerifyPhone = () => {
	console.log("🚀 ~ openVerifyPhone ~ openVerifyPhone :")
	verifyPhonePopUp.value.open()
}
const closeVerifyPhone = () => {
	console.log("🚀 ~ closeVerifyPhone ~ closeVerifyPhone :")
	verifyPhonePopUp.value.close()
}

const handleVerify = () => {
	console.log("🚀 ~ handleVerify ~ handleVerify :")
}

// 訊息
const messagePopUp = ref(null)
const openMessage = (data) => {
	const { title, content, confirmBtnText, cancelBtnText, onConfirm } = data
	console.log("🚀 ~ openMessage ~ openMessage :")
	messagePopUp.value.open({
		title,
		content,
		confirmBtnText,
		cancelBtnText,
		onConfirm
	})
}

// 通知
const noticePopUp = ref(null)
const openNotice = (data) => {
	const { title, content, setTimeOut, titleIcon } = data
	noticePopUp.value.open({
		title,
		content,
		setTimeOut,
		titleIcon
	})
}

// 確認
const confirmPopUp = ref(null)
const openConfirm = (data) => {
	const { title, content, confirmBtnText, cancelBtnText, onConfirm } = data
	console.log("🚀 ~ openConfirm ~ openConfirm :")
	confirmPopUp.value.open({
		title,
		content,
		confirmBtnText,
		cancelBtnText,
		onConfirm
	})
}

// 使用 provide 提供方法
provide('auth', {
	openLogin,
	closeLogin,
	openRegister,
	closeRegister,
	openVerifyPhone,
	closeVerifyPhone
})
provide('common', {
	openService,
	openMessage,
	openNotice,
	openConfirm
})
</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.pc-layout {
	position: relative;
	display: flex;
	height: 100vh;
	/* 高度撐滿視窗 */
	overflow: hidden;
}

.main-area {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.header-area,
.content-area {
	padding: 0 var(--main-area-padding);
	padding-bottom: 96rpx;
}

.content-area {
	flex: 1;
	overflow-y: auto;
	background-color: #fff;

}

.floating-button {
	position: fixed;
	bottom: 5%;
	right: 50px;
	z-index: 10;
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background-color: var(--text-color-septenary);

	@media screen and (min-width: 1280px) {
		width: 90rpx;
		height: 90rpx;
	}


	&:hover {
		cursor: pointer;
	}

	&>.icons {
		color: var(--text-color-secondary) !important;
		font-size: 40rpx !important;

		@media screen and (min-width: 1280px) {
			font-size: 48rpx;
		}
	}
}
</style>