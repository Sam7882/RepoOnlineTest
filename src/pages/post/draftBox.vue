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
				<uni-icons v-if="!onDelete" class="header-gear-icon" type="icon-common-delete" custom-prefix="icon" size="20"
					color="var(--text-color-primary)" @click="turnOnDelete" />
				<text v-else @click="turnOffDelete">
					{{ $t('common.cancel') }}
				</text>
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
		<view class="grid">
			<post-mediaGridItem v-for="(item, index) in renderMediaList" :key="item.id" :item="item"
				:select-index="selectedIds.findIndex(id => id === item.id)" :is-selected="selectedIds.includes(item.id)"
				@toggle-select="toggleSelect" :can-tagging="canTagging" :on-delete="onDelete" />
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
// TEMP:選取作品
import { onLoad } from '@dcloudio/uni-app'
import { usePostData } from '@/stores/usePostData'
import { router, toCreatorSelectMedia } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { back, toPage } = router;
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
</script>

<style scoped lang="scss">
.select-media-page {
	--header-height: 70rpx;
	--footer-height: 160rpx;
	--c-header-height: 124rpx;
	--tab-height: 100rpx;
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
		transform: translateY(-20%);
		padding-top: 16rpx;
	}
}

.select-media-page {
	display: flex;
	flex-direction: column;
	// padding: 20rpx;
}

.header {
	padding-top: var(----tab-height);
}

.tab {
	position: fixed;
	top: var(--c-header-height);
	background: var(--background-color-light);
	left: 0;
	right: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 4rpx;
	width: 100%;
	flex: 1;
	text-align: center;
	font-size: 28rpx;
	padding: 18rpx;
	line-height: 1;
	color: var(--text-color-gray3);
	padding: 20rpx 44rpx;
}

.tab.active {
	font-weight: 500;
	color: #000;
	border-bottom: 4rpx solid #000;
}

.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 4rpx;
	flex: 1;
	padding-top: var(--header-height);
	padding-bottom: var(--footer-height);
}



.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0%;
	z-index: 1;
	padding: 20rpx;
	height: var(--footer-height);
	display: flex;
	justify-content: center;
	align-items: center;
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
			font-size: 30rpx;
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
	font-size: 28rpx !important;
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
				font-size: 32rpx;
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
		font-size: 30rpx;
		color: var(--text-color-primary);

		.popup-icon {
			font-size: 28rpx !important;
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
			font-size: 28rpx;
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
			font-size: 28rpx;
		}

		.uni-easyinput__content-input {
			color: var(--text-color-primary) !important;
			font-size: 28rpx;
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
			font-size: 30rpx;
			background: transparent;
			color: var(--favorite-color-secondary);
		}

		.cancel-btn {
			font-size: 30rpx;
			color: var(--text-color-primary);
		}

	}
}
</style>
