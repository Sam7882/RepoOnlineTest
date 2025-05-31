<template>
	<view class="search-page bg-dark">
		<view class="searchInput-container">
			<uni-easyinput v-model="search" class="inputStyle" prefixIcon="search" :placeholder="$t('auth.phone')"
				:trim="true" :clearable="false" />
		</view>

		<!-- 滾動分類 -->
		<view class="searchTag-container">
			<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" ref="searchTagScroll" :lower-threshold="1"
				@scrolltolower="hideShowArrow" :upper-threshold="1" @scrolltoupper="openShowArrow">
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
			<!-- 右邊箭頭 -->
			<!-- <view v-if="showArrow" class="right-arrow">
				<uni-icons type="right" size="30"></uni-icons>
			</view> -->
		</view>

		<view class="recommend-container recommend-container-small ">
			<view class="recommend-list">
				<!-- 橫向可滾動的分類 -->
				<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" ref="searchTagScroll">
					<uni-list :border="false">
						<template v-for="(user, key) in newCreatorList" :key="key">
							<uni-list-item :border="false" clickable @click="handleUserClick(user)" direction="column">
								<!-- 創作縮圖 -->
								<template #header>
									<view class="recommend-content-image-container">
										<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
										</image>
										<view class="recommend-content-image-cover">
											<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
										</view>
									</view>
								</template>
								<!-- 推薦內容訊息 -->
								<template #body>
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
								</template>

							</uni-list-item>
						</template>
					</uni-list>
				</scroll-view>
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
			<view class="recommend-list">
				<!-- 橫向可滾動的分類 -->
				<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" ref="searchTagScroll">
					<uni-list :border="false">
						<template v-for="(user, key) in recommendList" :key="key">
							<uni-list-item :border="false" clickable @click="handleUserClick(user)" direction="column">
								<!-- 創作縮圖 -->
								<template #header>
									<view class="recommend-content-image-container">
										<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
										</image>
										<view class="recommend-content-image-cover">
											<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
										</view>
									</view>
								</template>
								<!-- 推薦內容訊息 -->
								<template #body>
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
								</template>

							</uni-list-item>
						</template>
					</uni-list>
				</scroll-view>
			</view>
		</view>

		<!-- 本週熱門 -->
		<view class="recommend-container recommend-container-small ">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<view class="recommend-top-text-title-container">
						<text class="recommend-top-text-title">
							{{ $t('search.hotRecommend') }}
						</text>
					</view>
				</view>
			</view>
			<view class="recommend-list">
				<!-- 橫向可滾動的分類 -->
				<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" ref="searchTagScroll">
					<uni-list :border="false">
						<template v-for="(user, key) in newCreatorList" :key="key">
							<uni-list-item :border="false" clickable @click="handleUserClick(user)" direction="column">
								<!-- 創作縮圖 -->
								<template #header>
									<view class="recommend-content-image-container">
										<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
										</image>
										<view class="recommend-content-image-cover">
											<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
										</view>
									</view>
								</template>
								<!-- 推薦內容訊息 -->
								<template #body>
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
								</template>

							</uni-list-item>
						</template>
					</uni-list>
				</scroll-view>
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
			<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" ref="searchTagScroll" :lower-threshold="1"
				@scrolltolower="hideShowArrow" :upper-threshold="1" @scrolltoupper="openShowArrow">
				<view class="theme-list-container">
					<view class="theme-list-column">
						<view class="theme-list-item" :style="{ 'background': item.themeColor }" v-for="(item, index) in themeList"
							:key="index">
							<view class="theme-list-item-info">
								<text class="theme-list-item-info-name">{{ item.title }}</text>
							</view>
							<view class="icon-container">
								<uni-icons class="icon-theme" type="icon-common-theme" custom-prefix="icon" size="30"
									color="var(--text-color-secondary)"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>

		<!-- 新FANCE創作者 -->
		<view class="recommend-container recommend-container-small ">
			<view class="recommend-top">
				<view class="recommend-top-text">
					<view class="recommend-top-text-title-container">
						<text class="recommend-top-text-title">
							{{ $t('search.newCreator') }}
						</text>
						<uni-icons class="recommend-top-text-icon" type="right" size="30"></uni-icons>
					</view>
				</view>
				<view class="recommend-top-more" @click="handleMore">
					<uni-icons class="recommend-top-more-icon" type="right" size="30"></uni-icons>
				</view>
			</view>
			<view class="recommend-list">
				<!-- 橫向可滾動的分類 -->
				<scroll-view scroll-x :show-scrollbar="false" class="scroll-container" ref="searchTagScroll">
					<uni-list :border="false">
						<template v-for="(user, key) in newCreatorList" :key="key">
							<uni-list-item :border="false" clickable @click="handleUserClick(user)" direction="column">
								<!-- 創作縮圖 -->
								<template #header>
									<view class="recommend-content-image-container">
										<image class="recommend-content-image" src="/static/logo.png" mode="aspectFill" :lazy-load="true">
										</image>
										<view class="recommend-content-image-cover">
											<c-reportPopUp :iconColor="'var(--text-color-secondary)'" />
										</view>
									</view>
								</template>
								<!-- 推薦內容訊息 -->
								<template #body>
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
								</template>

							</uni-list-item>
						</template>
					</uni-list>
				</scroll-view>
			</view>
		</view>


		<!-- 底部導航列 -->
		<c-bottomNav :bgColor="'var(--background-color-dark)'" :iconColor="'var(--text-color-secondary)'" />
	</view>
</template>

