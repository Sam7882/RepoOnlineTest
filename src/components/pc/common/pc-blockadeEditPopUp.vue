<template>
	<uni-popup ref="popupRef" :type="isPc ? 'center' : 'bottom'" :borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'"
		background-color="#f6f6f6">
		<view class="popup-container">
			<!-- 標題與關閉 -->
			<view class="popup-header">
				<view class="header-title">
					<text class="title">{{ $t('creator.blockadeList') }}</text>
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
				<!-- 搜尋容器 -->
				<view>
					<uni-search-bar v-model="searchText" :placeholder="$t('common.search')" @input="handleSearch" />
				</view>
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

				<!-- 發送按鈕 -->
				<view class="footer">
					<view class="btn-container">
						<button type="button" class="btn" @click="confirmSave">{{ $t('common.save2') }}</button>
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

const popupRef = ref()
// 打開
const open = () => {
	popupRef.value?.open()
}
// 確認是否有按下 保存的判斷依據
const haveClickConfirm = ref(false)
const close = () => {
	popupRef.value?.close()
}

defineExpose({ open, close })

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

<style scoped lang="scss">
::v-deep(.uni-popup) {
	& {
		z-index: var(--z-index-max) !important;
		overflow: hidden;
	}
}

.popup-container {
	padding: 32rpx;
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
	padding: 40rpx;
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
.blockade-page {
	--footer-height: 180rpx;
	background-color: var(--background-color);
	// padding: 0 100rpx;
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
		font-size: var(--font-size-title-pc-large);
		color: var(--text-color-primary);
		text-align: center;

		&.active {
			border-bottom: 2px solid var(--text-color-primary);
		}
	}
}

.content-container {
	padding: 0 44rpx;
	padding-bottom: var(--footer-height);

	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 28rpx 0;
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
					font-size: var(--font-size-title-pc-large);
					color: var(--text-color-primary);
				}

				// 認證圖標
				.icon-community-prove {
					font-size: 28rpx !important;
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
		font-size: var(--font-size-content-pc);
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
				font-size: var(--font-size-content-pc);
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
	width: 100%;
	max-height: 600rpx;
	aspect-ratio: 1/1.25;
	overflow-y: auto;

	// max-height: 500rpx ;
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
	min-width: 160rpx;
	border-radius: 10rpx;
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


.footer {
	position: relative;
	bottom: 0;
	left: 0;
	right: 0;
	padding-top: 64rpx;
	background: var(--background-color);

	.btn-container {
		padding: 0 40rpx;
		margin: 0;
		width: 100%;

		.btn {
			padding: 24rpx;
			border-radius: 30rpx;
			font-size: var(--font-size-title-pc);
		}

	}

	// padding: 0 48rpx;
}
</style>
