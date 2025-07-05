<template>
	<view class="switch-list">
		<view class="switch-item">
			<view class="switch-item-content">
				<view class="switch-title">{{ $t("creator.publicMyFavorites") }}</view>
				<c-checkBox class="switch-btn-container" v-model="formData.publicFavorite" />
			</view>
			<view class="switch-desc">{{ $t("creator.publicMyFavoritesTip") }}</view>
		</view>
		<view class="switch-item">
			<view class="switch-item-content">
				<view class="switch-title">{{ $t("creator.publicMyHeart") }}</view>
				<c-checkBox class="switch-btn-container" v-model="formData.publicLike" />
			</view>
			<view class="switch-desc">{{ $t("creator.publicMyHeartTip") }}</view>
		</view>
		<view class="switch-item">
			<view class="switch-item-content">
				<view class="switch-title">{{ $t("creator.publicMyCategory") }}</view>
				<c-checkBox class="switch-btn-container" v-model="formData.publicCategory" />
			</view>
			<view class="switch-desc">{{ $t("creator.publicMyCategoryTip") }}</view>
		</view>

		<!-- 發送按鈕 -->
		<view class="btn-container footer">
			<button type="button" class="btn" @click="formSubmit">{{ $t("common.confirm") }}</button>
		</view>
	</view>
</template>

<script setup>
// TEMP: 創作者設定-帳號設定編輯頁
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits(['submit'])
const formData = ref({
	publicFavorite: false,
	publicLike: false,
	publicCategory: false,
})

const formSubmit = () => {
	let payload = {
		publicFavorite: formData.value.publicFavorite,
		publicLike: formData.value.publicLike,
		publicCategory: formData.value.publicCategory
	}
	console.log('送出資料:', payload)
	emit('submit', true)
	// 這裡可串接API
}
</script>

<style scoped lang="scss">
.switch-list {
	display: flex;
	flex-direction: column;
	gap: 56rpx;
	padding: 0 48rpx;

	@media screen and (min-width: 768px) and (max-width: 960px) {
		gap: 32rpx;
	}

	.switch-item {
		display: flex;
		flex-direction: column;

		.switch-item-content {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 12rpx;
		}

		.switch-title {
			font-size: var(--font-size-title-pc);
			line-height: 1.5;
		}

		.switch-desc {
			font-size: var(--font-size-content-pc-small);
			color: var(--text-color-gray3);
			line-height: 1.2;
		}
	}
}

.footer.btn-container {
	width: 100%;
	padding: 0;
	margin-top: 80rpx;
}

@media screen and (max-width: 960px) {
	.footer.btn-container {
		position: fixed;
		bottom: 32rpx;
		left: 0;
		right: 0;
		padding: 0 48rpx;
	}
}
</style>