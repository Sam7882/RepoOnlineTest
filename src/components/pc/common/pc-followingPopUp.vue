<template>
	<uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
		background-color="#f6f6f6">
		<view class="popup-container">
			<!-- 標題與關閉 -->
			<view class="popup-header">
				<view class="header-title">
					<text class="title">{{ 'jesiicatestid' }}</text>
					<view class="deco-line"></view>
				</view>
				<!--內容容器 -->
				<!-- <view class="content-container">

		</view> -->
				<view class="icon-container popup-close-container">
					<uni-icons class="icons" type="closeempty" size="24" @click="close" />
				</view>
			</view>
			<view class="popup-content">
				<!-- 類別 -->
				<view class="wallet-category-container">
					<template v-for="(item, index) in categoryList" :key="index">
						<view class="wallet-category-item" :class="{ active: categoryValue === item.value }"
							@click="switchCategory(item.value)">
							<text class="wallet-category-item-text">{{ item.name }} {{ item.num }}</text>
						</view>
					</template>
				</view>
				<!-- 搜尋容器 -->
				<view class="wallet-search-container">
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
								<uni-list-item :border="false" class="wallet-content-container-bottom-record-list-item">
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
											<view class="wallet-content-container-bottom-following-list-item-button-container btn-container">
												<!-- 關注按鈕 -->
												<button tpye="button" class="wallet-content-container-bottom-following-list-item-button btn"
													:class="{ 'unActive': item.following }" @click="switchFollowing(item)">
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
		</view>
	</uni-popup>

	<c-confirmPopUp ref="confirmPopUp" />
</template>

<script setup lang="ts">
// TEMP: 創作者設定-封鎖頁編輯
import { onShow } from '@dcloudio/uni-app';
import { useViewportStore } from '@/stores/useViewportStore'
import { checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)
const emit = defineEmits(['close'])
const popupRef = ref()
// 打開
const open = () => {
	popupRef.value?.open()
}
// 確認是否有按下 保存的判斷依據
const haveClickConfirm = ref(false)
const close = () => {
	popupRef.value?.close()
	emit('close')
}

defineExpose({ open, close })

const { t } = useI18n()

