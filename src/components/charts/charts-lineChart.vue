// components/charts/AnalysisLineChart.vue
<template>
	<view class="chart-box">
		<view class="chart-title">
			{{ $t('charts.analysisReport') }}（{{ $t('charts.lineChart') }}）
			<view class="chart-legend">
				<view class="legend-item">
					<view class="legend-color fans" :style="{ 'background-color': dotColor1 }" />
					<text>{{ $t('creator.fans') }}</text>
				</view>
				<view class="legend-item">
					<view class="legend-color views" :style="{ 'background-color': dotColor2 }" />
					<text>{{ $t('play.watch') }}</text>
				</view>
			</view>
		</view>
		<qiun-data-charts type="line" :opts="opts" :chartData="chartData" canvas2d />
	</view>
</template>

<script setup lang="ts">
// TEMP: 數據分析組件-折線圖
import { defineProps } from 'vue';
const props = defineProps({
	chartData: Object,
	opts: Object,
	dotColor1: {
		type: String,
		default: '#cc4a30'
	},
	dotColor2: {
		type: String,
		default: '#2991bf'
	}
});

/**
 // NOTE: 折線圖資料格式說明
 * 父組件可傳遞以下兩個 props：
 * 
 * 1️⃣ chartData 結構如下：
 * {
 *   categories: string[], // X 軸標籤，如 ["週一", "週二"]
 *   series: Array<{
 *     name: string,       // 資料名稱（對應圖例）
 *     data: number[],     // 對應的數值資料陣列
 *     color?: string      // 線條顏色（可選）
 *   }>
 * }
 *
 * 2️⃣ opts：qiun-data-charts 支援的圖表配置，常見：
 * {
 *   color: string[]
 *   padding: number[]
 *   legend: { show: boolean }
 *   dataLabel: boolean
 *   dataPointShape: boolean
 *   xAxis: { disableGrid: boolean }
 *   yAxis: {
 *     min: number,
 *     data: [{ position: 'left', title?: string }]
 *   }
 *   extra: {
 *     line: {
 *       type: 'curve' | 'straight',
 *       width: number,
 *       activeType: 'hollow' | 'solid',
 *       linearType: 'none' | 'custom'
 *     },
 *     tooltip: {
 *       showBox: boolean,
 *       bgColor: string,
 *       fontColor: string,
 *       xAxisLabel: boolean,
 *       ...等
 *     }
 *   }
 * }
 */
/* 
const lineChartOpts = {
	// 📌 顏色陣列，與 series 對應
	color: ['#f56c6c', '#409eff'],
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
				title: '人數'
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
			bgColor: '#333',        // 背景色
			fontColor: '#fff',      // 文字顏色
			borderRadius: 6,
			borderWidth: 0,
			splitLine: true,        // 顯示 Y 軸輔助線
			hAxisLine: true,        // 顯示 X 軸輔助線
		}
	}
};
 */
</script>

<style scoped>
.chart-box {
	padding: 24rpx;
	background-color: #fff;
	border-radius: 20rpx;
}

.chart-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.chart-legend {
	display: flex;
	gap: 24rpx;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
	font-size: 24rpx;
	color: #666;
}

.legend-color {
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
}

.legend-color.fans {
	background-color: #C63F29;
}

.legend-color.views {
	background-color: #66B3FF;
}
</style>
