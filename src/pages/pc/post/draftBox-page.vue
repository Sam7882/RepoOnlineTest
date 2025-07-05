<template>
	<view class="select-media-page">

		<c-headerNav class="header-nav" :title="'草稿'">
			<template #left>
				<view class="header-nav-left-position header-nav-icon-container">
					<uni-icons v-if="!onDelete" class="header-nav-icon" type="left" size="20" color="var(--text-color-primary)"
						@click="handleBack"></uni-icons>
					<text v-else @click="cancelDeleteAll">
						{{ $t('common.cancelSelect') }}
					</text>
				</view>
			</template>
			<template #right>
				<view class="header-nav-right-position">
					<uni-icons v-if="!onDelete" class="header-gear-icon" type="icon-common-delete" custom-prefix="icon" size="20"
						color="var(--text-color-primary)" @click="turnOnDelete" />
					<text v-else @click="turnOffDelete">
						{{ $t('common.cancel') }}
					</text>
				</view>
			</template>
		</c-headerNav>
		<view class="header">
			<view class="tab">
				<template v-if="!canTagging">
					<text>{{ $t('post.draftTip') }}</text>
				</template>
			</view>
		</view>

		<!-- 資料網格 -->
		<!-- <view class="grid">
			<c-gridPhoto :data="manageMedia" />
		</view> -->

		<!-- 資料網格 -->
		<view class="grid-container">
			<view class="grid">
				<post-mediaGridItem v-for="(item, index) in renderMediaList" :key="item.id" :item="item"
					:select-index="selectedIds.findIndex(id => id === item.id)" :is-selected="selectedIds.includes(item.id)"
					@toggle-select="toggleSelect" :can-tagging="canTagging" :on-delete="onDelete" />
			</view>
		</view>


		<view class="footer" v-if="canTagging">
			<view class="icon-container" @click="closeTagging">
				<uni-icons class="popup-icon" type="closeempty" size="24" color="var(--text-color-primary)" />
			</view>
			<view class="btn-container">
				<button class="btn next-btn" @click="deleteConfirmPopUp">{{ $t("common.delete") }}({{ selectedIds.length
				}})</button>
			</view>
		</view>

		<c-confirmPopUp ref="confirmPopUpRef" class="confirmPopUp"></c-confirmPopUp>
		<c-messagePopUp ref="alertDialog" />
	</view>
</template>

<script setup>
// TEMP:草稿箱
import { onLoad, onShow } from '@dcloudio/uni-app'
import { usePostData } from '@/stores/usePostData'
import { router, toCreatorSelectMedia, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { back } = router;
const postDataStore = usePostData()
const { manageMedia, selectedMedia } = storeToRefs(postDataStore)

const renderMediaList = ref(manageMedia.value)
const classTitle = ref('一號分類')
const popupTitle = ref(t('common.edit'))
const selectedIds = ref([])
const alertDialog = ref(null)

const onDelete = ref(false)

const turnOnDelete = () => {
	onDelete.value = true
	canTagging.value = true
}
const turnOffDelete = () => {
	onDelete.value = false
	canTagging.value = false
}
const canTagging = ref(false)

const handleBack = () => {
	back()
}

// 取消選取全部
const cancelDeleteAll = () => {
	selectedIds.value = []
}

// 選取作品
const toggleSelect = (id) => {
	const index = selectedIds.value.indexOf(id)
	if (index >= 0) {
		selectedIds.value.splice(index, 1)
	} else {
		7
		selectedIds.value.push(id)
	}
}
const closeTagging = () => {
	onDelete.value = false
	canTagging.value = false
	selectedIds.value = []
}

const confirmPopUpRef = ref(null)
const deleteConfirmPopUp = () => {
	confirmPopUpRef.value.open({
		title: t('post.deleteDraft'),
		// content: '',
		confirmBtnText: t('common.delete'),
		cancelBtnText: t('common.keep'),
		onConfirm: () => {
			console.log("🚀 ~ 刪除:")
			confirmPopUpRef.value.close()
			onDelete.value = false
			canTagging.value = false
			selectedIds.value = []
		},
		onCancel: () => {
			console.log("🚀 ~ 保留:")
		}
	})
}

onLoad((options) => {
	console.log("🚀 ~ onLoad ~ options:", options)
	if (options.type === 'new') {
		renderMediaList.value = [...manageMedia.value, ...selectedMedia.value]
		console.log("🚀 ~ onLoad ~ renderMediaList.value:", renderMediaList.value)
	}
})

onShow(() => {
	checkViewportAutoReplace()
})

</script>

<style scoped lang="scss">
.select-media-page {
	--header-height: 70rpx;
	--footer-height: 160rpx;
	--c-header-height: 124rpx;
	--tab-height: 100rpx;

	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 32rpx;
	padding-top: 24rpx;
	background-color: var(--background-color-light);
	color: var(--text-color-primary);
	position: relative;

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

			&:hover {
				cursor: pointer;
			}
		}

		.header-nav-right-position {
			&:hover {
				cursor: pointer;
			}
		}
	}
}

