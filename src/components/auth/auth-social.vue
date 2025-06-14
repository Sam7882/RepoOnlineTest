<template>
	<!-- TODO: icon使用svg -->
	<!-- 第三方登入 -->
	<view class="social-login">
		<view>

		</view>
		<image class="social-icon" src="/static/icons/community/icon-community-facebook.svg" />
		<image class="social-icon" src="/static/icons/community/icon-community-line.svg" />
		<image class="social-icon" src="/static/icons/community/icon-community-google.svg" />
		<image class="social-icon" src="/static/icons/community/icon-community-wechat.svg" />
	</view>
</template>
<script>
</script>
<style lang="scss" scoped>
.social-login {
	display: flex;
	justify-content: center;
	margin-top: 40rpx;
	gap: 46rpx;
}

.social-icon {
	width: 100rpx;
	height: 100rpx;

	&:hover {
		cursor: pointer;
	}
}
</style>