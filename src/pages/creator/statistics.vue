<template>
	<view class="statistics-page">
		<!-- header 導航-->
		<c-headerNav :title="$t('creator.myStatistics')" />
		<!--內容容器 -->
		<!-- 帳號頭像和錢包總額文字 水平排列 -->
		<view class="statistics-account-container">
			<!-- 帳號頭像 垂直排列 -->
			<view class="statistics-account-info-container">
				<!-- 頭像 -->
				<view class="statistics-account-avatar-container">
					<image class="statistics-account-avatar" src="/static/images/template/img-template-03.png" mode="widthFix">
					</image>
				</view>
				<!-- 名稱與帳號 -->
				<view class="statistics-account-info-name-container">
					<view class="statistics-account-info-name-title-container">
						<text class="statistics-account-info-title">名稱名稱</text>
						<!-- 認證圖標 -->
						<view class="statistics-account-info-prove-container">
							<uni-icons type="icon-community-prove" custom-prefix="icon" size="16"
								color="var(--text-color-senary)"></uni-icons>
						</view>
					</view>
					<!-- 帳號 -->
					<view class="statistics-account-info-name-account-container">
						<text class="statistics-account-info-account">@88888888.88</text>
					</view>
				</view>
			</view>
			<view class="statistics-account-container-button-container">
				<!-- 粉絲數 -->
				<view class="statistics-account-container-button">
					<view class="statistics-account-container-button-item">
						<text class="statistics-account-container-button-item-value">888</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
					<text class="statistics-account-container-button-item-text">{{ $t('creator.fansNum') }}</text>
				</view>
				<!-- 觀看次數 -->
				<view class="statistics-account-container-button-divider"></view>
				<view class="statistics-account-container-button">
					<view class="statistics-account-container-button-item">
						<text class="statistics-account-container-button-item-value">100M</text>
						<template v-if="watchCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
					<text class=" statistics-account-container-button-item-text">{{ $t('creator.watchNum') }}</text>
				</view>
			</view>
		</view>

		<!-- 折線圖 -->
		<view class="statistics-content-container-bottom">
			<!-- 靠左標題 -->
			<view class="statistics-content-container-bottom-title-container">
				<text>{{ $t('creator.yourFansData') }}</text>
			</view>
			<!-- 數據欄位 -->
			<view class="statistics-content-container-bottom-data">
				<!-- 粉絲成長紀錄 -->
				<view class="statistics-content-container-bottom-data-item">
					<view class="statistics-content-container-bottom-data-item-title">
						<text>{{ $t('creator.fanGrowth') }}</text>
					</view>
					<view class="statistics-content-container-bottom-data-item-value">
						<uni-icons class="icon-bg fan" type="icon-common-click" custom-prefix="icon" size="16"
							color="var(--text-color-secondary)" />
						<text>100M</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
				</view>
				<!-- 觀看成長紀錄 -->
				<view class="statistics-content-container-bottom-data-item">
					<view class="statistics-content-container-bottom-data-item-title">
						<text>{{ $t('creator.watchGrowth') }}</text>
					</view>
					<view class="statistics-content-container-bottom-data-item-value">
						<uni-icons class="icon-bg watch" type="icon-input-eye" custom-prefix="icon" size="16"
							color="var(--text-color-secondary)" />
						<text>1,234</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
				</view>
			</view>
			<view class="statistics-content-container-bottom-chart-container">
				<charts-lineChart :chartData="lineChartData" :opts="lineChartOpts" :dotColor1="dotColor1"
					:dotColor2="dotColor2" />
			</view>
		</view>
		<!-- 長條圖 -->
		<view class="statistics-content-container-bottom">
			<!-- 靠左標題 -->
			<view class="statistics-content-container-bottom-title-container">
				<text>{{ $t('creator.yourWatchData') }}</text>
			</view>
			<!-- 數據欄位 -->
			<view class="statistics-content-container-bottom-data">
				<!-- 粉絲成長紀錄 -->
				<view class="statistics-content-container-bottom-data-item">
					<view class="statistics-content-container-bottom-data-item-title">
						<text>{{ $t('creator.fanGrowth') }}</text>
					</view>
					<view class="statistics-content-container-bottom-data-item-value">
						<uni-icons class="icon-bg fan" type="icon-common-click" custom-prefix="icon" size="16"
							color="var(--text-color-secondary)" />
						<text>100M</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
				</view>
				<!-- 觀看成長紀錄 -->
				<view class="statistics-content-container-bottom-data-item">
					<view class="statistics-content-container-bottom-data-item-title">
						<text>{{ $t('creator.watchGrowth') }}</text>
					</view>
					<view class="statistics-content-container-bottom-data-item-value">
						<uni-icons class="icon-bg watch" type="icon-input-eye" custom-prefix="icon" size="16"
							color="var(--text-color-secondary)" />
						<text>1,234</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
				</view>
			</view>
			<view class="statistics-content-container-bottom-chart-container">
				<charts-barChart :chartData="barChartData" :opts="barChartOpts" />
			</view>
		</view>
		<!-- 圓餅圖 -->
		<view class="statistics-content-container-bottom">
			<!-- 靠左標題 -->
			<view class="statistics-content-container-bottom-title-container">
				<text>{{ $t('creator.yourFansData') }}</text>
			</view>
			<!-- 數據欄位 -->
			<view class="statistics-content-container-bottom-data">
				<!-- 粉絲成長紀錄 -->
				<view class="statistics-content-container-bottom-data-item">
					<view class="statistics-content-container-bottom-data-item-title">
						<text>{{ $t('creator.fanGrowth') }}</text>
					</view>
					<view class="statistics-content-container-bottom-data-item-value">
						<uni-icons class="icon-bg fan" type="icon-common-click" custom-prefix="icon" size="16"
							color="var(--text-color-secondary)" />
						<text>100M</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
				</view>
				<!-- 觀看成長紀錄 -->
				<view class="statistics-content-container-bottom-data-item">
					<view class="statistics-content-container-bottom-data-item-title">
						<text>{{ $t('creator.watchGrowth') }}</text>
					</view>
					<view class="statistics-content-container-bottom-data-item-value">
						<uni-icons class="icon-bg watch" type="icon-input-eye" custom-prefix="icon" size="16"
							color="var(--text-color-secondary)" />
						<text>1,234</text>
						<template v-if="fanCheck === 'up'">
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-up"
								custom-prefix="icon" size="16" color="var(--data-color-up)" />
						</template>
						<template v-else>
							<uni-icons class="statistics-account-container-button-item-icon" type="icon-common-arrowData-down"
								custom-prefix="icon" size="16" color="var(--data-color-down)" />
						</template>
					</view>
				</view>
			</view>
			<view class="statistics-content-container-bottom-chart-container">
				<charts-pieChart :chartData="pieChartData" :opts="pieChartOpts" />
			</view>
		</view>

	</view>
