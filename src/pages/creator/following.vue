<template>
	<view class="wallet-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.myFollowing')" :openSearch="true" @search="showSearch" />

		<!-- 搜尋容器 -->
		<view class="wallet-search-container" v-if="searchStatus">
			<uni-search-bar v-model="searchText" :placeholder="$t('common.search')" @input="handleSearch" />
		</view>

		<!--內容容器 -->
		<view class="wallet-content-container">
			<!-- 訂閱/購買紀錄 -->
			<view class="wallet-content-container-bottom-record-container">
				<!-- 紀錄列表 垂直排序 -->
				<uni-list :border="false" class="wallet-content-container-bottom-record-list-container">
					<!-- 紀錄 space-between 左右排列 -->
					<template v-for="(item, index) in renderFollowingList" :key="index">
						<uni-list-item :border="true" class="wallet-content-container-bottom-record-list-item">
							<template #body>
								<!-- 帳號頭像和錢包總額文字 水平排列 -->
								<view class="wallet-account-container wallet-account-container-record">
									<!-- 帳號頭像 垂直排列 -->
									<view class="wallet-account-info-container">
										<!-- 頭像 -->
										<view class="wallet-account-avatar-container">
											<image class="wallet-account-avatar" :src="item.avatar" mode="widthFix">
											</image>
										</view>
										<!-- 名稱與帳號 -->
										<view class="wallet-account-info-name-container">
											<view class="wallet-account-info-name-title-container">
												<text class="wallet-account-info-title">{{ item.name }}</text>
												<!-- 認證圖標 -->
												<view class="wallet-account-info-prove-container">
													<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
														color="var(--text-color-senary)"></uni-icons>
												</view>
											</view>
											<view class="wallet-account-info-name-account-container">
												<text class="wallet-account-info-account">{{ item.account }}</text>
											</view>
										</view>
									</view>
									<!-- 靠右按鈕 -->
									<view class="wallet-content-container-bottom-following-list-item-button-container">
										<!-- 關注按鈕 -->
										<button tpye="button" class="wallet-content-container-bottom-following-list-item-button unActive"
											@click="switchFollowing(item)">
											{{ item.following ? $t('creator.following') : $t('creator.unFollowing') }}
										</button>
									</view>
								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 關注頁面
import { onShow } from '@dcloudio/uni-app';
import { router } from '@/utils/routers';
const followingList = ref([
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-04.png',
		name: 'a1',
		account: '@881238.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-01.png',
		name: 'a2',
		account: '@aaaew8.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-02.png',
		name: 'd',
		account: '@853588.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'e',
		account: '@aabb88.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'f',
		account: '@bbcc88.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-04.png',
		name: 'g',
		account: '@abcs88.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'h',
		account: '@ccdd88.88'
	},
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'i',
		account: '@ef8f8e.88'
	},
])
// 搜尋文字
const searchText = ref('')
// 搜尋欄顯示狀態
const searchStatus = ref(false)

// 渲染列表
const renderFollowingList = computed(() => {
	// 處理搜尋文字
	const _text = searchText.value.trim().replace(/^@+/, ''); // 把開頭多餘的 @ 移除
	const keyword = _text.trim().toLowerCase();
	if (!keyword) return followingList.value;

	// 過濾符合的
	return followingList.value.filter(user => {
		return user.name.toLowerCase().includes(keyword) || user.account.toLowerCase().includes(keyword)
	});
})

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

.wallet-page {
	// padding: 0 100rpx;
}

.header-nav-container {
	position: relative;
	display: flex;
	justify-content: center;
	padding: 32rpx;
	padding-top: 48rpx;
	border-bottom: 1px solid var(--text-color-octonary);

	// 圖標容器
	.header-nav-icon-container {
		position: absolute;
		left: 48rpx;
		top: 50%;
		transform: translateY(-50%);
		padding-top: 16rpx;
	}

	// 標題容器
	.header-nav-title-container {
		font-size: 32rpx;
		color: var(--text-color-primary);
	}
}

