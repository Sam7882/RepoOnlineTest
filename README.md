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
## 網址對應頁面
- [入口加載頁] : pages/launch/loading
### common
- [選擇頭像來源頁] : pages/common/select-source
- [裁剪頭像頁] : pages/common/crop-avatar
### helper
- [幫助頁] : pages/helper/index
### auth
- [登入頁] : pages/auth/login
- [註冊頁] : pages/auth/register
- [手機驗證頁] : pages/auth/verify-phone
### play
- [影音首頁] : pages/play/index
- [圖文集頁] : pages/play/article-gallery
### post
- [發佈預覽頁] : pages/post/post-Preview
- [發佈頁] : pages/post/index
- [發佈-標記人頁] : pages/post/tagPeople
- [限時動態頁] : pages/post/shortStory
- [發佈-排程頁] : pages/post/schedulePost
- [發佈-草稿箱頁] : pages/post/draftBox
### searcxh
- [搜尋首頁] : pages/search/index
- [搜尋影片頁] : pages/search/searchVideo
- [搜尋主題頁] : pages/search/searchTheme
### wallet
- [我的錢包頁] : pages/wallet/index
- [付款詳情頁] : pages/wallet/pay
- [提現頁] : pages/wallet/withdraw
- [充值頁] : pages/wallet/withdrawIn
- [提現紀錄頁] : pages/wallet/withdrawRecord
- [訂單詳情頁] : pages/wallet/orderDetail
- [提現詳情頁] : pages/wallet/withdrawDetail
- [申請提現頁] : pages/wallet/withdrawApply
- [信用卡選擇頁] : pages/wallet/creditCardSelect
- [信用卡設定頁] : pages/wallet/creditCardSetting
- [信用卡儲存頁] : pages/wallet/creditCardSave
### creator
- [創作者首頁] : pages/creator/home
- [創作者訊息頁] : pages/creator/message
- [設定訂閱頁] : pages/creator/subscription-setting
- [設定訂閱金額頁] : pages/creator/subscription-edit
- [個人數據頁] : pages/creator/statistics
- [我的收藏頁] : pages/creator/favorites
- [我的關注頁] : pages/creator/following
- [排行榜頁] : pages/creator/rank
- [標籤排行榜頁] : pages/creator/tagRank
- [訂閱會員頁] : pages/creator/subscription
- [創作者編輯頁] : pages/creator/profile-edit
- [創作者選擇媒體頁] : pages/creator/selectMedia
- [創作者分類頁] : pages/creator/classification
- [創作者分類編輯頁] : pages/creator/classification-edit
- [創作者分享頁] : pages/creator/share
- [創作者設定頁] : pages/creator/setMenu
- [創作者設定編輯頁] : pages/creator/setMenuEdit
- [創作者封鎖編輯頁] : pages/creator/blockadeEdit
- [創作者中心頁] : pages/creator/center
- [創作者申請頁] : pages/creator/applyCreator
- [創作者信箱頁] : pages/creator/messageBox
---
## 元件
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
- [標題列] : c-headerNav.vue
- [勾選框] : c-checkBox.vue
### creator
- [創作者頁標題] : creator-header.vue
### posts
- [發文設定] : post-postSet.vue
- [媒體格子項目] : post-mediaGridItem.vue
- [日期時間選擇器] : post-dateTimePicker.vue
- [發文內容] : post-postContent.vue
### plays
- [訂閱彈窗] : play-popSubscription.vue
- [贊助彈窗] : play-popSponsor.vue
- [訊息彈窗] : play-popMessage.vue
- [圖片全螢幕彈窗] : play-popImgFullScreen.vue
### charts
- [圓餅圖] : charts-pieChart.vue
- [折線圖] : charts-lineChart.vue
- [長條圖] : charts-barChart.vue

## 登入頁須知
隨便輸入手機號碼和密碼即可跳轉到 影音首頁

## 套件
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