<template>
	<view class="tag-page">
		<view class="tag-page-header">
			<uni-icons class="tag-page-header-back" type="closeempty" size="16" @click="goBack" />
			<text class="tag-page-header-title">{{ $t('post.tagPeople') }}</text>
		</view>

		<view class="search-box-container">
			<uni-search-bar class="search-box" v-model="search" :placeholder="$t('post.tagPeopleTip')"
				@input="handleSearchInput">
				<template v-slot:searchIcon>
					<uni-icons slot="searchIcon" class="search-box-search-icon" type="icon-common-search" custom-prefix="icon"
						size="16" />
				</template>
			</uni-search-bar>
		</view>
		<!-- 關注中 -->
		<text class="section-title">{{ $t('creator.following') }}</text>

		<scroll-view scroll-y class="user-scroll-wrapper">
			<view class="user-scroll-content">
				<uni-list :border="false" class="user-list">
					<template v-for="user in filteredUsers" :key="user.id">
						<uni-list-item :clickable="false" :border="false">
							<template #body>
								<view class="user-item">
									<!-- 左側 -->
									<view class="user-item-left">
										<image class="user-item-avatar" :src="user.avatar" mode="widthFix" />
										<view class="user-item-info">
											<text class="user-item-info-name">{{ user.name }}</text>
											<text class="user-item-info-account">{{ user.account }}</text>
										</view>
									</view>
									<!-- 選取框 -->
									<view class="user-item-right">
										<checkbox class="user-item-right-checkbox" :checked="isSelected(user.id)"
											@click="toggleUser(user)" />
										<!-- 因樣式問題 故 使用 image 替代 checkbox -->
										<view class="user-item-right-checkbox-custom-checked" v-if="isSelected(user.id)">
											<image class="user-item-right-checkbox-custom-checked-image"
												src="/static/icons/input/icon-input-checkbox-active.png" mode="widthFix" />
										</view>
										<view class="user-item-right-checkbox-custom-checked" v-else>
											<image class="user-item-right-checkbox-custom-checked-image"
												src="/static/icons/input/icon-input-checkbox-2.png" mode="widthFix" />
										</view>
									</view>
								</view>
							</template>
						</uni-list-item>
					</template>
				</uni-list>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
// TEMP: 發佈 標記人
import { ref, computed } from 'vue';
import { usePostData } from '@/stores/usePostData';
import { toPostIndex } from '@/utils/routers';

const postStore = usePostData();
const search = ref('');
// 搜尋文字替換處理
const handleSearchInput = (text: string) => {
	const _text = search.value.trim().replace(/^@+/, ''); // 把開頭多餘的 @ 移除
	const keyword = _text.trim().toLowerCase();
	if (!keyword) return '';
	return keyword;
};
// 用戶
const allUsers = ref([
	{ id: '1', name: '小痞', account: 'ohmygodyukai', avatar: '/static/images/template/img-template-01.png' },
	{ id: '2', name: '火火', account: 'vcrljzyn2fd', avatar: '/static/images/template/img-template-02.png' },
	{ id: '3', name: '小明', account: 'oaweradyukai', avatar: '/static/images/template/img-template-03.png' },
	{ id: '4', name: '小華', account: 'waawersas', avatar: '/static/images/template/img-template-04.png' },
	{ id: '5', name: '小莉', account: 'awerawe', avatar: '/static/images/template/img-template-01.png' },
	{ id: '6', name: '小李', account: 'aweafezsef', avatar: '/static/images/template/img-template-02.png' },
	{ id: '7', name: 'FIRE', account: '2344ww', avatar: '/static/images/template/img-template-03.png' },
	{ id: '8', name: 'bigMan', account: 'zsfe2', avatar: '/static/images/template/img-template-04.png' },
	{ id: '9', name: 'ice man', account: 'wr456er', avatar: '/static/images/template/img-template-04.png' },
	{ id: '10', name: 'Iron Man', account: 'etrte47564', avatar: '/static/images/template/img-template-03.png' },
	{ id: '11', name: 'Hulk', account: 't5td5dy', avatar: '/static/images/template/img-template-01.png' },
	{ id: '12', name: 'Thor', account: 'abwbta', avatar: '/static/images/template/img-template-03.png' },
	{ id: '13', name: 'Spider Man', account: 'a2345257s', avatar: '/static/images/template/img-template-01.png' },
	{ id: '14', name: 'Batman', account: 's57yses', avatar: '/static/images/template/img-template-02.png' },
	{ id: '15', name: 'Superman', account: '2342526', avatar: '/static/images/template/img-template-04.png' },
	{ id: '16', name: 'Wonder Woman', account: '464aa46awe', avatar: '/static/images/template/img-template-02.png' },
	{ id: '17', name: 'Flash', account: 'aw46aw4a', avatar: '/static/images/template/img-template-03.png' },
	{ id: '18', name: 'Aquaman', account: 'w46awd7d57', avatar: '/static/images/template/img-template-02.png' },
	{ id: '19', name: 'Cyborg', account: 'drt68ft79', avatar: '/static/images/template/img-template-03.png' },
	{ id: '20', name: 'Green Lantern', account: 'gyu80hu9-', avatar: '/static/images/template/img-template-02.png' },
]);

