<template>
	<view class="crop-avatar">
		<!-- 頁面標題 -->
		<c-headerNav title="裁切" :openBack="false" />

		<!-- 圖片裁切畫布區 -->
		<canvas canvas-id="avatarCanvas" class="avatar-canvas" id="avatarCanvas" @touchstart="handleTouchStart"
			@touchmove="handleTouchMove" @touchend="handleTouchEnd"></canvas>

		<!-- 操作按鈕 -->
		<view class="action-buttons">
			<view class="btn-container">
				<button class="btn" @click="handleSave">{{ $t('common.save2') }}</button>
			</view>
			<view class="btn-container">
				<button class="btn" @click="handleRemove">{{ $t('common.delPhoto') }}</button>
			</view>
			<view class="btn-container">
				<button class="btn" @click="goBack">{{ $t('common.cancel') }}</button>
			</view>
		</view>
	</view>
</template>

<script setup>
// TEMP: 大頭照裁切
import { onLoad } from '@dcloudio/uni-app'
import { router } from '@/utils/routers'
const { back } = router
const src = ref('') // 圖片路徑資源
const canvasSize = 300 // 畫布寬高（正方形）

// 圖片參數：位置（x, y）、縮放倍率、原始寬高
const imgPos = reactive({
	x: 0, // 圖片 X 軸位置（左上角）
	y: 0, // 圖片 Y 軸位置（左上角）
	scale: 1, // 圖片縮放倍率
	imgWidth: 0, // 圖片原始寬度（根據比例計算）
	imgHeight: 0 // 圖片原始高度（根據比例計算）
})

let startX = 0 // 拖曳起點 X
let startY = 0 // 拖曳起點 Y

// 接收圖片參數
onLoad((options) => {
	if (options.src) {
		src.value = decodeURIComponent(options.src)
	}
})

// 重繪畫布內容
const drawCanvas = () => {
	const ctx = uni.createCanvasContext('avatarCanvas') // 指定並創建畫布
	ctx.clearRect(0, 0, canvasSize, canvasSize) // 清空初始化畫布

	// 依據縮放與位置繪製圖片
	const imgW = imgPos.imgWidth * imgPos.scale // 圖片寬度
	const imgH = imgPos.imgHeight * imgPos.scale // 圖片高度
	const offsetX = imgPos.x // 圖片 X 軸位置
	const offsetY = imgPos.y // 圖片 Y 軸位置

	ctx.drawImage(src.value, offsetX, offsetY, imgW, imgH) // 繪製圖片 (圖片路徑,圖片X軸,圖片Y軸,圖片寬度,圖片高度)
	ctx.save() // 保存當前繪圖狀態

	// 畫出遮罩層（黑色透明 + 圓形透明裁切區）
	ctx.setFillStyle('rgba(0,0,0,0.5)') // 整體半透明遮罩
	ctx.beginPath() // 開始繪製路徑
	ctx.rect(0, 0, canvasSize, canvasSize) // 畫布整體區域(x,y,寬度,高度)
	ctx.arc(
		canvasSize / 2, // 中心 X
		canvasSize / 2, // 中心 Y
		canvasSize / 2 - 10, // 半徑：略小於整個畫布，保留邊緣 10px
		0, // 起始角度
		Math.PI * 2, // 結束角度
		true // 逆時針：為了配合 fill('evenodd') 製作中空
	) // 繪製圓形路徑
	ctx.fill('evenodd') // 使用奇偶規則裁切出中空圓洞
	ctx.restore() // 回到上次所save的繪圖狀態

	ctx.draw() // 開始繪製
}

// 開始拖曳
const handleTouchStart = (e) => {
	const touch = e.touches[0] // 取得觸摸點
	startX = touch.x // 設定起點 X
	startY = touch.y // 設定起點 Y
}

// 拖曳移動邏輯
const handleTouchMove = (e) => {
	const touch = e.touches[0] // 取得觸摸點
	// 計算目前觸控位置和起始點的差值（偏移量）
	const dx = touch.x - startX // 計算 X 軸移動距離
	const dy = touch.y - startY // 計算 Y 軸移動距離

	// 下一個圖片的位置
	// 目前圖片位置 + 手指移動量 = 新圖片位置
	const nextX = imgPos.x + dx // 計算圖片 X 軸位置
	const nextY = imgPos.y + dy // 計算圖片 Y 軸位置
	const imgW = imgPos.imgWidth * imgPos.scale // 計算圖片寬度
	const imgH = imgPos.imgHeight * imgPos.scale // 計算圖片高度

	// 限制移動範圍不可超出裁切圓形區域
	if (nextX <= 0 && nextX + imgW >= canvasSize) {
		imgPos.x = nextX // 設定圖片 X 軸位置
	}
	if (nextY <= 0 && nextY + imgH >= canvasSize) {
		imgPos.y = nextY // 設定圖片 Y 軸位置
	}

	startX = touch.x // 設定起點 X
	startY = touch.y // 設定起點 Y
	drawCanvas() // 重繪畫布
}

