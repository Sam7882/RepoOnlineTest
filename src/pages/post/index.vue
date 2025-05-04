<template>
	<view class="publish-page">
		<!-- header -->
		<c-headerNav :title="$t('post.publish')" />

		<!-- 圖片與輸入內容區 -->
		<view class="publish-media-container">
			<image class="publish-media-preview" src="/static/images/template/img-template-02.png" mode="aspectFill" />
			<!-- <uni-easyinput v-model="postContent" type="textarea" class="publish-input" placeholder="請輸入內容" :trim="true"
				:clearable="false" /> -->
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
		<view class="publish-setting-item" @click="toTagPages">
			<text>{{ $t('post.tagPeople') }}</text>
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
			<text>{{ $t('post.allowComment') }}</text>
			<switch class="publish-setting-right-switch" :checked="true" color="#937CFF" @change="handleSwitchChange" />
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

		<post-postSet ref="publishSettingRef" :defaultSelected="publishSetting" @updata:postSet="handlePublishSetting" />
		<post-dateTimePicker ref="autoPublishRef" @update:autoDate="updateAutoDate"></post-dateTimePicker>
	</view>
</template>

<script setup lang="ts">
// TEMP: 發佈頁
import { toTagPeople } from '@/utils/routers'
import { usePostData } from '@/stores/usePostData';
import { toPlayIndex, toCreatorHome } from '@/utils/routers';

const postStore = usePostData();
/*  */
const postContentRef = ref()
const postContent = ref('')
const publishSettingRef = ref()
const autoPublishRef = ref()
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
</script>

<style lang="scss" scoped>
.publish-page {
	padding: 32rpx;
}

.publish-media-container {
	position: relative;
	margin-top: 24rpx;
	display: flex;
	gap: 24rpx;
	align-items: flex-start;
	margin-bottom: 16rpx;

	.publish-media-preview {
		width: 140rpx;
		height: 184rpx;
		border-radius: 8rpx;

	}

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

	.publish-input {
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
					font-size: 24rpx;
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
		font-size: 24rpx;
		color: #000;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
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
	// border-bottom: 1px solid #eee;

	.publish-setting-left {
		display: flex;
		flex-direction: column;

		.desc {
			font-size: 20rpx;
			color: #999;
		}
	}

	.publish-setting-right {
		font-size: 28rpx !important;
		color: var(--text-color-primary) !important;
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
	position: absolute;
	bottom: 32rpx;
	left: 0;
	right: 0;
	padding: 0 32rpx;
	display: flex;
	justify-content: space-between;
	margin-top: 64rpx;
	gap: 24rpx;

	.btn-draft,
	.btn-publish {
		flex: 1;
		border-radius: 16rpx;
		font-size: 28rpx;
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
</style>
