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
	</view>
</template>

<script setup>
// TEMP: 創作者設定-申請創作者頁
import { onLoad, onShow } from '@dcloudio/uni-app'
import { router, toStatistics, toCreatorBlockadeEdit, checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { back } = router;

const { openMessage } = inject('common')
const menuTitle = ref(t('creator.becomeCreator'))
const content = ref(t('creator.welcomeToBecomeVerifyCreator'))
const btnStatus = ref('')
const btnText = computed(() => {
	if (btnStatus.value === 'waiting') {
		return t('common.waiting')
	} else if (btnStatus.value === 'already') {
		return t('common.already')
	} else if (btnStatus.value === 'apply') {
		return t('common.apply')
	} else {
		return t('common.join')
	}
})
const type = ref('creator')


const openMessagePopUp = () => {
	openMessage({
		content: t('auth.sorryNoPasss'),
		confirmBtnText: 'OK',
		onConfirm: () => {
			messagePopUpRef.value.close()
		}
	})
}

onShow(() => {
	checkViewportAutoReplace()
})

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	type.value = options.type
	console.log("🚀 ~ onLoad ~ type.value:", type.value)

	switch (type.value) {
		case 'creator':
			menuTitle.value = t('creator.becomeCreator')
			content.value = t('creator.welcomeToBecomeVerifyCreator')
			btnStatus.value = ''
			break
		case 'verifyCreator':
			menuTitle.value = t('creator.becomeVerifyCreator')
			content.value = t('creator.welcomeToBecomeVerifyCreator')
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
	font-size: var(--font-size-title-pc-large);
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
	background: var(--background-color-light);

	.btn-container {
		padding: 0 40rpx;
		margin-top: 0;

		.btn {
			padding: 24rpx;
			font-size: var(--font-size-title-pc);
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