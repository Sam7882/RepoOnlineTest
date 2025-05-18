<template>
	<view class="creator-home-page">
		<!-- 頂部封面區 -->
		<view class="creator-home-page-cover">
			<!-- 封面圖片 -->
			<view class="creator-home-page-cover-img-container">
				<image class="creator-home-page-cover-img" src="/static/images/template/img-template-04.png" mode="heightFix">
				</image>
			</view>
		</view>

		<!-- 創作者資料區 -->
		<view class="creator-home-page-data-container">
			<!-- 絕對位置 頭像 -->
			<view class="creator-home-page-avatar-container">
				<image class="creator-home-page-avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
				</image>
			</view>
			<!-- 頭像側邊按鈕 -->
			<view class="creator-home-page-data-item-top-menu-container">
				<view class="creator-home-page-data-item-container-item-top-menu">
					<uni-icons class="creator-home-page-data-item-container-item-icon" type="icon-common-notice"
						custom-prefix="icon" size="24" color="var(--text-color-nonary)"></uni-icons>
				</view>
				<view class="creator-home-page-data-item-container-item-top-menu">
					<uni-icons class="creator-home-page-data-item-container-item-icon" type="icon-common-update"
						custom-prefix="icon" size="24" color="var(--text-color-nonary)"></uni-icons>
				</view>
				<view class="creator-home-page-data-item-container-item-top-menu">
					<uni-icons class="creator-home-page-data-item-container-item-icon" type="more-filled" size="24"
						color="var(--text-color-nonary)"></uni-icons>
				</view>
			</view>
			<!-- 名稱與帳號 垂直排序 -->
			<view class="creator-home-page-data-profile-container">
				<!-- 創作者名稱與帳號 -->
				<view
					class="creator-home-page-data-profile-container-item creator-home-page-data-profile-container-item-self-account">
					<view class="creator-home-page-data-profile-container-item-text-container">
						<text
							class="creator-home-page-data-profile-container-item-text creator-home-page-data-profile-container-item-text-name">名稱
						</text>
						<uni-icons class="creator-home-page-data-profile-container-item-text-name-icon" type="icon-community-prove"
							custom-prefix="icon" size="24" color="var(--text-color-primary)"></uni-icons>
					</view>
					<text
						class="creator-home-page-data-profile-container-item-text creator-home-page-data-profile-container-item-text-account">@88888.888</text>
				</view>
			</view>
			<!-- 創作者相關數據 水平排序 -->
			<view class="creator-home-page-data-item-container">
				<!-- 粉絲 -->
				<view class="creator-home-page-data-item-container-item">
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-number">16.1K</text>
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-title">{{
							$t('creator.fans') }}</text>
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-rank">NO.168</text>
				</view>
				<view class="pay-page-content-item-line"></view>
				<!-- 關注 -->
				<view class="creator-home-page-data-item-container-item">
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-number">168</text>
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-title">{{
							$t('creator.following') }}</text>
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-rank">NO.168</text>
				</view>
				<view class="pay-page-content-item-line"></view>
				<!-- 愛心 -->
				<view class="creator-home-page-data-item-container-item">
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-number">100K</text>
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-title">{{
							$t('creator.like') }}</text>
					<text
						class="creator-home-page-data-item-container-item-text creator-home-page-data-item-container-item-text-rank">NO.168</text>

				</view>
			</view>
			<!-- 文案 -->
			<view class="creator-home-page-data-profile-container">
				<!-- 自我介紹 -->
				<view
					class="creator-home-page-data-profile-container-item creator-home-page-data-profile-container-item-self-intro">
					<text class="creator-home-page-data-profile-container-item-text ">自我介紹文案文案文案文案文案文案文案文案文案文案文案文案</text>
				</view>
				<!-- HASH TAG標籤 -->
				<view
					class="creator-home-page-data-profile-container-item creator-home-page-data-profile-container-item-hash-tag">
					<text class="creator-home-page-data-profile-container-item-text">#娛樂</text>
					<text class="creator-home-page-data-profile-container-item-text">#遊戲</text>
					<text class="creator-home-page-data-profile-container-item-text">#美食</text>
				</view>

			</view>
			<!-- 社群圖標 -->
			<view
				class="creator-home-page-data-profile-container-item creator-home-page-data-profile-container-item-social-icon">
				<view class="creator-home-page-data-profile-container-item-social-icon-item">
					<image src="/static/icons/community/icon-community-instagram.png" mode="widthFix"></image>
				</view>
				<view class="creator-home-page-data-profile-container-item-social-icon-item">
					<image src="/static/icons/community/icon-community-youtube.png" mode="widthFix"></image>
				</view>
				<view class="creator-home-page-data-profile-container-item-social-icon-item">
					<image src="/static/icons/community/icon-community-twitter.png" mode="widthFix"></image>
				</view>
				<view class="creator-home-page-data-profile-container-item-social-icon-item">
					<image src="/static/icons/community/icon-community-facebook.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 按鈕 -->
			<view
				class="creator-home-page-data-profile-container-item creator-home-page-data-profile-container-item-edit-button">
				<view class="creator-home-page-data-profile-container-item-edit-button-top-container">
					<!-- 關注 -->
					<button type="button" class="creator-home-page-data-profile-container-item-edit-button-item-button">{{
						$t('creator.unFollowing') }}</button>
					<!-- 訊息 -->
					<button type="button" class="creator-home-page-data-profile-container-item-edit-button-item-button">{{
						$t('common.message') }}</button>
				</view>
				<!-- 成為會員 -->
				<view class="creator-home-page-data-profile-container-item-edit-button-bottom-container"
					@click="handleSubscription">
					<button type="button" class="creator-home-page-data-profile-container-item-edit-button-item-button">{{
						$t('creator.beMember') }}</button>
				</view>
			</view>
		</view>

		<!-- 圖文區 -->
		<!-- 圖文區分類按鈕 水平排序 -->
		<view class="creator-home-page-content-type-container">
			<!-- 篩選 -->
			<view id="target" class="creator-home-page-content-type-container-item" :class="{ active: type === 'filter' }">
				<uni-icons class="icon " type="icon-common-filter" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)" @click="switchType('filter')"></uni-icons>
				<view id="filter-select" class="filter-select"
					:style="{ visibility: showSelect ? 'visible' : 'hidden', ...filterSelectShowTop }">
					<view class="filter-select-fakeBg" @click="closeFilter()"></view>
					<view class="filter-select-deco" :style="filterSelectshowDeco"></view>
					<scroll-view class="scroll-view-box" scroll-y="true">
						<template v-for="item in filterList.range" :key="item.value">
							<view class="filter-select-item" :class="{ selected: item.value === filterList.value }"
								@click="filterSelect(item.value)">
								<text>{{ item.text }}</text>
								<uni-icons class="filter-select-item-icon" type="checkmarkempty" size="24"
									color="var(--text-color-secondary)"></uni-icons>
							</view>
						</template>
					</scroll-view>
				</view>
			</view>
			<!-- 影音 -->
			<view class="creator-home-page-content-type-container-item" :class="{ active: type === 'video' }"
				@click="switchType('video')">
				<uni-icons class="icon" type="icon-common-video" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)"></uni-icons>
			</view>
			<!-- 圖片 -->
			<view class="creator-home-page-content-type-container-item" :class="{ active: type === 'photo' }"
				@click="switchType('photo')">
				<uni-icons class="icon" type="icon-common-photo" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)"></uni-icons>
			</view>
			<!-- 轉發 -->
			<view class="creator-home-page-content-type-container-item" :class="{ active: type === 'shares' }"
				@click="switchType('shares')">
				<uni-icons class="icon" type="icon-common-return" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)"></uni-icons>
			</view>
			<!-- 收藏 -->
			<view class="creator-home-page-content-type-container-item" :class="{ active: type === 'favorites' }"
				@click="switchType('favorites')">
				<uni-icons class="icon" type="icon-menu-wallet" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)"></uni-icons>
			</view>
			<!-- 喜歡的影片 -->
			<view class="creator-home-page-content-type-container-item" :class="{ active: type === 'like' }"
				@click="switchType('like')">
				<uni-icons class="icon" type="icon-input-like" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)"></uni-icons>
			</view>
			<!-- 創作者商城 -->
			<view class="creator-home-page-content-type-container-item" :class="{ active: type === 'shop' }"
				@click="switchType('shop')">
				<uni-icons class="icon" type="icon-common-shopy" custom-prefix="icon" size="24"
					color="var(--text-color-nonary)"></uni-icons>
			</view>
		</view>
		<!-- 圖文區 卡片 水平排序，自動換行，一行三格 grid排版-->
		<!-- <view class="creator-home-page-content-card-container">
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-01.png" mode="widthFix"></image>
			</view>
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-02.png" mode="widthFix"></image>
			</view>
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-01.png" mode="widthFix"></image>
			</view>
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-01.png" mode="widthFix"></image>
			</view>
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-03.png" mode="widthFix"></image>
			</view>
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-04.png" mode="widthFix"></image>
			</view>
			<view class="creator-home-page-content-card-container-item">
				<image class="creator-home-page-content-card-container-item-img"
					src="/static/images/template/img-template-01.png" mode="widthFix"></image>
			</view>
		</view> -->
		<c-gridPhoto :data="gridPhotoData" />
		<!-- 底部導航列 -->
		<c-bottomNav :bgColor="'var(--background-color-light)'" :iconColor="'var(--text-color-primary)'"
			:primaryMenu="'primary'" />
	</view>
