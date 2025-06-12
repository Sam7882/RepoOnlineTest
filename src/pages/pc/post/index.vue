<template>
	<layout-pcBase>
		<view class="publish-page pc-content-layout-center-style">
			<!-- header -->
			<c-headerNav :title="$t('post.publish')">
				<template #left>
					<view class="header-nav-left-position header-nav-icon-container" @click="openConfirmPopUp">
						<uni-icons class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"></uni-icons>
					</view>
				</template>
			</c-headerNav>

			<view class="publish-page-container">
				<!-- 左側預覽圖 -->
				<view class="publish-page-container-left">
					<view class="publish-page-container-left-item">
						<image v-if="mediaList.type === 'image'" class="publish-media-preview" :src="mediaList.url"
							mode="widthFix" />
						<video v-else id="storyVideo" class="video" :src="mediaList.url" loop :muted="playStatus === 'pause'"
							:controls="true" :show-center-play-btn="true" object-fit="contain" :show-loading="false"
							:enable-progress-gesture="false" :show-play-btn="false" :show-fullscreen-btn="false" :show-progress="true"
							@click="switchVideoPlay" />
						<view class="icon-container" v-if="playStatus === 'pause'" @click="switchVideoPlay">
							<uni-icons class="icons" type="icon-video-play" custom-prefix="icon" size="16" color="#fff" />
						</view>
					</view>
				</view>

				<!-- 右側文章內容 -->
				<view class="publish-page-container-right">

					<!-- 圖片與輸入內容區 -->
					<view class="publish-media-container">
						<view class="publish-media-preview-container">
							<image class="publish-media-preview" :src="mediaList.url" mode="widthFix" />
						</view>
						<post-postContent ref="postContentRef" v-model="postContent" @update:modelValue="handleText" />
					</view>

					<!-- 標籤與提及 -->
					<view class="publish-tags-container">
						<view class="publish-tag" @click="addHashTag">
							<uni-icons type="tag" size="16" color="#999" />
							#{{ $t('post.hashTag') }}
						</view>
						<view class="publish-tag" @click="addMention">
							<uni-icons type="at" size="16" color="#999" />
							@{{ $t('post.mention') }}
						</view>
					</view>

					<!-- 標記人 -->
					<view class="publish-setting-item" @click="openPostTagPeople">
						<view class="publish-setting-left">
							<text>{{ $t('post.tagPeople') }}</text>
						</view>
						<uni-icons class="publish-setting-right" type="right" size="16" color="#999" />
					</view>

					<!-- 發佈設定 -->
					<view class="publish-setting-item" @click="openPublishSetting">
						<view class="publish-setting-left">
							<text>{{ $t('post.publishSetting') }}</text>
							<text class="desc">{{ $t('post.publishSettingTip') }}</text>
						</view>
						<uni-icons class="publish-setting-right" type="right" size="16" color="#999" />
					</view>

					<!-- 自動發佈 -->
					<view class="publish-setting-item" @click="openAutoPublish">
						<view class="publish-setting-left">
							<text>{{ $t('post.autoPublish') }}</text>
							<text class="desc">2025/02/25/19:18 {{ $t('post.autoPublishTip') }}</text>
						</view>
						<uni-icons class="publish-setting-right" type="right" size="16" color="#999" />
					</view>

					<!-- 允許評論 -->
					<view class="publish-setting-item">
						<view class="publish-setting-left">
							<text>{{ $t('post.allowComment') }}</text>
						</view>
						<c-checkBox class="switch-btn-container" @update:modelValue="handleSwitchChange" />

						<!-- <switch class="publish-setting-right-switch" :checked="true" color="#937CFF" @change="handleSwitchChange" /> -->
					</view>

					<!-- 底部操作按鈕 -->
					<view class="publish-actions">
						<button class="btn-draft" type="button" @click="handleDraft">
							<uni-icons type="trash" size="18" /> {{ $t('post.draft') }}
						</button>
						<button class="btn-publish" type="button" @click="handlePublish">
							<uni-icons type="upload" size="18" /> {{ $t('post.publish') }}
						</button>
					</view>
				</view>
			</view>


			<post-postSet ref="publishSettingRef" :defaultSelected="publishSetting" @updata:postSet="handlePublishSetting" />
			<post-dateTimePicker ref="autoPublishRef" @update:autoDate="updateAutoDate"></post-dateTimePicker>
			<post-postTagPeople ref="postTagPeopleRef" />
			<c-confirmPopUp ref="confirmPopUp" class="confirm-pop-up" />
		</view>
	</layout-pcBase>
