<!-- FanceNew/src/pages/launch/loading.vue -->
<template>
	<view class="loading-container">
		<image class="logo" src="/static/logo.png" mode="widthFix" />
		<view class="slogan">
			<view class="brand-container">
				<text class="brand animate-brand brand-f">F</text>
				<text class="brand animate-brand brand-a">A</text>
				<text class="brand animate-brand brand-n">N</text>
				<text class="brand animate-brand brand-c">C</text>
				<text class="brand animate-brand brand-e">E</text>
			</view>
			<text class="desc">NO BOUNDARIES-JUST FANCE</text>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 啟動頁面入口頁
import { onShow } from '@dcloudio/uni-app';
import { toLogin } from '@/utils/routers'
import { useInitStore } from '@/stores/useInitDataStore'

const initStore = useInitStore()
const siteInfo = computed(() => initStore.siteInfo)

// 假設這是你的初始資料 API
async function fetchInitData() {
	// 這裡請換成實際 API
	await new Promise(resolve => setTimeout(resolve, 300)) // 模擬API
	// 設置初始資料
	initStore.setSiteInfo({
		name: 'Fance',
	})
}

async function nextPage() {
	// 等待 1.5 秒 後跳轉
	await new Promise(resolve => setTimeout(resolve, 1500))
	toLogin()
}

// onShow => uni-app 生命週期，每次回來都重新觸發
onShow(async () => {
	// 初始化資料，確認是否有取得資料，沒有則重取
	if (Object.keys(siteInfo.value).length === 0) {
		await fetchInitData()
	}
	// 跳轉
	nextPage()
})
</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.loading-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fff;
}

.logo {
	width: 320rpx;
}

.slogan {
	text-align: center;
	margin-top: 16rpx;
}

.brand-container {
	display: flex;

	.brand {
		display: block;
		font-size: 110rpx;
		font-weight: bolder;
		color: #222;
		letter-spacing: 2rpx;
		text-transform: uppercase;
		line-height: 1;
		font-weight: 900;


		&.brand-f {
			animation-delay: 0s;
		}

		&.brand-a {
			animation-delay: 0.5s;
		}

		&.brand-n {
			animation-delay: 1s;
		}

		&.brand-c {
			animation-delay: 1.5s;
		}

		&.brand-e {
			animation-delay: 2s;
		}
	}
}

// 浮動動畫
.animate-brand {
	animation: brand-animation 2.5s infinite;
}

@keyframes brand-animation {
	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-12.5rpx);
	}

	100% {
		transform: translateY(0);
	}
}

.desc {
	font-family: 'Yuanti TC';
	display: block;
	font-size: 28rpx;
	color: #222;
	margin-top: -4rpx;
	letter-spacing: .5rpx;
	text-transform: uppercase;
}
</style>