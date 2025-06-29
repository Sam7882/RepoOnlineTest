<template>
	<view class="media-item" @click="handleToPost">
		<image v-if="item.type === 'image'" :src="item.src" mode="aspectFill" class="media-thumbnail" />
		<template v-else>
			<image :src="item.cover || fallbackVideoCover" mode="aspectFill" class="media-thumbnail" />
		</template>
		<view class="info-container">
			<uni-icons class="info-icon" custom-prefix="icon" size="30" color="var(--text-color-secondary)"
				:type="item.type === 'image' ? 'icon-common-copy' : item.type === 'video' ? 'icon-stander-play2' : ''" />
			<text class="info-icon-text">{{ item.num }}</text>
		</view>
		<view class="selected-indicator" :class="{ isSelected }" v-if="canTagging">{{ isSelected ?
			selectIndex + 1 : '' }}
		</view>
	</view>
</template>

<script setup>
// TEMP: 組件-九宮格選取影音圖片資源
import { toPostIndex } from '@/utils/routers'
const props = defineProps({
	item: Object,
	isSelected: Boolean,
	canTagging: {
		type: Boolean,
		default: true
	},
	selectIndex: {
		type: Number,
		default: 0
	},
	onDelete: {
		type: Boolean,
		default: false
	}
})


const emit = defineEmits(['toggle-select'])

const handleToPost = () => {
	if (props.canTagging) {
		toggle()
		return
	} else {
		toPostIndex({
			id: props.item.id
		})
	}
}

const toggle = () => {
	if (!props.canTagging) return
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
	// border-radius: 8rpx;
	overflow: hidden;

	&:hover {
		cursor: pointer;
	}
}

::v-deep(.uni-image) {}

.media-thumbnail {
	width: 100%;
	height: 100%;
	display: block;
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
	font-size: var(--font-size-content-pc);
	color: white;
	background: rgba(0, 0, 0, 0.5);
	padding: 4rpx 8rpx;
	// border-radius: 6rpx;
}

.selected-indicator {
	position: absolute;
	top: 8rpx;
	right: 8rpx;
	width: 48rpx;
	height: auto;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	background: transparent;
	border: 2rpx solid white;
	font-size: var(--font-size-title-pc-small);
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--text-color-secondary);

	@media screen and (min-width: 768px) and (max-width: 960px) {
		width: 32rpx;
	}

	@media screen and (min-width: 961px) {
		width: 54rpx;
	}

	@media screen and (min-width: 1280px) {
		width: 64rpx;
	}


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
	font-size: var(--font-size-title-pc) !important;
	transform: translateY(2rpx);
}

.info-icon-text {
	font-size: var(--font-size-content-pc);
	color: var(--text-color-secondary);
}
</style>
