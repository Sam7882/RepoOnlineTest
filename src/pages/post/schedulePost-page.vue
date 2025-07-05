<template>
	<view class="page-container">
		<!-- 導覽欄 -->
		<c-headerNav :title="'排定發布'">
		</c-headerNav>

		<view class="content">
			<!-- 上傳按鈕 -->
			<view class="btn-container">
				<button class="btn " @click="onUpload">{{ $t('post.upload') }}</button>
			</view>

			<!-- 草稿標題 -->
			<view class="section-title">
				<text>{{ $t('post.draft') }}</text>
			</view>

			<!-- 草稿清單 -->
			<view class="draft-list">
				<view v-for="(item, index) in drafts" :key="index" class="draft-card" @click="handlePost(item)">
					<view class="img-container">
						<image :src="item.type === 'image' ? item.src : item.cover" class="draft-img" mode="aspectFill" />
						<view class="icon-container">
							<uni-icons class="icon-copy" type="icon-common-copy" custom-prefix="icon" size="20"
								color="var(--text-color-secondary)" />
						</view>
					</view>
					<view class="content-container">
						<view class="draft-meta">
							<text class="draft-date">{{ DayUtils.format(item.date, 'YYYY-MM-DD') }}</text>
							<text class="draft-time">{{ DayUtils.format(item.date, 'HH:mm') }}</text>
						</view>
						<view class="icon-container more-icon-container" @click.stop="openCaption">
							<uni-icons type="more-filled" size="20" class="more-icon" />
						</view>
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
						<button type="button" class="btn btn-delete" @click="deleteDraft">{{ $t('common.delete') }}</button>
					</view>
					<view class="btn-container">
						<button type="button" class="btn btn-cancel" @click="closeCaption">{{ $t('common.cancel') }}</button>
					</view>
				</view>
			</template>
		</c-bottomPopUp>
	</view>
</template>
<script setup>
// TEMP: 發布頁-排定發布
import { onLoad, onShow } from '@dcloudio/uni-app'
import { toPostPreview, toPostIndex, checkViewportAutoReplace } from '@/utils/routers'
import { usePostData } from '@/stores/usePostData'
import { DayUtils } from '@/utils/day'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const postDataStore = usePostData()
const { setSelectedMedia } = postDataStore
const drafts = ref([
	{
		id: '1',
		type: 'image',
		dataNum: '1',
		num: "1688",
		src: 'https://picsum.photos/id/1011/300/300',
		date: '2025-05-15T07:00:00.000Z',
	},
	{
		id: '2',
		type: 'video',
		dataNum: '1',
		num: "1688",
		src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4',
		cover: 'https://picsum.photos/id/1012/300/300',
		date: '2025-01-15T12:00:00.000Z',
	},
	{ id: '3', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '4', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '5', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '6', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '7', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '8', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '9', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300', date: '2025-01-15T12:00:00.000Z', },
	{ id: '10', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300', date: '2025-01-15T12:00:00.000Z', },

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
			uni.showToast({ title: t('common.selectFailed'), icon: 'none' })
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
		title: t('common.subscriptionAgreement'),
		content: t('common.subscriptionAgreementTip2', { title: 'Fance' })
	})
}
const closeCaption = () => {
	bottomPopUpRef.value.close()
}

const deleteDraft = () => {
	console.log('deleteDraft')
}


const handlePost = (item) => {
	console.log('handlePost', item)
	setSelectedMedia([item])
	toPostIndex()
}


onShow(() => {
	checkViewportAutoReplace()
})

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
		font-size: var(--font-size-title-pc);

		@media screen and (min-width: 768px) and (max-width: 960px) {
			padding: 18rpx;
		}
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
	font-size: var(--font-size-title-pc);
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

	.icon-container {
		position: absolute;
		bottom: 16rpx;
		left: 24rpx;

		.icon-copy {
			font-size: var(--font-size-content-pc-large) !important;
			color: var(--text-color-secondary) !important
		}
	}
}

.draft-img {
	width: 100%;
	height: 200rpx;
	object-fit: cover;
}



.content-container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8rpx 24rpx;
}

.draft-meta {
	display: flex;
	flex-direction: column;
	font-size: var(--font-size-content-pc);
}

.more-icon-container {
	position: absolute;
	top: 32rpx;
	right: 32rpx;

	@media screen and (min-width: 768px) and (max-width: 960px) {
		top: 16rpx;
		right: 16rpx;
	}
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

			@media screen and (min-width: 768px) and (max-width: 960px) {
				padding: 48rpx 32rpx;
			}
		}

		.popup-header {
			margin-bottom: 0;

			.popup-title {
				font-size: var(--font-size-title-pc);
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
			font-size: var(--font-size-title-pc);
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
