<template>
	<view class="creator-home-page">
		<!-- 頂部 -->
		<view class="header-container">
			<view class="header-container-back-button" @click="handleAvator">
				<!-- <uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons> -->
				<view class="avatar-container">
					<image class="avatar" src="/static/images/template/img-template-03.png" mode="widthFix" />
				</view>
				<text class="header-container-title-text">{{
					'Jesiicatestid' }}</text>
			</view>

			<!-- 檢舉按鈕 -->
			<view class="item-top-menu-container">
				<c-reportPopUp />
			</view>
		</view>

		<!-- 訊息列表 -->
		<view class="content-container">
			<!-- 訊息列表 -->
			<scroll-view v-if="CurrentMessageList.length > 0" class="message-list-container" scroll-y :show-scrollbar="false">
				<uni-list class="message-list">
					<uni-list-item class="message-list-item" :border="false"
						:class="{ 'me': item.object === 'me', 'other': item.object === 'other', 'last': index === CurrentMessageList.length - 1 }"
						v-for="(item, index) in CurrentMessageList" :key="index">
						<template #header>
							<view class="avatar-container" v-if="item.object === 'other'">
								<image class="avatar" :src="item.avatar" mode="widthFix" />
							</view>
						</template>
						<template #body>
							<view v-if="item.object === 'date'" class="message-list-item-time">
								<text>{{ item.time }}</text>
							</view>

							<view v-else class="message-list-item-content">
								<text v-html="item.message"></text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</scroll-view>

			<!-- 無訊息時顯示 -->
			<view class="noMessage-container" v-else>
				<!-- 絕對位置 頭像 -->
				<view class="noMessage-avatar-container">
					<image class="noMessage-avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
					</image>
				</view>

				<!-- 名稱與帳號 垂直排序 -->
				<view class="noMessage-data-profile-container">
					<!-- 創作者名稱與帳號 -->
					<view class="noMessage-data-profile-container-item noMessage-data-profile-container-item-self-account">
						<view class="noMessage-data-profile-container-item-text-container">
							<text
								class="noMessage-data-profile-container-item-text noMessage-data-profile-container-item-text-name">名稱
							</text>
							<uni-icons class="noMessage-data-profile-container-item-text-name-icon" type="icon-community-prove"
								custom-prefix="icon" size="24" color="var(--text-color-primary)"></uni-icons>
						</view>
						<text
							class="noMessage-data-profile-container-item-text noMessage-data-profile-container-item-text-account">@88888.888</text>
						<text
							class="noMessage-data-profile-container-item-text noMessage-data-profile-container-item-text-account">163.3K位粉絲</text>

						<view class="btn-container">
							<button type="button" class="btn">
								{{ $t("creator.unFollowing") }}
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="message-bottom-container">
			<uni-easyinput class="inputStyle" v-model="inputMessage" :placeholder="$t('common.inputMessage')"
				@focus="handleFocus" @blur="handleBlur" />
			<view class="message-input-send-button">
				<template v-if="!showSend">
					<view class="icon-container">
						<uni-icons class="message-input-send-button-icon" type="icon-stander-camera" custom-prefix="icon" size="20"
							color="var(--text-color-primary)" />
					</view>
					<view class="icon-container">
						<uni-icons class="message-input-send-button-icon" type="icon-common-image-2" custom-prefix="icon" size="20"
							color="var(--text-color-primary)" />
					</view>
				</template>
				<view class="icon-container" v-else>
					<uni-icons class="message-input-send-button-icon" type="icon-common-share" custom-prefix="icon" size="20"
						color="var(--text-color-primary)" />
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
// TEMP: 訊息頁
import { onShow } from '@dcloudio/uni-app'
import { router, checkViewportAutoReplace } from '@/utils/routers'
const { back } = router;

const props = defineProps({
	id: {
		type: String,
		default: ''
	}
})

const handleAvator = () => {
	console.log('點了大頭照')
};

const CurrentMessageList = computed(() => {
	const data = MessageList.value.find(item => item.id === props.id)?.message || []
	console.log("🚀 ~ CurrentMessageList ~ data:", data)
	return data
})

const userInfo = ref({
	avatar: '/static/images/template/img-template-02.png',
	name: 'Jesiicatestid',
	account: '@sam',
	follower: '163.3K位粉絲',
})


