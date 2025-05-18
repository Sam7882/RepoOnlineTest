// TEMP: 路由工具

// --- 將 params 轉成 query string
function queryStringify(params: Record<string, string | number | boolean>) {
	const query = Object.entries(params)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join('&');
	return query ? `?${query}` : '';
}

// 路由工具類
export const router = {
	// 強制重啟到入口頁面
	reLaunchLoading() {
		uni.reLaunch({
			url: '/pages/launch/loading'
		})
	},
	// 強制重啟到指定頁面
	reLaunch(url: string) {
		uni.reLaunch({
			url: url
		})
	},

	// 跳轉到指定頁
	toPage(url: string, params = {}) {
		safeSwitchTab(url)
		uni.navigateTo({
			url: url + queryStringify(params)
		})
	},

	// 返回上一頁 
	// delta 返回默認1
	back(delta = 1) {
		uni.navigateBack({
			delta
		})
	}
}
export function safeSwitchTab(targetUrl: string) {
	// getCurrentPages 獲取當前頁面 返回陣列資料，pages[0] 為載入面
	const pages = getCurrentPages();
	// 當前頁面
	const currentPage = pages[pages.length - 1];
	if ('/' + currentPage.route === targetUrl) {
		return;
	}
}

// TEMP: 路由工具 - 指定頁面，可帶入query參數
/* 入口登入註冊 */
// 跳轉到登入頁
export const toLogin = (params = {}) => {
	safeSwitchTab('/pages/auth/login')
	uni.navigateTo({
		url: '/pages/auth/login' + queryStringify(params)
	})
}
// 跳轉到註冊頁
export const toRegister = (params = {}) => {
	safeSwitchTab('/pages/auth/register')
	uni.navigateTo({
		url: '/pages/auth/register' + queryStringify(params)
	})
}
// 跳轉到手機驗證頁
export const toPhoneVerify = (params = {}) => {
	safeSwitchTab('/pages/auth/verify-phone')
	uni.navigateTo({
		url: '/pages/auth/verify-phone' + queryStringify(params)
	})
}

/* 影音頁 */
// 跳轉到影音頁
export const toPlayIndex = (params = {}) => {
	safeSwitchTab('/pages/play/index')
	uni.navigateTo({
		url: '/pages/play/index' + queryStringify(params)
	})
}
// 跳轉到影音頁
export const toPlayArticleGallery = (params = {}) => {
	safeSwitchTab('/pages/play/article-gallery')
	uni.navigateTo({
		url: '/pages/play/article-gallery' + queryStringify(params)
	})
}

// 跳轉到搜尋主頁
export const toSearchHome = (params = {}) => {
	safeSwitchTab('/pages/search/index')
	uni.navigateTo({
		url: '/pages/search/index' + queryStringify(params)
	})
}
// 跳轉到搜尋視頻頁
export const toSearchVideo = (params = {}) => {
	safeSwitchTab('/pages/search/searchVideo')
	uni.navigateTo({
		url: '/pages/search/searchVideo' + queryStringify(params)
	})
}
// 跳轉到搜尋主題頁
export const toSearchTheme = (params = {}) => {
	safeSwitchTab('/pages/search/searchTheme')
	uni.navigateTo({
		url: '/pages/search/searchTheme' + queryStringify(params)
	})
}

/* 發佈 */
// 跳轉到發佈頁
export const toPostIndex = (params = {}) => {
	safeSwitchTab('/pages/post/index')
	uni.navigateTo({
		url: '/pages/post/index' + queryStringify(params)
	})
}
// 跳轉到發佈頁預覽
export const toPostPreview = (params = {}) => {
	safeSwitchTab('/pages/post/media-preview')
	uni.navigateTo({
		url: '/pages/post/media-preview' + queryStringify(params)
	})
}
// 跳轉到標記頁面
export const toTagPeople = (params = {}) => {
	safeSwitchTab('/pages/post/tagPeople')
	uni.navigateTo({
		url: '/pages/post/tagPeople' + queryStringify(params)
	})
}

/* 創作者 */
// 跳轉到創作者首頁
export const toCreatorHome = (params = {}) => {
	safeSwitchTab('/pages/creator/home')
	uni.navigateTo({
		url: '/pages/creator/home' + queryStringify(params)
	})
}
// 跳轉到訂閱頁設定
export const toSubscriptionSetting = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription-setting')
	uni.navigateTo({
		url: '/pages/creator/subscription-setting' + queryStringify(params)
	})
}
// 跳轉到訂閱頁編輯
export const toSubscriptionEdit = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription-edit')
	uni.navigateTo({
		url: '/pages/creator/subscription-edit' + queryStringify(params)
	})
}
// 跳轉到個人數據
export const toStatistics = (params = {}) => {
	safeSwitchTab('/pages/creator/statistics')
	uni.navigateTo({
		url: '/pages/creator/statistics' + queryStringify(params)
	})
}
// 跳轉到我的收藏
export const toFavorites = (params = {}) => {
	safeSwitchTab('/pages/creator/favorites')
	uni.navigateTo({
		url: '/pages/creator/favorites' + queryStringify(params)
	})
}
// 跳轉到我的關注對象
export const toFollowing = (params = {}) => {
	safeSwitchTab('/pages/creator/following')
	uni.navigateTo({
		url: '/pages/creator/following' + queryStringify(params)
	})
}
// 跳轉到訂閱會員頁
export const toSubscription = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription')
	uni.navigateTo({
		url: '/pages/creator/subscription' + queryStringify(params)
	})
}


// 跳轉到信箱
export const toMessage = (params = {}) => {
	safeSwitchTab('/pages/creator/message')
	uni.navigateTo({
		url: '/pages/creator/message' + queryStringify(params)
	})
}

/* WALLET */
// 跳轉到錢包
export const toWallet = (params = {}) => {
	safeSwitchTab('/pages/wallet/index')
	uni.navigateTo({
		url: '/pages/wallet/index' + queryStringify(params)
	})
}
export const toPay = (params = {}) => {
	safeSwitchTab('/pages/wallet/pay')
	uni.navigateTo({
		url: '/pages/wallet/pay' + queryStringify(params)
	})
}
export const toCreditCardSelect = (params = {}) => {
	safeSwitchTab('/pages/wallet/creditCardSelect')
	uni.navigateTo({
		url: '/pages/wallet/creditCardSelect' + queryStringify(params)
	})
}
export const toCreditCardSetting = (params = {}) => {
	safeSwitchTab('/pages/wallet/creditCardSetting')
	uni.navigateTo({
		url: '/pages/wallet/creditCardSetting' + queryStringify(params)
	})
}
export const toCreditCardSave = (params = {}) => {
	safeSwitchTab('/pages/wallet/creditCardSave')
	uni.navigateTo({
		url: '/pages/wallet/creditCardSave' + queryStringify(params)
	})
}