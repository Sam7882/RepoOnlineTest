# ml-swiper-v3 版本歷史記錄

## 版本 2.1 (ml-swiper-v3-new.vue) - WEB環境優化版

### 更新日期
2024年12月

### 主要改進
1. **WEB環境拖曳優化**
   - 在WEB環境下禁用item跟隨滑鼠移動效果
   - 保持滑鼠拖曳切換功能，但移除視覺上的拖曳跟隨
   - 添加CSS樣式確保transform和transition在WEB環境下被禁用

2. **滑鼠事件處理優化**
   - 修改`onMouseMove`方法，不計算拖曳距離避免item跟隨
   - 在`onMouseUp`中計算實際拖曳距離來決定是否切換
   - 保持滑鼠拖曳切換的靈敏度，但移除視覺干擾

3. **Swiper配置優化**
   - 在WEB環境下添加`:skip-hidden-item-layout="true"`屬性
   - 優化swiper在WEB環境下的性能表現

### 技術細節
- 使用條件編譯`#ifdef H5 | WEB`確保修改只在WEB環境生效
- 在CSS中添加`transform: none !important`和`transition: none !important`
- 保持原有的滑鼠拖曳切換邏輯，但移除視覺上的跟隨效果

### 使用方式
```vue
<template>
  <ml-swiper-v3-new 
    :list="list" 
    :startIndex="startIndex" 
    :options="options"
    @onchange="change"
    @onplay="onplay"
    @onpause="onpause"
    ref="mlSwiper">
    <!-- 插槽內容 -->
  </ml-swiper-v3-new>
</template>
```

### 相容性
- ✅ H5/Web環境 - 完全支援，無拖曳跟隨效果
- ✅ 其他平台 - 保持原有功能
- ✅ 向後相容 - 與版本2.0完全相容

---

## 版本 2.0 (ml-swiper-v3-pc2.vue) - PC端優化版

### 更新日期
2024年12月

### 主要改進
1. **PC端Mouse拖曳優化**
   - 新增mouse事件監聽（mousedown、mousemove、mouseup）
   - 實現PC端滑鼠拖曳切換功能
   - 優化拖曳觸發閾值和靈敏度

2. **跨平台相容性**
   - 使用條件編譯確保mouse事件只在H5/Web環境啟用
   - 保持其他平台的原有功能
   - 完整的跨平台相容性支援

3. **用戶體驗優化**
   - 禁用拖曳時的文字選取
   - 優化動畫和資料切換流程
   - 添加繁體中文註解

### 技術細節
- 新增mouseDragEnabled、mouseDown等狀態管理
- 實現handleMouseSwipe方法處理滑鼠滑動切換
- 添加邊界檢查（到頂/到底）和事件觸發

---

## 版本 1.0 (ml-swiper-v3-optimized.vue) - 基礎優化版

### 更新日期
2024年12月

### 主要改進
1. **Props修正**
   - 修正useSwiper prop只讀錯誤
   - 將useSwiper改為本地狀態internalUseSwiper
   - 確保組件狀態管理的正確性

2. **Swiper事件優化**
   - 使用uni-app原生swiper的touch和mouse事件
   - 保持豎向切換功能
   - 優化change、transition、animationfinish事件處理

3. **資料結構保持**
   - 保留原有資料結構、props、slot和樣式
   - 確保向後相容性
   - 維持虛擬滾動設計（3個item無限滑動）

### 技術細節
- 修正props修改錯誤，使用本地響應式變數
- 優化swiper事件處理邏輯
- 保持虛擬滾動機制和資料切換流程

---

## 原始版本 (ml-swiper-v3.vue)

### 功能特點
- 基礎的swiper組件功能
- 支援影片和圖片播放
- 虛擬滾動設計（3個item）
- 多平台支援

### 已知問題
- PC端mouse滑動時會卡住
- Props修改錯誤
- 部分事件處理不穩定 