const handleTouchEnd = () => { }

// 儲存 canvas 畫布圖片

// 真正導出圓形裁切圖片
const handleSave = () => {
	// 創建canvas 繪製裁切後的圖片
	const canvas = document.createElement('canvas')
	const size = canvasSize * window.devicePixelRatio // 支援高解析
	canvas.width = size // 設定畫布寬高
	canvas.height = size // 設定畫布寬高
	const ctx = canvas.getContext('2d') // 取得繪圖上下文

	const radius = size / 2 - 10 * window.devicePixelRatio // 裁切圓形半徑
	ctx.save() // 保存繪圖狀態
	ctx.beginPath() // 開始繪製路徑
	ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2) // 繪製圓形路徑
	ctx.clip() // 裁切圓形區域

	const img = new Image() // 創建圖片
	img.crossOrigin = 'anonymous' // 跨域
	img.src = src.value // 設定圖片路徑

	img.onload = () => {
		const scaledW = imgPos.imgWidth * imgPos.scale * window.devicePixelRatio // 計算圖片寬度
		const scaledH = imgPos.imgHeight * imgPos.scale * window.devicePixelRatio // 計算圖片高度
		const offsetX = imgPos.x * window.devicePixelRatio // 計算圖片 X 軸位置
		const offsetY = imgPos.y * window.devicePixelRatio // 計算圖片 Y 軸位置

		ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH) // 繪製圖片
		ctx.restore() // 回到上次所save的繪圖狀態

		// 匯出 blob 並觸發下載
		canvas.toBlob((blob) => {
			// 下載裁切後的圖片
			const url = URL.createObjectURL(blob) // 創建 blob 的 URL
			const a = document.createElement('a') // 創建 a 元素
			a.href = url // 設定 a 元素的 href
			a.download = 'avatar.png' // 設定 a 元素的 download
			a.click() // 點擊 a 元素
			URL.revokeObjectURL(url)


			// 模擬 API 請求
			/* const formData = new FormData() // 創建 formData 對象
			formData.append('file', blob, 'avatar.png') // 添加文件
			fetch('API', {
				method: 'POST',
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log('上傳成功', data)
					uni.showToast({ title: '已上傳', icon: 'success' })
				})
				.catch((err) => {
					console.error('上傳失敗', err)
					uni.showToast({ title: '上傳失敗', icon: 'none' })
				}) */

		}, 'image/png')
	}

	uni.showToast({ title: '已儲存', icon: 'success' })
}

const handleRemove = () => {
	src.value = ''
	drawCanvas()
}

const goBack = () => {
	console.log('🚀 ~ goBack ~ goBack:')
	back()
}

// 初始化圖片尺寸與位置（等比縮放）
onMounted(() => {
	const img = new Image()
	img.src = src.value
	img.onload = () => {
		const ratio = img.width / img.height
		if (ratio > 1) {
			imgPos.imgWidth = canvasSize * ratio // 畫布寬比例放大
			imgPos.imgHeight = canvasSize
		} else {
			imgPos.imgWidth = canvasSize
			imgPos.imgHeight = canvasSize / ratio // 畫布高比例放大
		}
		imgPos.x = (canvasSize - imgPos.imgWidth) / 2 // 水平置中
		imgPos.y = (canvasSize - imgPos.imgHeight) / 2 // 垂直置中
		drawCanvas()
	}
})
</script>

<style scoped lang="scss">
.crop-avatar {
	background: #fff;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 40rpx;
	overflow: hidden;
	touch-action: none;
	position: relative;
}

.header {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 40rpx;
}

.avatar-canvas {
	width: 600rpx;
	height: 600rpx;
	background: #eee;
	border-radius: 16rpx;
	margin-bottom: 60rpx;
}

.action-buttons {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30rpx;
	padding: 0 20rpx;
	margin-top: auto;
	margin-bottom: 80rpx;

	.btn-container {
		width: 100%;

		&:last-child {
			.btn {
				background: none;
				color: var(--text-color-primary);

				&::after {
					display: none;
				}
			}
		}
	}

	.btn {
		border-radius: 20rpx;
		padding: 24rpx 0;
		font-size: 30rpx;
		// width: 100%;
	}
}

.cancel {
	margin-top: 20rpx;
	font-size: 28rpx;
	color: #333;
}
</style>