const MessageList = ref([
	{
		id: '@88qwe8.88',
		message: [
			{
				message: '安安 妳好嗎 哈哈哈哈哈',
				time: '2025-11-25 19:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-02.png',
				object: 'date',
			},
			{
				message: '安安 妳好嗎 哈哈哈哈哈',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-02.png',
				object: 'other',
			},
			{
				message: '哈囉 你在嗎。。。？？',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-02.png',
				object: 'other',
			},
			{
				message: '哈囉  你好',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-02.png',
				object: 'me',
			},
			{
				message: '訊息',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-02.png',
				object: 'date',
			},
			{
				message: '哈囉哈囉！！',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-02.png',
				object: 'other',
			},
			{
				message: '嗨 嗨嗨嗨',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-03.png',
				object: 'me',
			},
			{
				message: '訊息',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-02.png',
				object: 'date',
			},
			{
				message: '你好啊',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-03.png',
				object: 'other',
			},
			{
				message: '你好😆',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-02.png',
				object: 'me',
			},
			{
				message: '訊息',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-03.png',
				object: 'other',
			},
			{
				message: '訊息',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-02.png',
				object: 'me',
			},
			{
				message: '訊息',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-03.png',
				object: 'other',
			},
		]
	},
	{
		id: '@881238.88',
		message: [
			{
				message: '2222安安 妳好嗎 哈哈哈哈哈',
				time: '2025-11-25 19:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'date',
			},
			{
				message: '2222安安 妳好嗎 哈哈哈哈哈',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'other',
			},
			{
				message: '2222哈囉 你在嗎。。。？？',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-01.png',
				object: 'other',
			},
			{
				message: '2222哈囉  你好',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-01.png',
				object: 'me',
			},
			{
				message: '2222訊息',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'date',
			},
			{
				message: '2222哈囉哈囉！！',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-01.png',
				object: 'other',
			},
			{
				message: '2222嗨 嗨嗨嗨',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'me',
			},
			{
				message: '2222訊息',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-01.png',
				object: 'date',
			},
			{
				message: '2222你好啊',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'other',
			},
			{
				message: '2222你好😆',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-01.png',
				object: 'me',
			},
			{
				message: '2222訊息',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'other',
			},
			{
				message: '2222訊息',
				time: '2021-01-01 12:00:00',
				user: 'me',
				avatar: '/static/images/template/img-template-01.png',
				object: 'me',
			},
			{
				message: '2222訊息',
				time: '2021-01-01 12:00:00',
				user: 'Jesiicatestid',
				avatar: '/static/images/template/img-template-01.png',
				object: 'other',
			},
		]
	},

])

const inputMessage = ref('')

const showSend = ref(false)
const handleFocus = () => {
	showSend.value = true
}
const handleBlur = () => {
	showSend.value = false
}

onShow(() => {
	checkViewportAutoReplace()
})

onMounted(() => {

})

</script>

<style lang="scss" scoped>
.creator-home-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	// padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);


	// 設定窗口最大寬度
	// max-width: var(--setting-page-maxWidth);


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

// HEADER
.header-container {
	position: relative;
	width: 100%;
	background: var(--text-color-secondary);
	display: flex;
	justify-content: space-between;
	padding: 16rpx 0;
	gap: 40rpx;
	border-bottom: 1px solid var(--background-color-grayLight2);

	.header-container-title {
		font-size: var(--font-size-title-pc);
		font-weight: 500;
	}

	.header-container-back-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20rpx;
	}

	.header-nav-icon {
		font-size: var(--font-size-title-pc) !important;
	}

	.header-container-title-text {
		font-size: var(--font-size-title-pc);
		font-weight: 500;
	}

	.avatar-container {
		width: 120rpx;
		height: 120rpx;

		@media screen and (min-width: 961px) and (max-width: 1280px) {
			width: 100rpx;
			height: 100rpx;
		}
	}



	// 頭像側邊按鈕
	.item-top-menu-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		// padding: 24rpx 0;
		// padding: 68rpx 40rpx 32rpx;
		gap: 28rpx;

		&:hover {
			cursor: pointer;
		}

		.item-container-item-top-menu {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 32rpx;

			.item-container-item-icon {
				font-size: var(--font-size-title-pc-large) !important;
				color: var(--text-color-primary) !important;
			}
		}
	}
}