// 渲染過濾符合搜尋名稱或帳號的用戶
const filteredUsers = computed(() => {
	if (!search.value) return allUsers.value;
	return allUsers.value.filter(user =>
		user.name.toLowerCase().includes(search.value) || user.account.toLowerCase().includes(search.value),
	);
});

// 切換用戶選取狀態
const toggleUser = (user: any) => {
	// 檢查用戶是否已存在於已選取用戶列表中
	const hasUser = postStore.taggedUsers.find(u => u.id === user.id);
	if (hasUser) {
		// 如果存在，則從已選取用戶列表中移除
		postStore.setTaggedUsers(postStore.taggedUsers.filter(u => u.id !== user.id));
	} else {
		// 如果不存在，則將用戶添加到已選取用戶列表中
		postStore.setTaggedUsers([...postStore.taggedUsers, user]);
	}
}
// 是否選取
const isSelected = (id: string) => {
	return postStore.taggedUsers.some(u => u.id === id);
}

// 返回發佈頁
const goBack = () => {
	toPostIndex();
}
</script>

<style scoped lang="scss">
.tag-page {
	padding: 32rpx;

	.tag-page-header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20rpx;
		margin-bottom: 32rpx;

		.tag-page-header-back {
			position: absolute;
			top: 50%;
			left: 16rpx;
			transform: translateY(-50%);
			color: var(--text-color-primary);
		}

		.tag-page-header-title {
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.search-box-container {
		margin-bottom: 24rpx;

		.search-box {
			padding: 0;

			// background-color: #f5f5f5;
			// border-radius: 10rpx;
			.search-box-search-icon {
				color: var(--text-color-primary) !important;
			}
		}
	}

	.section-title {
		font-size: 24rpx;
		font-weight: bold;
		color: var(--input-border-color);
		margin: 16rpx 0;
	}

	.user-scroll-wrapper {
		height: 80vh;
	}

	.user-scroll-content {
		// padding: 24rpx;

		::v-deep(.uni-list) {
			.uni-list-item__container {
				padding: 8rpx 0;
			}
		}
	}

	.user-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24rpx;
		padding: 16rpx 0;
		flex: 1;

		.user-item-left {
			display: flex;
			align-items: center;
			gap: 16rpx;
		}

		// 大頭照
		.user-item-avatar {
			width: 96rpx;
			height: 96rpx !important;
			border-radius: 50%;

		}

		::v-deep(.user-item-avatar) {

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

		.user-item-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;

			.user-item-info-name {
				font-size: 28rpx;
				font-weight: 500;
			}

			.user-item-info-account {
				font-size: 22rpx;
				color: #888;
			}
		}

		.user-item-info {
			flex: 1;

			.user-item-info-name {
				font-size: 28rpx;
				font-weight: 500;
			}

			.user-item-info-account {
				font-size: 22rpx;
				color: #999;
			}
		}
	}
}

.user-item-right {
	position: relative;

	.user-item-right-checkbox {
		position: relative;
		z-index: 1;
		opacity: 0;
	}
}

.user-item-right-checkbox-custom-checked {
	z-index: 0;
	position: absolute;
	right: 4rpx;
	top: 4rpx;

	.user-item-right-checkbox-custom-checked-image {
		width: 50rpx;
		height: 50rpx !important;
	}

	::v-deep(.user-item-right-checkbox-custom-checked-image) {

		// width: 24rpx;
		// height: 24rpx;
	}
}
</style>
