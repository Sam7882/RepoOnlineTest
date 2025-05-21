<template>
	<view class="rank-page">
		<!-- header 導航-->
		<c-headerNav class="rank-page-header" :title="'排行榜'" />

		<!-- 類別 -->
		<view class="rank-category-container">
			<template v-for="(item, index) in categoryList" :key="index">
				<view class="rank-category-item" :class="{ active: categoryValue === item.value }"
					@click="switchCategory(item.value)">
					<text class="rank-category-item-text">{{ item.name }}</text>
				</view>
			</template>
		</view>

		<!-- 日期榜類別 -->
		<view class="rankDate-category-container">
			<template v-for="(item, index) in dateCategoryList" :key="index">
				<view class="rankDate-category-item" :class="{ active: dateCategoryValue === item.value }"
					@click="switchDateCategory(item.value)">
					<text class="rankDate-category-item-text">{{ item.name }}</text>
				</view>
			</template>
		</view>

		<view class="firstRank-container">
			<view class="firstRank-item" v-for="(item, index) in rankList.slice(0, 3)" :key="index">
				<!-- 絕對位置 頭像 -->
				<view class="firstRank-avatar-container">
					<image class="firstRank-avatar" :src="item.avatar" mode="widthFix">
					</image>
				</view>

				<view class="firstRank-medal-container">
					<image v-if="item.rank === 1" class="firstRank-medal" src="/static/icons/rank/icon-rank-medal-1.png"
						mode="widthFix">
					</image>
					<image v-if="item.rank === 2" class="firstRank-medal" src="/static/icons/rank/icon-rank-medal-2.png"
						mode="widthFix">
					</image>
					<image v-if="item.rank === 3" class="firstRank-medal" src="/static/icons/rank/icon-rank-medal-3.png"
						mode="widthFix">
					</image>
				</view>

				<!-- 名稱與帳號 垂直排序 -->
				<view class="firstRank-data-profile-container">
					<!-- 創作者名稱與帳號 -->
					<view class="firstRank-data-profile-container-item firstRank-data-profile-container-item-self-account">
						<view class="firstRank-data-profile-container-item-text-container">
							<text
								class="firstRank-data-profile-container-item-text firstRank-data-profile-container-item-text-name">{{
									item.name }}
							</text>
							<uni-icons class="firstRank-data-profile-container-item-text-name-icon" type="icon-community-prove"
								custom-prefix="icon" size="24" color="var(--text-color-primary)"></uni-icons>
						</view>
						<text
							class="firstRank-data-profile-container-item-text firstRank-data-profile-container-item-text-account">{{
								item.account }}</text>
						<text class="firstRank-data-profile-container-item-text firstRank-data-profile-container-item-text-num">{{
							item.fansNum }}</text>
					</view>
				</view>
			</view>
		</view>

		<!--內容容器 -->
		<view class="rank-content-container">
			<!-- 訂閱/購買紀錄 -->
			<view class="rank-content-container-bottom-record-container">
				<!-- 紀錄列表 垂直排序 -->
				<uni-list :border="false" class="rank-content-container-bottom-record-list-container">
					<!-- 紀錄 space-between 左右排列 -->
					<template v-for="(item, index) in rankList.slice(3, 10)" :key="index">
						<uni-list-item :border="false" class="rank-content-container-bottom-record-list-item">
							<template #header>
								<view class="rank-list-header-container">
									<text>{{ item.rank }}</text>
								</view>
							</template>
							<template #body>
								<!-- 帳號頭像和錢包總額文字 水平排列 -->
								<view class="rank-account-container rank-account-container-record">
									<!-- 帳號頭像 垂直排列 -->
									<view class="rank-account-info-container">
										<!-- 頭像 -->
										<view class="rank-account-avatar-container">
											<image class="rank-account-avatar" :src="item.avatar" mode="widthFix">
											</image>
										</view>
										<!-- 名稱與帳號 -->
										<view class="rank-account-info-name-container">
											<view class="rank-account-info-name-title-container">
												<text class="rank-account-info-title">{{ item.name }}</text>
												<!-- 認證圖標 -->
												<view class="rank-account-info-prove-container">
													<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
														color="var(--text-color-senary)"></uni-icons>
												</view>
											</view>
											<view class="rank-account-info-name-account-container">
												<text class="rank-account-info-account">{{ item.account }}</text>
											</view>
										</view>
									</view>
									<!-- 靠右 -->
									<view class="rank-content-container-bottom-following-list-item-button-container">
										{{ item.fansNum }}
									</view>
								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</view>

		<view class="rank-bottom-myRank-container">
			<view class="rank-bottom-myRank-item">
				<view class="rank-bottom-myRank-title">
					<text>你的排名</text>
				</view>
				<!-- 帳號頭像和錢包總額文字 水平排列 -->
				<view class="rank-account-container rank-account-container-record">
					<view class="rank-bottom-myRank-header-container">
						<text>{{ '168' }}</text>
					</view>
					<view class="rank-account-info-container">
						<!-- 頭像 -->
						<view class="rank-account-avatar-container">
							<image class="rank-account-avatar" src="/static/images/template/img-template-01.png" mode="widthFix">
							</image>
						</view>
						<!-- 名稱與帳號 -->
						<view class="rank-account-info-name-container">
							<view class="rank-account-info-name-title-container">
								<text class="rank-account-info-title">{{ 'a' }}</text>
								<!-- 認證圖標 -->
								<view class="rank-account-info-prove-container">
									<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
										color="var(--text-color-senary)"></uni-icons>
								</view>
							</view>
							<view class="rank-account-info-name-account-container">
								<text class="rank-account-info-account">{{ '@88qwe8.88' }}</text>
							</view>
						</view>
					</view>
					<!-- 靠右 -->
				</view>
				<view class="rank-content-container-bottom-following-list-item-button-container">
					{{ '1.5K' }}
				</view>
			</view>
			<view class="rank-bottom-distance-container">
				<view class="icon-container">
					<uni-icons class="icon-rank-up" type="icon-rank-up" custom-prefix="icon" size="24"
						color="var(--text-color-primary)"></uni-icons>
				</view>
				<view class="distance-container">
					<text>你的排名距離前一名 </text>
				</view>
				<view class="distance-num-container">
					<text class="distance-num">4576</text>
					<text class="distance-unit">粉絲</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 關注頁面
