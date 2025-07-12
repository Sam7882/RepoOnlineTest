# FanceNew
- node v20
- npm install
- npm run dev:h5

如果遇到以下這種問題，可以嘗試移除 node_modules 和 package-lock.json，並且重新 npm install 即可
```
Please note that in running mode, due to log output, sourcemap, and uncompressed source code, the performance and package size are not as good as release mode.
Vite is compiled on demand, and clicking on an uncompiled page at runtime will compile first and then load, resulting in a slower display, and there is no such problem after release.
Compiler version: 4.36（vue3）
```
---
# 時間格式
採用了 day.js ，使用  ISO 8601 格式 
---
# 路由器
非入口頁面進入時，會檢查是否有網頁已經請求取得網站資料，如果沒有取得的話，會強制回到入口頁，進行資料的請求。
## 路由器跳轉設定
file path : FanceNew\src\utils\router.ts
個別頁面的跳轉，以及共用的跳轉fn()
## 路由器設定檔
file path : FanceNew\src\pages.json
- easycom : uni-ui 自動掃描引入功能
- pages : 路由器各頁面路徑設定，還有樣式的設定
- 入口頁 : pages 第一筆資料
- tabBar : 為底部導航列設定
---
# 版面設定
所有頁面都是在 基礎版型組件 layout-pcBase / layout-appBase 中，使用slot 置入的，
每個面檔案都有兩個檔案，分別為套用版型和頁面內容的檔案，
PC部分頁面是在同一個頁面之中，進行 components 切換來顯示內容的，例如 setMenu, center創作者中心 
---
# 網址對應頁面
- [入口加載頁] 
	- [APP] [PC] :pages/launch/loading
### auth
- [登入頁面] : 
	- [APP] : pages/auth/login
	- [PC] : 組件，src\components\auth\auth-login.vue
- [註冊頁面] : 
	- [APP] : pages/auth/register
	- [PC] : 組件，src\components\auth\auth-register.vue
- [手機驗證] : pages/auth/verify-phone
	- [APP] : pages/auth/verify-phone
	- [PC] : 組件，src\components\auth\auth-verifyPhone
### play
- [影音頁] : 
	- [APP] : pages/play/index
	- [PC] : pages/pc/play/index
- [文章圖片列表] :
	- [APP] : pages/play/article-gallery
	- [PC] : pages/pc/play/article-gallery
### common
<!-- - [作廢頁面][選擇頭像來源頁] :
	- [APP] : pages/common/select-source
	- [PC] : -->
- [大頭照裁切] :
	- [APP] : pages/common/crop-avatar
	- [PC] : pages/pc/common/crop-avatar
### helper
- [幫助中心] :
	- [APP] : pages/helper/index
	- [PC] :  pages/pc/creator/setmenu?tab=helper
		-	setMenu設定 - 幫助中心
### post
- [發佈預覽頁] : 發文，選擇媒體時，進入該頁面
	- [APP] : pages/post/post-Preview
	- [PC] :  pages/pc/post/post-Preview
		- 創作者中心
- [發佈頁] :
	- [APP] : pages/post/index
	- [PC] :  pages/pc/post/index
- [發佈-標記人頁] :
	- [APP] : pages/post/tagPeople
	- [PC] :  組件，src\components\posts\post-postTagPeople.vue
- [限時動態頁] :
	- [APP] : pages/post/shortStory
	- [PC] :  pages/pc/post/shortStory
		- 因全螢幕覆蓋，故沒有使用 基礎版面
- [發佈-排定發布] :
	- [APP] : pages/post/schedulePost
	- [PC] :  pages/pc/post/schedulePost
- [草稿箱] : 創作者主頁，草稿文章進入
	- [APP] : pages/post/draftBox
	- [PC] :  pages/pc/post/draftBox
### search
- [搜尋首頁] :
	- [APP] : pages/search/index
	- [PC] :  pages/pc/search/index
- [搜尋影片頁] :
	- [APP] : pages/search/searchVideo
	- [PC] :  pages/pc/search/searchVideo
- [搜尋主題頁] :
	- [APP] : pages/search/searchTheme
	- [PC] :  pages/pc/search/searchTheme
### wallet
- [我的錢包頁] :
	- [APP] : pages/wallet/index
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage
		-	setMenu設定 - 錢包管理
