<template>
	<view class="profile-edit">
		<c-headerNav :title="'編輯資料'" backUrl="/pages/pc/creator/home" />

		<view class="profile-avatar">
			<view class="avatar-container" @click="openAvatarOptions">
				<image src="/static/images/template/img-template-03.png" class="avatar-img" mode="aspectFill" />
				<view class="icon-container avatar-camera">
					<uni-icons class="icon-camera" type="camera" size="24" color="#fff" />
				</view>
			</view>
		</view>
		<view class="form-container">
			<view class="deco-line"></view>
			<uni-forms :model="form" :rules="formRules" ref="formRef" label-position="top" label-width="fit-content">
				<uni-forms-item :label="$t('auth.name')" name="name">
					<uni-easyinput class="inputStyle" v-model="form.name"
						:placeholder="$t('auth.pleaseEnter', { title: $t('auth.name') })" :clearable="false" />
					<text class="form-tip">{{ $t("creator.nameChangeTip") }}</text>
				</uni-forms-item>

				<uni-forms-item :label="$t('auth.username')" name="username">
					<uni-easyinput class="inputStyle" v-model="form.username" disabled :clearable="false" />
				</uni-forms-item>

				<uni-forms-item :label="$t('auth.gender')" name="gender">
					<uni-easyinput class="inputStyle" v-model="form.gender" disabled :clearable="false" />
				</uni-forms-item>

				<uni-forms-item :label="$t('auth.birthday')" name="birthday">
					<uni-easyinput class="inputStyle" v-model="form.birthday" disabled :clearable="false" />
				</uni-forms-item>

				<uni-forms-item :label="$t('auth.bio')" name="bio" class="textarea-container">
					<uni-easyinput class="inputStyle" type="textarea" autoHeight maxlength="150" v-model="form.bio"
						:clearable="false" />
					<view class="textarea-count">
						<text>150</text>
					</view>
					<view class="form-tip-container">
						<text class="form-tip">{{ $t("creator.nameChangeTip2") }}</text>
					</view>
				</uni-forms-item>

				<view class="tag-section">
					<text class="tag-label">tag</text>
					<view class="tag-list">
						<view v-for="(tag, index) in allTags" :key="tag"
							:class="['tag', selectedTags.includes(tag) ? 'selected' : '']" @click="toggleTag(tag)">
							{{ tag }}
							<text v-if="selectedTags.includes(tag)" class="tag-order">
								{{ selectedTags.indexOf(tag) + 1 }}
							</text>
						</view>
						<view class="tag-newInput">
							<uni-easyinput class="inputStyle" v-model="newTag" placeholder="自行輸入" :clearable="false" />
						</view>
					</view>
				</view>

				<!-- 社群連結 -->
				<uni-forms-item :label="'instagram'" name="instagram">
					<uni-easyinput class="inputStyle" v-model="form.instagram" disabled :clearable="false" />
				</uni-forms-item>
				<uni-forms-item :label="'youtube'" name="youtube">
					<uni-easyinput class="inputStyle" v-model="form.youtube" disabled :clearable="false" />
				</uni-forms-item>
				<uni-forms-item :label="'x'" name="x">
					<uni-easyinput class="inputStyle" v-model="form.x" disabled :clearable="false" />
				</uni-forms-item>
				<uni-forms-item :label="'facebook'" name="facebook">
					<uni-easyinput class="inputStyle" v-model="form.facebook" disabled :clearable="false" />
				</uni-forms-item>

				<view class="btn-container">
					<button class="btn save-btn" type="primary" @click="handleSubmit">{{ $t("common.save2") }}</button>
				</view>
			</uni-forms>
		</view>

		<!-- 底部選擇頭像方式彈窗 -->
		<c-bottomPopUp ref="avatarPopRef" class="avatar-pop-up">
			<template #header>
				<text class="popup-title">{{ $t("creator.changePhoto") }}</text>
			</template>
			<template #content>
				<view class="popup-btn-group">
					<view class="btn-container">
						<button class="btn popup-btn" @click="handleSelectPhoto('camera')">{{ $t("creator.takePhoto") }}</button>
					</view>
					<view class="btn-container">
						<button class="btn popup-btn" @click="handleSelectPhoto('album')">{{ $t("creator.uploadPhoto") }}</button>
					</view>
					<view class="btn-container">
						<button class="btn popup-cancel" @click="avatarPopRef.close()">{{ $t("common.cancel") }}</button>
					</view>
				</view>
			</template>
		</c-bottomPopUp>
	</view>