</template>

<script setup>
// TEMP: 創作者主頁
import { onPageScroll } from '@dcloudio/uni-app'
import { toSubscription } from '@/utils/routers'
const type = ref('all');
const showSelect = ref(false);
// 用於計算 filterSelect 該顯示的位置
const filterSelectShowTop = ref({})
const filterSelectshowDeco = ref({})

const filterList = ref({
	value: '0',
	range: [{ "value": '0', "text": "台灣" }, { "value": '1', "text": "美國" }, { "value": '2', "text": "中國" }, { "value": '3', "text": "日本" }, { "value": '4', "text": "韓國" }, { "value": '5', "text": "其他" }]
});
const gridPhotoData = ref([
	{
		src: '/static/images/template/img-template-01.png',
		type: 'photos',
		alt: '圖片1',
	},
	{
		src: '/static/images/template/img-template-02.png',
		type: 'single',
		alt: '圖片2',
	},
	{
		src: '/static/images/template/img-template-03.png',
		type: 'video',
		alt: '圖片3',
	},
	{
		src: '/static/images/template/img-template-04.png',
		type: 'photos',
		alt: '圖片4',
	},
	{
		src: '/static/images/template/img-template-01.png',
		type: 'video',
		alt: '圖片1',
	},
	{
		src: '/static/images/template/img-template-02.png',
		type: 'photos',
		alt: '圖片2',
	},
	{
		src: '/static/images/template/img-template-03.png',
		type: 'video',
		alt: '圖片3',
	},
	{
		src: '/static/images/template/img-template-02.png',
		type: 'video',
		alt: '圖片2',
	},
	{
		src: '/static/images/template/img-template-01.png',
		type: 'photos',
		alt: '圖片1',
	},
	{
		src: '/static/images/template/img-template-04.png',
		type: 'video',
		alt: '圖片4',
	},

]);

