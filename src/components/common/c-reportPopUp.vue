<template>
	<view>
		<view class="icon-item-container" @click="openReportConfirm">
			<uni-icons class="icon-item" type="more-filled" size="24" :color="props.iconColor"></uni-icons>
		</view>

		<teleport to='#app'>
			<!-- 舉報確認窗 -->
			<uni-popup class="reportConfirm" ref="reportConfirm" type="center" @change="emitChange">
				<view class="popup-box">
					<view class="popup-title">{{ $t('report.hideCreator') }}</view>
					<view class="popup-content">{{ $t('report.hideCreatorTip') }}</view>
					<view class="deco-line"></view>
					<view class="popup-actions">
						<button class="btn primary-btn" @click="openReportPopUp">
							<uni-icons class="btn-icon" type="icon-common-report" custom-prefix="icon" size="24"
								color="var(--text-color-primary)" />
							{{ $t('report.report') }}
						</button>
						<uni-icons class="btn-icon btn-icon-next" type="right" size="24" @click="closeReportPopUp" />
					</view>
					<view class="deco-line"></view>
					<view class="popup-actions">
						<button class="btn primary-btn" @click="closeReportConfirm">
							<uni-icons class="btn-icon" type="icon-common-uninterest" custom-prefix="icon" size="24"
								color="var(--text-color-primary)" />
							{{ $t('common.notInterest') }}
						</button>
					</view>
					<view class="deco-line"></view>
					<view class="popup-actions">
						<button class="btn cancel-btn" @click="noInterest">
							{{ $t('common.notYet') }}
						</button>
					</view>
				</view>
			</uni-popup>

			<!-- 舉報 -->
			<uni-popup class="reportPopUp" ref="reportPopUp" :type="isPc ? 'center' : 'bottom'"
				:borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'" background-color="#f6f6f6">
				<!-- 舉報-1 -->
				<view class="popup-container" v-if="reportPopUpStep === 1">
					<!-- 標題與關閉 -->
					<view class="popup-header">
						<text class="popup-title">{{ $t('report.report') }}</text>
						<uni-icons class="popup-close" type="closeempty" size="24" @click="closeReportPopUp" />
					</view>
					<view class="deco-line" v-if="!isPc"></view>
					<view class="popup-content">
						<!-- 社群 -->
						<text class="popup-content-title">{{ $t('report.reportQuestion') }}</text>
						<text class="popup-content-text">{{ $t('report.reportContentTip') }}</text>
					</view>
					<view class="deco-line" v-if="!isPc"></view>
					<view class="popup-content-list">
						<view class="popup-content-item" @click="nextReportPopUpStep">
							<text>{{ $t('report.specificPost') }}</text>
							<uni-icons class="popup-content-icon" type="right" size="24" color="var(--text-color-primary)" />
						</view>
						<view class="popup-content-item" @click="nextReportPopUpStep">
							<text>{{ $t('report.aboutPostContent') }}</text>
							<uni-icons class="popup-content-icon" type="right" size="24" color="var(--text-color-primary)" />
						</view>
					</view>
				</view>
				<!-- 舉報-2 -->
				<view class="popup-container" v-if="reportPopUpStep === 2">
					<!-- 標題與關閉 -->
					<view class="popup-header">
						<uni-icons class="popup-prev" type="left" size="24" @click="prevReportPopUpStep" />
						<text class="popup-title">{{ $t('report.report') }}</text>
						<uni-icons class="popup-close" type="closeempty" size="24" @click="closeReportPopUp" />
					</view>
					<view class="deco-line" v-if="!isPc"></view>
					<view class="popup-content">
						<!-- 社群 -->
						<text class="popup-content-title">{{ $t('report.reportQuestion') }}</text>
						<text class="popup-content-text">{{ $t('report.reportContentTip') }}</text>
					</view>
					<view class="deco-line" v-if="!isPc"></view>
					<view class="popup-content-list">
						<view class="popup-content-item" @click="nextFeedback">
							<text>{{ $t('report.reportContent1') }}</text>
							<uni-icons class="popup-content-icon" type="right" size="24" color="var(--text-color-primary)" />
						</view>
						<view class="popup-content-item" @click="nextFeedback">
							<text>{{ $t('report.reportContent2') }}</text>
							<uni-icons class="popup-content-icon" type="right" size="24" color="var(--text-color-primary)" />
						</view>
						<view class="popup-content-item" @click="nextFeedback">
							<text>{{ $t('report.reportContent3') }}</text>
							<uni-icons class="popup-content-icon" type="right" size="24" color="var(--text-color-primary)" />
						</view>
						<view class="popup-content-item" @click="nextFeedback">
							<text>{{ $t('report.reportContent4') }}</text>
							<uni-icons class="popup-content-icon" type="right" size="24" color="var(--text-color-primary)" />
						</view>
					</view>
				</view>
			</uni-popup>

			<!-- 意見回饋窗 -->
			<uni-popup class="feedbackPopUp" ref="feedbackPopUp" :type="isPc ? 'center' : 'bottom'"
				:borderRadius="isPc ? '32rpx' : '60rpx 60rpx 0 0'" background-color="#f6f6f6">
				<view class="popup-container">
					<!-- 標題與關閉 -->
					<view class="popup-header">
						<text class="popup-title">{{ $t('report.thankYouSuggest') }}</text>
					</view>
					<view class="popup-content">
						<!-- 社群 -->
						<text class="popup-content-text">{{ $t('report.reportReply') }}</text>
					</view>
					<view class="btn-container">
						<button type="button" class="btn" @click="closeFeedbackPopUp">
							{{ $t('common.done') }}
						</button>
					</view>
				</view>
			</uni-popup>
		</teleport>
	</view>
