<template>
	<view class="media-item" @click="toggle">
		<image v-if="item.type === 'image'" :src="item.src" mode="aspectFill" class="media-thumbnail" />
		<view v-else class="media-thumbnail video-wrapper">
			<image :src="item.cover || fallbackVideoCover" mode="aspectFill" />
		</view>
		<view class="info-container">
			<uni-icons class="info-icon" custom-prefix="icon" size="30" color="var(--text-color-secondary)"
				:type="item.type === 'image' ? 'icon-common-copy' : item.type === 'video' ? 'icon-stander-play2' : ''" />
			<text class="info-icon-text">{{ item.num }}</text>
		</view>
		<view class="selected-indicator" :class="{ isSelected }"></view>
	</view>
</template>

<script setup>
// TEMP:九宮格選取圖片
const props = defineProps({
	item: Object,
	isSelected: Boolean
})

const emit = defineEmits(['toggle-select'])

const toggle = () => {
	emit('toggle-select', props.item.id)
	console.log("🚀 ~ toggle ~ toggle:", props.item.id)
}

const fallbackVideoCover = 'https://via.placeholder.com/300x300?text=Video'

</script>

<style scoped lang="scss">
.media-item {
	position: relative;
	width: 100%;
	aspect-ratio: 1 / 1;
	border-radius: 8rpx;
	overflow: hidden;
}

.media-thumbnail {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 8rpx;
}

.video-wrapper {
	position: relative;
	background: #000;
}

.video-thumb {
	width: 100%;
	height: 100%;
}

.video-icon {
	position: absolute;
	bottom: 8rpx;
	right: 8rpx;
	font-size: 26rpx;
	color: white;
	background: rgba(0, 0, 0, 0.5);
	padding: 4rpx 8rpx;
	border-radius: 6rpx;
}

.selected-indicator {
	position: absolute;
	top: 8rpx;
	right: 8rpx;
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	background: transparent;
	border: 2rpx solid white;

	&.isSelected {
		background: var(--primary-color);
	}
}



.info-container {
	position: absolute;
	bottom: 8rpx;
	left: 16rpx;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8rpx;
}

.info-icon {
	font-size: 24rpx !important;
	transform: translateY(2rpx);
}

.info-icon-text {
	font-size: 24rpx;
	color: var(--text-color-secondary);
}
</style>
