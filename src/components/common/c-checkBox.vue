<template>
	<view class="switch-wrapper" @click="toggle">
		<view :class="['switch', modelValue ? 'switch-checked' : '']">
			<view class="switch-dot"></view>
		</view>
	</view>
</template>

<script setup>
// TEMP: 組件-開關按鈕
const modelValue = defineModel();

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
	modelValue.value = !modelValue.value; // 直接改 v-model 綁定的值
};

</script>

<style scoped>
.switch-wrapper {
	width: 100rpx;
	height: 60rpx;
}

.switch {
	width: 100%;
	height: 100%;
	background-color: #ccc;
	border-radius: 9999rpx;
	position: relative;
	transition: background-color 0.3s;
}

.switch-checked {
	background-color: #9e80ff;
	/* 你的紫色 */
}

.switch-dot {
	width: 48rpx;
	height: 48rpx;
	background-color: #fff;
	border-radius: 50%;
	position: absolute;
	top: 6rpx;
	left: 6rpx;
	transition: all 0.3s;
}

.switch-checked .switch-dot {
	left: 46rpx;
	/* 移動到右邊 */
}
</style>