</template>

<script setup>
// TEMP: 個人數據
import { onShow } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const fanCheck = ref('up');
const watchCheck = ref('down');

/* 折線圖 */
// 圓點顏色
const dotColor1 = ref('var(--background-color-orange)');
const dotColor2 = ref('var(--background-color-blue)');
// 資料
const lineChartData = ref({
	categories: [t('common.monday'), t('common.tuesday'), t('common.wednesday'), t('common.thursday'), t('common.friday'), t('common.saturday'), t('common.sunday')],
	series: [
		{
			name: t('creator.fansNum'),
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: t('creator.watchNum'),
			data: [220, 182, 191, 234, 290, 330, 310],
		}
	]
})
const lineChartOpts = {
	// 📌 顏色陣列，與 series 對應
	color: ['#cc4a30', '#2991bf'],
	// 📌 四周內距（rpx）
	padding: [15, 15, 15, 15],
	// 📌 是否顯示圖例（series 名稱）
	legend: {
		show: true
	},
	// 📌 是否在每個資料點上方顯示數值
	dataLabel: false,
	// 📌 是否顯示每個節點的圓點
	dataPointShape: true,
	// 📌 X 軸設置
	xAxis: {
		disableGrid: false // 顯示垂直輔助線
	},
	// 📌 Y 軸設置
	yAxis: {
		min: 0, // 最小值固定為 0
		data: [
			{
				position: 'left', // 可為 'left' 或 'right'
				title: t('common.peopleNum')
			}
		]
	},
	// 📌 額外設定：line、tooltip 等進階樣式
	extra: {
		line: {
			type: 'curve',          // 折線類型：'straight' 直線、'curve' 曲線
			width: 2,               // 線條寬度
			activeType: 'hollow',   // 點擊節點樣式：'hollow' 空心圓、'solid' 實心圓
			linearType: 'none'      // 是否使用漸層：'none' 為單色
		},
		tooltip: {
			showBox: true,          // 是否顯示懸浮框
			bgColor: '#333333',        // 背景色
			fontColor: '#ffffff',      // 文字顏色
			borderRadius: 6,
			borderWidth: 0,
			splitLine: true,        // 顯示 Y 軸輔助線
			hAxisLine: true,        // 顯示 X 軸輔助線
			bgColor: '#cc4a30', // ✅ 請確認不是 null 或 undefined
		}
	}
};
/* 長條圖 */
const barChartData = ref({
	categories: [t('common.monday'), t('common.tuesday'), t('common.wednesday'), t('common.thursday'), t('common.friday'), t('common.saturday'), t('common.sunday')],
	series: [
		{
			name: '新增粉絲',
			data: [30, 45, 28, 60, 35, 50, 40],
			color: '#f56c6c'
		}
	]
})
const barChartOpts = {
	// 📌 顏色與 series 對應
	color: ['#f56c6c'],
	// 📌 四邊內距（rpx）
	padding: [15, 15, 15, 15],
	// 📌 圖例設置
	legend: {
		show: true
	},
	// 📌 顯示每根柱上方的數字
	dataLabel: true,
	// 📌 X 軸設定
	xAxis: {
		disableGrid: false // 顯示輔助線
	},
	// 📌 Y 軸設定
	yAxis: {
		min: 0,
		data: [
			{
				position: 'left',
				title: '人數'
			}
		]
	},
	// 📌 額外樣式設定（柱狀圖專用）
	extra: {
		column: {
			type: 'group',         // 柱狀類型：group（並排）或 stack（堆疊）
			width: 20,             // 每根柱子的寬度（rpx）
			barBorderCircle: true, // 是否圓角柱子
			linearType: 'none',    // 是否使用漸層：'none' 為單色，'custom' 自定漸層
			seriesGap: 5,          // 同組不同柱之間距離
			categoryGap: 10        // 組與組之間距離
		}
	}
};
/* 圓餅圖 */
const pieChartData = {
	series: [
		{ name: '影片', data: 35, color: '#f56c6c' },
		{ name: '圖片', data: 25, color: '#67c23a' },
		{ name: '直播', data: 20, color: '#409eff' },
		{ name: '文章', data: 10, color: '#e6a23c' },
		{ name: '其他', data: 10, color: '#909399' }
	]
};
const pieChartOpts = {
	// 📌 顏色對應順序：會套用到 series 中每一塊資料
	color: ['#f56c6c', '#67c23a', '#409eff', '#e6a23c', '#909399'],
	// 📌 圖例（Legend）設定
	legend: {
		show: true,          // 是否顯示圖例
		position: 'bottom'   // 圖例位置，可選：'top' | 'bottom'
	},
	// 📌 圖表的 padding（上下左右）rpx 單位
	padding: [15, 15, 15, 15],
	// 📌 額外設定：pie 圖專用
	extra: {
		pie: {
			activeOpacity: 0.5,   // 點擊/選中時的透明度（0~1）
			activeRadius: 10,     // 點擊/選中時外擴的距離（rpx）
			offsetAngle: 0,       // 圖表旋轉角度（0 表示從右側 3 點鐘方向開始）
			labelWidth: 15,       // 圓餅內 label 文字所佔最大寬度（影響文字自動排布）
			border: false,        // 是否繪製邊框線條（true 為每塊圓餅邊界加線）
			labelShow: true 			// 顯示名稱+百分比標籤
		}
	}
};