- [付款詳情頁] :
	- [APP] : pages/wallet/pay
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=pay
		- setMenu設定 - 錢包管理 - 付款
- [提現頁] :
	- [APP] : pages/wallet/withdraw
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=withdraw
		- setMenu設定 - 錢包管理 - 提領
- [我的進帳] :
	- [APP] : pages/wallet/withdrawIn
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=withdrawIn
			- setMenu設定 - 錢包管理 - 我的進帳
- [提現紀錄頁] :
	- [APP] : pages/wallet/withdrawRecord
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=withdrawRecord
			- setMenu設定 - 錢包管理 - 提現紀錄頁
- [訂單詳情頁] :
	- [APP] : pages/wallet/orderDetail
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=orderDetail
			- setMenu設定 - 錢包管理 - 訂單詳情頁
- [提現詳情頁] :
	- [APP] : pages/wallet/withdrawDetail
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=withdrawDetail
			- setMenu設定 - 錢包管理 - 提現詳情頁
- [申請提現頁] :
	- [APP] : pages/wallet/withdrawApply
	- [PC] :  pages/pc/creator/setmenu?tab=walletManage&withdrawTab=withdrawApply
			- setMenu設定 - 錢包管理 - 申請提現頁
- [信用卡選擇頁] :
	- [APP] : pages/wallet/creditCardSelect
	- [PC] :  pages/pc/wallet/creditCardSelect
- [信用卡新增設置頁] :
	- [APP] : pages/wallet/creditCardSetting
	- [PC] :  pages/pc/wallet/creditCardSetting
- [信用卡預設頁] :
	- [APP] : pages/wallet/creditCardSave
	- [PC] :  pages/pc/wallet/creditCardSave
### creator
- [創作者首頁] :
	- [APP] : pages/creator/home
	- [PC] :  pages/pc/creator/home
- [創作者設定-帳號設定頁面] :
	- [APP] : pages/creator/setMenu
	- [PC] :  pages/pc/creator/setMenu
		- setMenu設定
- [訊息箱] :
	- [APP] : pages/creator/messageBox
	- [PC] :  pages/pc/creator/messageBox
		- 訊息箱 - 訊息內容整合
- [訊息頁] :
	- [APP] : pages/creator/message
	- [PC] :  pages/pc/creator/messageBox
		- 訊息箱 - 訊息內容整合
- [創作者設定-手機號碼] :
	- [APP] : /#/pages/creator/setMenu 表單 src\components\form\form-setMenu-phoneBindForm.vue
			-	setMenu設定 - 帳號管理 - 電子信箱
	- [PC] :   pages/pc/creator/setmenu?tab=account 組件 src\components\pc\common\pc-setMenuPopUp.vue 表單 src\components\form\form-setMenu-phoneBindForm.vue
		-	setMenu設定 - 帳號管理 - 電子信箱
- [創作者設定-登入密碼] :
	- [APP] : /#/pages/creator/setMenu 表單 src\components\form\form-setMenu-passwordForm.vue
			-	setMenu設定 - 帳號管理 - 電子信箱
	- [PC] :   pages/pc/creator/setmenu?tab=account 組件 src\components\pc\common\pc-setMenuPopUp.vue 表單 src\components\form\form-setMenu-passwordForm.vue
		-	setMenu設定 - 帳號管理 - 電子信箱
- [創作者設定-電子信箱設定] :
	- [APP] : /#/pages/creator/setMenu 表單 src\components\form\form-setMenu-emailForm.vue
		-	setMenu設定 - 帳號管理 - 電子信箱
	- [PC] :   pages/pc/creator/setmenu?tab=account 組件 src\components\pc\common\pc-setMenuPopUp.vue 表單 src\components\form\form-setMenu-emailForm.vue
		-	setMenu設定 - 帳號管理 - 電子信箱
- [創作者設定-封鎖頁編輯] :
	- [APP] : pages/creator/blockadeEdit
		-	setMenu設定 - 隱私設定 - 已封鎖
	- [PC] :   pages/pc/creator/setmenu?tab=privacy 組件 src\components\pc\common\pc-blockadeEditPopUp.vue
		-	setMenu設定 - 隱私設定 - 已封鎖