</template>

<script setup>
// TEMP: 編輯個人資料
import { onShow } from '@dcloudio/uni-app'
import { toSelectSource, toCropAvatar, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const avatarUrl = '/static/sample-avatar.jpg' // 假資料
const form = reactive({
	name: '我是名字我是名字',
	username: 'adkdjwee00',
	gender: '女',
	birthday: '2025-11-05',
	bio: '我是一個女生我是一個女生',
	instagram: 'https://www.instagram.com/adkdjwee00',
	youtube: 'https://www.youtube.com/adkdjwee00',
	x: 'https://x.com/adkdjwee00',
	facebook: 'https://www.facebook.com/adkdjwee00'
})

const formRef = ref(null)

const formRules = {
	// name: {
	// 	rules: [
	// 		{ required: true, errorMessage: '姓名為必填項' },
	// 		{ maxLength: 20, errorMessage: '姓名不可超過 20 字' }
	// 	]
	// },
	// bio: {
	// 	rules: [
	// 		{ maxLength: 150, errorMessage: '簡介不可超過 150 字' }
	// 	]
	// }
}

const allTags = [
	'#娛樂', '#可愛', '#美食', '#帥氣', '#才藝', '#聊天', '#音樂', '#搞笑', '#Cosplay'
]
const selectedTags = ref(['#娛樂', '#可愛', '#Cosplay'])
const newTag = ref('')
const toggleTag = (tag) => {
	const i = selectedTags.value.indexOf(tag)
	if (i >= 0) {
		selectedTags.value.splice(i, 1)
	} else if (selectedTags.value.length < 3) {
		selectedTags.value.push(tag)
	}
}

const handleSubmit = () => {
	formRef.value.validate().then(res => {
		console.log('送出資料:', form)
		console.log('已選擇 tags:', selectedTags.value)
		uni.showToast({ title: $t('common.saved'), icon: 'none' })
	}).catch(err => {
		console.log('表單驗證失敗:', err)
	})
}

const avatarPopRef = ref()
const openAvatarOptions = () => {
	avatarPopRef.value.open({ title: t('creator.changePhoto') })
}
const handleSelectPhoto = (type) => {
	avatarPopRef.value.close()
	// 啟動相機
	if (type === 'camera') {
		uni.chooseImage({
			count: 1, // 限制選取 1 張圖片
			sourceType: ['camera'], // 從相機選取
			success: (res) => {
				const imagePath = res.tempFilePaths[0] // 取得選取的圖片路徑
				// 跳轉到裁切頁，帶入圖片
				toCropAvatar({
					src: encodeURIComponent(imagePath) // 編碼圖片路徑
				})
			},
			fail: (err) => {
				console.log('拍照失敗:', err)
				uni.showToast({ title: t('creator.cameraFailed'), icon: 'none' })
			}
		})
	}
	// 直接從相簿挑選 1 張圖後進入裁切頁
	else if (type === 'album') {
		uni.chooseImage({
			count: 1, // 限制選取 1 張圖片
			sourceType: ['album'], // 從相簿選取
			success: (res) => {
				const imagePath = res.tempFilePaths[0] // 取得選取的圖片路徑
				toCropAvatar({ src: encodeURIComponent(imagePath) }) // 編碼圖片路徑
			},
			fail: (err) => {
				console.log('選擇照片失敗:', err)
				uni.showToast({ title: t('creator.selectPhotoFailed'), icon: 'none', })
			}
		})
	}
}

onShow(() => {
	checkViewportAutoReplace()
})

</script>

<style scoped lang="scss">
.profile-edit {
	background: #fff;
	// min-height: 100vh;

	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);

	// 設定窗口最大寬度
	max-width: var(--setting-page-maxWidth);


	::v-deep(.header-nav-space) {
		.header-nav-space {
			height: fit-content;
			padding-top: 0;
		}

		.header-nav-container {
			position: relative;
		}

		.header-nav-left-position {
			left: 0;
		}
	}
}