</template>

<script setup lang="ts">
// TEMP: PC發佈頁

import { onShow } from '@dcloudio/uni-app'
import { toTagPeople, checkViewportAutoReplace } from '@/utils/routers'
import { usePostData } from '@/stores/usePostData';
import { toPlayIndex, toCreatorHome } from '@/utils/routers';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const postStore = usePostData();
/*  */
const postContentRef = ref()
const postContent = ref('')
const publishSettingRef = ref()
const autoPublishRef = ref()
const { selectedMedia } = storeToRefs(postStore)
// 選擇第一則媒體
const mediaList = computed(() => selectedMedia.value[0])
console.log("🚀 ~ mediaList:", mediaList)

/* 左側預覽 */

const switchVideoPlay = () => {
	if (playStatus.value === 'play') {
		pauseVideo()
	} else {
		resumeVideo()
	}
}

// ICON 暫停播放切換
const playStatus = ref('play')
const turnOnPlayStatus = () => {
	playStatus.value = 'play'
}
const turnOnPauseStatus = () => {
	playStatus.value = 'pause'
}

// 暫停影片
const pauseVideo = () => {
	uni.createVideoContext('storyVideo').pause()
	turnOnPauseStatus()
	console.log('暫停影片')
}

// 播放影片
const resumeVideo = () => {
	uni.createVideoContext('storyVideo').play();
	turnOnPlayStatus()
	console.log('播放影片')
}

// 發佈設定
const publishSetting = ref('subscription')

// TODO: 輸入框 文字變更
/* 如果輸入框 有 # 或者 @ 則需要反藍色 */
const handleText = (e: any) => {
	// postContent.value = postContent.value + e.plain
}

// 新增標籤
const addHashTag = () => {
	postContentRef.value.insertText('#')
	console.log('addTag')
}
const addMention = () => {
	postContentRef.value.insertText('@')
	console.log('addMention')
}

/* 按鈕 */
// 草稿
const handleDraft = () => {
	console.log('草稿')
	// 返回創作者主頁
	toCreatorHome()
}
// 發佈
const handlePublish = () => {
	console.log('發佈')
	// 跳轉到影音頁 並且播放發布的影音
	toPlayIndex()
}

// 允許發表評論開關
const handleSwitchChange = (e: any) => {
	console.log(e.detail)
}


// 開啟發布設定
const openPublishSetting = () => {
	publishSettingRef.value?.open()
}
// 更新發佈設定
const handlePublishSetting = (e: any) => {
	publishSetting.value = e
	console.log("🚀 ~ 外層 :", publishSetting.value)
}
// 開啟自動發布設定
const openAutoPublish = () => {
	autoPublishRef.value?.open()
}
// 更新自動發布日期
const updateAutoDate = (e: any) => {
	console.log("🚀 ~ 外層 :", e)
}
// 標記人
const toTagPages = () => {
	toTagPeople()
}

const postTagPeopleRef = ref()
const openPostTagPeople = () => {
	postTagPeopleRef.value?.open()
}


const confirmPopUp = ref()
// TODO: 語系補齊
const openConfirmPopUp = () => {
	confirmPopUp.value.open({
		title: t('post.discardPost'),
		// content: t('auth.confirmLogout'),
		confirmBtnText: t('post.discard'),
		onConfirm: () => {
			console.log('捨棄')

		}
	})

}

onShow(() => {
	checkViewportAutoReplace()
})

</script>

<style lang="scss" scoped>
.publish-page {
	padding: 32rpx;
	padding-top: 0;

	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position:hover {
			cursor: pointer;
		}
	}

	&.pc-content-layout-center-style {
		max-width: 100%;

		@media screen and (min-width: 1440px) {
			max-width: 80%;
		}

		@media screen and (min-width: 1920px) {
			max-width: 60%;
		}
	}
}

// 圖標容器
.header-nav-left-position {
	position: absolute;
	left: 48rpx;
	top: 50%;
	transform: translateY(-20%);
	padding-top: 16rpx;

	&:hover {
		cursor: pointer;
	}
}

.publish-page-container {
	display: flex;
	justify-content: center;

	.publish-page-container-left,
	.publish-page-container-right {
		flex: 1;
	}
}