// 關閉篩選
const closeFilter = () => {
	showSelect.value = false
}
// 開啟篩選
const openFilter = () => {
	// 頂部距離 不夠下拉選單出現
	if (topDistance.value < filterSelectHeight.value + 20) {
		filterSelectShowTop.value = {
			top: '100%',
			left: '0',
		}
		filterSelectshowDeco.value = {
			top: '-4rpx',
			left: '20%'
		}
	} else {
		// 頂部距離 夠下拉選單出現
		filterSelectShowTop.value = {
			bottom: '100%',
			left: '0',
		}
		filterSelectshowDeco.value = {
			bottom: '-4rpx',
			left: '20%',
			rotate: '180deg'
		}
	}
	showSelect.value = true
}
// 切換類型
const switchType = (value) => {
	if (value === 'filter') {
		openFilter()
	}
	type.value = value;
};
// 篩選
const filterSelect = (value) => {
	showSelect.value = false
	filterList.value.value = value
	console.log(value);
}

// 用於計算 篩選按鈕頂部距離 與 下拉選單高度
// 用於計算 篩選按鈕頂部距離
const topDistance = ref(0)
const updateRect = () => {
	const query = uni.createSelectorQuery().in(uni.$scope)
	query.select('#target').boundingClientRect((rect) => {
		if (!rect) return
		const windowHeight = uni.getSystemInfoSync().windowHeight
		topDistance.value = rect.top
	}).exec()
}
// 用於計算 下拉選單高度
const filterSelectHeight = ref(0)
const getElementHeight = (selector = '#target') => {
	const query = uni.createSelectorQuery().in(uni.$scope)
	query.select(selector).boundingClientRect(rect => {
		if (rect) {
			filterSelectHeight.value = rect.height
		}
	}).exec()
}