.header-nav {
	::v-deep(.header-nav-container) {
		.header-nav-container {
			border-bottom: unset;
		}
	}

	// 圖標容器
	.header-nav-left-position {
		position: absolute;
		left: 48rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}

.select-media-page {
	display: flex;
	flex-direction: column;
	// padding: 20rpx;
}

.header {
	display: flex;
	justify-content: center;
	padding-top: var(----tab-height);
	width: 100%;
}

.tab {
	position: relative;
	background: var(--background-color-light);
	font-size: var(--font-size-content-pc-small);
	line-height: 1;
	color: var(--text-color-gray3);
	padding: 20rpx 0;
}

.tab.active {
	font-weight: 500;
	color: #000;
	border-bottom: 4rpx solid #000;
}

.grid-container {
	width: 100%;
	height: 100%;
	padding: 0 50rpx;
	padding-top: 70rpx;
	padding-bottom: var(--footer-height);
	overflow-y: scroll;
}

.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 4rpx;
	width: 100%;
	flex: 1;
}



.footer {
	position: absolute;
	bottom: 0;
	z-index: 1;
	padding: 20rpx;
	height: var(--footer-height);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background: var(--background-color-light);

	.icon-container {
		position: absolute;
		top: 0;
		right: 16rpx;
		z-index: 1;
	}

	.btn-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 26rpx;

		.next-btn {
			width: 100%;
			color: var(--favorite-color-secondary);
			padding: 0;
			border-radius: 20rpx;
			font-size: var(--font-size-title-pc);
			background: transparent;

			&::after {
				display: none;
			}
		}
	}
}

/* 子元件-關注 */

.popup-close {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	font-size: var(--font-size-content-pc-large) !important;
}

.classNamePopUp {
	::v-deep(.popup-container) {
		.popup-content {
			padding: 0;
		}

		.popup-container {
			padding-bottom: 0;
		}

		.popup-header {
			.popup-title {
				font-size: var(--font-size-title-pc);
				font-weight: 500;
			}

			&~.popup-deco-line {
				display: none;
			}
		}
	}

}

.classNamePopUp-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;


	.deco-line {
		width: 100%;
		scale: 1.2;
		margin: 0;
	}
}

.classNamePopUp-container-item {
	position: relative;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 48rpx 0;

	&>.icon-container {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);


		.popup-icon {
			font-size: 28rpx !important;
			color: var(--text-color-primary) !important;
		}
	}

	.classNamePopUp-container-item-content {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 38rpx;
		font-size: var(--font-size-title-pc-small);
		color: var(--text-color-primary);

		.popup-icon {
			font-size: var(--font-size-content-pc-large) !important;
			color: var(--text-color-primary) !important;
		}
	}

}

.classNamePopUp-container-item-content {

	.btn {
		border-radius: 20rpx;
		padding: 24rpx 0;
	}
}

.classNamePopUp-container-item2 {
	width: 100%;

	.input-container {
		display: flex;
		flex-direction: column;
		gap: 24rpx;

		.title {
			font-size: var(--font-size-content-pc-large);
			color: var(--popTxt-color-content);
		}
	}

	.btn-container {
		padding: 60rpx 0;

	}

	&:first-child {
		// margin-bottom: 26rpx;
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
				border: 1px solid var(--primary-color) !important;

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
			color: var(--text-color-primary) !important;
			font-size: var(--font-size-content-pc-large);
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

.confirmPopUp {
	::v-deep(.popup-container) {
		.popup-content {
			padding: 0;
		}

		.confirm-btn {
			font-size: var(--font-size-title-pc);
			background: transparent;
			color: var(--favorite-color-secondary);
		}

		.cancel-btn {
			font-size: var(--font-size-title-pc);
			color: var(--text-color-primary);
		}

	}
}
</style>
