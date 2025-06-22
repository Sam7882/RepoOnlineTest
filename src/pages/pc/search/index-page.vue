<template>
	<view class="search-page bg-dark">
		<!-- 滾動分類 -->
		<view class="searchTag-container">
			<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" :lower-threshold="1" :upper-threshold="1">
				<uni-list :border="false">
					<template v-for="item in searchTagList" :key="item.value">
						<uni-list-item :border="false" clickable @click="handleTagClick(item.value)"
							:class="{ 'active': searchTag === item.value }">
							<template #body>
								<view class="searchTag-item">
									{{ item.title }}
								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</scroll-view>
		</view>

		<view class="recommend-container recommend-container-small ">
			<view class="swiper-wrapper">
				<!-- 橫向可滾動的分類 -->
				<swiper :display-multiple-items="swiperDisplayNum" next-margin="100rpx" class="swiper-container"
					:current="swiperCurrentIndex[1]" :style="{ height: swiperHeight }"
					@change="(e: any) => handleSwiperChange(e, 1)">
					<template v-for="(user, key) in newCreatorList" :key="key">
						<swiper-item @click="handleUserClick(user)">
							<!-- 創作縮圖 -->
							<view class="swiper-content-container">
								<view class="recommend-content-image-container">
									<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
									</image>
									<view class="recommend-content-image-cover">
										<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
									</view>
								</view>
								<!-- 推薦內容訊息 -->
								<view class="recommend-content-container">
									<!-- 創作者名 -->
									<view class="recommend-content-name">
										{{ user.userName }}
									</view>
									<!-- 推薦內容文字 -->
									<view class="recommend-content-text">
										{{ user.description }}
									</view>
								</view>
							</view>
						</swiper-item>
					</template>
				</swiper>
				<view class="swiper-arrow-container">
					<view class="icon-container" @click="clickSwiperPrev(1)" :class="{ disabled: swiperCurrentIndex[1] <= 0 }">
						<uni-icons class="icons" type="left" size="24" color="var(--text-color-primary)" />
					</view>
					<view class="icon-container" @click="clickSwiperNext(1)"
						:class="{ disabled: swiperCurrentIndex[1] >= (newCreatorList.length - Number(swiperDisplayNum)) }">
						<uni-icons class="icons" type="right" size="24" color="var(--text-color-primary)" />
					</view>
				</view>

			</view>
		</view>

		<!-- 為您推薦 -->
		<view class="recommend-container">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<text class="recommend-top-text-tip">{{ $t('search.recommend') }}</text>
					<!-- <view class="recommend-top-text-title-container">
							<text class="recommend-top-text-title">
								{{ $t('search.recommendForYou') }}
							</text>
							<uni-icons class="recommend-top-text-icon" type="right" size="30"></uni-icons>
						</view> -->
				</view>
				<!-- <view class="recommend-top-more">
						<uni-icons class="recommend-top-more-icon" type="right" size="30"></uni-icons>
					</view> -->
			</view>
			<view class="swiper-wrapper">
				<!-- 橫向可滾動的分類 -->
				<swiper :display-multiple-items="swiperDisplayNumLarge" next-margin="100rpx" class="swiper-container"
					:current="swiperCurrentIndex[2]" :style="{ height: swiperHeightLarge }"
					@change="(e: any) => handleSwiperChange(e, 2)">
					<template v-for="(user, key) in recommendList" :key="key">
						<swiper-item @click="handleUserClick(user)">
							<!-- 創作縮圖 -->
							<view class="swiper-content-container">
								<view class="recommend-content-image-container">
									<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
									</image>
									<view class="recommend-content-image-cover">
										<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
									</view>
								</view>
								<!-- 推薦內容訊息 -->
								<view class="recommend-content-container">
									<!-- 創作者名 -->
									<view class="recommend-content-name">
										{{ user.userName }}
									</view>
									<!-- 推薦內容文字 -->
									<view class="recommend-content-text">
										{{ user.description }}
									</view>
								</view>
							</view>
						</swiper-item>
					</template>
				</swiper>
				<view class="swiper-arrow-container">
					<view class="icon-container" @click="clickSwiperPrev(2)" :class="{ disabled: swiperCurrentIndex[2] <= 0 }">
						<uni-icons class="icons" type="left" size="24" color="var(--text-color-primary)" />
					</view>
					<view class="icon-container" @click="clickSwiperNext(2)"
						:class="{ disabled: swiperCurrentIndex[2] >= (recommendList.length - Number(swiperDisplayNumLarge)) }">
						<uni-icons class="icons" type="right" size="24" color="var(--text-color-primary)" />
					</view>
				</view>
			</view>
		</view>

		<!-- 本週熱門 -->
		<view class="recommend-container">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<text class="recommend-top-text-tip">{{ $t('search.recommend') }}</text>
					<!-- <view class="recommend-top-text-title-container">
							<text class="recommend-top-text-title">
								{{ $t('search.recommendForYou') }}
							</text>
							<uni-icons class="recommend-top-text-icon" type="right" size="30"></uni-icons>
						</view> -->
				</view>
				<!-- <view class="recommend-top-more">
						<uni-icons class="recommend-top-more-icon" type="right" size="30"></uni-icons>
					</view> -->
			</view>
			<view class="swiper-wrapper">
				<!-- 橫向可滾動的分類 -->
				<swiper :display-multiple-items="swiperDisplayNum" next-margin="100rpx" class="swiper-container"
					:current="swiperCurrentIndex[3]" :style="{ height: swiperHeight }"
					@change="(e: any) => handleSwiperChange(e, 3)">
					<template v-for="(user, key) in newCreatorList" :key="key">
						<swiper-item @click="handleUserClick(user)">
							<!-- 創作縮圖 -->
							<view class="swiper-content-container">
								<view class="recommend-content-image-container">
									<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
									</image>
									<view class="recommend-content-image-cover">
										<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
									</view>
								</view>
								<!-- 推薦內容訊息 -->
								<view class="recommend-content-container">
									<!-- 創作者名 -->
									<view class="recommend-content-name">
										{{ user.userName }}
									</view>
									<!-- 推薦內容文字 -->
									<view class="recommend-content-text">
										{{ user.description }}
									</view>
								</view>
							</view>
						</swiper-item>
					</template>
				</swiper>
				<view class="swiper-arrow-container">
					<view class="icon-container" @click="clickSwiperPrev(3)" :class="{ disabled: swiperCurrentIndex[3] <= 0 }">
						<uni-icons class="icons" type="left" size="24" color="var(--text-color-primary)" />
					</view>
					<view class="icon-container" @click="clickSwiperNext(3)"
						:class="{ disabled: swiperCurrentIndex[3] >= (newCreatorList.length - Number(swiperDisplayNum)) }">
						<uni-icons class="icons" type="right" size="24" color="var(--text-color-primary)" />
					</view>
				</view>
			</view>
		</view>
		<!-- 瀏覽主題 -->
		<view class="theme-container">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<view class="recommend-top-text-title-container">
						<text class="recommend-top-text-title">
							{{ $t('search.theme') }}
						</text>
					</view>
				</view>
				<view class="recommend-top-more btn-container" @click="handleToTheme">
					<button class="btn">
						探索主題
					</button>
					<!-- <uni-icons class="recommend-top-more-icon" type="right" size="30"></uni-icons> -->
				</view>
			</view>
			<view class="swiper-wrapper">
				<swiper :display-multiple-items="swiperDisplayNum" next-margin="100rpx" class="swiper-container">
					<swiper-item class="theme-list-container" v-for="(items, indexs) in themeColumns" :key="indexs"
						@click="handleMore">
						<view class="theme-list-column">
							<view class="theme-list-item" v-for="(item, index) in items" :key="index"
								:style="{ 'background': item.themeColor }">
								<view class="theme-list-item-info">
									<text class="theme-list-item-info-name">{{ item.title }}</text>
								</view>
								<view class="icon-container">
									<uni-icons class="icon-theme" type="icon-common-theme" custom-prefix="icon" size="30"
										color="var(--text-color-secondary)"></uni-icons>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 新FANCE創作者 -->
		<view class="recommend-container recommend-container-small ">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<view class="recommend-top-text-title-container">
						<text class="recommend-top-text-title">
							{{ $t('search.newCreator') }}
						</text>
						<!-- <uni-icons class="recommend-top-text-icon" type="right" size="30"></uni-icons> -->
					</view>
				</view>
				<!-- <view class="recommend-top-more">
						<uni-icons class="recommend-top-more-icon" type="right" size="30"></uni-icons>
					</view> -->
			</view>
			<view class="swiper-wrapper">
				<!-- 橫向可滾動的分類 -->
				<swiper :display-multiple-items="swiperDisplayNum" next-margin="100rpx" class="swiper-container"
					:current="swiperCurrentIndex[5]" :style="{ height: swiperHeight }"
					@change="(e: any) => handleSwiperChange(e, 5)">
					<template v-for="(user, key) in newCreatorList" :key="key">
						<swiper-item @click="handleUserClick(user)">
							<!-- 創作縮圖 -->
							<view class="swiper-content-container">
								<view class="recommend-content-image-container">
									<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
									</image>
									<view class="recommend-content-image-cover">
										<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
									</view>
								</view>
								<!-- 推薦內容訊息 -->
								<view class="recommend-content-container">
									<!-- 創作者名 -->
									<view class="recommend-content-name">
										{{ user.userName }}
									</view>
									<!-- 推薦內容文字 -->
									<view class="recommend-content-text">
										{{ user.description }}
									</view>
								</view>
							</view>
						</swiper-item>
					</template>
				</swiper>
				<view class="swiper-arrow-container">
					<view class="icon-container" @click="clickSwiperPrev(5)" :class="{ disabled: swiperCurrentIndex[5] <= 0 }">
						<uni-icons class="icons" type="left" size="24" color="var(--text-color-primary)" />
					</view>
					<view class="icon-container" @click="clickSwiperNext(5)"
						:class="{ disabled: swiperCurrentIndex[5] >= (newCreatorList.length - Number(swiperDisplayNum)) }">
						<uni-icons class="icons" type="right" size="24" color="var(--text-color-primary)" />
					</view>
				</view>
			</view>
		</view>

		<!-- 懸浮按鈕 -->
		<view class="icon-container floating-button" @click="contentScrollTop">
			<uni-icons class="icons" type="up" size="24" color="var(--text-color-primary)" />
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: PC搜尋主頁

