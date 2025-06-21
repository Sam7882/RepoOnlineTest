<template>
	<view class="blockade-page">
		<!-- header 導航-->
		<c-headerNav class="blockade-page-header" :title="t('creator.blockadeList')" :openSearch="true"
			@search="showSearch" />

		<!-- 搜尋容器 -->
		<view v-if="searchStatus">
			<uni-search-bar v-model="searchText" :placeholder="$t('common.search')" @input="handleSearch" />
		</view>

		<!--內容容器 -->
		<view class="content-container">
			<view class="content-container-bottom-record-container">
				<uni-list :border="false" class="content-container-bottom-record-list-container">
					<template v-for="(item, index) in renderBlockadeList" :key="index">
						<uni-list-item :border="false" class="content-container-bottom-record-list-item">
							<template #body>
								<!-- 帳號頭像和錢包總額文字 水平排列 -->
								<view class="account-container account-container-record">
									<!-- 帳號頭像 垂直排列 -->
									<view class="account-info-container">
										<!-- 頭像 -->
										<view class="account-avatar-container">
											<image class="account-avatar" :src="item.avatar" mode="widthFix">
											</image>
										</view>
										<!-- 名稱與帳號 -->
										<view class="account-info-name-container">
											<view class="account-info-name-title-container">
												<text class="account-info-title">{{ item.name }}</text>
												<!-- 認證圖標 -->
												<view class="account-info-prove-container">
													<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
														color="var(--text-color-senary)"></uni-icons>
												</view>
											</view>
											<view class="account-info-name-account-container">
												<text class="account-info-account">{{ item.account }}</text>
											</view>
										</view>
									</view>

									<!-- 靠右按鈕 -->
									<view class="content-container-bottom-blockade-list-item-button-container">
										<!-- 按鈕 -->
										<button tpye="button" class="content-container-bottom-blockade-list-item-button"
											@click="deleteBlockade(item)">
											{{ $t('common.remove') }}
										</button>
									</view>

								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</view>

		<!-- 發送按鈕 -->
		<view class="footer">
			<view class="btn-container">
				<button type="button" class="btn" @click="confirmSave">{{ $t('common.save2') }}</button>
			</view>
		</view>

		<c-confirmPopUp ref="confirmPopUp" />
	</view>
</template>

<script setup lang="ts">
// TEMP: 創作者設定-封鎖頁編輯
import { onShow } from '@dcloudio/uni-app';
import { checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const blockadeList = ref([
	{
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88'
	},
	{
		avatar: '/static/images/template/img-template-04.png',
		name: 'a1',
		account: '@881238.88'
	},
	{
		avatar: '/static/images/template/img-template-01.png',
		name: 'a2',
		account: '@aaaew8.88'
	},
	{
		avatar: '/static/images/template/img-template-02.png',
		name: 'd',
		account: '@853588.88'
	},
	{
		avatar: '/static/images/template/img-template-03.png',
		name: 'e',
		account: '@aabb88.88'
	},
	{
		avatar: '/static/images/template/img-template-03.png',
		name: 'f',
		account: '@bbcc88.88'
	},
	{
		avatar: '/static/images/template/img-template-04.png',
		name: 'g',
		account: '@abcs88.88'
	},
	{
		avatar: '/static/images/template/img-template-03.png',
		name: 'h',
		account: '@ccdd88.88'
	},
	{
		avatar: '/static/images/template/img-template-03.png',
		name: 'i',
		account: '@ef8f8e.88'
	},
])
// 搜尋文字
const searchText = ref('')
// 搜尋欄顯示狀態
const searchStatus = ref(true)

// 渲染列表
const renderBlockadeList = computed(() => {
	// 處理搜尋文字
	const _text = searchText.value.trim().replace(/^@+/, ''); // 把開頭多餘的 @ 移除
	const keyword = _text.trim().toLowerCase();
	if (!keyword) return blockadeList.value;

	// 過濾符合的
	return blockadeList.value.filter(user => {
		return user.name.toLowerCase().includes(keyword) || user.account.toLowerCase().includes(keyword)
	});
})

// 切換關注
const deleteBlockade = (item: any) => {
	confirmPopUp.value.open({
		title: t('common.remove'),
		content: t('common.checkForRemove', { name: item.name }),
		onConfirm: () => {
			blockadeList.value = blockadeList.value.filter(user => user.account !== item.account)
			console.log("🚀 ~ 移除 ~ item:", item.name)
		}
	})
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

// 確認刪除
const confirmPopUp = ref()
const confirmSave = () => {
	confirmPopUp.value.open({
		title: t('common.save2'),
		content: t('auth.saveBlockadeList'),
		onConfirm: () => {
			console.log('成功移除')
		}
	})
}

onShow(() => {
	checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
.blockade-page {
	background-color: var(--background-color);
	--footer-height: 180rpx;
}

.blockade-page-header {
	::v-deep(.header-nav-container) {
		.header-nav-container {
			border: none;
		}
	}
}

.category-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--text-color-octonary);

	.category-item {
		flex: 1;
		padding: 0 32rpx 20rpx;
		font-size: var(--font-size-title-pc);
		color: var(--text-color-primary);
		text-align: center;

		&.active {
			border-bottom: 2px solid var(--text-color-primary);
		}
	}
}

.content-container {
	padding: 0 44rpx;
	// padding-bottom: var(--footer-height);

	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 28rpx 0;

			@media screen and (min-width: 768px) and (max-width: 960px) {
				padding: 16rpx 0;
			}
		}
	}
}