const handleSubscription = () => {
	toSubscription()
}

onMounted(() => {
	// 初始計算一次
	updateRect()
	getElementHeight('#filter-select')
})

// 跨平台：App + H5 通用滾動監聽
onPageScroll(() => {
	updateRect()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-light);
}

// 封面圖
.creator-home-page-cover {
	position: relative;
	height: 15vh;

	// 封面圖
	.creator-home-page-cover-img-container {
		width: 100%;
		height: 100%;

		::v-deep(.creator-home-page-cover-img) {
			uni-image {
				width: 100% !important;
				height: 100% !important;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			// 背景圖
			uni-image>div {
				background-position: center !important;
				background-size: cover !important;
			}

			// 圖片佔位
			uni-image>img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
			}
		}
	}
}

//  創作者資料區 
.creator-home-page-data-container {
	position: relative;
	padding: 12rpx 48rpx;


	// 頭像
	.creator-home-page-avatar-container {
		position: absolute;
		top: -3%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		width: 208rpx;
		height: 208rpx;
		border: 12rpx solid var(--primary-color);
		background: var(--primary-color);
		border-radius: 100%;
		overflow: hidden;


		// transform: translate(-50%, -50%);
		::v-deep(.creator-home-page-avatar) {
			uni-image {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 110% !important;
				height: 110% !important;
			}

			// 背景圖
			uni-image>div {
				background-position: center !important;
				background-size: cover !important;
			}

			// 圖片佔位
			uni-image>img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
			}
		}
	}

	// 頭像側邊按鈕
	.creator-home-page-data-item-top-menu-container {
		display: flex;
		justify-content: flex-end;
		// padding: 24rpx 0;
		padding-top: 24rpx;
		gap: 40rpx;

		.creator-home-page-data-item-container-item-top-menu {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 32rpx;

			.creator-home-page-data-item-container-item-icon {
				font-size: 40rpx !important;
				color: var(--text-color-primary) !important;
			}
		}
	}

	// 數據
	.creator-home-page-data-item-container {
		display: flex;
		justify-content: center;
		// margin-top: 12rpx;
		margin-bottom: 16rpx;
		gap: 48rpx;

		.creator-home-page-data-item-container-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4rpx;
		}



		.creator-home-page-data-item-container-item-text {
			font-size: 24rpx;
			color: var(--text-color-primary);

			&.creator-home-page-data-item-container-item-text-number {
				font-weight: 500;
				font-size: 32rpx;
				color: var(--text-color-primary);
			}

			&.creator-home-page-data-item-container-item-text-title {
				font-size: 24rpx;
				color: var(--text-color-quaternary);
			}

			&.creator-home-page-data-item-container-item-text-rank {
				font-size: 24rpx;
				color: var(--text-color-senary);
			}
		}
	}

	// 自我介紹
	.creator-home-page-data-profile-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 16rpx;

		// gap: 4rpx;

		.creator-home-page-data-profile-container-item {
			font-size: 24rpx;
			color: var(--text-color-primary);

			// 名稱與帳號
			&.creator-home-page-data-profile-container-item-self-account {
				display: flex;
				flex-direction: column;
				align-items: center;

				.creator-home-page-data-profile-container-item-text-container {
					position: relative;
					display: flex;
				}

				.creator-home-page-data-profile-container-item-text-name {
					font-size: 32rpx;
					font-weight: 500;

				}

				.creator-home-page-data-profile-container-item-text-name-icon {
					position: absolute;
					top: 50%;
					right: -100%;
					transform: translate(-50%, -50%);
					color: var(--text-color-senary) !important;
					font-size: 32rpx !important;
				}

				.creator-home-page-data-profile-container-item-text-account {
					font-size: 24rpx;
					color: var(--text-color-primary);
					margin-top: -4rpx;
				}
			}

			// 自我介紹
			&.creator-home-page-data-profile-container-item-self-intro {
				text-align: center;
				line-height: 1.1;
			}

			// HASH TAG標籤
			&.creator-home-page-data-profile-container-item-hash-tag {
				display: flex;
				flex-wrap: wrap;
				gap: 32rpx;
				color: var(--text-color-senary);
				margin-bottom: 4rpx;
			}

			// 地標
			&.creator-home-page-data-profile-container-item-location {
				display: flex;
				align-items: center;
				gap: 4rpx;
				color: var(--text-color-quaternary);
			}

			// 網址
			&.creator-home-page-data-profile-container-item-url {
				display: flex;
				align-items: center;
				gap: 4rpx;
				color: var(--text-color-senary);

				&:hover {
					cursor: pointer;
				}
			}
		}
	}

	// 社群圖標
	.creator-home-page-data-profile-container-item-social-icon {
		display: flex;
		justify-content: center;
		gap: 48rpx;
		padding-left: 8rpx;
		margin-bottom: 24rpx;

		::v-deep(.creator-home-page-data-profile-container-item-social-icon-item) {
			uni-image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}

	// 編輯按鈕
	.creator-home-page-data-profile-container-item-edit-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24rpx;
		padding: 0 16rpx;

		.creator-home-page-data-profile-container-item-edit-button-top-container,
		.creator-home-page-data-profile-container-item-edit-button-bottom-container {
			display: flex;
			gap: 16rpx;
			width: 100%;
		}

		.creator-home-page-data-profile-container-item-edit-button-bottom-container {
			.creator-home-page-data-profile-container-item-edit-button-item-button {
				background: var(--text-color-secondary);
				border: 1px solid var(--primary-color);
				color: var(--primary-color);
			}
		}

		.creator-home-page-data-profile-container-item-edit-button-top-container .creator-home-page-data-profile-container-item-edit-button-item-button {
			&:first-child {
				background: var(--primary-color);
				color: var(--text-color-secondary);
			}

			&:last-child {
				background: var(--text-color-denary);
				color: var(--text-color-primary);
			}
		}

		.creator-home-page-data-profile-container-item-edit-button-item-button {
			height: fit-content;
			padding: 24rpx 24rpx;
			border: unset;
			border-radius: 16rpx;
			background: var(--text-color-octonary);
			// white-space: nowrap;
			font-size: 24rpx;
			flex: 1;
			line-height: 1.2;
			color: var(--text-color-primary);
			text-align: center;

			&::after {
				display: none;
			}
		}
	}
}

