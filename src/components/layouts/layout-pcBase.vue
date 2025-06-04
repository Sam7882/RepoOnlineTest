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
	</view>
</template>

<script setup>



</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.pc-layout {
	--main-area-padding: 64rpx;
}

.pc-layout {
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
</style>