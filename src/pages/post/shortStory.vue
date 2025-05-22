<template>
	<view class="story-container">
		<!-- 多段影片進度條 -->
		<view class="header-container">
			<view class="progress-bar-group">
				<!-- 容器 -->
				<view class="progress-bar" v-for="(item, index) in videoList" :key="index">
					<!-- 進度本身 -->
					<view class="progress" :style="{
						width: index < currentIndex
							? '100%'
							: index === currentIndex
								? progressWidth + '%'
								: '0%'
					}"></view>
				</view>
			</view>
			<!-- HEADER 資訊 -->
			<view class="info-container">
				<view class="info-container-left">
					<view class="icon-container" @click="closeShortStory">
						<uni-icons class="icon-item icon-left" type="left" size="24" color="var(--text-color-secondary)" />
					</view>
					<!-- 大頭照 -->
					<view class="avatar-container">
						<image class="avatar" src="/static/images/template/img-template-03.png" mode="widthFix" />
					</view>
					<!-- 名稱 -->
					<view class="info-container-left-text">
						<text class="name">jesiicatestid</text>
						<view class="icon-container">
							<uni-icons class="icon-item icon-prove" type="icon-community-prove" custom-prefix="icon" size="24"
								color="var(--text-color-primary)"></uni-icons>
						</view>
					</view>
					<!-- 時間 -->
					<view class="time">
						<text>15小時</text>
					</view>
				</view>
				<!-- 右側按鈕 -->
				<view class="info-container-right">
					<!-- 音量按鈕 -->
					<view class="icon-container" @click="switchVolume">
						<template v-if="muted">
							<uni-icons class="icon-item icon-sound" type="icon-video-sound-off" custom-prefix="icon" size="24"
								color="var(--text-color-secondary)" />
						</template>
						<template v-else>
							<uni-icons class="icon-item icon-sound" type="icon-video-sound-on" custom-prefix="icon" size="24"
								color="var(--text-color-secondary)" />
						</template>
					</view>
					<!-- 播放按鈕 -->
					<view class="icon-container">
						<template v-if="playStatus === 'play'">
							<uni-icons class="icon-item icon-play" type="icon-stander-pause2" custom-prefix="icon" size="24"
								color="var(--text-color-secondary)" @click="pauseVideo" />
						</template>
						<template v-else>
							<uni-icons class="icon-item icon-play" type="icon-video-play" custom-prefix="icon" size="24"
								color="var(--text-color-secondary)" @click="resumeVideo" />
						</template>
					</view>
					<!-- 舉報按鈕 -->
					<c-reportPopUp iconColor="var(--text-color-secondary)" @open="resumeVideo" @close="pauseVideo" />
					<!-- 關閉按鈕 -->
					<view class="icon-container" @click="closeShortStory">
						<uni-icons class="icon-item icon-close" type="closeempty" size="24" color="var(--text-color-secondary)" />
					</view>
				</view>
			</view>
		</view>

		<!-- 影片元件 -->
		<video id="storyVideo" class="video" :src="videoList[currentIndex]" autoplay muted :controls="false"
			:show-center-play-btn="false" object-fit="cover" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMeta"
			@ended="nextVideo" @play="turnOnPlayStatus" @pause="turnOnPauseStatus" :show-loading="false"
			:enable-progress-gesture="false" :show-play-btn="false" :show-fullscreen-btn="false" :show-progress="false" />

		<!-- 控制上下操控 -->
		<view class="control-container" @touchstart.stop="pauseVideo" @touchend.stop="resumeVideo">
			<!-- 左右兩側往內延伸 25% -->
			<view class="control-item" @touchstart="startTouch('prev')" @touchend="endTouch('prev')"></view>
			<view class="control-item" @touchstart="startTouch('next')" @touchend="endTouch('next')"></view>
		</view>
	</view>
</template>

<script setup>
import { router } from '@/utils/routers'
const { back } = router

const closeShortStory = () => {
	back()
}

// 影片列表
const videoList = ref([
	'https://www.w3schools.com/html/mov_bbb.mp4',
	'https://www.w3schools.com/html/movie.mp4'
])

const currentIndex = ref(0) // 當前影片索引
const duration = ref(1) // 影片總時長
const currentTime = ref(0) // 當前播放時間
const progressWidth = ref(0) // 進度條寬度

// 影片加載完成 
/* @loadedmetadata  视频元数据加载完成时触发。event.detail = {width, height, duration} */
const onLoadedMeta = (e) => {
	duration.value = e.detail.duration
	console.log('影片加載完成', e.detail)
}

