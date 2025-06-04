<template>
	<view class="header-nav">
		<view class="search-bar searchInput-container">
			<uni-easyinput v-model="search" class="inputStyle" :placeholder="$t('common.search')" prefixIcon="search"
				:trim="true" :clearable="false" @blur="handleSearch" @keyup.enter="handleSearch" />
		</view>
		<view class="right-tools">
			<text class="download-link">{{ $t('common.downloadApp') }}</text>
			<!-- <text class="menu-icon">≡</text> -->
			<c-langSelector type="center" class="pc-lang-selector" />
		</view>
	</view>
</template>

<script setup lang="ts">
import { useSearchData } from '@/stores/useSearchData'
import { toSearchResults } from '@/utils/routers';

const search = ref('')
const { setSearch } = useSearchData()

watch(search, val => {
	setSearch(val)
})

const handleSearch = () => {
	toSearchResults({
		search: search.value
	})
}
</script>

<style lang="scss" scoped>
.header-nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: var(--background-color);
	border-bottom: 4rpx solid var(--text-color-denary);
	padding-top: 64rpx !important;
	padding-bottom: 48rpx !important;
}

.search-bar {
	min-width: 700rpx;
}

/* 輸入欄位 */
// INPUT 輸入欄位
.inputStyle {
	::v-deep(.uni-easyinput__content) {
		margin-bottom: 0rpx;

		&.is-input-border {
			border: none;
			background: var(--text-color-tertiary) !important;
			border-radius: 10rpx;
			padding: 4rpx 32rpx;

			&.is-focused {
				border: 1px solid var(--primary-color) !important;

				.uniui-eye-filled {
					color: var(--primary-color) !important;
				}
			}
		}

		.uni-icons {
			color: var(--text-color-gray3) !important;
		}

		.uni-input-placeholder {
			color: var(--text-color-quaternary) !important;
			font-size: 28rpx;
		}

		.uni-easyinput__content-input {
			color: var(--text-color-secondary) !important;
			font-size: 28rpx;
		}
	}

	&.errorStyle ::v-deep(.uni-easyinput__content) {
		&.is-input-border {
			border: 1px solid var(--text-color-error) !important;
		}
	}
}

.right-tools {
	display: flex;
	align-items: center;
	gap: 80rpx;
}

.download-link {
	color: var(--primary-color);

	&:hover {
		cursor: pointer;
	}
}

.pc-lang-selector {
	::v-deep(&.lang-selector) {

		.lang-selector-container:hover {
			cursor: pointer;
		}
	}

	::v-deep(.uni-popup__wrapper) {
		.popup-list {
			border-radius: 10rpx;
			min-width: 500rpx;
			padding: 0;
			overflow: hidden;

			.lang-item {
				justify-content: space-between;
				padding: 24rpx 48rpx;

				.label {
					font-weight: bold;
					font-size: 36rpx;
				}

				&.active,
				&:hover {
					cursor: pointer;
					background: var(--primary-color);
					color: var(--text-color-secondary);
				}

			}
		}
	}
}

.icon-bars {
	font-size: 48rpx !important;
}
</style>
