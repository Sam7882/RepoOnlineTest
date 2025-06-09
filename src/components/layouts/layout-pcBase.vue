<template>
	<view class="pc-layout">
		<!-- 左側多欄位導覽區 -->
		<pc-SlideNav />

		<!-- 右側主畫面 -->
		<view class="main-area">
			<!-- 頂部導航列 -->
			<pc-HeaderNav class="header-area" />
			<!-- 內容區域 -->
			<view class="content-area">
				<slot />
			</view>
		</view>

		<!-- 懸浮按鈕 -->
		<view class="icon-container floating-button" @click="contentScrollTop">
			<uni-icons class="icons" type="up" size="24" color="var(--text-color-primary)" />
		</view>
	</view>
</template>

<script setup>

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


</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.pc-layout {
	--main-area-padding: 72rpx;

	@media screen and (min-width: 1280px) {
		--main-area-padding: 120rpx;
	}

	@media screen and (min-width: 1440px) {
		--main-area-padding: 150rpx;
	}

	@media screen and (min-width: 1920px) {
		--main-area-padding: 200rpx;
	}
}

.pc-layout {
	position: relative;
	display: flex;
	height: 100vh;
	/* 高度撐滿視窗 */
	overflow: hidden;
}

.main-area {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.header-area,
.content-area {
	padding: 0 var(--main-area-padding);
}

.content-area {
	flex: 1;
	overflow-y: auto;
	background-color: #fff;

}

.floating-button {
	position: fixed;
	bottom: 5%;
	right: 50px;
	z-index: 10;
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background-color: var(--text-color-septenary);

	@media screen and (min-width: 1280px) {
		width: 90rpx;
		height: 90rpx;
	}


	&:hover {
		cursor: pointer;
	}

	&>.icons {
		color: var(--text-color-secondary) !important;
		font-size: 40rpx !important;

		@media screen and (min-width: 1280px) {
			font-size: 48rpx;
		}
	}
}
</style>