// 播放時間更新 進度條
/* @timeupdate  播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次 */
const onTimeUpdate = (e) => {
	currentTime.value = e.detail.currentTime
	progressWidth.value = (currentTime.value / duration.value) * 100
}

// 暫停影片
/* uni.createVideoContext => 指定DOM元素 */
const pauseVideo = () => {
	uni.createVideoContext('storyVideo').pause()
	turnOnPauseStatus()
	console.log('暫停影片')
}

// 播放影片
const resumeVideo = () => {
	uni.createVideoContext('storyVideo').play()
	turnOnPlayStatus()
	console.log('播放影片')
}

// ICON 暫停播放切換
const playStatus = ref('play')
const turnOnPlayStatus = () => {
	playStatus.value = 'play'
}
const turnOnPauseStatus = () => {
	playStatus.value = 'pause'
}

// 切換音量
const muted = ref(true)
const switchVolume = () => {
	muted.value = !muted.value
	uni.createVideoContext('storyVideo').muted = muted.value
}

// 播完自動換下一段
const nextVideo = () => {
	if (currentIndex.value < videoList.value.length - 1) {
		currentIndex.value++
		progressWidth.value = 0
	} else {
		// 播完所有影片，自動跳轉或返回
		uni.navigateBack()
	}
}

// 手動點擊切換邏輯
const preVideo = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--
		progressWidth.value = 0
	}
}

/* 控制影片中央與兩側上下切換或者hold住暫停播放 */
const holdTimer = ref(null)
const holdThreshold = 300 // 判斷為按住的毫秒數
const isHolding = ref(false)

const startTouch = (action) => {
	isHolding.value = false

	pauseVideo() // 一開始就先暫停影片（也可以選擇不做）

	holdTimer.value = setTimeout(() => {
		isHolding.value = true
		// 因外層就有暫停影片，所以這裡部動作
		// pauseVideo()
	}, holdThreshold)
}

const endTouch = (action) => {
	clearTimeout(holdTimer.value)

	if (!isHolding.value) {
		// 短按才進行切換
		if (action === 'prev') {
			preVideo()
		} else if (action === 'next') {
			nextVideo()
		}
	}

	// 手動切換影片後，恢復播放
	resumeVideo()
}
</script>

<style lang="scss" scoped>
.story-container {
	position: relative;

	background-color: black;
}

.video {
	position: fixed;
	inset: 0;
	width: 100dvw;
	height: 100dvh;
	object-fit: cover;
}

.header-container {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	gap: 4px;
	padding: 10px;
	width: 100%;
	z-index: 10;
	display: flex;
	flex-direction: column;
	width: 100%;
}

/* 進度條 */
.progress-bar-group {
	display: flex;
	align-items: center;
	gap: 8rpx;

	.progress-bar {
		flex: 1;
		height: 4px;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		overflow: hidden;
	}

	.progress {
		height: 100%;
		background-color: white;
		transition: width 0.2s linear;
	}
}

/* 資訊 */
.info-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.info-container-left,
.info-container-right {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.icon-left {
	font-size: 32rpx !important;
	color: var(--text-color-secondary) !important;
}

/* 頭像 */
.avatar-container {
	position: relative;
	width: 70rpx;
	height: 70rpx;
	border: 4rpx solid var(--primary-color);
	background: var(--primary-color);
	border-radius: 50%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	::v-deep(.avatar) {
		uni-image {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100% !important;
			height: 100% !important;
		}

		/*  背景圖 */
		uni-image>div {
			background-position: center !important;
			background-size: cover !important;
		}

		/* 圖片佔位 */
		uni-image>img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
}

/* 名稱 */
.info-container-left-text {
	display: flex;
	align-items: center;
	color: var(--text-color-secondary);
	font-size: 28rpx;
	gap: 6rpx;
}

.icon-prove {
	font-size: 24rpx !important;
	color: var(--text-color-secondary) !important;
	translate: 0 4rpx;
}

.time {
	font-size: 24rpx;
	color: var(--text-color-secondary);
}

.info-container-right {
	.icon-container {
		.icon-item {
			font-size: 32rpx !important;
			color: var(--text-color-secondary) !important;
		}

	}
}

/* 控制上下操控 */
.control-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 90%;

	display: flex;
	justify-content: space-between;

	.control-item {
		flex: 1;
		max-width: 25%;
	}
}
</style>