onShow(() => {
	// 檢查初始化
	// checkInitData()
})

</script>

<style lang="scss" scoped>
page {
	background-color: var(--background-color-grayLight);
}

.statistics-page {
	// padding: 0 100rpx;
}

.header-nav-container {
	position: relative;
	display: flex;
	justify-content: center;
	padding: 32rpx;
	padding-top: 48rpx;
	// border-bottom: 1px solid var(--text-color-octonary);

	// 圖標容器
	.header-nav-icon-container {
		position: absolute;
		left: 48rpx;
		top: 50%;
		transform: translateY(-50%);
		padding-top: 16rpx;
	}

	// 標題容器
	.header-nav-title-container {
		font-size: 32rpx;
		color: var(--text-color-primary);
	}
}

/* 帳號頭像和錢包總額文字 */
.statistics-account-container {
	padding: 0 32rpx;
	padding-top: 56rpx;
	margin-bottom: 32rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 12rpx;

	/* 帳號頭像 */
	.statistics-account-info-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12rpx;

		// 頭像
		.statistics-account-avatar-container {
			width: 200rpx;
			height: 200rpx;
			border: 12rpx solid var(--primary-color);
			background: var(--primary-color);
			border-radius: 100%;
			overflow: hidden;

			::v-deep(.statistics-account-avatar) {
				uni-image {
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 110% !important;
					height: 110% !important;
				}

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
		}

		/* 帳號資訊 */
		.statistics-account-info-name-container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;

			// 名稱
			.statistics-account-info-name-title-container {
				display: flex;
				justify-content: space-between;
				// width: 100%;
				gap: 24rpx;

				.statistics-account-info-title {
					font-size: 32rpx;
					color: var(--text-color-primary);
				}

				// 認證圖標
				.icon-community-prove {
					font-size: 28rpx !important;
				}
			}

			.statistics-account-info-name-account-container {
				display: flex;
				height: fit-content;

				.statistics-account-info-account {
					font-size: 20rpx;
					color: var(--text-color-septenary);
					line-height: 1;
				}
			}
		}
	}

	/* 粉絲 觀看次數 欄位*/
	.statistics-account-container-button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		.statistics-account-container-button-divider {
			width: 1px;
			height: 80rpx;
			background-color: var(--text-color-octonary);
			margin: 0 48rpx;
		}

		.statistics-account-container-button {
			display: flex;
			flex-direction: column;

			.statistics-account-container-button-item {
				position: relative;
			}

			.statistics-account-container-button-item-icon {
				position: absolute;
				right: -25%;
				bottom: 4rpx;
				// transform: translateY(-50%);
				font-size: 16rpx !important;
			}
		}

		.statistics-account-container-button-item-value {
			font-size: 38rpx;
			font-weight: 400;
			color: var(--text-color-primary);
			line-height: 1.2;
		}

		.statistics-account-container-button-item-text {
			line-height: 1;
			font-size: 22rpx;
			color: var(--text-color-septenary);
		}
	}

}