import { onShow } from '@dcloudio/uni-app';
import { router } from '@/utils/routers';
const rankList = ref([
	{
		following: true,
		avatar: '/static/images/template/img-template-01.png',
		name: 'a',
		account: '@88qwe8.88',
		fansNum: '350M',
		rank: 1
	},
	{
		following: false,
		avatar: '/static/images/template/img-template-02.png',
		name: 'a1',
		account: '@881238.88',
		fansNum: '342M',
		rank: 2
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'a2',
		account: '@aaaew8.88',
		fansNum: '256M',
		rank: 3
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88',
		fansNum: '1.5K',
		rank: 4
	},
	{
		following: false,
		avatar: '/static/images/template/img-template-04.png',
		name: 'a1',
		account: '@881238.88',
		fansNum: '1.5K',
		rank: 5
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-01.png',
		name: 'a2',
		account: '@aaaew8.88',
		fansNum: '1.5K',
		rank: 6
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88',
		fansNum: '1.5K',
		rank: 7
	},
	{
		following: false,
		avatar: '/static/images/template/img-template-04.png',
		name: 'a1',
		account: '@881238.88',
		fansNum: '1.5K',
		rank: 8
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-01.png',
		name: 'a2',
		account: '@aaaew8.88',
		fansNum: '1.5K',
		rank: 9
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-01.png',
		name: 'a2',
		account: '@aaaew8.88',
		fansNum: '1.5K',
		rank: 10
	},
])
// 搜尋文字
const searchText = ref('')
// 搜尋欄顯示狀態
const searchStatus = ref(false)


