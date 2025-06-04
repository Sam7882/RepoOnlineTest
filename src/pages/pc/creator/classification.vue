<template>
	<view class="classification-page">
		<!-- header 導航-->
		<c-headerNav class="classification-page-header" :title="'分類管理'" />

		<!--內容容器 -->
		<view class="classification-content-container">
			<view class="classification-content-container-bottom-record-container">
				<uni-list :border="false" class="classification-content-container-bottom-record-list-container">
					<template v-for="(item, index) in classificationList" :key="index">
						<uni-list-item :border="false" class="classification-content-container-bottom-record-list-item">
							<template #body>
								<view class="classification-account-container">
									<!-- 標題 -->
									<view class="classification-account-info-container">
										<text>{{ item.title }}</text>
									</view>
									<!-- 靠右按鈕 -->
									<view class="right-container">
										<!-- 關注按鈕 -->
										<view class="btn-container">
											<button tpye="button"
												class="btn classification-content-container-bottom-following-list-item-button"
												@click="handleClassificationEdit">
												{{ $t('common.edit') }}
											</button>
										</view>
										<view class="btn-container">
											<button tpye="button"
												class="btn classification-content-container-bottom-following-list-item-button"
												@click="deleteClassification(item)">
												{{ $t('common.delete') }}
											</button>
										</view>
									</view>
								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</view>

		<!-- 底部按鈕 -->
		<view class="btn-container footer-btn-container">
			<button tpye="button" class="btn" @click="handleAddClassification">{{ $t("common.addClassification") }}</button>
		</view>

		<c-confirmPopUp ref="confirmPopUpRef" class="confirmPopUp"></c-confirmPopUp>
	</view>
</template>

<script setup lang="ts">
// TEMP: 貼文管理-分類頁面
import { onShow } from '@dcloudio/uni-app';
import { router, toCreatorSelectMedia, toCreatorClassificationEdit, checkViewportAutoReplace } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const classificationList = ref([
	{
		title: '一號分類',
		data: [
			{ id: '1', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
			{ id: '2', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
			{ id: '3', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
			{ id: '4', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
			{ id: '5', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
			{ id: '6', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
			{ id: '7', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
			{ id: '8', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
			{ id: '9', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
			{ id: '10', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
			{ id: '11', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
			{ id: '12', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
			{ id: '13', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
			{ id: '14', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
			{ id: '15', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
			{ id: '16', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
			{ id: '17', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
			{ id: '18', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
			{ id: '19', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
		]
	},
	{
		title: '二號分類',
		data: [
			{ id: '1', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
			{ id: '2', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
			{ id: '3', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
			{ id: '4', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
			{ id: '5', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
			{ id: '6', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
			{ id: '7', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
			{ id: '8', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
			{ id: '9', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
		]
	},
])

const handleClassificationEdit = (item: any) => {
	toCreatorClassificationEdit({
		type: 'manage'
	})
}

const handleAddClassification = () => {
	toCreatorSelectMedia({
		type: 'new'
	})
}

const confirmPopUpRef = ref()
const deleteClassification = () => {
	confirmPopUpRef.value.open({
		title: t('common.deleteClassification'),
		content: t('common.deleteClassificationTip'),
		onConfirm: () => {
			console.log("🚀 ~ 刪除後跳轉:")
		}
	})
}

onShow(() => {
	checkViewportAutoReplace()
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color);
}

.classification-page {
	// padding: 0 100rpx;
	--footer-btn-height: 220rpx;
}

.classification-page-header {
	::v-deep(.header-nav-container) {
		.header-nav-container {
			border: none;
		}
	}
}

.classification-content-container {
	padding: 0;

	::v-deep(.uni-list-item__container) {
		.uni-list-item__container {
			padding: 28rpx 44rpx;
			border-bottom: 1px solid var(--background-color-grayLight2);
		}
	}
}

.classification-content-container-bottom-record-list-container {
	padding-bottom: var(--footer-btn-height);
}

.classification-account-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.right-container {
	display: flex;
	align-items: center;
	gap: 16rpx;

	.btn-container {
		.btn {
			padding: 12rpx 38rpx;
			border-radius: 10rpx;
		}
	}
}

.footer-btn-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 40rpx 44rpx 80rpx;
	background-color: var(--background-color);

	.btn {
		font-size: 30rpx;
		padding: 22rpx 0;
	}
}
</style>