/* 錢包頁面 底部容器 */
.statistics-content-container-bottom {
	margin-top: 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32rpx;
	padding: 0 32rpx;

	.statistics-content-container-bottom-title-container {
		width: 100%;
		font-size: 28rpx;
		color: var(--text-color-primary);
	}

	/* 訂閱/關注人數 */
	.statistics-content-container-bottom-data {
		display: flex;
		justify-content: space-between;
		// align-items: center;
		gap: 32rpx;
		width: 100%;

		.statistics-content-container-bottom-data-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			// align-items: center;
			// flex: 1;
			border-radius: 32rpx;
			background-color: var(--text-color-secondary);
			color: var(--text-color-primary);
			font-weight: normal;
			padding: 16rpx 54rpx;


			.statistics-content-container-bottom-data-item-title {
				font-size: 24rpx;
			}

			.statistics-content-container-bottom-data-item-value {
				position: relative;
				font-size: 48rpx;
				font-weight: 400;
				line-height: 1.5;
				display: flex;
				align-items: center;
				gap: 16rpx;

				.statistics-account-container-button-item-icon {
					position: relative;
					// right: -28rpx;
					top: 10rpx;
					// transform: translateY(-50%);
					font-size: 20rpx !important;
				}
			}
		}
	}

	.icon-bg {
		border-radius: 8rpx;
		background: #000;
		padding: 4rpx;
		width: 44rpx;
		height: 44rpx;
		aspect-ratio: 1/1;
		margin-top: 8rpx;

		&::before {
			margin-top: 16rpx;
		}

		// display: flex;
		// justify-content: center;
		// align-items: center;


		&.fan {
			padding-top: 1rpx;
			font-size: 28rpx !important;
			background: var(--background-color-orange);
		}

		&.watch {
			font-size: 16rpx !important;
			padding-top: 9rpx;
			background: var(--background-color-blue);
		}
	}

	.statistics-content-container-bottom-chart-container {
		width: 100%;
	}
}

/* 訂閱/購買紀錄 */
.statistics-content-container-bottom-record-container {
	.statistics-account-container-record {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-bottom: unset;
		padding: 16rpx 0;
	}

	.statistics-content-container-bottom-record-title-container {
		display: flex;
		font-size: 24rpx;
		color: var(--text-color-primary);
	}

	.statistics-content-container-bottom-record-list-item-amount-container {
		display: flex;
		align-items: center;
		gap: 48rpx;

		.statistics-content-container-bottom-record-list-item-amount-icon {
			font-size: 24rpx !important;
			// padding-bottom: 4rpx;
		}
	}
}
</style>
