<template>
	<view class="set-menu">
		<c-headerNav :title="menuTitle">
		</c-headerNav>

		<!-- 內容 -->
		<view class="content">
			<view class="layout">
				<view class="avatar-container">
					<image class="avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
					</image>
				</view>
				<view class="title-container">
					<text>{{ content }}</text>
				</view>
			</view>
		</view>

		<!-- 按鈕 -->
		<view class="footer">
			<view class="btn-container"
				:class="{ 'btn-waiting': btnStatus === 'waiting', 'btn-already': btnStatus === 'already' }">
				<button class="btn" @click="openMessagePopUp()">{{ btnText }}</button>
			</view>
		</view>

		<c-messagePopUp ref="messagePopUpRef" />

	</view>
</template>

<script setup>
// TEMP: 創作者設定-選單頁面
import { onLoad } from '@dcloudio/uni-app'
import { router, toStatistics, toCreatorBlockadeEdit } from '@/utils/routers';
const { back } = router;

const menuTitle = ref('成為創作者')
const content = ref('歡迎您一起成為優秀的創作者！')
const btnStatus = ref('')
const btnText = computed(() => {
	if (btnStatus.value === 'waiting') {
		return '等待審核中'
	} else if (btnStatus.value === 'already') {
		return '已認證'
	} else if (btnStatus.value === 'apply') {
		return '申請'
	} else {
		return '加入'
	}
})
const type = ref('creator')


const messagePopUpRef = ref(null)
const openMessagePopUp = () => {
	messagePopUpRef.value.open({
		content: '很抱歉，未審核通過。',
		confirmBtnText: 'OK',
		onConfirm: () => {
			messagePopUpRef.value.close()
		}
	})
}

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	type.value = options.type
	console.log("🚀 ~ onLoad ~ type.value:", type.value)

	switch (type.value) {
		case 'creator':
			menuTitle.value = '成為創作者'
			content.value = '歡迎您一起成為優秀的創作者！'
			btnStatus.value = ''
			break
		case 'verifyCreator':
			menuTitle.value = '成為認證創作者'
			content.value = '加入百萬創作者橫列，\n獲得專屬認證。'
			btnStatus.value = 'apply'
			break
	}
})
</script>

<style scoped lang="scss">
.set-menu {
	--footer-height: 180rpx;
}

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-20%);
	padding-top: 16rpx;
}

.content {
	padding-bottom: var(--footer-height);
}

.layout {
	margin-top: 56rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

// 頭像
.avatar-container {
	position: relative;
	width: 208rpx;
	height: 208rpx;
	border: unset;
	background: var(--primary-color);
	border-radius: 100%;
	overflow: hidden;


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

.title-container {
	margin-top: 48rpx;
	font-size: 36rpx;
	font-weight: 500;
	text-align: center;
	white-space: pre-line;
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding-top: 20rpx;
	padding-bottom: 60rpx;
	background: var(--background-color);

	.btn-container {
		padding: 0 40rpx;
		margin-top: 0;

		.btn {
			padding: 24rpx;
			font-size: 30rpx;
		}

		&.btn-waiting,
		&.btn-already {
			.btn {
				border: 2rpx solid var(--primary-color);
				background: var(--text-color-secondary);
				color: var(--primary-color);
			}
		}

	}

	// padding: 0 48rpx;
}
</style>