</template>

<script setup>
// TEMP: 組件-檢舉元件
import { useViewportStore } from '@/stores/useViewportStore'
const viewportStore = useViewportStore()
const { isPc } = storeToRefs(viewportStore)

const props = defineProps({
	iconColor: {
		type: String,
		default: 'var(--text-color-primary)'
	}
})
const emit = defineEmits(['open', 'close'])



/* 舉報確認窗F */
const reportConfirm = ref(null)
// 回傳是否開啟
const emitChange = (e) => {
	if (e.show) {
		emit('close')
	} else {
		emit('open')
	}
}
const openReportConfirm = () => {
	reportConfirm.value.open()
}
const closeReportConfirm = () => {
	reportConfirm.value.close()
}
const noInterest = () => {
	reportConfirm.value.close()
}

/* 舉報 */
const reportPopUp = ref(null)
const openReportPopUp = () => {
	reportPopUpStep.value = 1
	reportPopUp.value.open()
	reportConfirm.value.close()
}
const closeReportPopUp = () => {
	reportPopUp.value.close()
	reportPopUpStep.value = 1
}

// 舉報步驟
const reportPopUpStep = ref(1)
const nextReportPopUpStep = () => {
	if (reportPopUpStep.value >= 2) return
	reportPopUpStep.value++
}
const prevReportPopUpStep = () => {
	if (reportPopUpStep.value <= 0) return
	reportPopUpStep.value--
}
const nextFeedback = () => {
	closeReportPopUp()
	openFeedbackPopUp()
}

/* 意見回饋 */
const feedbackPopUp = ref(null)
const openFeedbackPopUp = () => {
	feedbackPopUp.value.open()
}
const closeFeedbackPopUp = () => {
	feedbackPopUp.value.close()
}
</script>

<style lang="scss" scoped>
.uni-popup {}

.icon-item-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32rpx;

	&:hover {
		cursor: pointer;
	}

	.icon-item {
		font-size: 36rpx !important;
	}
}

.deco-line {
	margin: 0;
}