.wallet-content-container {
	padding: 0 32rpx;
}

/* 錢包頁面 頂部容器 */
.wallet-content-container-top {
	padding: 0 64rpx;
	margin-bottom: 96rpx;

	// 錢包金額
	.wallet-amount-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 32rpx;

		// padding: 0 64rpx;
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100%;
			border-bottom: 2rpx solid var(--text-color-octonary);
		}

		.wallet-amount-item {
			font-size: 48rpx;
			color: var(--text-color-primary);
		}
	}
}

/* 帳號頭像和錢包總額文字 */
.wallet-account-container {
	// padding: 8rpx;
	padding-top: 56rpx;
	margin-bottom: 32rpx;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* 帳號頭像 */
	.wallet-account-info-container {
		display: flex;
		gap: 24rpx;

		// 頭像
		.wallet-account-avatar-container {
			width: 96rpx;
			height: 96rpx;
			border: 6rpx solid var(--primary-color);
			background: var(--primary-color);
			border-radius: 100%;
			overflow: hidden;

			::v-deep(.wallet-account-avatar) {
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
		.wallet-account-info-name-container {
			display: flex;
			flex-direction: column;
			justify-content: center;

			// 名稱
			.wallet-account-info-name-title-container {
				display: flex;
				justify-content: space-between;

				.wallet-account-info-title {
					font-size: 28rpx;
					color: var(--text-color-primary);
				}

				// 認證圖標
				.icon-community-prove {
					font-size: 28rpx !important;
				}
			}

			.wallet-account-info-name-account-container {
				display: flex;
				height: fit-content;

				.wallet-account-info-account {
					font-size: 20rpx;
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}

	.wallet-account-total-amount-container {
		margin-right: 32rpx;
		font-size: 24rpx;
		color: var(--text-color-primary);
		transform: translateY(-10rpx);
	}

}

/* 錢包頁面 底部容器 */
.wallet-content-container-bottom {
	margin-top: 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32rpx;

	/* 訂閱/關注人數 */
	.wallet-content-container-bottom-data {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 32rpx;
		width: 100%;

		.wallet-content-container-bottom-data-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			border-radius: 16rpx;
			background-color: var(--background-color-orange);
			color: var(--text-color-secondary);
			font-weight: normal;
			padding: 16rpx 32rpx;

			&:last-child {
				background-color: var(--background-color-blue);

			}

			.wallet-content-container-bottom-data-item-title {
				font-size: 16rpx;
			}

			.wallet-content-container-bottom-data-item-value {
				font-size: 40rpx;
				font-weight: 300;
			}
		}
	}

	/* 提領按鈕 */
	.wallet-content-container-bottom-button-container {
		width: 50%;

		.wallet-content-container-bottom-button {
			font-size: 24rpx;
			line-height: 1;
			padding: 24rpx 64rpx;
			border-radius: 16rpx;
			background-color: var(--primary-color);
			color: var(--text-color-secondary);
		}

	}
}

/* 訂閱/購買紀錄 */
.wallet-content-container-bottom-record-container {
	.wallet-account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 16rpx 0;
	}

	.wallet-content-container-bottom-record-title-container {
		display: flex;
		font-size: 24rpx;
		color: var(--text-color-primary);
	}

	.wallet-content-container-bottom-record-list-item-amount-container {
		display: flex;
		align-items: center;
		gap: 48rpx;

		.wallet-content-container-bottom-record-list-item-amount-icon {
			font-size: 24rpx !important;
			// padding-bottom: 4rpx;
		}
	}
}

.wallet-content-container-bottom-following-list-item-button {
	border-radius: 18rpx;
	padding: 16rpx 24rpx;
	line-height: 1;
	font-size: 20rpx;
	background-color: var(--primary-color);
	color: var(--text-color-secondary);

	&::after {
		display: none;
	}

	&.unActive {
		background-color: var(--text-color-septenary);
		color: var(--text-color-primary);
	}
}
</style>