/* 圖文區 */
.creator-home-page-content-type-container {
	display: flex;
	justify-content: center;
	border-bottom: 1px solid var(--text-color-nonary);
	margin-top: 16rpx;
	padding: 0 24rpx;

	.creator-home-page-content-type-container-item {
		flex: 1;
		position: relative;
		padding: 0 8rpx;
		padding-bottom: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			font-size: 32rpx !important;
		}



		::v-deep(.uni-stat__select) {
			.uni-select {
				border: 0;
				background: red;
			}

			// 選單輸入框
			.uni-select__input-box {
				opacity: 0;
			}

			// 下拉選單部分
			.uni-select__selector {}
		}

		&.active {
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, 50%);
				z-index: 1;
				height: 4rpx;
				background: var(--text-color-primary);
				width: 70%;
			}

			.icon {
				color: var(--text-color-primary) !important;
			}
		}
	}
}

.filter-select {
	position: absolute;
	// top: 100%;
	// left: 0;
	// transform: translate(-50%, -50%);
	z-index: 1;
	width: fit-content;
	height: fit-content;
	border-radius: 12rpx;
	background: #4f4f4fcd;

	.filter-select-fakeBg {
		position: fixed;
		inset: 0;
		z-index: -1;
		background: transparent;
	}

	.filter-select-deco {
		position: absolute;

		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
		border-radius: 4rpx;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-bottom: 15rpx solid #4f4f4fcd;
		/* 三角形的顏色與方向 */
		;
	}

	::v-deep(.uni-scroll-view) {

		.uni-scroll-view {
			width: fit-content;
		}

		.uni-scroll-view {
			max-height: 150rpx;
			min-width: 200rpx;
		}
	}

	.filter-select-item {
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		color: var(--text-color-primary);
		padding: 0 16rpx;
		font-size: 24rpx;
		width: 100%;
		padding: 12rpx 32rpx;
		color: var(--text-color-secondary);
		border-bottom: 1px solid var(--input-border-color);

		&:last-child {
			border-bottom: unset;
		}

		uni-text {
			white-space: nowrap;
		}

		.filter-select-item-icon {
			visibility: hidden;
			font-size: 24rpx !important;
		}

		// 控制勾選
		&.selected {
			.filter-select-item-icon {
				visibility: visible;
			}
		}
	}
}

/* 行分隔線 */
.pay-page-content-item-line {
	height: 70rpx;
	border-left: 1px solid var(--text-color-quaternary);
	margin-top: 12rpx;
}
</style>