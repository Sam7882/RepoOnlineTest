<template>
	<!-- 第三方登入 -->
	<view class="social-login">
		<image class="social-icon" src="/static/icons/community/icon-community-facebook.png" />
		<image class="social-icon" src="/static/icons/community/icon-community-line.png" />
		<image class="social-icon" src="/static/icons/community/icon-community-google.png" />
		<image class="social-icon" src="/static/icons/community/icon-community-wechat.png" />
	</view>
</template>
<script>
</script>
<style lang="scss" scoped>
.social-login {
	display: flex;
	justify-content: center;
	margin-top: 40rpx;
	gap: 24rpx;
}

.social-icon {
	width: 80rpx;
	height: 80rpx;

	&:hover {
		cursor: pointer;
	}
}
</style>