- [創作者設定-收藏隱私設定] :
	- [APP] : /pages/creator/setMenuEdit?type=favorite 表單 src\components\form\form-setMenu-favoritePrivacyForm.vue
		-	setMenu設定 - 隱私設定 - 我的收藏
	- [PC] :   pages/pc/creator/setmenu?tab=privacy 組件 src\components\pc\common\pc-setMenuPopUp.vue
		-	setMenu設定 - 隱私設定 - 我的收藏
- [創作者設定-消息設定] :
	- [APP] : /pages/creator/setMenuEdit?type=message 組件表單 src\components\form\form-setMenu-messageForm.vue
		-	setMenu設定 - 消息設定
	- [PC] :   pages/pc/creator/setmenu?tab=message 組件 src/pages/pc/creator/setMenu-message-page.vue
		-	setMenu設定 - 消息設定
- [創作者中心頁] :
	- [APP] : pages/creator/center
	- [PC] :  pages/pc/creator/center
		- 側邊選單列，創作者中心
- [創作者設定-申請創作者頁] :
	- [APP] : pages/creator/applyCreator
	- [PC] :  創作者中心列表按鈕 pages/pc/creator/center
- [設定訂閱管理頁] :
	- [APP] : pages/creator/subscription-manage
	- [PC] :  pages/pc/creator/center?tab=subscriptionManage
		- center創作者中心 - 訂閱 - 訂閱管理
- [設定訂閱項目頁] :
	- [APP] : pages/creator/subscription-setting
	- [PC] :  pages/pc/creator/center?tab=subscriptionSetting
		- center創作者中心 - 訂閱 - 訂閱啟用
- [訂閱項目編輯] :
	- [APP] : pages/creator/subscription-edit
	- [PC] :  pages/pc/creator/center?tab=subscriptionEdit
		- center創作者中心 - 訂閱 - 訂閱編輯
- [個人數據頁] :
	- [APP] : pages/creator/statistics
	- [PC] :  pages/pc/creator/center?tab=statistics
		- center創作者中心 - 訂閱 - 個人數據頁
- [我的收藏頁] :
	- [APP] : pages/creator/favorites
	- [PC] :  pages/pc/creator/favorites
- [我的關注頁] :
	- [APP] : pages/creator/following
	- [PC] :  pages/pc/creator/following
- [排行榜頁] :
	- [APP] : pages/creator/rank
	- [PC] :  pages/pc/creator/rank
- [標籤排行榜頁] :
	- [APP] : pages/creator/tagRank
	- [PC] :  pages/pc/creator/tagRank
- [編輯個人資料] :
	- [APP] : pages/creator/profile-edit
	- [PC] :  pages/pc/creator/profile-edit
- [貼文管理-分類頁面] :
	- [APP] : pages/creator/classification
	- [PC] :  pages/pc/creator/classification
- [貼文管理-分類編輯頁] :
	- [APP] : pages/creator/classification-edit
	- [PC] :  pages/pc/creator/classification-edit
- [分類編輯-選取作品] :
	- [APP] : pages/creator/selectMedia
	- [PC] :  pages/pc/creator/selectMedia
- [訂閱方案頁面] :
	- [APP] : pages/creator/subscription
	- [PC] :  組件 src\components\plays\play-popSubscription.vue
		- 創作者主頁，訪客模式，成為會員按鈕
- [創作者分享頁] :
	- [APP] : pages/creator/share
	- [PC] :  組件 src\components\pc\common\pc-sharePopUp.vue
		- 創作者主頁，分享檔案
