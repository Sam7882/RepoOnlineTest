<template>
	<view class="slide-nav">
		<!-- 可以根據需要支援多組欄位 -->
		<!-- logo 區塊 -->
		<view class="logo-container">
			<view class="slogan">
				<image class="logo" src="/static/logo.png" mode="widthFix" />
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
		<view class="menu-item">
			<template v-for="item in menu" :key="item.text">
				<view class="menu-item-container" :class="{ 'active': item.path === currentPath }"
					@click="item.fn ? item.fn() : null" v-if="!item.needLogin || (item.needLogin && isLogin)">
					<view class="menu-item-icon">
						<uni-icons class="icon-menu" :type="item.icon" custom-prefix="icon" size="24"
							color="var(--text-color-primary)" />
					</view>
					<text class="menu-item-text">
						{{ item.text }}
					</text>
				</view>
			</template>
		</view>

		<!-- 登入登出按鈕 -->
		<view class="btn-container">
			<button type="button" class="btn">
				<template v-if="isLogin">
					<view class="icon-container">
						<uni-icons class="icon-out" type="icon-common-out" custom-prefix="icon" size="24"
							color="var(--text-color-secondary)" />
					</view>
					<text class="btn-text">
						{{ $t('auth.login') }}
					</text>
				</template>
				<template v-else>
					<text class="btn-text">
						{{ $t('auth.logout') }}
					</text>
				</template>
			</button>
		</view>

		<!-- copyright -->
		<view class="copyright">
			<text>
				© 2025 FRANCE
			</text>
		</view>

		<!-- 聯繫客服 -->
		<c-servicePopUp ref="servicePopUp" />
	</view>
</template>

<script setup>
// TEMP: PC-側邊欄位
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// 登入狀態
const isLogin = computed(() => {
	return true;
})

// 當前路徑
const currentPath = computed(() => {
	return getCurrentPages()[0].route;
})


const servicePopUp = ref(null)

const openService = () => {
	console.log("🚀 ~ openService ~ openService :")
	servicePopUp.value.open()
}


// 選單
const menu = [
	{
		path: '/pages/pc/play/index',
		text: t('menu.viedeoHome'),
		icon: 'icon-common-home',
		needLogin: false
	},
	// 影音頁
	{
		path: '/pages/pc/play/index',
		text: t('common.video'),
		icon: 'icon-common-video',
		needLogin: false
	},
	{
		path: '/pages/pc/play/index',
		text: t('common.photo'),
		icon: 'icon-common-photo',
		needLogin: false
	},
	// 影音頁 我的關注
	{
		path: '/pages/pc/play/index',
		text: t('creator.myFollowing'),
		icon: 'icon-common-focus',
		needLogin: true
	},
	{
		path: '/pages/pc/play/index',
		text: t('common.recommend'),
		icon: 'icon-common-recommend',
		needLogin: true
	},
	{
		path: '/pages/pc/post/post-Preview',
		text: t('post.upload'),
		icon: 'icon-common-plus',
		needLogin: false
	},
	{
		path: '/pages/pc/creator/favorites',
		text: t('creator.myFavorites'),
		icon: 'icon-menu-wallet',
		needLogin: true
	},
	{
		path: '/pages/pc/creator/center',
		text: t('menu.profile'),
		icon: 'icon-common-person',
		needLogin: true
	},
	{
		path: '/pages/pc/creator/messageBox',
		text: t('common.message'),
		icon: 'icon-common-email',
		needLogin: true
	},
	{
		path: '/pages/pc/search/index',
		text: t('menu.service'),
		icon: 'icon-common-service',
		needLogin: false,
		fn: () => {
			openService()
		}
	}
]
</script>

<style lang="scss" scoped>
.slide-nav {
	position: relative;
	background: var(--background-color);
	padding: 70rpx 75rpx;
	box-shadow: 2rpx 0 8rpx rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	border-right: 4rpx solid var(--text-color-denary);

	@media (min-width: 1280px) {
		padding: 70rpx 80rpx;
	}
}

.logo-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #fff;
	width: 100%;
	padding-bottom: 80rpx;

	.logo {
		width: 240rpx;

		@media (min-width: 1280px) {
			width: 320rpx;
		}
	}

	.slogan {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// width: 150rpx;

		.brand-container {
			display: flex;
			justify-content: center;

			.brand {
				display: block;
				font-size: 64rpx;
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

		.desc {
			width: 240rpx;
			font-size: 24rpx;
		}

	}
}

.menu-item {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
	// padding: 16rpx 0;
	color: #333;

	@media (min-width: 1280px) {
		gap: 48rpx;
	}

	.menu-item-container {
		display: flex;
		align-items: center;
		gap: 32rpx;

		&:hover {
			cursor: pointer;
		}

		@media (min-width: 1280px) {
			gap: 48rpx;
		}

		.menu-item-icon {
			.icon-menu {
				font-size: 36rpx !important;
				color: var(--text-color-primary) !important;

				@media (min-width: 1280px) {
					font-size: 40rpx !important;
				}
			}
		}

		.menu-item-text {
			font-size: 36rpx;
			color: var(--text-color-primary);

			@media (min-width: 1280px) {
				font-size: 40rpx;
			}
		}

		&.active {
			.menu-item-icon {
				.icon-menu {
					color: var(--primary-color) !important;
				}
			}

			.menu-item-text {
				color: var(--primary-color);
			}
		}
	}

}

.btn-container {
	margin-top: 80rpx;

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;
		border-radius: 100rpx;
		padding: 20rpx 52rpx;

		@media (min-width: 1280px) {
			padding: 24rpx 52rpx;
		}

		.icon-container {
			.icon-out {
				font-size: 36rpx !important;
				color: var(--text-color-secondary);

				@media (min-width: 1280px) {
					font-size: 40rpx !important;
				}
			}
		}

		.btn-text {
			font-size: 32rpx;
			color: var(--text-color-secondary);

			@media (min-width: 1280px) {
				font-size: 40rpx;
			}
		}
	}
}

.copyright {
	position: absolute;
	bottom: 60rpx;
	left: 50%;
	// right: 50%;
	transform: translateX(-50%);
	font-size: 28rpx;
	color: var(--text-color-primary);
}
</style>