// 頭像
.avatar-container {
	position: relative;
	width: 70rpx;
	height: 70rpx;
	border: 6rpx solid var(--primary-color);
	background: var(--primary-color);
	border-radius: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;


	// transform: translate(-50%, -50%);
	::v-deep(.avatar) {
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

.content-container {
	width: 100%;
	height: 100dvh;
	overflow-y: auto;
	// padding-top: 68px;
	padding-bottom: 80px;
	// .message-list-container {
	// 	height: 100%;
	// }

	.message-list {

		.message-list-item {

			.message-list-item-time {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: var(--font-size-title-pc-small);
				color: var(--text-color-gray3);
			}

			.message-list-item-content {
				width: fit-content;
				padding: 16rpx;
				background: var(--primary-color);
				border-radius: 40rpx;
				line-height: 1.5;
				color: var(--text-color-secondary);
				font-size: var(--font-size-title-pc);
				font-weight: normal;

				@media screen and (min-width: 768px) and (max-width: 960px) {
					padding: 10rpx 20rpx;
					margin: 10px 0;
				}
			}

			&.other {
				.message-list-item-content {
					background: var(--text-color-denary);
					color: var(--text-color-primary);
				}
			}

		}



		::v-deep(.uni-list-item) {
			.uni-list-item__container {
				display: flex;
				align-items: flex-start;
				gap: 14rpx;
				padding: 20rpx 40rpx;

				@media screen and (min-width: 768px) and (max-width: 960px) {
					padding: 10rpx 40rpx;
				}
			}

			&.me {
				.uni-list-item__container {
					flex-direction: row-reverse;
				}
			}

			&.last {
				margin-bottom: 144rpx;
			}

		}


	}
}

.message-bottom-container {
	position: relative;
	width: 100%;
	padding: 16rpx 18rpx 40rpx;
	background: var(--text-color-secondary);

	.message-input-send-button {
		position: absolute;
		bottom: 5%;
		right: 40rpx;
		transform: translateY(-50%);
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 12rpx;

		.icon-container {
			background: var(--text-color-white2);
			border-radius: 50%;
			padding: 12rpx;
			width: 72rpx;
			height: auto;
			aspect-ratio: 1/1;

			.message-input-send-button-icon {
				font-size: var(--font-size-title-pc-small) !important;
				color: var(--text-color-gray2) !important;
			}
		}
	}
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-denary) !important;
			border-radius: 20rpx;
			padding: 4rpx 20rpx;

			&.is-focused {
				// border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}

		.uni-input-placeholder {
			color: var(--popTxt-color-content) !important;
			font-size: var(--font-size-title-pc);
		}

		.uni-easyinput__content-input {
			color: var(--popTxt-color-content) !important;
			font-size: var(--font-size-title-pc);
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			// border: 1px solid var(--text-color-error) !important;
		}
	}
}

.noMessage-container {
	margin-top: 64rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;

	// 頭像
	.noMessage-avatar-container {
		position: relative;
		width: 204rpx;
		height: 204rpx;
		border: 12rpx solid var(--primary-color);
		background: var(--primary-color);
		border-radius: 100%;
		overflow: hidden;


		// transform: translate(-50%, -50%);
		::v-deep(.noMessage-avatar) {
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
	.noMessage-data-profile-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 40rpx;

		// gap: 4rpx;

		.noMessage-data-profile-container-item {
			font-size: var(--font-size-content-pc);
			color: var(--text-color-primary);

			// 名稱與帳號
			&.noMessage-data-profile-container-item-self-account {
				display: flex;
				flex-direction: column;
				align-items: center;

				.noMessage-data-profile-container-item-text-container {
					position: relative;
					display: flex;
				}

				.noMessage-data-profile-container-item-text-name {
					font-size: var(--font-size-title-pc-large);
					font-weight: bold;

				}

				.noMessage-data-profile-container-item-text-name-icon {
					position: absolute;
					top: 50%;
					right: -100%;
					transform: translate(-50%, -50%);
					color: var(--text-color-senary) !important;
					font-size: var(--font-size-title-pc) !important;
				}

				.noMessage-data-profile-container-item-text-account {
					font-size: var(--font-size-content-pc-large);
					color: var(--popTxt-color-content);
					margin-top: -4rpx;
				}
			}

			// 自我介紹
			&.noMessage-data-profile-container-item-self-intro {
				text-align: center;
				line-height: 1.1;
			}

			// HASH TAG標籤
			&.noMessage-data-profile-container-item-hash-tag {
				display: flex;
				flex-wrap: wrap;
				gap: 32rpx;
				color: var(--text-color-senary);
				margin-bottom: 4rpx;
			}

			// 地標
			&.noMessage-data-profile-container-item-location {
				display: flex;
				align-items: center;
				gap: 4rpx;
				color: var(--text-color-quaternary);
			}

			// 網址
			&.noMessage-data-profile-container-item-url {
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
			font-size: var(--font-size-title-pc);
		}
	}
}
</style>