// 類別
const categoryValue = ref('fans')
const categoryList = ref([
	{
		name: '粉絲',
		value: 'fans',
	},
	{
		name: '愛心',
		value: 'love',
	},
])
const switchCategory = (value: string) => {
	categoryValue.value = value
}
// 日期榜類別
const dateCategoryValue = ref('day')
const dateCategoryList = ref([
	{
		name: '日榜',
		value: 'day',
	},
	{
		name: '周榜',
		value: 'week',
	},
	{
		name: '月榜',
		value: 'month',
	},

])
const switchDateCategory = (value: string) => {
	dateCategoryValue.value = value
}

// 切換關注
const switchFollowing = (item: any) => {
	item.following = !item.following
}

// 顯示搜尋欄
const showSearch = (status: boolean) => {
	searchStatus.value = status
	if (!status) {
		searchText.value = ''
	}
}

// 搜尋文字替換處理
const handleSearch = (text: string) => {
	searchText.value = text.trim()
};


onShow(() => {
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.rank-page {
	// padding: 0 100rpx;
}

.rank-page-header {
	::v-deep(.header-nav-container) {
		.header-nav-container {
			// border: none;
			// padding-bottom: 0;
		}
	}
}


.rank-category-container {
	display: flex;
	justify-content: center;
	align-items: center;
	// border-bottom: 1px solid var(--text-color-octonary);

	.rank-category-item {
		// flex: 1;
		padding: 40rpx 88rpx 4rpx;
		font-size: 32rpx;
		color: var(--text-color-primary);
		text-align: center;

		&.active {
			border-bottom: 6rpx solid var(--favorite-color);
		}
	}
}

.rankDate-category-container {
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--text-color-denary);
	padding: 8rpx 0;
	margin: 0 44rpx;
	margin-top: 4rpx;
	border-radius: 10rpx;
	// border-bottom: 1px solid var(--text-color-octonary);

	.rankDate-category-item {
		// flex: 1;
		padding: 12rpx 40rpx;
		font-size: 32rpx;
		color: var(--popTxt-color-content);
		text-align: center;
		border-radius: 10rpx;

		&.active {
			color: var(--text-color-secondary);
			background-color: var(--text-color-primary);
			// border-bottom: 6rpx solid var(--favorite-color);
		}
	}
}

.firstRank-container {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	padding: 36rpx 44rpx 0;

	.firstRank-item:first-child {
		order: 1;
	}

	.firstRank-item:nth-child(2) {
		order: 0;
		margin-top: 36rpx;
	}

	.firstRank-item:last-child {
		order: 2;
		margin-top: 36rpx;
	}
}

.firstRank-medal-container {
	position: absolute;
	right: 0;
	top: 0;
	transform: translate(30%, -15%);

	.firstRank-medal {
		width: 60rpx;
		height: 60rpx;
		aspect-ratio: 1/1;
	}
}

.firstRank-item {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;

	// 頭像
	.firstRank-avatar-container {
		position: relative;
		width: 150rpx;
		height: 150rpx;
		// border: 0rpx solid var(--primary-color);
		background: var(--primary-color);
		border-radius: 100%;
		overflow: hidden;


		// transform: translate(-50%, -50%);
		::v-deep(.firstRank-avatar) {
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

	// 自我介紹
	.firstRank-data-profile-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 40rpx;

		// gap: 4rpx;

		.firstRank-data-profile-container-item {
			font-size: 24rpx;
			color: var(--text-color-primary);

			// 名稱與帳號
			&.firstRank-data-profile-container-item-self-account {
				display: flex;
				flex-direction: column;
				align-items: center;

				.firstRank-data-profile-container-item-text-container {
					position: relative;
					display: flex;
				}

				.firstRank-data-profile-container-item-text-name {
					font-size: 28rpx;
					font-weight: 500;
					padding: 0 8rpx;
				}

				.firstRank-data-profile-container-item-text-name-icon {
					position: absolute;
					top: 50%;
					left: 100%;
					transform: translate(16rpx, -50%);
					color: var(--text-color-senary) !important;
					font-size: 32rpx !important;
				}

				.firstRank-data-profile-container-item-text-account {
					font-size: 18rpx;
					color: var(--popTxt-color-content);
					margin-top: -4rpx;
				}

				.firstRank-data-profile-container-item-text-num {
					font-size: 32rpx;
					color: var(--text-color-primary);
				}
			}

			// 自我介紹
			&.firstRank-data-profile-container-item-self-intro {
				text-align: center;
				line-height: 1.1;
			}

			// HASH TAG標籤
			&.firstRank-data-profile-container-item-hash-tag {
				display: flex;
				flex-wrap: wrap;
				gap: 32rpx;
				color: var(--text-color-senary);
				margin-bottom: 4rpx;
			}

			// 地標
			&.firstRank-data-profile-container-item-location {
				display: flex;
				align-items: center;
				gap: 4rpx;
				color: var(--text-color-quaternary);
			}

			// 網址
			&.firstRank-data-profile-container-item-url {
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

	.btn-container {
		margin-top: 28rpx;

		.btn {
			padding: 24rpx;
			min-width: 300rpx;
			font-size: 32rpx;
		}
	}
}

.rank-content-container {
	padding: 0 44rpx 280rpx;

	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 28rpx 0;
		}
	}
}

.rank-list-header-container {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 36rpx;
	font-weight: 500;
	color: var(--popTxt-color-content);
	min-width: 100rpx;
}

.rank-account-container {
	// padding: 8rpx;
	padding-top: 56rpx;
	margin-bottom: 32rpx;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* 帳號頭像 */
	.rank-account-info-container {
		display: flex;
		gap: 24rpx;

		// 頭像
		.rank-account-avatar-container {
			width: 100rpx;
			height: 100rpx;
			border: 6rpx solid var(--primary-color);
			background: var(--primary-color);
			border-radius: 100%;
			overflow: hidden;

			::v-deep(.rank-account-avatar) {
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

		/* 帳號資訊 */
		.rank-account-info-name-container {
			display: flex;
			flex-direction: column;
			justify-content: center;

			// 名稱
			.rank-account-info-name-title-container {
				display: flex;
				justify-content: space-between;

				.rank-account-info-title {
					font-size: 34rpx;
					color: var(--text-color-primary);
				}

				// 認證圖標
				.icon-community-prove {
					font-size: 28rpx !important;
				}
			}

			.rank-account-info-name-account-container {
				display: flex;
				height: fit-content;

				.rank-account-info-account {
					font-size: 18rpx;
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}

	.rank-content-container-bottom-following-list-item-button-container {
		font-size: 32rpx;
		font-weight: 500;
	}
}

.rank-content-container-bottom-record-container {
	.rank-account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 0;
	}

	.rank-content-container-bottom-record-title-container {
		display: flex;
		font-size: 24rpx;
		color: var(--text-color-primary);
	}

	.rank-content-container-bottom-record-list-item-amount-container {
		display: flex;
		align-items: center;
		gap: 48rpx;

		.rank-content-container-bottom-record-list-item-amount-icon {
			font-size: 24rpx !important;
			// padding-bottom: 4rpx;
		}
	}
}

/* 底部 */
.rank-bottom-myRank-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	background: var(--primary-color);

	.rank-bottom-myRank-item {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 44rpx 40rpx;
		background: var(--text-color-denary);

		.rank-account-container {
			padding-top: 0;
			margin-bottom: 0;
		}
	}

	.rank-bottom-myRank-title {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		background: var(--primary-color);
		color: var(--text-color-secondary);
		padding: 6rpx 28rpx 12rpx;
		padding-right: 52rpx;
		border-bottom-right-radius: 100rpx;
		line-height: 1;
	}

	.rank-bottom-myRank-header-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 36rpx;
		font-weight: 500;
		color: var(--popTxt-color-content);
		min-width: 100rpx;
	}
}

.rank-bottom-distance-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 44rpx;
	background: var(--play-sponsor-color-tertiary);

	.icon-container {
		.icon-rank-up {
			font-size: 32rpx !important;
		}
	}

	.distance-container,
	.distance-num-container {
		font-size: 20rpx;
	}

	.distance-num-container {
		display: flex;
		gap: 6rpx;
		align-items: center;
	}

	.distance-num {
		font-size: 32rpx;
		font-weight: 500;
	}
}
</style>