.reportConfirm {
	.popup-box {
		width: 80vw;
		background-color: #fff;
		border-radius: 20rpx;
		text-align: center;
		padding: 48rpx 0;

		@media screen and (min-width: 768px) {
			max-width: 500rpx;
		}

		@media screen and (min-width: 961px) {
			max-width: 600rpx;
		}

		@media screen and (min-width: 1920px) {
			max-width: 800rpx;
		}

		@media screen and (min-width: 2560px) {
			max-width: 1000rpx;
		}

	}

	.uni-popup {
		z-index: var(--z-index-max);
	}

	.popup-title {
		font-weight: 500;
		font-size: 28rpx;
		color: var(--popTxt-color-title);

		@media screen and (min-width: 961px) {
			font-size: 32rpx;
		}

		@media screen and (min-width: 1920px) {
			font-size: 40rpx;
		}

		@media screen and (min-width: 2560px) {
			font-size: 48rpx;
		}
	}

	.popup-content {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 48rpx;
		color: var(--popTxt-color-content);

		@media screen and (min-width: 961px) {
			font-size: 28rpx;
		}

		@media screen and (min-width: 1920px) {
			font-size: 40rpx;
		}

		@media screen and (min-width: 2560px) {
			font-size: 48rpx;
		}
	}

	.popup-actions {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 26rpx;
		padding: 38rpx 40rpx;
		border-radius: 16rpx;
		margin: unset;
		font-size: 30rpx;
		line-height: 1;
		width: 100%;
		border: unset;
		background: transparent;

		@media screen and (min-width: 961px) {
			font-size: 32rpx;
			padding: 38rpx 40rpx;
		}

		@media screen and (min-width: 1920px) {
			font-size: 40rpx;
			padding: 42rpx 40rpx;
		}

		@media screen and (min-width: 2560px) {
			font-size: 48rpx;
			padding: 56rpx 40rpx;
		}

		&::after {
			display: none;
		}
	}

	.btn-icon {
		font-size: 34rpx !important;
		color: var(--favorite-color-secondary) !important;

		@media screen and (min-width: 961px) {
			font-size: 32rpx;
		}

		@media screen and (min-width: 1920px) {
			font-size: 40rpx !important;
		}

		@media screen and (min-width: 2560px) {
			font-size: 48rpx !important;
		}
	}

	.btn-icon-next {
		position: absolute;
		right: 40rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.primary-btn {
		color: var(--favorite-color-secondary);
		// background-color: var(--primary-color);
	}

	.cancel-btn {
		background-color: unset;
		color: var(--text-color-primary);
	}
}

.reportPopUp,
.feedbackPopUp {
	::v-deep(.uni-popup) {
		& {
			z-index: var(--z-index-max) !important;
		}
	}

	.popup-container {
		padding: 32rpx 0;
		border-radius: 32rpx 32rpx 0 0;
		background-color: var(--background-color-light);
		// width: 80vw;

		@media screen and (min-width: 961px) {
			max-width: 800rpx;
			border-radius: 32rpx;

		}

		@media screen and (min-width: 1920px) {
			max-width: 1000rpx;
		}

		@media screen and (min-width: 2560px) {
			max-width: 1200rpx;
		}
	}

	.popup-header {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 24rpx;
		width: 100%;
	}

	.popup-prev {
		position: absolute;
		left: 46rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 28rpx !important;
	}

	.popup-close {
		position: absolute;
		right: 46rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 28rpx !important;
	}

	.popup-title {
		font-size: var(--font-size-title-pc);
		color: var(--text-color-primary);
	}

	.popup-content {
		color: var(--text-color-quaternary);
		min-height: 200rpx;
		padding: 36rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;

		@media screen and (min-width: 961px) {
			font-size: 28rpx;
		}

		@media screen and (min-width: 1920px) {
			font-size: 40rpx;
		}

		@media screen and (min-width: 2560px) {
			font-size: 48rpx;
		}


		.popup-content-title {
			font-size: 32rpx;
			font-weight: 500;
			color: var(--text-color-primary);
		}

		.popup-content-text {
			font-weight: normal;
		}

	}

	.popup-content-list {
		min-height: 600rpx;

		@media screen and (min-width: 961px) {
			min-height: unset;
		}
	}

	.popup-content-item {
		display: flex;
		justify-content: space-between;
		padding: 46rpx;
		line-height: 1;
		border-bottom: 1px solid var(--text-color-tertiary);
		font-size: var(--font-size-content-pc);
		font-weight: normal;

		&:last-child {
			border-bottom: unset;
		}

		.popup-content-icon {
			font-size: 24rpx !important;
		}
	}
}

.feedbackPopUp {
	.popup-container {
		padding-bottom: 80rpx;
	}

	.popup-header {
		margin-bottom: 24rpx;
	}

	.popup-content {
		padding: 0 88rpx;
		min-height: 225rpx;

		@media screen and (min-width: 961px) {
			min-height: unset;
			padding-bottom: 52rpx;
		}
	}

	.btn-container {
		padding: 0 46rpx;
	}

	.btn {
		padding: 24rpx 0;
		font-size: var(--font-size-content-pc);
		font-weight: normal;
	}
}
</style>