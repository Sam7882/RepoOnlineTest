<template>
	<view class="switch-wrapper" @click="toggle">
		<view :class="['switch', modelValue ? 'switch-checked' : '']">
			<view class="switch-dot"></view>
		</view>
	</view>
</template>

<script setup>
// TEMP: 組件-switch開關按鈕
const modelValue = defineModel();

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
	modelValue.value = !modelValue.value; // 直接改 v-model 綁定的值
};

</script>

<style scoped>
.switch-wrapper {
	width: fit-content;
	height: fit-content;

	&:hover {
		cursor: pointer;
	}
}

.switch {
	width: fit-content;
	height: fit-content;
	padding: 20rpx 36rpx;
	background-color: #ccc;
	border-radius: 9999rpx;
	position: relative;
	transition: background-color 0.3s;

	@media screen and (min-width: 768px) and (max-width: 960px) {
		padding: 16rpx 32rpx;
	}

	&.switch-checked {
		.switch-dot {
			left: calc(100% - 30rpx - 6rpx) !important;

			@media screen and (min-width: 768px) and (max-width: 960px) {
				left: calc(100% - 30rpx) !important;
			}
		}
	}

}

.switch-checked {
	background-color: #9e80ff;
	/* 你的紫色 */
}

.switch-dot {
	width: 30rpx;
	height: 30rpx;
	top: 50%;
	left: 6rpx;
	translate: 0 -50%;
	background-color: #fff;
	border-radius: 50%;
	position: absolute;
	transition: all 0.3s;

	@media screen and (min-width: 768px) and (max-width: 960px) {
		width: 24rpx;
		height: 24rpx;
	}
}
</style>
