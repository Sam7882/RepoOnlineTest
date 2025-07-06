// TEMP: 路由工具
import { pages } from '@/pages.json'

// 預先建立 path Set，提升查詢效率（全域變數，只建立一次）
const _pages = new Set(pages.map(page => page.path))

// 檢查 url 是否存在於 pages.json
export function checkUrlInPages(url: string): boolean {
	if (!url || typeof url !== 'string') {
		return false
	}
	return _pages.has(url)
}

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

// 檢查視窗大小，比對當前頁面是否正確，並跳轉到對應版面
// 全域 flag: 是否正在跳轉中
let isSwitchingLayout = false;

export function checkViewporReplace() {
	// 若正在跳轉 → 不做
	if (isSwitchingLayout) {
		console.log('🚫 正在切版型中，忽略此次呼叫');
		return;
	}

	const windowWidth = uni.getSystemInfoSync().windowWidth;
	const basePath = windowWidth <= 960 ? '/pages' : '/pages/pc';

	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	const currentRoute = '/' + currentPage.route;

	const actualPath = currentRoute.replace(/^\/pages(\/pc)?\//, '');
	const params = (currentPage as any).$page?.options || {};

	const isCurrentlyPc = currentRoute.includes('/pages/pc/');

	const currentBasePath = isCurrentlyPc ? '/pages/pc' : '/pages';
	const targetBasePath = basePath;

	if (currentBasePath !== targetBasePath) {
		isSwitchingLayout = true; // 設置 flag → 保證不重複跳轉
		// 用 nextTick 確保 DOM patch 完成後跳轉
		Promise.resolve().then(() => {
			setTimeout(() => {
				uni.redirectTo({
					url: `${targetBasePath}/${actualPath}` + queryStringify(params),
					success: () => {
						console.log('版面切換成功');
						// 500ms 內不再允許重跳
						setTimeout(() => {
							isSwitchingLayout = false;
						}, 500);
					},
					fail: (err) => {
						console.error('版面切換失敗:', err);
						isSwitchingLayout = false; // 錯誤時釋放 flag
					}
				});
			}, 50); // 50ms 足夠避開 patch timing 問題
		});
	}
}


// 檢查視窗大小，跳轉到對應版面
export function checkViewport(url: string, params = {}, onlyPc = false) {
	console.log("🚀 ~ 檢查窗口跳轉頁 ~ url:", url)

	// 取得螢幕寬度
	const windowWidth = uni.getSystemInfoSync().windowWidth;
	// 根據寬度決定跳轉路徑
	const basePath = windowWidth <= 960 ? '/pages' : '/pages/pc';

	let urlPath = ''

	if (onlyPc) {
		urlPath = `/pages/pc${url}` + queryStringify(params)
	}
	else {
		urlPath = `${basePath}${url}` + queryStringify(params)
	}

	// 加入除錯資訊，追蹤呼叫來源
	console.log(`📍 checkViewport 呼叫來源:`, new Error().stack?.split('\n')[2]?.trim())
	console.log(`🎯 準備跳轉到: ${urlPath}`)

	uni.navigateTo({
		url: urlPath
	})
}

// 檢查視窗大小，並自動將當前頁面跳轉到正確版面，並帶入 query 參數
/* 
變數名稱	範例值
windowWidth	375
basePath	'/pages/'
currentRoute	'/pages/pc/auth/login'
options	{ type: 'login', from: 'home' }
query	'?type=login&from=home'
expectPath	'/pages/auth/login'
*/


// 同樣使用全域 flag
let isAutoSwitchLayout = false;

export function checkViewportAutoReplace() {
	// 若正在跳轉 → 不做
	if (isAutoSwitchLayout) {
		console.log('🚫 正在切版型中（onShow），忽略此次呼叫');
		return;
	}

	const windowWidth = uni.getSystemInfoSync().windowWidth;
	const basePath = windowWidth <= 960 ? '/pages/' : '/pages/pc/';

	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	const currentRoute = '/' + currentPage.route; // 例如 /pages/auth/login 或 /pages/pc/auth/login

	const options = (currentPage as any).$page?.options || {};
	const query = Object.keys(options).length > 0
		? '?' + Object.entries(options).map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`).join('&')
		: '';

	const expectPath = basePath + currentRoute.replace(/^\/pages(\/pc)?\//, '');

	if (currentRoute !== expectPath) {
		isAutoSwitchLayout = true;

		Promise.resolve().then(() => {
			setTimeout(() => {
				uni.redirectTo({
					url: expectPath + query,
					success: () => {
						console.log('版面切換成功（onShow觸發）');
						setTimeout(() => {
							isAutoSwitchLayout = false;
						}, 500);
					},
					fail: (err) => {
						console.error('版面切換失敗（onShow觸發）:', err);
						isAutoSwitchLayout = false;
					}
				});
			}, 50);
		});
	}
}

// TEMP: 路由工具 - 指定頁面，可帶入query參數
/* 入口登入註冊 */
// 跳轉到登入頁
export const toLogin = (params = {}) => {
	safeSwitchTab('/pages/auth/login')
	checkViewport('/auth/login', params)
}
// 跳轉到註冊頁
export const toRegister = (params = {}) => {
	safeSwitchTab('/pages/auth/register')
	checkViewport('/auth/register', params)
}
// 跳轉到手機驗證頁
export const toPhoneVerify = (params = {}) => {
	safeSwitchTab('/pages/auth/verify-phone')
	checkViewport('/auth/verify-phone', params)
}

/* 影音頁 */
// 跳轉到影音頁
export const toPlayIndex = (params = {}) => {
	safeSwitchTab('/pages/play/index')
	checkViewport('/play/index', params)
}
// 跳轉到影音頁
export const toPlayArticleGallery = (params = {}) => {
	safeSwitchTab('/pages/play/article-gallery')
	checkViewport('/play/article-gallery', params)
}

// 跳轉到搜尋主頁
export const toSearchHome = (params = {}) => {
	safeSwitchTab('/pages/search/index')
	checkViewport('/search/index', params)
}
// 跳轉到搜尋結果
export const toSearchResults = (params = {}) => {
	safeSwitchTab('/pages/search/results')
	checkViewport('/search/results', params)
}
// 跳轉到搜尋視頻頁
export const toSearchVideo = (params = {}) => {
	safeSwitchTab('/pages/search/searchVideo')
	checkViewport('/search/searchVideo', params)
}
// 跳轉到搜尋主題頁
export const toSearchTheme = (params = {}) => {
	safeSwitchTab('/pages/search/searchTheme')
	checkViewport('/search/searchTheme', params)
}

/* 發佈 */
// 跳轉到發佈頁
export const toPostIndex = (params = {}) => {
	safeSwitchTab('/pages/post/index')
	checkViewport('/post/index', params)
}
export const toPostUpload = (params = {}) => {
	safeSwitchTab('/pages/post/uploadPost')
	checkViewport('/post/uploadPost', params, true)
}
// 跳轉到發佈頁預覽2
export const toPostPreview = (params = {}) => {
	safeSwitchTab('/pages/post/post-Preview')
	checkViewport('/post/post-Preview', params)
}
// 跳轉到標記頁面
export const toTagPeople = (params = {}) => {
	safeSwitchTab('/pages/post/tagPeople')
	checkViewport('/post/tagPeople', params)
}
// 跳轉到限時動態
export const toShortStory = (params = {}) => {
	safeSwitchTab('/pages/post/shortStory')
	checkViewport('/post/shortStory', params)
}
// 跳轉到限時動態
export const toSchedulePost = (params = {}) => {
	safeSwitchTab('/pages/post/schedulePost')
	checkViewport('/post/schedulePost', params)
}
// 跳轉到草稿箱
export const toDraftBox = (params = {}) => {
	safeSwitchTab('/pages/post/draftBox')
	checkViewport('/post/draftBox', params)
}

/* 創作者 */
// 跳轉到創作者首頁
export const toCreatorHome = (params = {}) => {
	safeSwitchTab('/pages/creator/home')
	checkViewport('/creator/home', params)
}
// 跳轉到創作者訊息頁
export const toCreatorMessage = (params = {}) => {
	safeSwitchTab('/pages/creator/message')
	checkViewport('/creator/message', params)
}
// 跳轉到訂閱頁設定
export const toSubscriptionSetting = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription-setting')
	checkViewport('/creator/subscription-setting', params)
}
// 跳轉到訂閱頁編輯
export const toSubscriptionEdit = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription-edit')
	checkViewport('/creator/subscription-edit', params)
}
// 跳轉到訂閱頁管理
export const toSubscriptionManage = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription-manage')
	checkViewport('/creator/subscription-manage', params)
}
// 跳轉到個人數據
export const toStatistics = (params = {}) => {
	safeSwitchTab('/pages/creator/statistics')
	checkViewport('/creator/statistics', params)
}
// 跳轉到我的收藏
export const toFavorites = (params = {}) => {
	safeSwitchTab('/pages/creator/favorites')
	checkViewport('/creator/favorites', params)
}
// 跳轉到我的關注對象
export const toFollowing = (params = {}) => {
	safeSwitchTab('/pages/creator/following')
	checkViewport('/creator/following', params)
}
// 跳轉到排行榜
export const toRank = (params = {}) => {
	safeSwitchTab('/pages/creator/rank')
	checkViewport('/creator/rank', params)
}
// 跳轉到標籤排行榜
export const toTagRank = (params = {}) => {
	safeSwitchTab('/pages/creator/tagRank')
	checkViewport('/creator/tagRank', params)
}
// 跳轉到訂閱會員頁
export const toSubscription = (params = {}) => {
	safeSwitchTab('/pages/creator/subscription')
	checkViewport('/creator/subscription', params)
}
// 跳轉到創作者編輯頁
export const toCreatorEdit = (params = {}) => {
	safeSwitchTab('/pages/creator/profile-edit')
	checkViewport('/creator/profile-edit', params)
}
// 跳轉到創作者選擇媒體頁作品
export const toCreatorSelectMedia = (params = {}) => {
	safeSwitchTab('/pages/creator/selectMedia')
	checkViewport('/creator/selectMedia', params)
}
// 跳轉到創作者分類頁
export const toCreatorClassification = (params = {}) => {
	safeSwitchTab('/pages/creator/classification')
	checkViewport('/creator/classification', params)
}
// 跳轉到創作者分類編輯頁
export const toCreatorClassificationEdit = (params = {}) => {
	safeSwitchTab('/pages/creator/classification-edit')
	checkViewport('/creator/classification-edit', params)
}
// 跳轉到創作者分享頁
export const toShare = (params = {}) => {
	safeSwitchTab('/pages/creator/share')
	checkViewport('/creator/share', params)
}
// 跳轉到創作者設定頁
// 僅PC版 params: { tab: 'account' | 'privacy' | 'message' }
export const toCreatorSetMenu = (params = {}) => {
	safeSwitchTab('/pages/creator/setMenu')
	checkViewport('/creator/setMenu', params)
}
// 跳轉到創作者設定頁編輯
export const toCreatorSetMenuEdit = (params = {}) => {
	safeSwitchTab('/pages/creator/setMenuEdit')
	checkViewport('/creator/setMenuEdit', params)
}
// 跳轉到創作者封鎖頁編輯
export const toCreatorBlockadeEdit = (params = {}) => {
	safeSwitchTab('/pages/creator/blockadeEdit')
	checkViewport('/creator/blockadeEdit', params)
}
// 跳轉到創作者中心頁
export const toCreatorCenter = (params = {}) => {
	safeSwitchTab('/pages/creator/center')
	checkViewport('/creator/center', params)
}
// 跳轉到創作者申請頁
export const toCreatorApply = (params = {}) => {
	safeSwitchTab('/pages/creator/applyCreator')
	checkViewport('/creator/applyCreator', params)
}
// 跳轉到信箱
export const toMessage = (params = {}) => {
	safeSwitchTab('/pages/creator/message')
	checkViewport('/creator/message', params)
}
// 跳轉到信箱
export const toMessageBox = (params = {}) => {
	safeSwitchTab('/pages/creator/messageBox')
	checkViewport('/creator/messageBox', params)
}


// 跳轉到選擇頭像來源頁
export const toSelectSource = (params = {}) => {
	safeSwitchTab('/pages/common/select-source')
	checkViewport('/common/select-source', params)
}
// 跳轉到裁剪頭像頁
export const toCropAvatar = (params = {}) => {
	safeSwitchTab('/pages/common/crop-avatar')
	checkViewport('/common/crop-avatar', params)
}


/* WALLET */
// 跳轉到錢包
export const toWallet = (params = {}) => {
	safeSwitchTab('/pages/wallet/index')
	checkViewport('/wallet/index', params)
}
export const toPay = (params = {}) => {
	safeSwitchTab('/pages/wallet/pay')
	checkViewport('/wallet/pay', params)
}
export const towithdraw = (params = {}) => {
	safeSwitchTab('/pages/wallet/withdraw')
	checkViewport('/wallet/withdraw', params)
}
export const towithdrawIn = (params = {}) => {
	safeSwitchTab('/pages/wallet/withdrawIn')
	checkViewport('/wallet/withdrawIn', params)
}
export const toWithdrawRecord = (params = {}) => {
	safeSwitchTab('/pages/wallet/withdrawRecord')
	checkViewport('/wallet/withdrawRecord', params)
}
export const toWithdrawApply = (params = {}) => {
	safeSwitchTab('/pages/wallet/withdrawApply')
	checkViewport('/wallet/withdrawApply', params)
}
export const toOrderDetail = (params = {}) => {
	safeSwitchTab('/pages/wallet/orderDetail')
	checkViewport('/wallet/orderDetail', params)
}
export const toWithdrawDetail = (params = {}) => {
	safeSwitchTab('/pages/wallet/withdrawDetail')
	checkViewport('/wallet/withdrawDetail', params)
}
export const toCreditCardSelect = (params = {}) => {
	safeSwitchTab('/pages/wallet/creditCardSelect')
	checkViewport('/wallet/creditCardSelect', params)
}
export const toCreditCardSetting = (params = {}) => {
	safeSwitchTab('/pages/wallet/creditCardSetting')
	checkViewport('/wallet/creditCardSetting', params)
}
export const toCreditCardSave = (params = {}) => {
	safeSwitchTab('/pages/wallet/creditCardSave')
	checkViewport('/wallet/creditCardSave', params)
}

export const toHelper = (params = {}) => {
	safeSwitchTab('/pages/helper/index')
	checkViewport('/helper/index', params)
}