<script setup lang="ts">
// TEMP: 搜尋主頁
import { useI18n } from 'vue-i18n';
import { toSearchVideo, toSearchTheme } from '@/utils/routers';
const { t } = useI18n();
/* 滾動分類 */
const search = ref('')
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
const searchTagScroll = ref(null)
// 滾動分類箭頭
const showArrow = ref(true);
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
// 每列放 3 個
const themeColumns = computed(() => {
	const colCount = Math.ceil(themeList.length / 3);
	const result = Array.from({ length: colCount }, () => []);
	themeList.forEach((item, index) => {
		const colIndex = Math.floor(index / 3);
		result[colIndex].push(item);
	});
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
])
// 滾動到左側 顯示箭頭
const openShowArrow = () => {
	showArrow.value = true
}
// 滾動到右側 隱藏箭頭
const hideShowArrow = () => {
	showArrow.value = false
}

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
</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-dark);
}

.search-page {
	padding: 0 32rpx;
	padding-top: 64rpx;
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
	margin-top: 76rpx;

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
			display: none;
		}

		.uni-list-item {
			width: fit-content;
			background-color: var(--text-color-quinary) !important;
			border-radius: 100rpx;

			::v-deep(.uni-list-item__container) {
				.uni-list-item__container {
					flex: none;
					white-space: nowrap;
					padding: 12rpx 26rpx;

					.searchTag-item {
						white-space: nowrap;
						font-size: 28rpx;
						color: var(--text-color-secondary);
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

.user-container {
	position: relative;
	margin-top: 32rpx;


	// list
	.uni-list {
		flex-direction: row;
		gap: 16rpx;
		background-color: transparent;
		// overflow: scroll;

		&::-webkit-scrollbar {
			display: none;
		}

		.uni-list-item {
			width: 360rpx;
			background-color: var(--text-color-quinary) !important;
			border-radius: 16rpx;
			flex-shrink: 0;

			::v-deep(.uni-list-item__container) {
				.uni-list-item__container {
					flex: none;
					white-space: nowrap;
					padding: 16rpx;
					align-items: center;
					width: 100%;

					.searchTag-item {
						white-space: nowrap;
						font-size: 28rpx;
						color: var(--text-color-quaternary);
					}
				}
			}

			&.active {
				background-color: var(--text-color-secondary) !important;

				.searchTag-item {
					color: var(--text-color-primary) !important;
					font-weight: bold;
				}
			}
		}
	}

	uni-image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 8rpx;
	}

	.user-name {
		color: var(--text-color-secondary);
		margin-left: 24rpx;
		font-size: 32rpx;
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

	&.recommend-container-small {
		uni-image {
			width: 300rpx;
			height: 300rpx;
			border-radius: 32rpx;
		}

		.uni-list {
			.uni-list-item {
				width: 300rpx;
			}
		}
	}

	// list
	.uni-list {
		flex-direction: row;
		gap: 24rpx;
		background-color: transparent;
		align-items: flex-start;

		&::-webkit-scrollbar {
			display: none;
		}

		.uni-list-item {
			width: 360rpx;
			background-color: transparent !important;
			overflow: hidden;
			flex-shrink: 0;

			::v-deep(.uni-list-item__container) {
				.uni-list-item__container {
					flex: none;
					white-space: nowrap;
					padding: 0;
					align-items: center;
					width: 100%;


					.searchTag-item {
						white-space: nowrap;
						font-size: 28rpx;
						color: var(--text-color-quaternary);
					}
				}
			}

			&.active {
				background-color: var(--text-color-secondary) !important;

				.searchTag-item {
					color: var(--text-color-primary) !important;
					font-weight: bold;
				}
			}
		}
	}

	uni-image {
		width: 360rpx;
		height: 360rpx;
		border-radius: 32rpx;
	}

	.recommend-content-image-container {
		position: relative;
		display: inline-flex;
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

		.recommend-content-image-cover-icon {
			margin-top: 24rpx;
			margin-right: 32rpx;
			font-size: 32rpx !important;
			color: var(--text-color-secondary) !important;
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
			font-size: 32rpx;
			max-height: 1.5em;
			color: var(--text-color-secondary);
			-webkit-line-clamp: 1;
			line-clamp: 1;
			white-space: nowrap;
		}

		.recommend-content-text {
			font-size: 28rpx;
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
		color: var(--text-color-secondary);

		.recommend-top-text-tip {
			color: var(--text-color-secondary);
			font-size: 30rpx;
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
	}
}

/* 本週熱門 */
.hot-recommend-container {
	margin-top: 80rpx;
}

.hot-recommend-list-container {
	display: flex;
	flex-direction: row;

	.hot-recommend-list-column {
		display: flex;
		flex-direction: column;
		margin-right: 20rpx;
		width: 95%;
		flex-shrink: 0;

		.hot-recommend-list-item {
			display: flex;
			align-items: center;
			margin-bottom: 32rpx;
			padding-right: 24rpx;

			.hot-recommend-list-item-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 8rpx;
				margin-right: 12rpx;
			}

			.hot-recommend-list-item-info {
				display: flex;
				flex-direction: column;

				.hot-recommend-list-item-info-name,
				.hot-recommend-list-item-info-desc {
					white-space: nowrap;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					line-clamp: 1;
				}

				.hot-recommend-list-item-info-name {
					color: #fff;
					font-size: 32rpx;
					max-height: 1.5em;
					color: var(--text-color-secondary);
				}

				.hot-recommend-list-item-info-desc {
					color: #999;
					font-size: 28rpx;
					max-height: 1.5em;
					color: var(--text-color-quaternary);
				}
			}

			/* icon */
			.hot-recommend-list-item-icon {
				margin-left: auto;

				.hot-recommend-list-item-info-more {
					font-size: 24rpx !important;
					color: var(--text-color-secondary) !important;
				}
			}
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
		max-height: 400rpx;
		gap: 20rpx;
		flex-shrink: 0;

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
					font-size: 32rpx;
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