const followingList = ref([
	{
		following: true,
		avatar: '/static/images/template/img-template-03.png',
		name: 'a',
		account: '@88qwe8.88'
	},
	{
		following: false,
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
		following: false,
		avatar: '/static/images/template/img-template-02.png',
		name: 'd',
		account: '@853588.88'
	},
	{
		following: false,
		avatar: '/static/images/template/img-template-03.png',
		name: 'e',
		account: '@aabb88.88'
	},
	{
		following: false,
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

// 類別
const categoryValue = ref('fans')
const categoryList = ref([
	{
		name: t('creator.fans'),
		value: 'fans',
		num: '1.6k'
	},
	{
		name: t('creator.unFollowing'),
		value: 'following',
		num: '0.5k'
	},
	{
		name: t('creator.like'),
		value: 'love',
		num: '5.6M'
	},
])
const switchCategory = (value: string) => {
	categoryValue.value = value
}

// 切換關注
const switchFollowing = (item: any) => {
	item.following = !item.following
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

<style scoped lang="scss">
::v-deep(.uni-popup) {
	& {
		z-index: var(--z-index-max) !important;
		overflow: hidden;
	}
}

.popup-container {
	padding: 32rpx 0;
	border-radius: 60rpx 60rpx 0 0;
	background-color: var(--background-color-light);
	width: fit-content;
	overflow: visible;


	@media screen and (min-width: 961px) {
		border-radius: 32rpx;
		width: 80vw;
		max-width: 800rpx;
	}

	@media screen and (min-width: 1920px) {
		max-width: 1000rpx;
	}

	@media screen and (min-width: 2560px) {
		max-width: 1200rpx;
	}
}

.popup-header {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: visible;
}

.header-title {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.title {
		font-size: var(--font-size-title-pc-xlarge);
	}

	.deco-line {
		width: 100%;
		margin: 0;
		margin-top: 16rpx;
		height: 4px;
	}
}

.popup-close-container {
	position: absolute;
	top: 50%;
	right: 64rpx;
	z-index: 10;
	transform: translateY(-70%);

	.popup-close {
		font-size: var(--font-size-title-pc-xlarge) !important;
	}
}


.popup-title {
	font-size: var(--font-size-title-pc-large);
}

.popup-content {
	background-color: var(--background-color-light);
	padding: 40rpx 0;
	border-radius: 40rpx;
	overflow: visible;
}

.popup-subtitle {
	font-size: var(--font-size-content-pc-small);
	margin-bottom: 16rpx;
	color: var(--text-color-primary);
}

.popup-options {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
	margin-bottom: 64rpx;
}

.popup-option {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.popup-option-main {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}


.popup-option-title {
	font-size: var(--font-size-title-pc);
	color: var(--text-color-primary);
}

.popup-option-desc {
	font-size: var(--font-size-content-pc-small);
	color: var(--text-color-quaternary);
}

.popup-option-radio-container {
	position: relative;

	.popup-option-radio {
		opacity: 0;
	}
}

.popup-option-custom-checked {
	z-index: 10;
	position: absolute;
	right: 4px;
	top: 2px;

	.popup-option-custom-checked-image {
		width: 34rpx;
		height: 34rpx !important;
	}

	::v-deep(.popup-option-custom-checked-image) {

		// width: 24rpx;
		// height: 24rpx;
	}
}

.popup-confirm-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.popup-confirm {
	display: inline-block;
	background-color: var(--primary-color);
	color: #fff;
	border-radius: 20rpx;
	padding: 20rpx 96rpx;
	font-size: var(--font-size-content-pc);
	line-height: 1;
}
</style>

<style lang="scss" scoped>
.wallet-page {
	background-color: var(--background-color);

	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);

	// 設定窗口最大寬度
	max-width: var(--setting-page-maxWidth);


	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position {
			left: 0;
		}
	}
}

.wallet-page-header {
	::v-deep(.header-nav-container) {
		.header-nav-container {
			border: none;
		}
	}
}

.wallet-category-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid var(--text-color-octonary);

	.wallet-category-item {
		flex: 1;
		padding: 0 32rpx 20rpx;
		font-size: var(--font-size-title-pc-large);
		color: var(--text-color-primary);
		text-align: center;

		&:hover {
			cursor: pointer;
		}

		&.active {
			border-bottom: 2px solid var(--text-color-primary);
		}
	}
}

.wallet-search-container {
	padding: 0 32rpx;
}

.wallet-content-container {
	// padding: 0 44rpx;

	width: 100%;
	height: 50dvh;
	padding: 0 50rpx;
	overflow-y: scroll;

	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 28rpx 0;
			cursor: default;
		}
	}
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
			font-size: var(--font-size-title-pc-xlarge);
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
			width: 100rpx;
			height: 100rpx;
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
					font-size: var(--font-size-title-pc);
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
					font-size: var(--font-size-content-pc);
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}

	.wallet-account-total-amount-container {
		margin-right: 32rpx;
		font-size: var(--font-size-content-pc);
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
				font-size: var(--font-size-content-pc-small);
			}

			.wallet-content-container-bottom-data-item-value {
				font-size: var(--font-size-title-pc-xlarge);
				font-weight: 300;
			}
		}
	}

	/* 提領按鈕 */
	.wallet-content-container-bottom-button-container {
		width: 50%;

		.wallet-content-container-bottom-button {
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
.wallet-content-container-bottom-record-container {
	.wallet-account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 0;
	}

	.wallet-content-container-bottom-record-title-container {
		display: flex;
		font-size: var(--font-size-content-pc);
		color: var(--text-color-primary);
	}

	.wallet-content-container-bottom-record-list-item-amount-container {
		display: flex;
		align-items: center;
		gap: 48rpx;

		.wallet-content-container-bottom-record-list-item-amount-icon {
			font-size: var(--font-size-content-pc) !important;
			// padding-bottom: 4rpx;
		}
	}
}

.wallet-content-container-bottom-following-list-item-button {
	min-width: 180rpx;
	border-radius: 20rpx;
	padding: 20rpx 48rpx;
	line-height: 1;
	font-size: var(--font-size-content-pc-small);
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
