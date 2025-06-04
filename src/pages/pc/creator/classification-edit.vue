<template>
	<view class="select-media-page">

		<c-headerNav class="header-nav" :title="classTitle">
			<template #right>
				<uni-icons class="header-gear-icon" type="more-filled" size="20" color="var(--text-color-primary)"
					@click="setclassNameing" />
			</template>
		</c-headerNav>
		<view class="header">
			<view class="tab" @click="handleManage">
				<view class="icon-container">
					<uni-icons class="header-gear-icon" type="icon-common-nut" custom-prefix="icon" size="20"
						color="var(--text-color-primary)"></uni-icons>
				</view>
				<template v-if="!canTagging">
					<text>{{ $t('creator.manageWorks') }}</text>
				</template>
				<template v-else>
					<text>{{ $t('creator.addWorks') }}</text>
				</template>
			</view>
		</view>

		<!-- 資料網格 -->
		<!-- <view class="grid">
			<c-gridPhoto :data="manageMedia" />
		</view> -->

		<!-- 資料網格 -->
		<view class="grid">
			<post-mediaGridItem v-for="item in renderMediaList" :key="item.id" :item="item"
				:is-selected="selectedIds.includes(item.id)" @toggle-select="toggleSelect" :can-tagging="canTagging" />
		</view>


		<view class="footer" v-if="canTagging">
			<view class="icon-container" @click="closeTagging">
				<uni-icons class="popup-icon" type="closeempty" size="24" color="var(--text-color-primary)" />
			</view>
			<view class="btn-container">
				<text>
					{{ $t('common.selected') }} {{ selectedIds.length }}
				</text>
				<button class="btn next-btn" @click="deleteSelected">{{ $t('common.remove') }}</button>
			</view>
		</view>

		<!-- 更改名稱 -->
		<c-bottomPopUp ref="classNamePopUpRef" class="classNamePopUp" @close="initclassNamePopUp">
			<template #header="close">
				<text class="popup-title">{{ popupTitle }}</text>
				<uni-icons class="popup-close" type="closeempty" size="24" @click="cancelclassNamePopUp" />
			</template>
			<template #content="close">
				<view class="classNamePopUp-container">
					<template v-if="classNamePopUpStep === 1">
						<view class="classNamePopUp-container-item" @click="nextclassNamePopUpStep">
							<view class="classNamePopUp-container-item-content">
								<view class="icon-container">
									<uni-icons class="popup-icon" type="icom-common-edit" custom-prefix="icon" size="24"
										color="var(--text-color-primary)"></uni-icons>
								</view>
								<text>{{ $t('common.changeName') }}</text>
							</view>
							<view class="icon-container">
								<uni-icons class="popup-icon" type="right" size="24" color="var(--text-color-primary)"></uni-icons>
							</view>
						</view>
						<view class="deco-line"></view>
						<view class="classNamePopUp-container-item" @click="deleteClassification">
							<view class="classNamePopUp-container-item-content">
								<view class="icon-container">
									<uni-icons class="popup-icon" type="icon-common-cancelclassName" custom-prefix="icon" size="24"
										color="var(--text-color-primary)"></uni-icons>
								</view>
								<text>{{ $t("common.deleteClassification") }}</text>
							</view>
						</view>
					</template>
					<template v-if="classNamePopUpStep === 2">
						<view class="classNamePopUp-container-item2">
							<view class="classNamePopUp-container-item-content input-container">
								<text class="title">{{ $t("common.name") }}</text>
								<uni-easyinput v-model="classNamePopUpName" type="text" class="inputStyle popup-input"
									placeholder="請輸入名稱" />
							</view>
						</view>
						<view class="classNamePopUp-container-item2">
							<view class="classNamePopUp-container-item-content btn-container">
								<button type="button" class="btn popup-button" @click="confirmclassNamePopUp">{{ $t("common.confirm")
								}}</button>
							</view>
						</view>
					</template>
				</view>
			</template>
		</c-bottomPopUp>

		<c-confirmPopUp ref="confirmPopUpRef" class="confirmPopUp"></c-confirmPopUp>
		<c-messagePopUp ref="alertDialog" />
	</view>
</template>

<script setup>
// TEMP: 貼文管理-分類編輯頁
import { onLoad, onShow } from '@dcloudio/uni-app'
import { usePostData } from '@/stores/usePostData'
import { toCreatorSelectMedia, checkViewportAutoReplace } from '@/utils/routers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const postDataStore = usePostData()
const { manageMedia, selectedMedia } = storeToRefs(postDataStore)

const renderMediaList = ref(manageMedia.value)
const classTitle = ref('一號分類')
const popupTitle = ref(t('common.edit'))
const selectedIds = ref([])
const alertDialog = ref(null)
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

const canTagging = ref(false)
const handleManage = () => {
	canTagging.value = !canTagging.value
	if (canTagging.value) {
		// 進行移除

	}
	// 代表新增影片
	else {
		toCreatorSelectMedia({
			type: 'manage'
		})
	}
}

const deleteSelected = () => {
	console.log("🚀 ~ 移除所選:")
	alertDialog.value.open({
		content: '已移除',
		confirmBtnText: 'OK',
		onConfirm: () => {
			// 確認後關閉窗口
			canTagging.value = false
		}
	})
}

const closeTagging = () => {
	canTagging.value = false
}


const classNamePopUpRef = ref(null)
const isclassNameing = ref(false)
const setclassNameing = () => {
	classNamePopUpRef.value.open()
}
const classNamePopUpName = ref('')
const classNamePopUpStep = ref(1)
const nextclassNamePopUpStep = () => {
	classNamePopUpStep.value++
	popupTitle.value = '變更分類名稱'
}
const initclassNamePopUp = () => {
	classNamePopUpStep.value = 1
	classNamePopUpName.value = ''
	popupTitle.value = '編輯'
}
const cancelclassNamePopUp = () => {
	isclassNameing.value = false
	classNamePopUpRef.value.close()
}
const confirmclassNamePopUp = () => {
	isclassNameing.value = true
	console.log("🚀 ~ 我關注對象 自訂名稱為: ", classNamePopUpName.value)
	classTitle.value = classNamePopUpName.value
	classNamePopUpRef.value.close()
}


const confirmPopUpRef = ref(null)
const deleteClassification = () => {
	cancelclassNamePopUp()
	confirmPopUpRef.value.open({
		title: '刪除分類',
		content: '確認要刪除分類?',
		onConfirm: () => {
			console.log("🚀 ~ 刪除後跳轉:")

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
	--header-height: 124rpx;
	--footer-height: 250rpx;
	--c-header-height: 124rpx;
	--tab-height: 120rpx;
}

.header-nav {
	::v-deep(.header-nav-container) {
		.header-nav-container {
			border-bottom: unset;
		}
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
	z-index: 1;
	display: flex;
	align-items: center;
	gap: 4rpx;
	width: 100%;
	flex: 1;
	text-align: center;
	font-size: 28rpx;
	padding: 18rpx;
	line-height: 1;
	color: var(--text-color-primary);
	padding: 40rpx 44rpx;
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
			color: #fff;
			padding: 22rpx 0;
			border-radius: 20rpx;
			font-size: 30rpx;
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
</style>
