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
- 入口加載頁 : "pages/launch/loading"
- 登入頁 : "pages/auth/login"
- 註冊頁 : "pages/auth/register"
- 手機驗證頁 : "pages/auth/verify-phone"
- 影音首頁 : "pages/play/index"
- 圖文集頁 : "pages/play/article-gallery"
- 發佈預覽頁 : "pages/post/media-preview"
- 發佈頁 : "pages/post/index"
- 發佈-標記人頁 : "pages/post/tagPeople"
- 搜尋頁 : "pages/search/index"
- 我的錢包頁 : "pages/wallet/index"
- 付款詳情頁 : "pages/wallet/pay"
- 創作者首頁 : "pages/creator/home"
- 設定訂閱頁 : "pages/creator/subscription-setting"
- 設定訂閱金額頁 : "pages/creator/subscription-edit"
- 個人數據頁 : "pages/creator/statistics"
- 我的收藏頁 : "pages/creator/favorites"
- 我的關注頁 : "pages/creator/following"

## 登入頁須知
隨便輸入手機號碼和密碼即可跳轉到 影音首頁