.profile-avatar {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 44rpx;
	// margin: 44rpx 0;
	position: relative;
}

.avatar-container {
	position: relative;
	width: 240rpx;
	height: 240rpx;
	border-radius: 50%;
	overflow: hidden;
	position: relative;
	// border: 12rpx solid var(--primary-color);
	background: var(--primary-color);
	border-radius: 100%;
	overflow: hidden;

	// transform: translate(-50%, -50%);
	::v-deep(.avatar-img) {
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

	.avatar-camera {
		position: absolute;
		top: 50%;
		left: 50%;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 9999rpx;
		padding: 10rpx;
		inset: 0;

		.icon-camera {
			font-size: 60rpx !important;
		}
	}
}

.form-container {
	padding: 32rpx;

	.deco-line {
		margin: 36rpx 0;
	}

	/* FORM */
	::v-deep(.uni-forms-item) {

		// 標籤
		.uni-forms-item__label {
			font-size: var(--font-size-content-pc-large);
			color: var(--popTxt-color-content);
			padding-bottom: 24rpx !important;
		}


	}
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 20rpx;
			padding: 4rpx 32rpx;

			&.is-focused {
				// border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}

		.uni-input-placeholder {
			color: var(--text-color-quaternary) !important;
			font-size: var(--font-size-content-pc-large);
		}

		.uni-easyinput__content-input {
			padding: 0 !important;
			color: var(--text-color-primary) !important;
			font-size: var(--font-size-content-pc-large);
		}

		// textarea
		.uni-easyinput__content-textarea.input-padding {
			padding: 0;
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			// border: 1px solid var(--text-color-error) !important;
		}
	}
}

.textarea-container {
	position: relative;

	.textarea-count {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 0 16rpx;
		color: var(--popTxt-color-content);
		font-size: var(--font-size-content-pc);
	}

	.form-tip-container {
		position: absolute;
		left: 0;
		top: 100%;
		margin-top: 4rpx;

	}
}

.form-tip {
	display: block;
	font-size: var(--font-size-content-pc);
	color: var(--popTxt-color-content);
	margin-top: 8rpx;
}


.tag-section {
	margin-top: 80rpx;
	margin-bottom: 80rpx;

	.tag-label {
		// font-weight: bold;
		font-size: var(--font-size-content-pc-large);
		margin-bottom: 16rpx;
		display: block;
		color: var(--popTxt-color-content);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
	}

	.tag {
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		// border: 1rpx solid #ccc;
		font-size: var(--font-size-content-pc);
		background: #f5f5f5;
		color: #333;
		position: relative;
		font-weight: 500;
		width: fit-content;

		&:hover {
			cursor: pointer;
		}
	}

	.tag.selected {
		background: #ffd700;
		border-color: #ffd700;
	}

	.tag-order {
		position: absolute;
		top: -12rpx;
		right: -12rpx;
		background: var(--text-color-secondary);
		color: var(--favorite-color-secondary);
		border: 1px solid var(--favorite-color-secondary);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: var(--font-size-content-pc-small);
		width: 32rpx;
		height: 32rpx;
		text-align: center;
		border-radius: 50%;
		line-height: 1;
	}

	.tag-newInput {

		/* 輸入欄位 */
		// INPUT 輸入欄位
		.inputStyle {
			::v-deep(.uni-easyinput__content) {

				&.is-input-border {}

				.uni-input-placeholder {
					text-align: center;
				}
			}
		}

	}
}


.save-btn {
	margin-top: 120rpx;
	font-size: var(--font-size-title-pc);
}


// 底部選擇頭像方式彈窗
.avatar-pop-up {
	::v-deep(.popup-container) {
		.popup-header {
			&~.popup-deco-line {
				display: none;
				color: #0000001a;
			}
		}
	}

	.popup-title {
		font-weight: 500;
	}

	.popup-btn-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30rpx;
	}

	.btn-container {
		width: 100%;

		&:last-child {
			.btn {
				background: none;
				color: var(--text-color-primary);

				&::after {
					display: none;
				}
			}
		}
	}

	.btn {
		padding: 24rpx 0;
		font-size: var(--font-size-title-pc);
	}
}
</style>