/* 錢包頁面 頂部容器 */
.content-container-top {
	padding: 0 64rpx;
	margin-bottom: 96rpx;

	// 錢包金額
	.amount-container {
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

		.amount-item {
			font-size: var(--font-size-title-pc-xlarge);
			color: var(--text-color-primary);
		}
	}
}

/* 帳號頭像和錢包總額文字 */
.account-container {
	// padding: 8rpx;
	padding-top: 56rpx;
	margin-bottom: 32rpx;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* 帳號頭像 */
	.account-info-container {
		display: flex;
		gap: 24rpx;

		// 頭像
		.account-avatar-container {
			width: 100rpx;
			height: 100rpx;
			border: 6rpx solid var(--primary-color);
			background: var(--primary-color);
			border-radius: 100%;
			overflow: hidden;

			@media screen and (min-width: 768px) and (max-width: 960px) {
				width: 80rpx;
				height: 80rpx;
			}

			::v-deep(.account-avatar) {
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
		.account-info-name-container {
			display: flex;
			flex-direction: column;
			justify-content: center;

			// 名稱
			.account-info-name-title-container {
				display: flex;
				justify-content: space-between;

				.account-info-title {
					font-size: var(--font-size-title-pc);
					color: var(--text-color-primary);
				}

				// 認證圖標
				.icon-community-prove {
					font-size: var(--font-size-content-pc-large) !important;
				}
			}

			.account-info-name-account-container {
				display: flex;
				height: fit-content;

				.account-info-account {
					font-size: var(--font-size-content-pc);
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}

	.account-total-amount-container {
		margin-right: 32rpx;
		font-size: var(--font-size-content-pc-small);
		color: var(--text-color-primary);
		transform: translateY(-10rpx);
	}

}

/* 錢包頁面 底部容器 */
.content-container-bottom {
	margin-top: 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32rpx;

	/* 訂閱/關注人數 */
	.content-container-bottom-data {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 32rpx;
		width: 100%;

		.content-container-bottom-data-item {
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

			.content-container-bottom-data-item-title {
				font-size: var(--font-size-content-pc-small);
			}

			.content-container-bottom-data-item-value {
				font-size: var(--font-size-title-pc-xlarge);
				font-weight: 300;
			}
		}
	}

	/* 提領按鈕 */
	.content-container-bottom-button-container {
		width: 50%;

		.content-container-bottom-button {
			font-size: var(--font-size-content-pc);
			line-height: 1;
			padding: 24rpx 64rpx;
			border-radius: 16rpx;
			background-color: var(--primary-color);
			color: var(--text-color-secondary);
		}

	}
}

/* 訂閱/購買紀錄 */
.content-container-bottom-record-container {
	height: calc(100dvh - var(--footer-height));
	padding-bottom: var(--footer-height);
	overflow-y: auto;

	.account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 0;
	}

	.content-container-bottom-record-title-container {
		display: flex;
		font-size: var(--font-size-content-pc);
		color: var(--text-color-primary);
	}

	.content-container-bottom-record-list-item-amount-container {
		display: flex;
		align-items: center;
		gap: 48rpx;

		.content-container-bottom-record-list-item-amount-icon {
			font-size: var(--font-size-content-pc) !important;
			// padding-bottom: 4rpx;
		}
	}
}

.content-container-bottom-blockade-list-item-button {
	min-width: 120rpx;
	border-radius: 10rpx;
	padding: 20rpx 32rpx;
	line-height: 1;
	font-size: var(--font-size-content-pc);
	background-color: var(--primary-color);
	color: var(--text-color-secondary);

	@media screen and (min-width: 768px) and (max-width: 960px) {
		min-width: 100rpx;
		padding: 16rpx 16rpx;
	}

	&::after {
		display: none;
	}

	&.unActive {
		background-color: var(--text-color-septenary);
		color: var(--text-color-primary);
	}
}


.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding-top: 20rpx;
	padding-bottom: 60rpx;
	background: var(--background-color);

	@media screen and (min-width: 768px) and (max-width: 960px) {
		padding-bottom: 32rpx;
	}

	.btn-container {
		padding: 0 40rpx;
		margin-top: 0;

		.btn {
			padding: 24rpx;
			font-size: var(--font-size-title-pc);
		}

	}

	// padding: 0 48rpx;
}
</style>