.publish-page-container-left {
	display: flex;
	justify-content: flex-end;
	// height: 100%;

	.publish-page-container-left-item {
		position: relative;
		width: 100%;
		height: 100%;
		background: var(--background-color-dark);
		display: flex;
		justify-content: center;
		align-items: center;
		// TODO: 影片比例設定
		aspect-ratio: 1/1.625;


		// 左側大型
		.publish-media-preview {
			width: 100%;
			height: 100%;
		}


		.icon-container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.icons {
				font-size: 150rpx !important;
				color: var(--text-color-secondary) !important;
			}
		}
	}

	.video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;

		::v-deep(.uni-video-container) {
			.uni-video-cover-play-button {
				width: 150rpx;
				height: 150rpx;
			}
		}
	}
}

.publish-page-container-right {
	padding-left: 80rpx;
}

.publish-media-container {
	position: relative;
	margin-top: 24rpx;
	display: flex;
	gap: 24rpx;
	align-items: flex-start;
	margin-bottom: 16rpx;

	.publish-media-preview-container {
		position: relative;
		width: 160rpx;
		height: 100%;
		background: var(--background-color-dark);
		display: flex;
		justify-content: center;
		align-items: center;
		// TODO: 影片比例設定
		aspect-ratio: 1/1.625;


		@media screen and (min-width: 1920px) {
			width: 200rpx;

		}

		@media screen and (min-width: 2560px) {}
	}

	// 右側小型
	.publish-media-preview {}

	::v-deep(.publish-media-preview) {

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

	.editor-wrapper {
		height: 184rpx;

		::v-deep(.uni-easyinput__content) {
			margin-bottom: 0rpx;

			&.is-input-border {
				height: 100%;
				border: unset;
				background: var(--text-color-secondary) !important;

				// padding: 8rpx 32rpx;
				.input-padding {
					padding: 0 8rpx;
					margin: 0;
				}

				&.is-focused {
					border: 1px solid var(--primary-color) !important;

					.uniui-eye-filled {
						color: var(--primary-color) !important;
					}
				}

				.uni-textarea-textarea {
					font-size: var(--font-size-content-pc) !important;
				}
			}
		}

		&.errorStyle ::v-deep(.uni-easyinput__content) {
			&.is-input-border {
				border: 1px solid var(--text-color-error) !important;
			}
		}
	}

}

.publish-tags-container {
	position: relative;
	display: flex;
	gap: 16rpx;
	margin-bottom: 32rpx;

	.publish-tag {
		background: #f2f2f2;
		padding: 8rpx 16rpx;
		border-radius: 12rpx;
		font-size: var(--font-size-content-pc-small);
		color: #000;

		&:hover {
			cursor: pointer;
		}
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 1px;
		background: var(--text-color-octonary);
	}
}

.publish-setting-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 0;
	font-size: 28rpx;

	&:hover {
		cursor: pointer;
	}

	// border-bottom: 1px solid #eee;

	.publish-setting-left {
		display: flex;
		flex-direction: column;
		font-size: var(--font-size-title-pc);

		.desc {
			font-size: var(--font-size-content-pc-small);
			color: #999;
		}
	}

	.publish-setting-right {
		font-size: var(--font-size-content-pc) !important;
		color: var(--text-color-gray3) !important;
	}

	.publish-setting-right-switch {
		::v-deep(.uni-switch-wrapper) {
			.uni-switch-input {
				margin: 0;
				width: 88rpx !important;
				height: 48rpx !important;

				&::before {
					width: 84rpx !important;
					height: 44rpx !important;
					background: var(--text-color-octonary) !important;
				}

				&::after {
					width: 42rpx !important;
					height: 42rpx !important;
				}
			}
		}
	}
}

.publish-actions {
	position: relative;
	display: flex;
	justify-content: space-between;
	margin-top: 64rpx;
	gap: 80rpx;

	.btn-draft,
	.btn-publish {
		flex: 1;
		border-radius: 16rpx;
		font-size: var(--font-size-content-pc);
		padding: 24rpx 0;
		line-height: 1;
	}

	.btn-publish {
		background-color: #937CFF;
		color: #fff;
	}

	.btn-draft {
		background-color: #f0f0f0;
		color: #000;
	}
}

.switch-btn-container {
	width: fit-content;
	height: fit-content;

	::v-deep(.switch) {
		.switch {
			width: fit-content;
			height: fit-content;
			padding: 20rpx 36rpx;

			.switch-dot {
				width: 30rpx;
				height: 30rpx;
				top: 50%;
				translate: 0 -50%;
			}

			&.switch-checked {
				.switch-dot {
					left: calc(100% - 30rpx - 6rpx) !important;
				}
			}
		}
	}
}

.confirm-pop-up {
	::v-deep(.popup-box) {
		.confirm-btn {
			color: var(--favorite-color-secondary);
			background-color: transparent;
		}
	}
}
</style>