---
# 元件總覽
### auth
- [登入元件] : auth-login.vue
- [註冊元件] : auth-register.vue
- [手機驗證元件] : auth-verifyPhone.vue
- [社群登入元件] : auth-social.vue
### common
- [底部導航欄] : c-bottomNav.vue
- [通知彈窗] : c-noticePopUp.vue
- [訊息彈窗] : c-messagePopUp.vue
- [語言選擇器] : c-langSelector.vue
- [確認彈窗] : c-confirmPopUp.vue
- [客服彈窗] : c-servicePopUp.vue
- [底部彈窗] : c-bottomPopUp.vue
- [分享彈窗] : c-sharePopUp.vue
- [檢舉彈窗] : c-reportPopUp.vue
- [九宮格照片] : c-gridPhoto.vue
- [側邊導航] : c-sideNav.vue
- [頂部導航] : c-headerNav.vue
- [勾選框] : c-checkBox.vue
### creator
- [創作者頁標題導航] : creator-header.vue
### form
- [登入表單] : form-loginForm.vue
- [註冊表單] : form-registerForm.vue
- [手機驗證表單] : form-verifyPhoneForm.vue
- [付款表單] : form-payForm.vue
- [信用卡儲存表單] : form-carditCardSaveForm.vue
- [信用卡設定表單] : form-carditCardSettingForm.vue
- [設定選單-訊息表單] : form-setMenu-messageForm.vue
- [設定選單-收藏隱私表單] : form-setMenu-favoritePrivacyForm.vue
- [設定選單-電子郵件表單] : form-setMenu-emailForm.vue
- [設定選單-密碼表單] : form-setMenu-passwordForm.vue
- [設定選單-手機綁定表單] : form-setMenu-phoneBindForm.vue
### layouts	
- [APP] [基礎佈局] : layout-appBase.vue
- [PC] [基礎佈局] : layout-pcBase.vue
### pc/common
- [PC] [側邊導航] : pc-SlideNav.vue
- [PC] [頂部導航] : pc-HeaderNav.vue
- [PC] [關注彈窗] : pc-followingPopUp.vue
- [PC] [分享彈窗] : pc-sharePopUp.vue
- [PC] [設定選單彈窗] : pc-setMenuPopUp.vue
- [PC] [封鎖編輯彈窗] : pc-blockadeEditPopUp.vue
- [PC] [申請創作者] : pc-applyCreator.vue
### posts
- [發文設定] : post-postSet.vue
- [媒體格子項目] : post-mediaGridItem.vue
- [日期時間選擇器] : post-dateTimePicker.vue
- [發文內容] : post-postContent.vue
- [發文標記人] : post-postTagPeople.vue
### plays
- [訂閱彈窗] : play-popSubscription.vue
- [贊助彈窗] : play-popSponsor.vue
- [訊息彈窗] : play-popMessage.vue
- [圖片全螢幕彈窗] : play-popImgFullScreen.vue
- [回覆訊息] : play-replyMessage.vue
### charts
- [圓餅圖] : charts-pieChart.vue
- [折線圖] : charts-lineChart.vue
- [長條圖] : charts-barChart.vue
---
# 注意事項
- 登入頁須知
隨便輸入手機號碼和密碼即可跳轉到 影音首頁
- todo標籤都需要注意
---
# 套件
- vue3 ：核心前端框架  
	- https://vuejs.org/
- vite ：前端開發與建構工具  
	- https://vitejs.dev/
- typescript ：型別安全的 JavaScript 超集  
	- https://www.typescriptlang.org/
- tailwindcss ：原子化 CSS 框架  
	- https://tailwindcss.com/
- sass ：CSS 預處理器  
	- https://sass-lang.com/
- postcss、autoprefixer ：CSS 處理與自動前綴  
	- https://postcss.org/  
  https://github.com/postcss/autoprefixer
- pinia ：狀態管理  
	- https://pinia.vuejs.org/
- vue-i18n ：國際化  
	- https://kazupon.github.io/vue-i18n/
- unplugin-auto-import ：自動引入 API  
	- https://github.com/unplugin/unplugin-auto-import
- prettier ：程式碼格式化  
	- https://prettier.io/
- ml-swiper-v3 ：多端輪播組件  
	- https://ext.dcloud.net.cn/plugin?id=10769
- uCharts ：多端圖表組件  
	- https://www.ucharts.cn/
- hls.js ：HLS 影音串流播放  
	- https://github.com/video-dev/hls.js/
- animejs ：動畫函式庫  
	- https://animejs.com/
- @dcloudio/uni-app 及相關套件 ：uni-app 主程式與多端支援  
	- https://uniapp.dcloud.net.cn/
- @dcloudio/uni-ui ：uni-app 官方 UI 組件  
	- https://ext.dcloud.net.cn/plugin?id=55
- @uqrcode/js ：二維碼產生  
	- https://github.com/Sansnn/uQRCode
- @vue/runtime-core ：Vue 執行時核心  
	- https://www.npmjs.com/package/@vue/runtime-core
- vite-plugin-uni ：Vite 與 uni-app 整合  
	- https://github.com/dcloudio/vite-plugin-uni
- vue-tsc ：TypeScript 型別檢查  
	- https://www.npmjs.com/package/vue-tsc
- uQRCode : https://github.com/Sansnn/uQRCode
- day.js : 時間套件
	- https://github.com/iamkun/dayjs