<template>
	<view class="app-layout">
		<slot />

		<!-- 聯繫客服 -->
		<c-servicePopUp ref="servicePopUp" />
		<auth-login ref="loginPopUp" />
		<auth-register ref="registerPopUp" />
		<auth-verifyPhone ref="verifyPhonePopUp" />
		<c-messagePopUp ref="messagePopUp" />
		<c-noticePopUp ref="noticePopUp" />
		<c-confirmPopUp ref="confirmPopUp" />
		<c-bottomPopUp ref="bottomPopUp" />
		<c-sharePopUp ref="sharePopUp" />

		<play-popImgFullScreen ref="popImgFullScreen" />
	</view>
</template>

<script setup>
// TEMP: PC-基礎版面
/* TODO: 1. 768 RWD 需調整 */
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
const closeMessage = () => {
	console.log("🚀 ~ closeMessage ~ closeMessage :")
	messagePopUp.value.close()
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
const closeNotice = () => {
	console.log("🚀 ~ closeNotice ~ closeNotice :")
	noticePopUp.value.close()
}

// 確認
const confirmPopUp = ref(null)
const openConfirm = (data) => {
	const { title, content, confirmBtnText, cancelBtnText, onConfirm, confirmBtnStyle, cancelBtnStyle } = data
	console.log("🚀 ~ openConfirm ~ openConfirm :")
	confirmPopUp.value.open({
		title,
		content,
		confirmBtnText,
		confirmBtnStyle,
		cancelBtnText,
		cancelBtnStyle,
		onConfirm
	})
}
const closeConfirm = () => {
	console.log("🚀 ~ closeConfirm ~ closeConfirm :")
	confirmPopUp.value.close()
}

// 底部彈窗
const bottomPopUp = ref(null)
const openBottomPopUp = (data) => {
	const { title, content } = data
	console.log("🚀 ~ openBottomPopUp ~ openBottomPopUp :")
	bottomPopUp.value.open({
		title,
		content,
	})
}
const closeBottomPopUp = () => {
	console.log("🚀 ~ closeBottomPopUp ~ closeBottomPopUp :")
	bottomPopUp.value.close()
}

// 分享

const sharePopUp = ref(null)
const openSharePopUp = () => {
	console.log("🚀 ~ openSharePopUp ~ openSharePopUp :")
	sharePopUp.value.open()
}
const closeSharePopUp = () => {
	console.log("🚀 ~ closeSharePopUp ~ closeSharePopUp :")
	sharePopUp.value.close()
}


// 圖片全螢幕
const popImgFullScreen = ref(null)
const openPlayPopImgFullScreen = (data) => {
	console.log("🚀 ~ openPlayPopImgFullScreen ~ openPlayPopImgFullScreen :")
	if (popImgFullScreen.value && typeof popImgFullScreen.value.open === 'function') {
		popImgFullScreen.value.open(data)
	} else {
		console.error('playPopImgFullScreen ref 未正確初始化或 open 方法不存在')
	}
}
const closePopImgFullScreen = () => {
	console.log("🚀 ~ closePopImgFullScreen ~ closePopImgFullScreen :")
	popImgFullScreen.value.close()
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
	closeMessage,
	openNotice,
	closeNotice,
	openConfirm,
	closeConfirm,
	openBottomPopUp,
	closeBottomPopUp,
	openSharePopUp,
	closeSharePopUp
})

provide('play', {
	openPlayPopImgFullScreen,
	closePopImgFullScreen
})
</script>

<style lang="scss" scoped>
.app-layout {
	position: relative;
	background-color: var(--background-color-light);
	min-height: 100dvh;
	// display: flex;
	// height: 100vh;
	/* 高度撐滿視窗 */
	// overflow: hidden;
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