import { onShow, onResize } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n';
import { toSearchVideo, toSearchTheme } from '@/utils/routers';
import { useViewportStore } from '@/stores/useViewportStore'

const { t } = useI18n();
const viewportStore = useViewportStore()
const { isPc, viewportWidth } = storeToRefs(viewportStore)
/* 滾動分類 */
const searchTag = ref(0)
const searchTagList = ref([
	{
		title: t('search.all'),
		value: 0,
	},
	{
		title: t('search.funny'),
		value: 1,
	},
	{
		title: t('search.fashion'),
		value: 2,
	},
	{
		title: t('search.music'),
		value: 3,
	},
	{
		title: t('search.entertainment'),
		value: 4,
	},
	{
		title: t('search.drama'),
		value: 5,
	},
	{
		title: t('search.sports'),
		value: 6,
	},
])

/* 滾動用戶 */
const userList = ref([
	{
		userName: '小明',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小華',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小麗',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小春',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
])
/* 關注推薦創作者 */
const recommendList = ref([
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
])
/* 本週熱門 */
const list = [
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
	{ name: '創作者名稱', desc: '創作者介紹', avatar: 'https://picsum.photos/80' },
];
// 每列放 3 個
const columns = computed(() => {
	const colCount = Math.ceil(list.length / 3);
	const result = Array.from({ length: colCount }, () => []);
	list.forEach((item, index) => {
		const colIndex = Math.floor(index / 3);
		result[colIndex].push(item);
	});
	return result;
});
/* 瀏覽主題 */
const themeList = [
	{ title: '娛樂歡笑', iconUrl: 'https://picsum.photos/32', themeColor: '#6e45ff' },
	{ title: '音樂創作', iconUrl: 'https://picsum.photos/32', themeColor: '#ff0000' },
	{ title: '西斯男女', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #ff0000, #0000ff)' },
	{ title: '手機遊戲', iconUrl: 'https://picsum.photos/32', themeColor: '#6e45ff' },
	{ title: '單機遊戲', iconUrl: 'https://picsum.photos/32', themeColor: '#24ffc1' },
	{ title: '小說創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #24ffc1, #6e45ff)' },
	{ title: '漫畫創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #e2e205, #e2e205)' },
	{ title: '同人創作', iconUrl: 'https://picsum.photos/32', themeColor: '#ff24fb' },
	{ title: '單機遊戲', iconUrl: 'https://picsum.photos/32', themeColor: '#24ffc1' },
	{ title: '小說創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #24ffc1, #6e45ff)' },
	{ title: '漫畫創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #e2e205, #e2e205)' },
	{ title: '同人創作', iconUrl: 'https://picsum.photos/32', themeColor: '#ff24fb' },
	{ title: '單機遊戲', iconUrl: 'https://picsum.photos/32', themeColor: '#24ffc1' },
	{ title: '小說創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #24ffc1, #6e45ff)' },
	{ title: '漫畫創作', iconUrl: 'https://picsum.photos/32', themeColor: 'linear-gradient(to bottom, #e2e205, #e2e205)' },
	{ title: '同人創作', iconUrl: 'https://picsum.photos/32', themeColor: '#ff24fb' },
];

// 每兩個一組
const themeColumns = computed(() => {
	const result = [];
	for (let i = 0; i < themeList.length; i += 2) {
		result.push(themeList.slice(i, i + 2));
	}
	return result;
});

/* 新FANCE創作者 */
const newCreatorList = ref([
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小明',
		description: '創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹創作者是介紹創作者介紹',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '創作者名稱',
		description: '創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小麗',
		description: '創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
	{
		userName: '小春',
		description: '創作者名稱創作者名稱',
		img: 'https://img.yzcdn.cn/vant/ipad.png',
	},
])

const handleToTheme = () => {
	toSearchTheme()
}

const handleMore = () => {
	toSearchVideo()
}

// 點擊分類
const handleTagClick = (item: any) => {
	searchTag.value = item
}

// 點擊用戶
const handleUserClick = (item: any) => {
	console.log("🚀 ~ 點擊用戶:", item)
}

// 監聽視窗變化
// 定義的swiper 顯示數量
const swiperDisplayNum = ref('6')
// 定義的swiper 高度
const swiperHeight = computed(() => {
	return `calc((100vw - 480rpx - var(--main-area-padding)) / ${swiperDisplayNum.value} * 1.25)`
})
const swiperDisplayNumLarge = ref('6')
const swiperHeightLarge = computed(() => {
	return `calc((100vw - 480rpx - var(--main-area-padding)) / ${swiperDisplayNumLarge.value} * 1.25)`
})

// 定義的swiper 間距
const nextMargin = ref('100rpx')
// 檢查視窗大小，自動替換swiper 間距, 顯示數量 
const checkViewportAutoReplace = () => {
	if (viewportWidth.value < 1440) {
		swiperDisplayNum.value = '4'
		swiperDisplayNumLarge.value = '3'
		nextMargin.value = '100rpx'
	} else if (viewportWidth.value < 1920) {
		swiperDisplayNum.value = '5'
		swiperDisplayNumLarge.value = '4'
		nextMargin.value = '125rpx'
	} else {
		swiperDisplayNum.value = '7'
		swiperDisplayNumLarge.value = '6'
		nextMargin.value = '150rpx'
	}
}

watch(viewportWidth, () => {
	checkViewportAutoReplace()
})

// 定義的swiper 當前索引
const swiperCurrentIndex = ref({
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
})

// 點擊滾動到下一個，同時如果後面沒有被隱藏，則不滾動
const clickSwiperNext = (type: number) => {
	switch (type) {
		case 1:
			if (swiperCurrentIndex.value[1] < (newCreatorList.value.length - Number(swiperDisplayNum.value))) {
				swiperCurrentIndex.value[1]++
			}
			break
		case 2:
			if (swiperCurrentIndex.value[2] < (recommendList.value.length - Number(swiperDisplayNumLarge.value))) {
				swiperCurrentIndex.value[2]++
			}
			break
		case 3:
			if (swiperCurrentIndex.value[3] < (newCreatorList.value.length - Number(swiperDisplayNum.value))) {
				swiperCurrentIndex.value[3]++
			}
			break
		case 4:
			if (swiperCurrentIndex.value[4] < (newCreatorList.value.length - Number(swiperDisplayNum.value))) {
				swiperCurrentIndex.value[4]++
			}
			break
		case 5:
			if (swiperCurrentIndex.value[5] < (newCreatorList.value.length - Number(swiperDisplayNum.value))) {
				swiperCurrentIndex.value[5]++
			}
			break
	}
}
// 點擊滾動到上一個
const clickSwiperPrev = (type: number) => {
	switch (type) {
		case 1:
			if (swiperCurrentIndex.value[1] > 0) {
				swiperCurrentIndex.value[1]--
			}
			break
		case 2:
			if (swiperCurrentIndex.value[2] > 0) {
				swiperCurrentIndex.value[2]--
			}
			break
		case 3:
			if (swiperCurrentIndex.value[3] > 0) {
				swiperCurrentIndex.value[3]--
			}
			break
		case 4:
			if (swiperCurrentIndex.value[4] > 0) {
				swiperCurrentIndex.value[4]--
			}
			break
		case 5:
			if (swiperCurrentIndex.value[5] > 0) {
				swiperCurrentIndex.value[5]--
			}
			break
	}
}

// 監聽swiper 變化，取當前索引
const handleSwiperChange = (e: any, type: number) => {
	switch (type) {
		case 1:
			swiperCurrentIndex.value[1] = e.detail.current
			break
		case 2:
			swiperCurrentIndex.value[2] = e.detail.current
			break
		case 3:
			swiperCurrentIndex.value[3] = e.detail.current
			break
		case 4:
			swiperCurrentIndex.value[4] = e.detail.current
			break
		case 5:
			swiperCurrentIndex.value[5] = e.detail.current
			break
	}
}

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

onShow(() => {
	checkViewportAutoReplace()
})
</script>

<style lang="scss" scoped>
/* swiper  */
.swiper-wrapper {
	position: relative;

	.swiper-container {
		uni-image {
			width: 100%;
			height: 100%;
			aspect-ratio: 1/1;
			border-radius: 8rpx;
		}
	}

	.swiper-content-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 0 32rpx;

		&:hover {
			cursor: pointer;
		}
	}

	.swiper-arrow-container {
		position: absolute;
		bottom: calc(100% + 50rpx);
		right: 0;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		gap: 8rpx;

		.icon-container {
			.icons {
				font-size: 40rpx !important;
				color: var(--text-color-primary) !important;
			}

			&.disabled {
				.icons {
					color: var(--text-color-quaternary) !important;
				}
			}
		}
	}
}

.search-page {
	padding-top: 48rpx;
	background-color: var(--background-color-light);
	width: 100%;
}



.searchInput-container {}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-quinary) !important;
			border-radius: 10rpx;
			padding: 8rpx 32rpx;

			&.is-focused {
				border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}

		.uni-input-placeholder {
			color: var(--text-color-quaternary) !important;
			font-size: 28rpx;
		}

		.uni-easyinput__content-input {
			color: var(--text-color-secondary) !important;
			font-size: 28rpx;
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

/* 頂部 分類 scroll列表 */

.searchTag-container {
	position: relative;
	margin-top: 0rpx;

	@media screen and (min-width: 1280px) {
		margin-top: 24rpx;
	}

	.right-arrow {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background: linear-gradient(to left, var(--text-color-primary) 0%, var(--text-color-primary) 55%, transparent 100%);
		color: #fff;
		padding: 0 0.375rem;
		font-size: 0.9375rem;
		z-index: 10;
		height: 105%;
		display: flex;
		justify-content: center;
		align-items: center;

		.uniui-right {
			color: var(--text-color-quaternary) !important;
			font-size: 48rpx !important;
		}
	}

	// list
	.uni-list {
		flex-direction: row;
		gap: 22rpx;
		background-color: transparent;
		// overflow: scroll;

		&::-webkit-scrollbar {
			// display: none;
		}

		.uni-list-item {
			width: fit-content;
			background-color: var(--text-color-denary) !important;
			border-radius: 100rpx;

			::v-deep(.uni-list-item__container) {
				.uni-list-item__container {
					flex: none;
					white-space: nowrap;
					padding: 12rpx 26rpx;

					.searchTag-item {
						white-space: nowrap;
						font-size: var(--font-size-content-pc);
						color: var(--text-color-primary);
					}
				}
			}

			&.active {
				background-color: var(--primary-color) !important;

				.searchTag-item {
					color: var(--text-color-secondary) !important;
				}
			}
		}
	}
}

.more-icon {
	margin-left: auto;
	color: var(--text-color-quaternary) !important;
	font-size: 32rpx !important;
}


/* 關注推薦 */
.recommend-container {
	margin-top: 80rpx;

	.recommend-content-image-container {
		position: relative;
		display: inline-flex;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.recommend-content-image-cover {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 20%;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 10%, transparent 100%);

		::v-deep(.icon-item-container) {
			.icon-item {
				margin-top: 12rpx;
				margin-right: 24rpx;
				font-size: 40rpx !important;
				color: var(--text-color-secondary) !important;

				@media screen and (min-width: 1280px) {
					margin-top: 16rpx;
					margin-right: 32rpx;
					font-size: 48rpx !important;
				}
			}
		}
	}

	.recommend-content-container {
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;

		.recommend-content-name,
		.recommend-content-text {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}

		.recommend-content-name {
			font-size: var(--font-size-title-pc);
			max-height: 1.5em;
			color: var(--text-color-primary);
			-webkit-line-clamp: 1;
			line-clamp: 1;
			white-space: nowrap;
		}

		.recommend-content-text {
			font-size: var(--font-size-content-pc);
			color: var(--text-color-quaternary);
			max-height: 4.5em;
			/* 1.5 x 3行 */
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			white-space: normal;
		}
	}

}

.theme-container {
	margin-top: 80rpx;
}

// 標題
.recommend-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 32rpx;

	// 左側
	.recommend-top-text {
		display: flex;
		flex-direction: column;
		color: var(--text-color-primary);

		.recommend-top-text-tip {
			color: var(--text-color-primary);
			font-size: 40rpx;

			@media screen and (min-width: 1280px) {
				font-size: 44rpx;
			}

			@media screen and (min-width: 1920px) {
				font-size: 50rpx;
			}

		}

		.recommend-top-text-title-container {
			display: flex;
			align-items: center;
			gap: 4rpx;
		}

		.recommend-top-text-title {
			display: flex;
			align-items: center;
			gap: 4rpx;
			font-size: 32rpx;
		}

		.recommend-top-text-icon {
			padding-top: 8rpx;
			color: var(--text-color-quaternary) !important;
			font-size: 32rpx !important;
		}


	}

	// 右側箭頭
	.recommend-top-more {
		.recommend-top-more-icon {
			background-color: var(--text-color-quinary);
			border-radius: 100%;
			padding: 10rpx;
			font-size: 40rpx !important;
			color: var(--text-color-secondary) !important;
		}

		.btn {
			font-size: var(--font-size-title-pc);
			padding: 16rpx 36rpx;
			border-radius: 100rpx;
		}
	}
}

/* 瀏覽主題 */
.theme-list-container {
	display: flex;
	flex-direction: row;


	.theme-list-column {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		margin-right: 20rpx;
		width: 100%;
		max-height: 300rpx;
		gap: 20rpx;
		flex-shrink: 0;
		padding: 0 10rpx;

		.theme-list-item {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 32rpx 100rpx;
			border-radius: 24rpx;

			.icon-container {
				position: absolute;
				top: 10rpx;
				right: 16rpx;

				.icon-theme {
					font-size: 26rpx !important;
					color: rgba(255, 255, 255, 0.5) !important;
				}

			}

			.theme-list-item-avatar {
				width: 48rpx;
				height: 48rpx;
			}

			.theme-list-item-info {
				display: flex;
				flex-direction: column;

				.theme-list-item-info-name,
				.theme-list-item-info-desc {
					white-space: nowrap;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					line-clamp: 1;
				}

				.theme-list-item-info-name {
					color: #fff;
					font-size: var(--font-size-title-pc);
					max-height: 1.5em;
					color: var(--text-color-primary);
				}

				.theme-list-item-info-desc {
					color: #999;
					font-size: 28rpx;
					max-height: 1.5em;
					color: var(--text-color-quaternary);
				}
			}
		}
	}
}
</style>
