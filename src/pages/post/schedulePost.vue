<template>
	<view class="page-container">
		<!-- 導覽欄 -->
		<c-headerNav :title="'排定發布'">
		</c-headerNav>

		<view class="content">
			<!-- 上傳按鈕 -->
			<view class="btn-container">
				<button class="btn " @click="onUpload">上傳</button>
			</view>

			<!-- 草稿標題 -->
			<view class="section-title">
				<text>草稿</text>
			</view>

			<!-- 草稿清單 -->
			<view class="draft-list">
				<view v-for="(item, index) in drafts" :key="index" class="draft-card">
					<view class="img-container">
						<image :src="item.cover" class="draft-img" mode="aspectFill" />
						<view class="icon-container">
							<uni-icons class="icon-copy" type="icon-common-copy" custom-prefix="icon" size="20"
								color="var(--text-color-secondary)" />
						</view>
					</view>
					<view class="content-container">
						<view class="draft-meta">
							<text class="draft-date">{{ item.date }}</text>
							<text class="draft-time">{{ item.time }}</text>
						</view>
						<uni-icons type="more-filled" size="20" class="more-icon" @click="openCaption" />
					</view>
				</view>
			</view>

		</view>


		<c-bottomPopUp ref="bottomPopUpRef" class="bottom-pop-up">

			<template #header>
				<view></view>
				<!-- <text>草稿</text> -->
			</template>
			<template #content>
				<view class="bottom-content">
					<view class="btn-container">
						<button type="button" class="btn btn-delete" @click="deleteDraft">刪除</button>
					</view>
					<view class="btn-container">
						<button type="button" class="btn btn-cancel" @click="closeCaption">取消</button>
					</view>
				</view>
			</template>
		</c-bottomPopUp>
	</view>
</template>
<script setup>
// TEMP: 發布頁-排定發布
import { onLoad } from '@dcloudio/uni-app'
import { toPostPreview } from '@/utils/routers'
import { usePostData } from '@/stores/usePostData'
const postDataStore = usePostData()
const { setSelectedMedia } = postDataStore
const drafts = ref([
	{
		cover: '/static/images/template/img-template-01.png',
		date: '20250515',
		time: '07:00',
	},
	{
		cover: '/static/images/template/img-template-02.png',
		date: '20250515',
		time: '07:00',
	},
])

const goBack = () => {
	uni.navigateBack()
}

const onUpload = () => {
	uni.chooseImage({
		count: 15,
		sourceType: ['album'],
		success: (res) => {
			const fileList = res.tempFilePaths.map((src, index) => ({
				id: `${Date.now()}-${index}`,
				type: 'image',
				src
			}))
			setSelectedMedia(fileList)
			toPostPreview()
		},
		fail: (err) => {
			uni.showToast({ title: '選擇失敗', icon: 'none' })
		}
	})
}

// 模擬轉跳裁切頁面
const toCropAvatar = ({ src }) => {
	uni.navigateTo({
		url: `/pages/cropAvatar/cropAvatar?src=${src}`,
	})
}

const bottomPopUpRef = ref(null)
const openCaption = () => {
	bottomPopUpRef.value.open({
		title: '訂閱條款',
		content: '您可前往管理付款資訊頁面新增付款方式。 如欲了解詳情，請參考如何新增或更新付款方式。 若您想更改 Fance 付款方式，我們提供多種付款選項。'
	})
}
const closeCaption = () => {
	bottomPopUpRef.value.close()
}

const deleteDraft = () => {
	console.log('deleteDraft')
}
</script>
<style lang="scss" scoped>
.page-container {
	// padding: 20rpx;
	background-color: #fff;
	min-height: 100vh;
}

.content {
	padding: 40rpx;
}

.btn-container {
	// padding: 0 40rpx;
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

.section-title {
	font-size: 30rpx;
	margin: 48rpx 0 32rpx;
}


.draft-list {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.draft-card {
	width: 100%;
	border: 1rpx solid var(--text-color-octonary);
	border-radius: 12rpx;
	overflow: hidden;
	position: relative;
}

.img-container {
	display: flex;
	position: relative;
}

.draft-img {
	width: 100%;
	height: 200rpx;
	object-fit: cover;
}

.icon-container {
	position: absolute;
	bottom: 16rpx;
	left: 24rpx;

	.icon-copy {
		font-size: 28rpx !important;
		color: var(--text-color-secondary) !important
	}
}

.content-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8rpx 24rpx;
}

.draft-meta {
	display: flex;
	flex-direction: column;
	font-size: 24rpx;
}

.more-icon {
	position: absolute;
	bottom: 10rpx;
	right: 10rpx;
}

/* 子元件-關注 */
.bottom-pop-up {
	::v-deep(.popup-container) {
		.popup-content {
			padding: 0;
			min-height: unset;
		}

		.popup-container {
			padding: 70rpx 54rpx;
		}

		.popup-header {
			margin-bottom: 0;

			.popup-title {
				font-size: 32rpx;
				font-weight: 500;
			}

			&~.popup-deco-line {
				display: none;
			}
		}
	}

	.bottom-content {
		display: flex;
		flex-direction: column;
		gap: 24rpx;

		.btn {
			font-size: 32rpx;
			padding: 24rpx 0;
		}

		.btn-cancel {
			background-color: transparent;
			color: var(--text-color-primary);

			&::after {
				display: none;
			}
		}
	}
}
</style>
